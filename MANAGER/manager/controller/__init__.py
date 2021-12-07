from PyQt5.QtCore import QObject, QStateMachine, QState, pyqtSlot, pyqtSignal, QTimer

from PyQt5.QtCore import QThread    # Librería para ejecuciones en paralelo
from time import sleep              # Para usar la función sleep(segundos)
from cv2 import imread, imwrite     # Librería de OpenCV para leer y escribir imagenes
from paho.mqtt.client import Client # Librería necesaria para conexión, para hacer publish a los labels
#from shutil import copyfile
#from math import ceil


from paho.mqtt import publish
from datetime import datetime
from threading import Timer
from time import strftime
from copy import copy
from os import system
import requests
import json
from controller.comm import MqttClient
from controller.model import Model
from controller.cycle_manage import *     
from controller import robot


class Controller (QObject):

    def __init__(self, parent = None):
        super().__init__(parent)

        self.model                  = Model(parent = self)
        self.client                 = MqttClient(self.model, parent = self)
        self.model.transitions      = self.client
        self.model.mainWindow       = parent
        self.stateMachine           = QStateMachine(self)


        self.startup                = Startup(model = self.model)
        self.show_login             = Login(model = self.model)
        self.check_login            = CheckLogin(model = self.model)

        self.process                = QState()

        self.objeto_mythread        = MyThread(module = "robot_b", model = self.model, client = self.client, parent = self)
        self.objeto_mythread.start()

        self.start_cycle            = StartCycle(model = self.model, parent = self.process)
        self.scan_qr                = ScanQr(model = self.model, parent = self.process)
        self.check_qr               = CheckQr(model = self.model, parent = self.process)
        self.qr_rework              = QrRework(model = self.model)
        self.clamps_monitor_a       = ClampsMonitor(module = "clamps_a",model = self.model, parent = self.process)
        self.clamps_monitor_b       = ClampsMonitor(module = "clamps_b",model = self.model, parent = self.process)
        self.clamps_monitor_both    = ClampsMonitorBoth(module = "clamps",model = self.model, parent = self.process)
        self.clamps_standby_a       = Clamps_Standby(module = "clamps_a",model = self.model, parent = self.process)
        self.clamps_standby_b       = Clamps_Standby(module = "clamps_b",model = self.model, parent = self.process)
        self.clamps_standby_both    = Clamps_Standby(module = "clamps",model = self.model, parent = self.process)
        
        self.config                 = Config(model = self.model)
        self.reset                  = Reset(model = self.model)
        self.finish                 = Finish(model = self.model, parent = self.process)

        self.robot_a                = robot.Robot(module = "robot_a", model = self.model, parent = self.process)
        self.robot_b                = robot.Robot(module = "robot_b", model = self.model, parent = self.process)
        self.robot_both             = robot.Robot(module = "robot_a", model = self.model, parent = self.process)
        self.waiting_robot          = Waiting_Robot(model = self.model, parent = self.process)
        
        self.startup.addTransition(self.startup.ok, self.show_login)
        self.show_login.addTransition(self.client.ID, self.check_login)
        self.show_login.addTransition(self.client.login, self.show_login)
        self.check_login.addTransition(self.check_login.nok, self.show_login)
        self.check_login.addTransition(self.check_login.ok, self.start_cycle)
        self.start_cycle.addTransition(self.client.config, self.config)
        self.config.addTransition(self.client.config_ok, self.start_cycle)
        self.start_cycle.addTransition(self.client.logout, self.startup)
        #self.start_cycle.addTransition(self.client.start, self.scan_qr)

        self.start_cycle.addTransition(self.client.F4, self.scan_qr)
        self.start_cycle.addTransition(self.client.F5, self.scan_qr)

        self.scan_qr.addTransition(self.client.code, self.check_qr)
        self.check_qr.addTransition(self.check_qr.nok, self.scan_qr)
        self.check_qr.addTransition(self.check_qr.rework, self.qr_rework)
        self.qr_rework.addTransition(self.qr_rework.ok, self.check_qr)
        #self.check_qr.addTransition(self.check_qr.ok, self.clamps_monitor_a)

        self.check_qr.addTransition(self.check_qr.ok_F4, self.clamps_monitor_a)
        self.clamps_monitor_a.addTransition(self.client.clamp, self.clamps_monitor_a)
        self.clamps_monitor_a.addTransition(self.clamps_monitor_a.ok, self.clamps_standby_a)
        self.clamps_standby_a.addTransition(self.client.start, self.robot_a)
        self.robot_a.addTransition(self.robot_a.ok, self.clamps_monitor_b)
        self.clamps_monitor_b.addTransition(self.client.clamp, self.clamps_monitor_b)
        self.clamps_monitor_b.addTransition(self.clamps_monitor_b.ok, self.clamps_standby_b)
        self.clamps_standby_b.addTransition(self.client.start, self.robot_b)
        self.robot_b.addTransition(self.robot_b.ok, self.finish) 

        self.check_qr.addTransition(self.check_qr.ok_F5, self.clamps_monitor_both)
        self.clamps_monitor_both.addTransition(self.client.clamp, self.clamps_monitor_both)
        self.clamps_monitor_both.addTransition(self.clamps_monitor_both.ok, self.clamps_standby_both)
        self.clamps_standby_both.addTransition(self.client.start, self.robot_both)
        self.robot_both.addTransition(self.robot_both.ok, self.waiting_robot)
        self.waiting_robot.addTransition(self.waiting_robot.waiting, self.waiting_robot)
        self.waiting_robot.addTransition(self.waiting_robot.ok, self.finish)
        
        #################################################################

        self.finish.addTransition(self.finish.ok, self.start_cycle)
        self.process.addTransition(self.client.key, self.reset)
        self.reset.addTransition(self.reset.ok, self.start_cycle)
                                                                   
        self.stateMachine.addState(self.startup)
        self.stateMachine.addState(self.show_login)
        self.stateMachine.addState(self.check_login)
        self.stateMachine.addState(self.process)
        self.stateMachine.addState(self.config)
        self.stateMachine.addState(self.reset)
        self.stateMachine.addState(self.qr_rework)

        self.process.setInitialState(self.start_cycle)
        self.stateMachine.setInitialState(self.startup)

    @pyqtSlot()
    def start(self):
        self.client.setup()
        self.stateMachine.start()
      
