from PyQt5.QtCore import QState, pyqtSignal
from cv2 import imread, imwrite
from paho.mqtt import publish
from threading import Timer
########### MODIFICACION ########### 
from time import sleep
########### MODIFICACION ########### 
from shutil import copyfile
from time import strftime
from copy import copy
from math import ceil
import json

#{"text": f"en la caja {box} y posicion {cavity}", "color": "green"}

class Robot(QState):
    ok  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module
        self.sensor = "color_sensor_" + self.module[-1]

        self.set_robot      = SetRobot(module = self.module, model = self.model, parent = self)
        self.triggers       = Triggers(module = self.module, model = self.model, parent = self)
        self.color_sensor   = ColorSensor(sensor = self.sensor, robot = self.module, model = self.model, parent = self)
        self.standby        = QState(self)
        self.receiver       = Receiver(module = self.module, model = self.model, parent = self)
        self.error          = Error(module = self.module, model = self.model, parent = self)
        self.retry          = Retry(module = self.module, model = self.model, parent = self) 
        self.manual         = Manual(module = self.module, model = self.model, parent = self)
        self.manual_standby = ManualStandby(module = self.module, model = self.model, parent = self)
        self.retirar        = RetirarFusible(module = self.module, model = self.model, parent = self)

        #Transiciones son el hecho de moverte de un estado a otro estado
        #lo que genera una transición es un evento y un evento es una señal (un emit)

        #self.model.transitions.... es la señal, es un apuntador a los 
        #métodos de la clase Mqtt;
        #self.client             = MqttClient(self.model, parent = self)
        #self.model.transitions  = self.client

        #retry es el estado inicial, y cada que presionar retry boton te mandará a este estado inicial
        self.addTransition(self.model.transitions.retry_btn, self.retry)
        self.retry.addTransition(self.retry.ok, self.set_robot)

        self.set_robot.addTransition(self.model.transitions.ready, self.set_robot)
        self.set_robot.addTransition(self.set_robot.ok, self.triggers)
        self.triggers.addTransition(self.model.transitions.color_rqst, self.color_sensor)
        self.color_sensor.addTransition(self.color_sensor.ok, self.standby)

        #"INSERTED" TCP/IP dispara model.transitions.inserted
        #transiciona de standby a receiver cuando se hace bien la inserción
        self.standby.addTransition(self.model.transitions.inserted, self.receiver)

        #error exception, casi nunca pasa, este no es error de inserción
        #este menciona un error en el mensaje del fusible que se pide
        self.receiver.addTransition(self.receiver.nok, self.error)

        #receiver te dice que la inserción fue correcta y pasa al siguiente fusible a insertar
        self.receiver.addTransition(self.receiver.ok, self.triggers)

        #self.model.transitions.error, viene de comm.py de las lecturas del robot
        #"ERROR" TCP/IP dispara model.transitions.error
        #self.error sería el estado al que va a transicionar dentro de esta clase
        self.addTransition(self.model.transitions.error, self.error)

        #cuando se haya intentado cierto numero de veces la insercion se pasa al estado manual
        self.error.addTransition(self.error.limite_reintentos, self.manual)

        #en el estado manual aparece un mensaje para que retires el fusible indicado y te da la opción de 
        #insertarlo manualmente o presionar boton de reintento, para salir de este estado y quitar el fusible
        #actual de cola para continuar con la siguiente inserción te pedirá llave, pero si se presiona el
        #botón amarillo (independientemente de donde estes irás al estado retry) entonces
        #no irás a el estado "retirar" entonces no se quita de la cola el fusible y continua el proceso.
        self.manual.addTransition(self.manual.manual_ok, self.manual_standby)
        self.manual_standby.addTransition(self.model.transitions.key,self.retirar)

        #una vez que se quitó de cola el fusible se muestra un mensaje 1.5 segundos y se va a reintento
        #el cual es el estado inicial de robots, comenzando con el siguiente fusible
        self.retirar.addTransition(self.retirar.cont_ok,self.retirar)
        self.retirar.addTransition(self.retirar.retirado_ok, self.retry)

        #solo mandará el OK esta clase Robot hasta que triggers y finish manden sus señales... creo xD 
        self.triggers.ok.connect(self.ok)
        self.set_robot.finish.connect(self.ok)

        self.setInitialState(self.retry)

#cada clase es un estado diferente, al cual llegas por las transiciones
#pueden ser varios eventos diferentes los que te lleven a un estado, por ejemplo al estado de error

class Retry(QState):
    ok  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model  = model
        self.module = module
    def onEntry(self, QEvent):
        if self.model.robots[self.module]["current_trig"] != None:
            current_trig = self.model.robots[self.module]["current_trig"]
            box             = current_trig[0]
            cavity          = current_trig[1]
            #if not(box) in self.model.retries:
            #    self.model.retries[box] = {}
            #    self.model.retries[box][cavity] = 1
            #else:
            #    if not(cavity) in self.model.retries[box]:
            #        self.model.retries[box][cavity] = 1
            #    else: 
            #        self.model.retries[box][cavity] += 1
            #print("REINTENTOS: ",self.model.retries)

        self.restartRobot()
        self.model.robots[self.module]["retry"] = False

    def restartRobot(self):
        for i in self.model.robots:
            self.model.robots[i]["ready"] = False
            ########### MODIFICACION ###########
            if self.module == "robot_a":
                self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
            if self.module == "robot_b":
                self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
            ########### MODIFICACION ###########
            publish.single(self.model.pub_topics[i] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
            Timer(0.7, self.startRobot, args = (i,)).start()

    def startRobot(self, module):
        publish.single(self.model.pub_topics[module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
        if module == self.module:
            self.ok.emit()


class SetRobot(QState):
    ok      = pyqtSignal()
    finish  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model  = model
        self.module = module
    def onEntry(self, QEvent):
        if len(self.model.robots[self.module]["queue"]):
            command = {
                "lbl_result" : {"text": "Preparando robot", "color": "green"},
                "lbl_steps" : {"text": "Por favor espere", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            if self.model.robots[self.module]["ready"]:
                self.model.robots[self.module]["ready"] = False
                Timer(0.1, self.ok.emit).start()
        else:
            self.finish.emit()


class Triggers (QState):
    ok  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model      = model
        self.module     = module
        self.queue      = self.model.robots[self.module]["queue"]

    def onEntry(self, event):
        if len(self.queue) > 0:
            """
                Aqui puedo aprovechar para generar la visual de la caja correspondiente con su configuracion de fusibles
            """
            current_trig = self.model.robots[self.module]["current_trig"] = self.queue[0]
            box             = current_trig[0]
            cavity          = current_trig[1]
            fuse            = current_trig[2].split(sep = ",") # ["type", "current", "color"]

            if self.model.box_change != box:
                command = {f"{self.model.box_change}": False}
                publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.model.box_change = box

            #print("-----ENTRANDO A LA CLASE TRIGGERS------")

            #if cavity == "F300" and not(self.model.flag):
            #    temp = self.queue.pop(0)
            #    self.queue.insert(self.queue[-1], temp)
            #    self.model.flag = True

            #    current_trig = self.model.robots[self.module]["current_trig"] = self.queue[0]
            #    box             = current_trig[0]
            #    cavity          = current_trig[1]
            #    fuse            = current_trig[2].split(sep = ",") # ["type", "current", "color"]

            ######### Modificación para F96 #########
            if box == "PDC-RMID" and cavity == "F96":
                box = "F96_box"
                command = {
                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                "img_center": f"{box}.jpg",
                "img_fuse": "vacio.jpg"
                }
            elif box == "PDC-R" and cavity == "F96":
                box = "F96_box"
                command = {
                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                "img_center": f"{box}.jpg",
                "img_fuse": "vacio.jpg"
                }
            elif box == "PDC-RMID":
                if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "F96_box.JPG"
                    }
                else:
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "vacio.jpg"
                    }
            elif box == "PDC-R":
                if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "F96_box.JPG"
                    }
                else:
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "vacio.jpg"
                    }
            ######### Modificación para F96 #########
            else:
                command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "vacio.jpg"
                    }
                if "REL" in cavity:
                    command["lbl_steps"] = {"text": f"Tomando Relay", "color": "black"}
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            
            if box == "TBLU":
                cavity = "F10" + cavity[-1]
            if box == "PDC-S":
                cavity = "F11" + cavity[-1]
            if "_clear" in fuse[2]:
                fuse[0] = fuse[0] + "C"

            box = box.replace("-","")
            command = {"trigger": f"{fuse[0]}_{fuse[1]},{box},{cavity}"}
            if "REL" in cavity:
                temp = ""
                if "60" in fuse[1]:
                    temp = "RELAY_132"
                elif "70" in fuse[1]:
                    temp = "RELAY_112"
                command["trigger"] =  f"{temp},{box},{cavity}"
            print("BOX: ",box," CAVITY: ",cavity," FUSE: ",fuse)
            Timer(0.1, self.robotTrigger, args = (command, )).start()

        else:
            #ya no hay cola de fusibles para este robot, etnonces ya terminó y se libera la
            #ultima caja que estuvo clampeada (self.model.box_change)
            command = {f"{self.model.box_change}": False}
            publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            self.robotTrigger({"command": "stop"})
            sleep(0.2)
            self.robotTrigger({"command": "stop"})
            sleep(0.2)
            self.robotTrigger({"command": "start"})

            command = {
                "lbl_result" : {"text": f"Inserciones del {self.module} terminadas", "color": "green"},
                "lbl_steps" : {"text": "", "color": "black"}
                }
            #publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            #Timer(0.05, self.robotTrigger, args = ({"trigger": "HOME"}, )).start()
            self.ok.emit()

    def robotTrigger(self, command):
        publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)