class MyThread(QThread):
    def __init__(self, module = "robot_b", model = None, client = None, parent = QObject):
        super().__init__(parent)
        self.model  = model
        self.module = module
        self.client = client
        
        print("se crea un objeto de la clase MyThread con padre QThread")
        print("con entrada del objeto model de la clase model que está en model.py")
        print("y el objeto client de la clase MqttClient que está en comm.py")
        
    def run(self):
        
        self.model.current_thread_robot = self.module

        while 1:

            #tiempo de espera para no alentar las ejecuciones de otros procesos
            sleep(0.2)

            if self.model.set_thread_robot         :
                print("self.model.set_thread_robot")
            if self.model.retry_thread_robot       :
                print("self.model.retry_thread_robot")
            if self.model.trigger_thread_robot     :
                print("self.model.trigger_thread_robot")
            if self.model.loaded_thread_robot      :
                print("self.model.loaded_thread_robot")
            if self.model.inserted_thread_robot    :
                print("self.model.inserted_thread_robot")
            if self.model.error_thread_robot       :
                print("self.model.error_thread_robot")
            if self.model.limite_reintentos_thread :
                print("self.model.limite_reintentos_thread")
            if self.model.llave_thread             :
                print("self.model.llave_thread")        

            #si se inicia el modo dos robots e inicia el robot_a...
            if self.model.init_thread_robot == True:
                print("self.model.init_thread_robot")

                #si se presiona el botón de reintento (o después de una inserción manual)
                if self.model.retry_thread_robot == True:
                    self.model.retry_thread_robot = False

                    #si hubo algún error de inserción se limpia el error
                    self.model.robots[self.module]["error"] = ""
                    publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": False}),hostname='127.0.0.1', qos = 2)

                    #si hubo inserción manual se limpia la variable
                    self.model.fusible_manual = False
                    self.model.waiting_key_thread = False

                    #si ya acabó el robot principal... (este estado thread reiniciará el robot)
                    if self.model.robot_principal == True:

                        if self.module == "robot_a":
                            self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
                        if self.module == "robot_b":
                            self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py

                        self.model.robots[self.module]["ready"] = False
                        sleep(0.1)
                        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                        sleep(0.4)
                        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

                #set_robot solo entra cuando llega un READY del robot)
                if self.model.set_thread_robot == True:
                    self.model.set_thread_robot = False

                    if len(self.model.robots[self.module]["queueIzq"]) or len(self.model.robots[self.module]["queueDer"]):
                        command = {
                            "lbl_result" : {"text": "Preparando robot", "color": "green"},
                            "lbl_steps" : {"text": "Por favor espere", "color": "black"}
                            }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        if self.model.robots[self.module]["ready"]:
                            self.model.robots[self.module]["ready"] = False
                            self.model.trigger_thread_robot = True
                            self.model.finish_thread_robot = False
                    #si no le quedan fusibles en cola...
                    else:
                        self.model.trigger_thread_robot = False
                        self.model.finish_thread_robot = True

                #una vez reiniciado, si no ha finalizado se va a triggers (o después de una inserción)
                if self.model.trigger_thread_robot == True:
                    self.model.trigger_thread_robot = False

                    self.queueIzq      = self.model.robots[self.module]["queueIzq"]
                    self.queueDer      = self.model.robots[self.module]["queueDer"]

                    #si aún tiene fusibles de este lado
                    if len(self.queueIzq) > 0:
                        self.model.popQueueIzq_2 = True
                        self.model.popQueueDer_2 = False

                        current_trig = self.model.robots[self.module]["current_trig"] = self.queueIzq[0]
                        print("*******self.queueIzq*******\n",self.queueIzq)
                        box             = current_trig[0]
                        cavity          = current_trig[1]
                        fuse            = current_trig[2].split(sep = ",") # ["type", "current", "color"]

                        if box == "PDC-RMID" and cavity == "F96":
                            box = "F96_box"
                            command = {
                            "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                            "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-R" and cavity == "F96":
                            box = "F96_box"
                            command = {
                            "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                            "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-RMID":
                            if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }
                        elif box == "PDC-R":
                            if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }

                        else:
                            command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
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

                        print("*******current_trig*******\n")
                        print("BOX: ",box,"\nCAVITY: ",cavity,"\nFUSE: ",fuse)

                        #SE MANDA MENSAJE AL ROBOT PARA IR POR ESE FUSIBLE, A ESA CAJA, A ESA CAVIDAD A INSERTAR
                        publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)


                    #si acabó el lado anterior  y aún tiene fusibles de este lado
                    elif len(self.queueDer) > 0:
                        self.model.popQueueIzq_2 = False
                        self.model.popQueueDer_2 = True
                        print("+++++++++ENTRAMOS AL ELIF PARA LADO DERECHO+++++++++++++++++")
                        current_trig = self.model.robots[self.module]["current_trig"] = self.queueDer[0]
                        print("*******self.queueDer*******\n",self.queueDer)
                        box             = current_trig[0]
                        cavity          = current_trig[1]
                        fuse            = current_trig[2].split(sep = ",") # ["type", "current", "color"]

                        if box == "PDC-RMID" and cavity == "F96":
                            box = "F96_box"
                            command = {
                            "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                            "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-R" and cavity == "F96":
                            box = "F96_box"
                            command = {
                            "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                            "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-RMID":
                            if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }
                        elif box == "PDC-R":
                            if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }
                        else:
                            command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
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
            
                        print("*******current_trig*******\n")
                        print("BOX: ",box,"\nCAVITY: ",cavity,"\nFUSE: ",fuse)

                        #SE MANDA MENSAJE AL ROBOT PARA IR POR ESE FUSIBLE, A ESA CAJA, A ESA CAVIDAD A INSERTAR
                        publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)

                    else: #YA NO HAY FUSIBLES EN COLA
            
                        #para que el robot a solo pueda liberar las cajas de su lado al terminar
                        if self.module == "robot_a":
                            self.model.databaseTempModel.clear()
                            self.model.databaseTempModel.append("PDC-D")
                            self.model.databaseTempModel.append("PDC-P")

                        if self.module == "robot_b":
                            self.model.databaseTempModel.clear()
                            self.model.databaseTempModel.append("PDC-R")
                            self.model.databaseTempModel.append("PDC-RMID")
                            self.model.databaseTempModel.append("PDC-S")
                            self.model.databaseTempModel.append("TBLU")

                        command = {}
                        for i in self.model.databaseTempModel:
                            print("i Caja a liberar: ",i)
                            command[i] = False
                        print("Command Final para liberar cajas: ",command)
                        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                        print("Enviando robot a Home - STOP - START")
                        sleep(0.1)
                        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                        sleep(0.1)
                        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                        sleep(0.4)
                        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
                        sleep(0.1)

                        command = {
                            "lbl_result" : {"text": f"Inserciones del {self.module} terminadas", "color": "green"},
                            "lbl_steps" : {"text": "", "color": "black"}
                            }
                        self.model.finish_thread_robot = True
                    
                #si llega mensaje de LOADED como respuesta del robot...
                if self.model.loaded_thread_robot == True:
                    self.model.loaded_thread_robot = False

                    box     = self.model.robots[self.module]["current_trig"][0]
                    cavity  = self.model.robots[self.module]["current_trig"][1]

                    if box == "PDC-RMID" and cavity =="F96":
                        box = "F96_box"
                    if box == "PDC-R" and cavity =="F96":
                        box = "F96_box"

                    command = {
                        "lbl_steps" : {"text": f"Insertando en {box} posicion {cavity}", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                #si llega mensaje de INSERTED como respuesta del robot...
                if self.model.inserted_thread_robot == True:
                    self.model.inserted_thread_robot = False

                    box             = self.model.robots[self.module]["current_trig"][0]
                    cavity          = self.model.robots[self.module]["current_trig"][1]
                    value           = self.model.robots[self.module]["current_trig"][2]
                    try:
                        if box == "PDC-RMID" and cavity == "F96":
                            box = "F96_box"
                            self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                            imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                            command = {
                                "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                                "img_center" : box + "2.jpg"
                                }
                        elif box == "PDC-R" and cavity == "F96":
                            box = "F96_box"
                            self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                            imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                            command = {
                                "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                                "img_center" : box + "2.jpg"
                                }
                        else:
                            self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                            imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])
                            command = {
                                "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                                "img_center" : box + "2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                        # para quitar de la lista(en cola) el fusible insertado
                        self.model.robots[self.module]["current_trig"] = None
                        if self.model.popQueueIzq_2 == True and self.model.popQueueDer_2 == False:
                            self.model.robots[self.module]["queueIzq"].pop(0)
                        if self.model.popQueueIzq_2 == False and self.model.popQueueDer_2 == True:
                            self.model.robots[self.module]["queueDer"].pop(0)

                        #para reinicar contador de veces que entra a error
                        self.model.contador_error_2 = 0

                        #para regresar a triggers
                        self.model.trigger_thread_robot = True

                    except Exception as ex:
                        print("Receiver exception: ", ex)
                        command = {
                            "lbl_result" : {"text": f"ERROR: {ex.args}", "color": "red"},
                            "lbl_steps" : {"text": f"Presionar boton o girar llave", "color": "black"}
                            }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.model.robots[self.module]["error"] = ex.args

                        #después se requerirá otra variable para ir a receiver nok
                        self.model.trigger_thread_robot = True

                #si llega mensaje de ERROR como respuesta del robot...
                if self.model.error_thread_robot == True:
                    self.model.error_thread_robot = False

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
                    self.model.contador_error_2 = self.model.contador_error_2 + 1
                    print("número de errores de inserción: ")
                    print(self.model.contador_error_2)

                    #en esta línea haces un publish para modificar el valor del modbus ERROR_insertion a true, indicando el error
                    publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": True}),hostname='127.0.0.1', qos = 2)

                    error = self.model.robots[self.module]["error"]

                    if self.model.contador_error_2 == self.model.max_reintentos_2:
                        self.model.limite_reintentos_thread = True

                    elif self.model.contador_error_2 < self.model.max_reintentos_2:

                        try:
                            #if self.module == "robot_a":
                            self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
                            #if self.module == "robot_b":
                            self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
                            self.model.robots["robot_a"]["ready"] = False
                            self.model.robots["robot_b"]["ready"] = False
                            publish.single(self.model.pub_topics["robot_a"] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                            publish.single(self.model.pub_topics["robot_b"] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                            sleep(0.4)
                            publish.single(self.model.pub_topics["robot_a"] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
                            sleep(0.4)
                            publish.single(self.model.pub_topics["robot_b"] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

                            command = {
                                "lbl_result" : {"text": f"ERROR de inserción", "color": "red"},
                                "lbl_steps" : {"text": f"Retirar fusible {box}: {cavity} y reintentar", "color": "black"}
                                }
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                            try:
                                self.model.drawBB(draw = [box, cavity], color = (0, 0, 255))
                                imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                                command = {
                                    "img_center" : box + "2.jpg"
                                    }
                                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                            except:
                                pass

                        except Exception as ex:
                            print("ERROR exception: ", ex)

                #si se excedió el limite de errores se habilita limite_reintentos_thread en el if anterior
                if self.model.limite_reintentos_thread == True:
                    self.model.limite_reintentos_thread = False

                    box = self.model.robots[self.module]["current_trig"][0]
                    cavity = self.model.robots[self.module]["current_trig"][1]
                    fuse = self.model.robots[self.module]["current_trig"][2].split(sep = ",") # ["type", "current", "color"]
                    fusetemp = []
                    fusetemp = fuse
                    if box == "PDC-RMID" and cavity == "F96":
                        box = "F96_box"
                    if box == "PDC-R" and cavity == "F96":
                        box = "F96_box"
                    if "REL" in cavity:
                        if "60" in fuse[1]:
                            fusetemp[1] = "RELAY_132"
                        elif "70" in fuse[1]:
                            fusetemp[1] = "RELAY_112"

                    #se guarda el número de intentos que lleva este fusible
                    reintentos = self.model.retries[box][cavity]

                    #dibujar un box de color naranja para esta cavidad
                    self.model.drawBB(draw = [box, cavity], color = (0, 128, 255))
                    imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                    #se reinicia el contador de intentos para fusible
                    self.model.contador_error_2 = 0

                    if self.module == "robot_a":
                            self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
                    if self.module == "robot_b":
                        self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py

                    sleep(0.1)
                    publish.single(self.model.pub_topics[self.module],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                    sleep(0.4)
                    publish.single(self.model.pub_topics[self.module],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

                    command = {
                                "lbl_result" : {"text": f"Reintentos: {reintentos}. Para reintentar presionar boton amarillo.", "color": "blue"},
                                "lbl_steps" : {"text": f"Para continuar, Insertar Manual y pedir llave a calidad", "color": "green"},
                                "lbl_info1" : {"text": f"[CAJA]:[{box}]\n[CAVIDAD]:[{cavity}]\n[FUSIBLE]:[{fusetemp[0]} {fusetemp[1]}]", "color": "red"},
                                "img_center" : box + "2.jpg"
                                }

                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    #bandera para funcionamiento de la llave sin mensaje de confirmación
                    self.model.fusible_manual = True
                    self.model.waiting_key_thread = True

                #si se da llave después de haber estado en modo inserción manual
                if self.model.llave_thread == True:
                    self.model.llave_thread = False
                    self.model.waiting_key_thread = False

                    self.model.robots[self.module]["current_trig"] = None
                    if self.model.popQueueIzq_2 == True and self.model.popQueueDer_2 == False:
                        self.model.robots[self.module]["queueIzq"].pop(0)
                    if self.model.popQueueIzq_2 == False and self.model.popQueueDer_2 == True:
                        self.model.robots[self.module]["queueDer"].pop(0)
                    
                    command = {
                                "lbl_result" : {"text": f"Fusible insertado manualmente.", "color": "green"},
                                "lbl_steps" : {"text": f"Continuando con siguiente insercion.", "color": "blue"}
                                }

                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.model.retry_thread_robot = True

                #se manda una variable en true para finalizar este thread
                if self.model.finish_thread_robot == True:
                     self.model.finish_thread_robot = False

                     #variable que termina el ciclo cuando se está esperando a este robot
                     self.model.thread_robot = True
                     #se apaga el init_thread para dejar de estar ejecutando en paralelo
                     self.model.init_thread_robot = False


            
            

























class MyThreadTimer(QThread):
    def __init__(self, module = "Thread", model = None, client = None, parent = QObject):
        super().__init__(parent)
        self.model  = model
        self.module = module
        self.client = client
        
        print("se crea un objeto de la clase MyThread con padre QThread")
        print("con entrada del objeto model de la clase model que está en model.py")
        print("y el objeto client de la clase MqttClient que está en comm.py")
        
    def run(self):
        
        ejecution_timer = 0

        while 1:

            sleep(1)
            print("ejecutando thread")
            command = {
                    "lbl_nuts" : {"text": f"Tiempo de ejecución:\n{ejecution_timer} segundos", "color": "blue"},
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            ejecution_timer = ejecution_timer + 1
            sleep(1)

            print("ejecutando thread")
            command = {
                    "lbl_nuts" : {"text": f"Tiempo de ejecución:\n{ejecution_timer} segundos", "color": "cyan"},
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            ejecution_timer = ejecution_timer + 1