class ColorSensor(QState):
    ok  = pyqtSignal()
    nok = pyqtSignal()

    def __init__(self, sensor = "color_sensor_a", robot = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model      = model
        self.sensor     = sensor
        self.robot      = robot
        

    def onEntry(self, QEvent):
        command = {
            "lbl_steps" : {"text": "Inspeccionando color", "color": "black"}
            }
        #publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        #Timer(2, self.response).start()
        self.response()

    def response(self):
        command = {
            "trigger": "color_ok"
            }
        #publish.single(self.model.pub_topics[self.robot],json.dumps(command),hostname='127.0.0.1', qos = 2)
        box     = self.model.robots[self.robot]["current_trig"][0]
        cavity  = self.model.robots[self.robot]["current_trig"][1]
        #print("ENTRADA DE COLOR SENSOR BOX: ",box," CAVITY: ",cavity)
        ######### Modificación para F96 #########
        if box == "PDC-RMID" and cavity =="F96":
            #print("Cambio de nombre en caja para colocar la F96!")
            box = "F96_box"
        if box == "PDC-R" and cavity =="F96":
            #print("Cambio de nombre en caja para colocar la F96!")
            box = "F96_box"
        ######### Modificación para F96 #########
        command = {
            "lbl_steps" : {"text": f"Insertando en {box} posicion {cavity}", "color": "black"}
            }
        #print("SALIDA DE COLOR SENSOR BOX: ",box," CAVITY: ",cavity)
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        self.ok.emit()


class Receiver(QState):
    ok  = pyqtSignal()
    nok = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):
        box             = self.model.robots[self.module]["current_trig"][0]
        cavity          = self.model.robots[self.module]["current_trig"][1]
        value           = self.model.robots[self.module]["current_trig"][2]
        #print("DENTRO DE FUNCION RECEIVER!!!!!!!!!!")
        try:
            #self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
            #imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])

            if box == "PDC-RMID" and cavity == "F96":
                box = "F96_box"
                self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])
                #self.model.database["fuses"][box][cavity] = value
                command = {
                    "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                    "img_center" : box + ".jpg"
                    }
            elif box == "PDC-R" and cavity == "F96":
                box = "F96_box"
                self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])
                #self.model.database["fuses"][box][cavity] = value
                command = {
                    "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                    "img_center" : box + ".jpg"
                    }
            else:
                self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])
                #self.model.database["fuses"][box][cavity] = value
                command = {
                    "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                    "img_center" : box + ".jpg",
                    "img_fuse": "vacio.jpg"
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            Timer(0.05, self.ok.emit).start()

            # para quitar de la lista(en cola) el fusible insertado
            self.model.robots[self.module]["current_trig"] = None
            self.model.robots[self.module]["queue"].pop(0)

            #para reinicar contador de veces que entra a error
            self.model.contador_error = 0

        except Exception as ex:
            print("Receiver exception: ", ex)
            command = {
                "lbl_result" : {"text": f"ERROR: {ex.args}", "color": "red"},
                "lbl_steps" : {"text": f"Presionar boton o girar llave", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.robots[self.module]["error"] = ex.args
            self.nok.emit()


class Error(QState):
    limite_reintentos  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model      = model
        self.module     = module

    def onEntry(self, event):
        box = self.model.robots[self.module]["current_trig"][0]
        cavity = self.model.robots[self.module]["current_trig"][1]
        if box == "PDC-RMID" and cavity == "F96":
            box = "F96_box"
        if box == "PDC-R" and cavity == "F96":
            box = "F96_box"
        # GUARDAR LOS INTENTOS QUE LLEVA EN ESE FUSIBLE EN EL MODELO
        # ESTO SE GUARDARÁ EN LA BASE DE DATOS AL SALIR DE LA CLASE ROBOT
        if not(box) in self.model.retries:
            self.model.retries[box] = {}
            self.model.retries[box][cavity] = 1
        else:
            if not(cavity) in self.model.retries[box]:
                self.model.retries[box][cavity] = 1
            else: 
                self.model.retries[box][cavity] += 1
        print("REINTENTOS: ",self.model.retries)

        ###################################
        # Condición para transicionar a estado de inserción manual
        self.model.contador_error = self.model.contador_error + 1
        print("número de errores de inserción: ")
        print(self.model.contador_error)

        #en esta línea haces un publish para modificar el valor del modbus ERROR_insertion a true, indicando el error
        publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": True}),hostname='127.0.0.1', qos = 2)

        #se da a la variable "error" el valor de lo que se leyó en el MQTT, que para este caso sería
        #lo que se publica desde el Robot por TCP/IP, response: ERROR_insertion
        error = self.model.robots[self.module]["error"]

        if self.model.contador_error == self.model.max_reintentos:
            self.limite_reintentos.emit()

        elif self.model.contador_error < self.model.max_reintentos:

            try:

                #error = self.model.plc["error"]
                Timer(0.5, self.restartRobot).start()

                #diccionario con las llaves "lbl_result", estas llaves corresponden a un objeto en la interfaz gráfica
                #valor, texto que quieres
                #color, color que quieres
                #GUI y CONTROLLER interactuan con mensajes MQTT
                command = {
                    "lbl_result" : {"text": f"ERROR de inserción", "color": "red"},
                    "lbl_steps" : {"text": f"Retirar fusible {box}: {cavity} y reintentar", "color": "black"}
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                #en esta línea se hace un publish del diccionario "command" que creaste, para mostrar en la pantalla (gui)
                #el mensaje de error y el fusible y cavidad correspondientes

                try:
                    self.model.drawBB(draw = [box, cavity], color = (0, 0, 255))
                    imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])

                    command = {
                        "img_center" : box + ".jpg"
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                except:
                    pass

            except Exception as ex:
                print("ERROR exception: ", ex)

    def restartRobot(self):
        ########### MODIFICACION ###########
        if self.module == "robot_a":
                self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        if self.module == "robot_b":
            self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        ########### MODIFICACION ###########
        self.model.robots[self.module]["ready"] = False
        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        Timer(0.7, self.startRobot, args = (self.module,)).start()

    def startRobot(self, module):
        publish.single(self.model.pub_topics[module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):

        #se limpia el error
        self.model.robots[self.module]["error"] = ""
        # se apaga el error en el plc (que enciende coil en GDI y en andon de plc)
        publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": False}),hostname='127.0.0.1', qos = 2)

        if self.model.contador_error < self.model.max_reintentos:
            command = {
                "lbl_result" : {"text": "Reintentando", "color": "green"},
                "lbl_steps" : {"text": "", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        


class Manual(QState):

    manual_ok  = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        #se lee del modelo la caja y cavidad actuales
        box = self.model.robots[self.module]["current_trig"][0]
        cavity = self.model.robots[self.module]["current_trig"][1]
        fuse = self.model.robots[self.module]["current_trig"][2].split(sep = ",") # ["type", "current", "color"]
        fusetemp = []
        fusetemp = fuse
        ######### Modificación para F96 #########
        if box == "PDC-RMID" and cavity == "F96":
            box = "F96_box"
        if box == "PDC-R" and cavity == "F96":
            box = "F96_box"
        ######### Modificación para F96 #########

        if "REL" in cavity:
            if "60" in fuse[1]:
                fusetemp[1] = "RELAY_132"
            elif "70" in fuse[1]:
                fusetemp[1] = "RELAY_112"


        #se guarda el número de intentos que lleva este fusible
        reintentos = self.model.retries[box][cavity]

        #dibujar un box de color naranja para esta cavidad
        self.model.drawBB(draw = [box, cavity], color = (0, 128, 255))
        imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])

        #se reinicia el contador de intentos para fusible
        self.model.contador_error = 0

        if self.module == "robot_a":
                self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        if self.module == "robot_b":
            self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        sleep(0.3)
        publish.single(self.model.pub_topics[self.module],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.4)
        publish.single(self.model.pub_topics[self.module],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.3)
        publish.single(self.model.pub_topics[self.module],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

        command = {
                    "lbl_result" : {"text": f"Reintentos: {reintentos}. Para reintentar presionar boton amarillo.", "color": "blue"},
                    "lbl_steps" : {"text": f"Para continuar, Insertar Manual y pedir llave a calidad", "color": "green"},
                    "lbl_info1" : {"text": f"[CAJA]:[{box}]\n[CAVIDAD]:[{cavity}]\n[FUSIBLE]:[{fusetemp[0]} {fusetemp[1]}]", "color": "red"},
                    "img_center" : box + ".jpg"
                    }

        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        #for i in range(10):
            #cuenta = 10 - i

        print("emit manual_ok")
        self.manual_ok.emit()


class ManualStandby(QState):

    #manual_standby  = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):
        #bandera para funcionamiento de la llave sin mensaje de confirmación
        self.model.fusible_manual = True
        print("Esperando botón de reintento o llave de calidad")

    def onExit(self, QEvent):
        #al salir de este estado con llave o con retry_btn,
        #vuelve a habilitarse el funcionamiento 
        self.model.fusible_manual = False
        command = {"lbl_info1" : {"text": "", "color": "red"}}
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        

class RetirarFusible(QState):

    retirado_ok  = pyqtSignal()
    cont_ok  = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        command = {
                    "lbl_result" : {"text": f"Fusible insertado manualmente.", "color": "green"},
                    "lbl_steps" : {"text": f"Continuando en {self.model.screen_cont} :con siguiente insercion.", "color": "blue"}
                    }

        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        if self.model.screen_cont > 0:

            self.model.screen_cont = self.model.screen_cont - 1
            print("cont_ok emit()")
            Timer(1,self.cont_ok.emit).start()
        
        elif self.model.screen_cont <= 0:

            # para quitar de la lista(en cola) el fusible insertado
            # después de haber hecho "cont_ok" 3 veces (las veces dependiendo de screen_cont)
            self.model.robots[self.module]["current_trig"] = None
            self.model.robots[self.module]["queue"].pop(0)
            self.model.screen_cont = self.model.screen_cont_reset 
            print("retirado_ok emit()")
            #Timer(1,self.retirado_ok.emit).start()
            self.retirado_ok.emit()
        


        

            
