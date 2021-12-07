from PyQt5.QtCore import QObject, pyqtSignal, QTimer
from paho.mqtt.client import Client
from threading import Timer
from copy import copy
########### MODIFICACION ########### 
from time import sleep
########### MODIFICACION ########### 
import json

class MqttClient (QObject):
    conn_ok     =   pyqtSignal()
    conn_nok    =   pyqtSignal()
    clamp       =   pyqtSignal()
    emergency   =   pyqtSignal()
    recovery    =   pyqtSignal()
    key         =   pyqtSignal()
    retry_btn   =   pyqtSignal()
    login       =   pyqtSignal()
    logout      =   pyqtSignal()
    config      =   pyqtSignal()
    config_ok   =   pyqtSignal()
    ID          =   pyqtSignal()
    code        =   pyqtSignal()
    visible     =   pyqtSignal()
    pose        =   pyqtSignal()
    loaded      =   pyqtSignal()
    color_rsp   =   pyqtSignal()
    error       =   pyqtSignal()
    inserted    =   pyqtSignal()
    start       =   pyqtSignal()
    ready       =   pyqtSignal()
    F4          =   pyqtSignal()
    F5          =   pyqtSignal()


    ra_home    = ""
    rb_home    = ""

    nido_PDCD = ""
    nido_PDCP = ""
    nido_PDCR = ""
    nido_PDCS = ""
    nido_TBLU = ""

    # 1 para PDCRMID, 0 para PDCR
    nido_PDCRMID = 1

    raffiPDCD = 0
    raffiPDCP = 0
    raffiPDCR = 0
    raffiPDCS = 0
    raffiTBLU = 0

    color_PDCD = "blue"
    color_PDCP = "blue"
    color_PDCR = "blue"
    color_PDCS = "blue"
    color_TBLU = "blue"

    keyboard_key = ""
    keyboard_value = False
    llave = False

    ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
    #nido_F96 = ""
    #raffiF96 = 0
    #color_F96 = "blue"
    ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############


    puertaA = ""
    puertaB = ""
    puertaC = ""

    cortina = ""

    plural = ""
    plural2 = ""

    modbusIO = ""
    modbusRA = ""
    modbusRB = ""

    missing = ""
    missingflag = {"FUSES": {
                "MISSING_ATOC10_A": False,  
                "MISSING_ATOC10_B": False,
                "MISSING_ATOC15": False,
                "MISSING_ATOC5_A": False,  
                "MISSING_ATOC5_B": False,
                "MISSING_ATO20": False,  
                "MISSING_ATO5_RB": False,
                "MISSING_ATO10": False,  
                "MISSING_ATO15_A": False,
                "MISSING_ATO15_B": False,  
                "MISSING_MAXI40_A": False,
                "MISSING_MAXI40_B": False,  
                "MISSING_MAXI50": False,
                "MISSING_REL112": False,  
                "MISSING_REL132": False,
                "MISSING_MINI15_A": False,  
                "MISSING_MINI15_B": False,
                "MISSING_MULTI5_A": False,  
                "MISSING_MULTI5_B": False,  
                "MISSING_MULTI7.5_A": False,  
                "MISSING_MULTI7.5_B": False,  
                "MISSING_ATO15": False,  
                "MISSING_ATO5_RA": False,
                "MISSING_MINI15": False}}

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.client = Client()

    def setup(self):
        try:
            self.client.on_connect = self.on_connect
            self.client.on_message = self.on_message
            self.client.connect(host = "127.0.0.1", port = 1883, keepalive = 60)
            self.client.loop_start()
        except Exception as ex:
            print("Manager MQTT client connection fail. Exception: ", ex)

    def stop (self):
        self.client.loop_stop()
        self.client.disconnect()
        
    def reset (self):
        self.stop()
        self.setup()

    def on_connect(self, client, userdata, flags, rc):
        try:
            connections = {
               "correct": True,
               "fails": "" 
               }
            for topic in self.model.sub_topics:
                client.subscribe(self.model.sub_topics[topic])
                if rc == 0:
                    print(f"Manager MQTT client connected to {topic} with code [{rc}]")
                else:
                    connections["correct"] = False
                    connection["fails"] += topic + "\n"
                    print("Manager MQTT client connection to " + topic + " fail, code [{}]".format(rc))
            if connections["correct"] == True:
               self.conn_ok.emit()
            else:
                print("Manager MQTT client connections fail:\n" + connection["fails"])
                self.conn_nok.emit()
        except Exception as ex:
            print("Manager MQTT client connection fail. Exception: ", ex)
            self.conn_nok.emit()


################################################################################
    #Revisa el estado de los fusibles (si hay o no) y actualiza el mensaje para rellenar fusibles
    def update_missingFuses(self,fuse):
        fuse = fuse.replace("MISSING_","")
        if "_RA" in fuse: # Fusible doble en Robot A
            if self.missingflag["FUSES"]["MISSING_" + fuse] == True:
                fuse = fuse.replace("_RA","")
                if (not fuse + " ROBOT A\n" in self.missing):
                    self.missing = self.missing + fuse + " ROBOT A\n"
            elif self.missingflag["FUSES"]["MISSING_" + fuse] == False:
                fuse = fuse.replace("_RA","")
                self.missing = self.missing.replace(fuse + " ROBOT A\n","")

        elif "_RB" in fuse: # Fusible doble en Robot B
            if self.missingflag["FUSES"]["MISSING_" + fuse] == True:
                fuse = fuse.replace("_RB","")
                if (not fuse + " ROBOT B\n" in self.missing):
                    self.missing = self.missing + fuse + " ROBOT B\n"
            elif self.missingflag["FUSES"]["MISSING_" + fuse] == False:
                fuse = fuse.replace("_RB","")
                self.missing = self.missing.replace(fuse + " ROBOT B\n","")

        elif "_A" in fuse: # Fusible doble
            fuse = fuse.replace("_A","")
            if self.missingflag["FUSES"]["MISSING_" + fuse + "_A"] == True or self.missingflag["FUSES"]["MISSING_" + fuse + "_B"] == True:
                if (not fuse + "\n" in self.missing):
                    self.missing = self.missing + fuse + "\n"
            elif self.missingflag["FUSES"]["MISSING_" + fuse + "_A"] == False and self.missingflag["FUSES"]["MISSING_" + fuse + "_B"] == False:
                self.missing = self.missing.replace(fuse + "\n","")

        elif "_B" in fuse: # Fusible doble
            fuse = fuse.replace("_B","")
            if self.missingflag["FUSES"]["MISSING_" + fuse + "_A"] == True or self.missingflag["FUSES"]["MISSING_" + fuse + "_B"] == True:
                if (not fuse + "\n" in self.missing):
                    self.missing = self.missing + fuse + "\n"
            elif self.missingflag["FUSES"]["MISSING_" + fuse + "_A"] == False and self.missingflag["FUSES"]["MISSING_" + fuse + "_B"] == False:
                self.missing = self.missing.replace(fuse + "\n","")

        else: # Fusible sencillo
            if self.missingflag["FUSES"]["MISSING_" + fuse] == True:
                if (not fuse+"\n" in self.missing):
                      self.missing = self.missing + fuse + "\n"
            elif self.missingflag["FUSES"]["MISSING_" + fuse] == False:
                self.missing = self.missing.replace(fuse + "\n","")

    
    def check_missingFuses(self, client, message):
        #Mensajes para prueba en GDI
        #PLC/1/status
        #{"MISSING_REL132":true,"MISSING_REL112":true,"MISSING_ATO10":true,"MISSING_ATO15":true,"MISSING_ATO20":true}
        #{"MISSING_REL132":false,"MISSING_REL112":false,"MISSING_ATO10":false,"MISSING_ATO15":false,"MISSING_ATO20":false}
        payload = json.loads(message.payload)
        payload_str = json.dumps(payload)
        if "MISSING" in payload_str:
            #se hace una copia de los fusibles actuales que presenten cambios fisicamente en mensajes mqtt desde la GDI
            #y se guardan en el diccionario self.missingflag, que es un atributo de la clase
            if "MISSING_ATOC10_A" in payload:
                self.missingflag["FUSES"]["MISSING_ATOC10_A"] = payload["MISSING_ATOC10_A"]
            if "MISSING_ATOC10_B" in payload:
                self.missingflag["FUSES"]["MISSING_ATOC10_B"] = payload["MISSING_ATOC10_B"]
            if "MISSING_ATOC15" in payload:
                self.missingflag["FUSES"]["MISSING_ATOC15"] = payload["MISSING_ATOC15"]
            if "MISSING_ATOC5_A" in payload:
                self.missingflag["FUSES"]["MISSING_ATOC5_A"] = payload["MISSING_ATOC5_A"]
            if "MISSING_ATOC5_B" in payload:
                self.missingflag["FUSES"]["MISSING_ATOC5_B"] = payload["MISSING_ATOC5_B"]
            if "MISSING_ATO20" in payload:
                self.missingflag["FUSES"]["MISSING_ATO20"] = payload["MISSING_ATO20"]
            if "MISSING_ATO5_RB" in payload:
                self.missingflag["FUSES"]["MISSING_ATO5_RB"] = payload["MISSING_ATO5_RB"]
            if "MISSING_ATO10" in payload:
                self.missingflag["FUSES"]["MISSING_ATO10"] = payload["MISSING_ATO10"]
            if "MISSING_ATO15_A" in payload:
                self.missingflag["FUSES"]["MISSING_ATO15_A"] = payload["MISSING_ATO15_A"]
            if "MISSING_ATO15_B" in payload:
                self.missingflag["FUSES"]["MISSING_ATO15_B"] = payload["MISSING_ATO15_B"]
            if "MISSING_MAXI40_A" in payload:
                self.missingflag["FUSES"]["MISSING_MAXI40_A"] = payload["MISSING_MAXI40_A"]
            if "MISSING_MAXI40_B" in payload:
                self.missingflag["FUSES"]["MISSING_MAXI40_B"] = payload["MISSING_MAXI40_B"]
            if "MISSING_MAXI50" in payload:
                self.missingflag["FUSES"]["MISSING_MAXI50"] = payload["MISSING_MAXI50"]
            if "MISSING_REL112" in payload:
                self.missingflag["FUSES"]["MISSING_REL112"] = payload["MISSING_REL112"]
            if "MISSING_REL132" in payload:
                self.missingflag["FUSES"]["MISSING_REL132"] = payload["MISSING_REL132"]
            if "MISSING_MINI15_A" in payload:
                self.missingflag["FUSES"]["MISSING_MINI15_A"] = payload["MISSING_MINI15_A"]
            if "MISSING_MINI15_B" in payload:
                self.missingflag["FUSES"]["MISSING_MINI15_B"] = payload["MISSING_MINI15_B"]
            if "MISSING_MULTI5_A" in payload:
                self.missingflag["FUSES"]["MISSING_MULTI5_A"] = payload["MISSING_MULTI5_A"]
            if "MISSING_MULTI5_B" in payload:
                self.missingflag["FUSES"]["MISSING_MULTI5_B"] = payload["MISSING_MULTI5_B"]
            if "MISSING_MULTI7.5_A" in payload:
                self.missingflag["FUSES"]["MISSING_MULTI7.5_A"] = payload["MISSING_MULTI7.5_A"]
            if "MISSING_MULTI7.5_B" in payload:
                self.missingflag["FUSES"]["MISSING_MULTI7.5_B"] = payload["MISSING_MULTI7.5_B"]
            if "MISSING_ATO15" in payload:
                self.missingflag["FUSES"]["MISSING_ATO15"] = payload["MISSING_ATO15"]
            if "MISSING_ATO5_RA" in payload:
                self.missingflag["FUSES"]["MISSING_ATO5_RA"] = payload["MISSING_ATO5_RA"]
            if "MISSING_MINI15" in payload:
                self.missingflag["FUSES"]["MISSING_MINI15"] = payload["MISSING_MINI15"]
            # Diccionario actualizado
            #for i in self.missingflag["FUSES"]:
            #    print(i + "\t\t" + str(self.missingflag["FUSES"][i]))


            #recorrido para saber si no faltan fusibles
            contadormiss = 0
            self.missing = ""   # Se resetea el mensaje para evitar sobreescritura de mensajes no deseados
            for i in self.missingflag["FUSES"]: #i toma el valor de las llave del diccionario missingflag (i es el nombre de los fusibles)
                    revisarmiss = self.missingflag["FUSES"][i] #Valor booleano correspondiente
                    
                    if revisarmiss == True:
                        contadormiss += 1
                        if contadormiss < 6:   # Numero maximo de fusibles a imprimir (5 fusibles)
                            self.update_missingFuses(i)
                        
                        command = {"lbl_info2" : {"text": f"RELLENAR FUSIBLES: \n {self.missing}", "color": "red"} }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)          
                    elif revisarmiss == False:
                        if contadormiss == 0:
                            command = { "lbl_info2" : {"text": "", "color": "orange"} }
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        self.update_missingFuses(i)

            print("\n\n" + self.missing)
            #print("CONTADOR::::::::::: ", contadormiss)
            
    def reiniciar_robots(self):
                        print("Encendiendo Robots")
                        self.client.publish(self.model.pub_topics["plc"],json.dumps({"RobotsOFF": False}), qos = 2)
                        print("RobotsOFF : False")
                        command ={
                            "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "purple"}
                             }
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

    def robots_home(self):
        command ={
                "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "purple"}
                    }
        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

    def thread_triggers_off(self):
        self.model.init_thread_robot        = False
        self.model.retry_thread_robot       = False
        self.model.set_thread_robot         = False
        self.model.trigger_thread_robot     = False
        self.model.loaded_thread_robot      = False
        self.model.inserted_thread_robot    = False
        self.model.error_thread_robot       = False
        self.model.limite_reintentos_thread = False
        self.model.llave_thread             = False

################################################################################
    #se ejecuta cada que entra un mensaje MQTT nuevo (secuencial pero pueden llegar al mismo tiempo)
    def on_message(self, client, userdata, message): 
        try:
            payload = json.loads(message.payload) #se define el mensaje MQTT como un json, 
            #message es un objeto naturalmente dentro del mensaje MQTT de la librería PahoMQTT
            #payload es un diccionario, json.loads te permite convertir el arreglo de bits que recibes a un diccionario
            #print message.payload te imprimiría un binario o algo así (aunque phyton lo interpretaría por ser python)
            print ("   " + message.topic + " ", payload) #payload puede ser string, arreglo de bits, jason etc...
            # "  " solo son espacios para poder distinguir mejor en la terminal (una sangría)
            #payload: carga del apartado mensaje, el contenido que trae el mensaje que puede ser de diferentes maneras
            if message.topic == self.model.sub_topics["plc"]:
                if "emergency" in payload:
                    self.model.plc["emergency"] = payload["emergency"]
                    #"llave" plc, llave emergency
                    #cambias el "valor" de la llave de tu modelo, por el valor de la llave que leíste en el json
                    #siempre se trata a los diccionarios como pares "llave-valor"
                    if payload["emergency"] == False:
                        self.emergency.emit()
                        #emit puede verse como un refresh a donde está la conexión (bandera que avisa que pasó algo)

                        #estos emit están ligados gracias a  "emergency   =   pyqtSignal()", entonces 
                        #al emitir una señal, otros objetos en el programa pueden visualizar estas modificaciones

                        command = { #creas un diccionario command, con un valor string
                            "popOut":"Paro de emergencia activado"
                            }                       
                        #mandas un mensaje MQTT al topico self.model.pub_topics["gui"]
                        #que podría ser simplemente un string tal que... "plc/1/etc/gui"
                        #,json.dumps(command) es para convertir el diccionario en json,
                        #porque json es un string y requiere de cierto formato por eso dumps
                        #qos 0,1 o 2, Calidad de la comunicación (PahoMQTT - 0 manda y no le interesa si lo recibieron 
                        #quienes están suscritos, 1 quiere decir que espera que el broker le conteste al cliente y le diga
                        #que lo mandó a los suscritos, 2 te aseguras que llegue a brokker y los otros clientes que 
                        #recibieron el mensaje contestan que lo recibieron, 2 garantizar que llegó, y se reintenta
                        #y si no marca un error.

                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                        #QTimer, cuentan ciclos de ejecución (se ejecuta en el mismo hilo)

                        #Timer, dealy, espera cierto tiempo (abre hilo en paralelo)
                        #y luego ejecuta (objeto de python están más chidos)
                        Timer(0.05, self.model.log, args = ("STOP",)).start()

                        #esperar 0.05 segundos , luego llamar al metodo log del modelo "callback",
                        #luego los argumentos que te llevas al método, y el start para que inicie esto

                    else:
                        self.closePopout()
                        self.recovery.emit()
                        Timer(0.05, self.model.log, args = (last_log,)).start()

            if self.model.plc["emergency"] == False:
                return # return PARA QUE YA NO SE EJECUTE NADA SI PRESIONASTE EL STOP 
                       # que se encuentra dentro del topico del PLC

            if message.topic == self.model.sub_topics["plc"]:

                #if "key" in payload:
                #    if payload["key"] == True:
                #        self.key.emit()

                if "key" in payload:
                    if payload["key"] == True:
                        # si la variable es True, quiere decir que ya pasaron varios reintentos y se requiere llave de calidad para continua
                        if self.model.fusible_manual == True:

                            if self.model.waiting_key_thread == True:
                                self.thread_triggers_off()
                                self.model.llave_thread = True
                            else:
                                self.key.emit()
                                
                            
                        # si la variable es False, quiere decir que estás en otra parte del proceso y la llave reiniciará el ciclo
                        elif self.model.fusible_manual == False:
                            command = {"popOut":"¿Seguro que desea dar llave?\n Presione Esc. para salir, Enter para continuar..."}
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                            #variable de la clase MQTT para habilitar las funciones del teclado
                            self.llave = True

                if "start" in payload:
                    if payload["start"] == True:
                        self.start.emit()

                if "retry_btn" in payload:
                    self.model.plc["retry_btn"] = bool(payload["retry_btn"])
                    if payload["retry_btn"] == True:
                        self.thread_triggers_off()
                        self.model.retry_thread_robot = True
                        print("self.model.retry_thread_robot: ",self.model.retry_thread_robot)
                        self.retry_btn.emit()
                #se crea una lista en self.model.plc["clamps"] donde se van agregando o
                #quitando elementos para saber si en ese momento están o no clampeadas las cajas
                for i in list(payload):
                    if "clamp_" in i:
                        box = i[6:]
                        #esto es porque clamp_PDC-R en GDI aplica para R y RMID
                        if self.model.pdcr_mid and box == "PDC-R":
                            box = "PDC-RMID"
                        #si el valor de la llave es true, por ejemplo "clamp_PDC-D" = true
                        if payload[i] == True:
                            #si aún no se agrega, agregar caja a la lista de cajas clampeadas correctamente
                            if not(box in self.model.plc["clamps"]):
                                #instrucción para agregar esa caja a la lista de cajas ya clampeadas
                                self.model.plc["clamps"].append(box)
                                #emitir la señal de que se acacaba de agregar caja, o sea que se clampeo una correctamente
                                self.clamp.emit() 
                        else:
                            if box in self.model.plc["clamps"]:
                                #.pop para quitar elementos de una lista
                                #.index(box) te dice cuál elemento de la lista es el que equivale a box
                                # por ejemplo si box = PDC-P, entonces en la lista [PDC-D,PDCP,...] sabes que
                                # el indice sería el número 1 (PDC-D es el número 0)
                                self.model.plc["clamps"].pop(self.model.plc["clamps"].index(box))


                if "start" in payload:
                    if payload["start"] == True:
                        self.start.emit()
                
                if "error" in payload:              # Esta línea nunca entra, ya que solo entraría a
                                                    # una etiqueta específica llamada "error" en el plc
                    print("entro en error avisado por el plc")
                    #self.model.plc["error"] = payload["error"]
                    #self.error.emit()

                ##############################################################################################
                payload_str = json.dumps(payload)       # convertir diccionario payload a string y guardarlo

                if "raffi_PDCD" in payload_str:
                    if payload["raffi_PDCD"] == True:   # si se presiona el raffi
                        if self.raffiPDCD == 1:         # si el valor guardado era 1
                            self.raffiPDCD = 0          # se actualiza raffi a 0
                        elif self.raffiPDCD == 0:       # si el valor guardado era 0
                            self.raffiPDCD = 1          # se actualiza raffi a 1

                if "raffi_PDCP" in payload_str:
                    if payload["raffi_PDCP"] == True:
                        if self.raffiPDCP == 1:
                            self.raffiPDCP = 0
                        elif self.raffiPDCP == 0:
                            self.raffiPDCP = 1

                if "raffi_PDCR" in payload_str:
                    if payload["raffi_PDCR"] == True:
                        if self.raffiPDCR == 1:
                            self.raffiPDCR = 0
                        elif self.raffiPDCR == 0:
                            self.raffiPDCR = 1

                if "raffi_PDCS" in payload_str:
                    if payload["raffi_PDCS"] == True:
                        if self.raffiPDCS == 1:
                            self.raffiPDCS = 0
                        elif self.raffiPDCS == 0:
                            self.raffiPDCS = 1

                if "raffi_TBLU" in payload_str:
                    if payload["raffi_TBLU"] == True:
                        if self.raffiTBLU == 1:
                            self.raffiTBLU = 0
                        elif self.raffiTBLU == 0:
                            self.raffiTBLU = 1
                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
                #if "raffi_F96" in payload_str:
                #    if payload["raffi_F96"] == True:
                #        if self.raffiF96 == 1:
                #            self.raffiF96 = 0
                #        elif self.raffiF96 == 0:
                #            self.raffiF96 = 1
                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############

                #if "PDC-D" or "raffi_PDCD" in payload_str: #(or para busqueda de palabras)
                if "PDC-D" in payload_str: #busca en el string PDC-D
                    if "PDC-D" in payload:
                        if payload["PDC-D"] == True:
                            self.nido_PDCD = "PDC-D:\n Habilitada"
                            self.color_PDCD = "blue"
                            self.raffiPDCD = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["PDC-D"] == False:
                            self.nido_PDCD = ""
                            self.color_PDCD = "blue"
                            self.raffiPDCD = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-D_ERROR" in payload:
                        if payload["PDC-D_ERROR"] == True:
                            self.nido_PDCD = "PDC-D:\n clampeo incorrecto"
                            self.color_PDCD = "red"
                    if "clamp_PDC-D" in payload:
                        if payload["clamp_PDC-D"] == True:
                            self.nido_PDCD = "PDC-D:\n clampeo correcto"
                            self.color_PDCD = "green"
                            self.raffiPDCD = 0 # se reinicia el raffi a 0 (desactivado)

                    if "PDC-D" in self.nido_PDCD: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCD == 1:
                            self.nido_PDCD = "PDC-D:\n raffi activado"
                            self.color_PDCD = "orange"

                    command = {
                                "lbl_box1" : {"text": f"{self.nido_PDCD}", "color": f"{self.color_PDCD}"}
                                #,"lbl_box6" : {"text": f"RAFFI: {self.raffiPDCD}", "color": "black"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-P" in payload_str:
                    if "PDC-P" in payload:
                        if payload["PDC-P"] == True:
                            self.nido_PDCP = "PDC-P:\n Habilitada"
                            self.color_PDCP = "blue"
                            self.raffiPDCP = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["PDC-P"] == False:
                            self.nido_PDCP = ""
                            self.color_PDCP = "blue"
                            self.raffiPDCP = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-P_ERROR" in payload:
                        if payload["PDC-P_ERROR"] == True:
                            self.nido_PDCP = "PDC-P:\n clampeo incorrecto"
                            self.color_PDCP = "red"
                    if "clamp_PDC-P" in payload:
                        if payload["clamp_PDC-P"] == True:
                            self.nido_PDCP = "PDC-P:\n clampeo correcto"
                            self.color_PDCP = "green"
                            self.raffiPDCP = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-P" in self.nido_PDCP: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCP == 1:
                            self.nido_PDCP = "PDC-P:\n raffi activado"
                            self.color_PDCP = "orange"

                    command = {
                                "lbl_box2" : {"text": f"{self.nido_PDCP}", "color": f"{self.color_PDCP}"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-R" in payload_str:
                    if "PDC-R" in payload:
                        self.nido_PDCRMID = 0
                        if payload["PDC-R"] == True:
                            self.nido_PDCR = "PDC-R:\n Habilitada"
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                        if payload["PDC-R"] == False:
                            self.nido_PDCR = ""
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                    if "PDC-RMID" in payload:
                        self.nido_PDCRMID = 1
                        if payload["PDC-RMID"] == True:
                            self.nido_PDCR = "PDC-RMID:\n Habilitada"
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                        if payload["PDC-RMID"] == False:
                            self.nido_PDCR = ""
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                    if "PDC-R_ERROR" in payload:
                        if payload["PDC-R_ERROR"] == True:
                            self.color_PDCR = "red"
                            if self.nido_PDCRMID == 0:
                                self.nido_PDCR = "PDC-R:\n clampeo incorrecto"
                            elif self.nido_PDCRMID == 1:
                                self.nido_PDCR = "PDC-RMID:\n clampeo incorrecto"
                    if "clamp_PDC-R" in payload:
                        if payload["clamp_PDC-R"] == True:
                            self.color_PDCR = "green"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)
                            if self.nido_PDCRMID == 0:
                                self.nido_PDCR = "PDC-R:\n clampeo correcto"
                            elif self.nido_PDCRMID == 1:
                                self.nido_PDCR = "PDC-RMID:\n clampeo correcto"
                    if "PDC-R" in self.nido_PDCR: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCR == 1:
                            if self.nido_PDCRMID == 0:
                                self.nido_PDCR = "PDC-R:\n raffi activado"
                            elif self.nido_PDCRMID == 1:
                                self.nido_PDCR = "PDC-RMID:\n raffi activado"
                            self.color_PDCR = "orange"       

                    command = {
                              "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"}
                            }

                    #buscar el F96 en cualquiera de las 3 cajas posibles de PDC-R
                    if "F96" in self.model.database["fuses"]["PDC-RS"]:
                        if self.model.database["fuses"]["PDC-RS"]["F96"] != "empty":
                                    print("MODELO DE FUSIBLES EN COMM: ",self.model.database["fuses"])
                                    print("PDC-RS SI LLEVA EL NUEVO CONECTOR")
                                    command = {
                                                "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"},
                                                "lbl_box7" : {"text": "F96: Si Aplica", "color": "purple"}
                                              }

                    if "F96" in self.model.database["fuses"]["PDC-RMID"]:
                        if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                                    print("MODELO DE FUSIBLES EN COMM: ",self.model.database["fuses"])
                                    print("PDC-RMID SI LLEVA EL NUEVO CONECTOR")
                                    command = {
                                                "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"},
                                                "lbl_box7" : {"text": "F96: Si Aplica", "color": "purple"}
                                              }

                    if "F96" in self.model.database["fuses"]["PDC-R"]:
                        if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                                    print("MODELO DE FUSIBLES EN COMM: ",self.model.database["fuses"])
                                    print("PDC-R SI LLEVA EL NUEVO CONECTOR")
                                    command = {
                                                "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"},
                                                "lbl_box7" : {"text": "F96: Si Aplica", "color": "purple"}
                                              }
                    print("command: ")
                    print(command)
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    if self.nido_PDCR == "":
                        command = {"lbl_box7" : {"text": "", "color": "blue"}}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                
                if "PDC-S" in payload_str:
                    if "PDC-S" in payload:
                        if payload["PDC-S"] == True:
                            self.nido_PDCS = "PDC-S:\n Habilitada"
                            self.color_PDCS = "blue"
                            self.raffiPDCS = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["PDC-S"] == False:
                            self.nido_PDCS = ""
                            self.color_PDCS = "blue"
                            self.raffiPDCS = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-S_ERROR" in payload:
                        if payload["PDC-S_ERROR"] == True:
                            self.nido_PDCS = "PDC-S:\n clampeo incorrecto"
                            self.color_PDCS = "red"
                    if "clamp_PDC-S" in payload:
                        if payload["clamp_PDC-S"] == True:
                            self.nido_PDCS = "PDC-S:\n clampeo correcto"
                            self.color_PDCS = "green"
                            self.raffiPDCS = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-S" in self.nido_PDCS: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCS == 1:
                            self.nido_PDCS = "PDC-S:\n raffi activado"
                            self.color_PDCS = "orange"

                    command = {
                                "lbl_box4" : {"text": f"{self.nido_PDCS}", "color": f"{self.color_PDCS}"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "TBLU" in payload_str:
                    if "TBLU" in payload:
                        if payload["TBLU"] == True:
                            self.nido_TBLU = "TBLU:\n Habilitada"
                            self.color_TBLU = "blue"
                            self.raffiTBLU = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["TBLU"] == False:
                            self.nido_TBLU = ""
                            self.color_TBLU = "blue"
                            self.raffiTBLU = 0 # se reinicia el raffi a 0 (desactivado)
                    if "TBLU_ERROR" in payload:
                        if payload["TBLU_ERROR"] == True:
                            self.nido_TBLU = "TBLU:\n clampeo incorrecto"
                            self.color_TBLU = "red"
                    if "clamp_TBLU" in payload:
                        if payload["clamp_TBLU"] == True:
                            self.nido_TBLU = "TBLU:\n clampeo correcto"
                            self.color_TBLU = "green"
                            self.raffiTBLU = 0 # se reinicia el raffi a 0 (desactivado)
                    if "TBLU" in self.nido_TBLU: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiTBLU == 1:
                            self.nido_TBLU = "TBLU:\n raffi activado"
                            self.color_TBLU = "orange"

                    command = {
                                "lbl_box5" : {"text": f"{self.nido_TBLU}", "color": f"{self.color_TBLU}"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
                #if "F96" in payload_str:
                #    if "F96" in payload:
                #        if payload["F96"] == True:
                #            self.nido_F96 = "F96:\n Habilitada"
                #            self.color_F96 = "blue"
                #            self.raffiF96 = 0 # se reinicia el raffi a 0 (desactivado)
                #        if payload["F96"] == False:
                #            self.nido_F96 = ""
                #            self.color_F96 = "blue"
                #            self.raffiF96 = 0 # se reinicia el raffi a 0 (desactivado)
                #    if "F96_ERROR" in payload:
                #        if payload["F96_ERROR"] == True:
                #            self.nido_F96 = "F96:\n clampeo incorrecto"
                #            self.color_F96 = "red"
                #    if "clamp_F96" in payload:
                #        if payload["clamp_F96"] == True:
                #            self.nido_F96 = "F96:\n clampeo correcto"
                #            self.color_F96 = "green"
                #            self.raffiF96 = 0 # se reinicia el raffi a 0 (desactivado)
                #    if "F96" in self.nido_F96: # si nido esta habilitado, correcto o incorrecto
                #        if self.raffiF96 == 1:
                #            self.nido_F96 = "F96:\n raffi activado"
                #            self.color_F96 = "orange"
                #
                #    command = {
                #                "lbl_box5" : {"text": f"{self.nido_F96}", "color": f"{self.color_F96}"}
                #              }
                #    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
                
                if "ERROR" in payload_str:
                    if "ERROR_cortina" in payload: # para payload, tiene que ser exactamente la llave del diccionario
                        if payload["ERROR_cortina"] == True:
                            self.cortina = "CORTINA \n INTERRUMPIDA"
                        if payload["ERROR_cortina"] == False:
                            self.cortina = ""
                    if "ERROR_modbusIO" in payload:
                        if payload["ERROR_modbusIO"] == True:
                            self.modbusIO = "\n Remote IO"
                        if payload["ERROR_modbusIO"] == False:
                            self.modbusIO = ""
                    if "ERROR_modbusRA" in payload:
                        if payload["ERROR_modbusRA"] == True:
                            self.modbusRA = "\n Robot A"
                        if payload["ERROR_modbusRA"] == False:
                            self.modbusRA = ""
                    if "ERROR_modbusRB" in payload:
                        if payload["ERROR_modbusRB"] == True:
                            self.modbusRB = "\n Robot B"
                        if payload["ERROR_modbusRB"] == False:
                            self.modbusRB = ""

                    if self.modbusIO == "\n Remote IO" and self.modbusRA == "\n Robot A":
                        self.plural2 = "ES"
                    elif self.modbusIO == "\n Remote IO" and self.modbusRB == "\n Robot B":
                        self.plural2 = "ES"
                    elif self.modbusRA == "\n Robot A" and self.modbusRB == "\n Robot B":
                        self.plural2 = "ES"
                    else:
                        self.plural2 = ""

                if "INTERLOCK" in payload_str:              
                    if "INTERLOCK_A" in payload:
                        if payload["INTERLOCK_A"] == True:
                            self.puertaA = "\nA"
                        if payload["INTERLOCK_A"] == False:
                            self.puertaA = ""
                    if "INTERLOCK_B" in payload:
                        if payload["INTERLOCK_B"] == True:
                            self.puertaB = "\nB"
                        if payload["INTERLOCK_B"] == False:
                            self.puertaB = ""
                    if "INTERLOCK_C" in payload:
                        if payload["INTERLOCK_C"] == True:
                            self.puertaC = "\nC"
                        if payload["INTERLOCK_C"] == False:
                            self.puertaC = ""
                    
                    if self.puertaA == "\nA" and self.puertaB == "\nB":
                        self.plural = "S"
                    elif self.puertaA == "\nA" and self.puertaC == "\nC":
                        self.plural = "S"
                    elif self.puertaB == "\nB" and self.puertaC == "\nC":
                        self.plural = "S"
                    else:
                        self.plural = ""

                if self.puertaA == "" and self.puertaB == "" and self.puertaC == "":
                    if self.modbusIO == "" and self.modbusRA == "" and self.modbusRB == "":
                        command = {"lbl_info4" : {"text": f"{self.cortina}", "color": "red"}}
                    else:
                        command = {"lbl_info4" : {"text": f"{self.cortina} \n \n ERROR{self.plural2} MODBUS: {self.modbusIO} {self.modbusRA} {self.modbusRB}", "color": "red"}}
                else:
                    if self.modbusIO == "" and self.modbusRA == "" and self.modbusRB == "":
                        command = {"lbl_info4" : {"text": f"{self.cortina} \n \n PUERTA{self.plural} \n ABIERTA{self.plural}: {self.puertaA} {self.puertaB} {self.puertaC}", "color": "red"}}
                    else:
                        command = {"lbl_info4" : {"text": f"{self.cortina} \n \n ERROR MODBUS: {self.modbusIO} {self.modbusRA} {self.modbusRB} \n \n PUERTA{self.plural} \n ABIERTA{self.plural}: {self.puertaA} {self.puertaB} {self.puertaC}", "color": "red"}}
                self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                # Revisar si faltan fusibles en los feeders lineales
                self.check_missingFuses(client, message)
            ##############################################################################################
            if message.topic == self.model.sub_topics["keyboard"]:
                #ejemplo de mensaje: { "keyboard_E" : true }
                payload_str = json.dumps(payload)       # convertir diccionario payload a string y guardarlo
                payload_str = payload_str.replace("{","")
                payload_str = payload_str.replace("}","")
                payload_str = payload_str.replace('"',"")
                payload_str = payload_str.replace("true","True")
                payload_str = payload_str.replace("false","False")
                payload_str = payload_str.replace(" ","")
                separate_msj = payload_str.rsplit(":")

                self.keyboard_key = separate_msj[0]
                self.keyboard_value = eval(separate_msj[1])

                #print("key: ",self.keyboard_key)
                #print("value: ",self.keyboard_value)

                if self.llave == True:

                    if self.keyboard_key == "keyboard_esc":
                        command = {"popOut":"close"}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        print("key no emit")
                    elif self.keyboard_key == "keyboard_enter":
                        command = {"popOut":"close"}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        self.key.emit()
                        self.thread_triggers_off()
                        print("key emit")
                    else:
                        command = {"popOut":"Mensaje no recibido, gire la llave nuevamente"}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)


                    self.llave = False

                if self.keyboard_key == "keyboard_F1":
                    print("Enviando robot a Home")
                    command ={
                            "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "green"}
                             }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    self.client.publish(self.model.pub_topics["robot_a"],json.dumps({"command": "stop"}), qos = 2)
                    sleep(0.1)
                    self.client.publish(self.model.pub_topics["robot_b"],json.dumps({"command": "stop"}), qos = 2)
                    sleep(0.4)
                    self.client.publish(self.model.pub_topics["robot_a"],json.dumps({"command": "start"}), qos = 2)
                    sleep(0.1)
                    self.client.publish(self.model.pub_topics["robot_b"],json.dumps({"command": "start"}), qos = 2)
                    
                    #este ultimo es para finalizar el programa y no se quede en ejecución
                    sleep(0.1)
                    self.client.publish(self.model.pub_topics["robot_a"],json.dumps({"trigger": "HOME"}), qos = 2)
                    sleep(0.1)
                    self.client.publish(self.model.pub_topics["robot_b"],json.dumps({"trigger": "HOME"}), qos = 2)

                    Timer(1.5, self.robots_home).start()
                    

                if self.keyboard_key == "keyboard_F12":
                    command ={
                            "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "green"}
                             }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    print("Apagando Robots")
                    self.client.publish(self.model.pub_topics["plc"],json.dumps({"RobotsOFF": True}), qos = 2)
                    print("RobotsOFF : True")

                    Timer(10, self.reiniciar_robots).start()

                if self.keyboard_key == "keyboard_F4":
                    self.model.robots_mode = 1
                    self.F4.emit()

                if self.keyboard_key == "keyboard_F5":
                    self.model.robots_mode = 2
                    self.F5.emit()
                

            if message.topic == self.model.sub_topics["gui"]:
                if "request" in payload:
                    self.model.gui["request"] = payload["request"]
                    if payload["request"] == "login":
                        self.login.emit()
                    elif payload["request"] == "logout":
                        self.logout.emit()
                    elif payload["request"] == "config":
                        self.config.emit()
                if "ID" in payload:
                    self.model.gui["ID"] = payload["ID"].upper()
                    self.ID.emit()
                if "code" in payload:
                    self.model.gui["code"] = payload["code"].upper()
                    self.code.emit()
                if "visible" in payload:
                    self.model.gui["visible"] = payload["visible"]
                    self.visible.emit()

            if message.topic == self.model.sub_topics["config"]:
                if "finish" in payload:
                    if payload["finish"] == True:
                        self.config_ok.emit()
                if "shutdown" in payload:
                    if payload["shutdown"] == True:
                        self.model.shutdown = True 

            if message.topic == self.model.sub_topics["robot_a"]:
                ###############################################################
                payload_str = json.dumps(payload) 
                if self.model.robothome_a == True:
                            self.ra_home = "ESPERE ROBOT A"
                            command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                if "HOME" in payload_str:
                    self.ra_home = ""
                    command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    #hacer false variable para esperar el true y mostrar el mensaje cuando se envíe a home
                    self.model.robothome_a = False
                ###############################################################

                if "response" in payload:
                    if type(payload["response"]) is str:
                        self.model.robots["robot_a"]["pose"] = payload["response"]
                        self.pose.emit()
                        if "LOADED" in payload["response"]:
                            if self.model.current_thread_robot == "robot_a":
                                self.model.loaded_thread_robot = True
                            else:
                                self.loaded.emit()
                        if "INSERTED" in payload["response"]:
                            if self.model.current_thread_robot == "robot_a":
                                self.model.inserted_thread_robot = True
                            else:
                                self.inserted.emit()
                        if "READY" in payload["response"]:
                            self.model.robots["robot_a"]["ready"] = True
                            if self.model.current_thread_robot == "robot_a":
                                self.model.set_thread_robot = True
                            else:
                                self.ready.emit()
                        if "ERROR" in payload["response"]:
                            self.model.robots["robot_a"]["error"] = payload["response"].rsplit("_",1)[1]
                            if self.model.current_thread_robot == "robot_a":
                                self.thread_triggers_off()
                                self.model.error_thread_robot = True
                            else:
                                self.error.emit()

            if message.topic == self.model.sub_topics["robot_b"]:
                ###############################################################
                payload_str = json.dumps(payload) 
                if self.model.robothome_b == True:
                            self.rb_home = "\n ESPERE ROBOT B"
                            command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                if "HOME" in payload_str:
                    self.rb_home = ""
                    command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    #hacer false variable para esperar el true y mostrar el mensaje cuando se envíe a home
                    self.model.robothome_b = False
                ###############################################################
                if "response" in payload:
                    if type(payload["response"]) is str:
                        self.model.robots["robot_b"]["pose"] = payload["response"]
                        self.pose.emit()
                        if "LOADED" in payload["response"]:
                            if self.model.current_thread_robot == "robot_b":
                                self.model.loaded_thread_robot = True
                            else:
                                self.loaded.emit()
                        if "INSERTED" in payload["response"]:
                            if self.model.current_thread_robot == "robot_b":
                                self.model.inserted_thread_robot = True
                            else:
                                self.inserted.emit()
                        if "READY" in payload["response"]:
                            self.model.robots["robot_b"]["ready"] = True
                            if self.model.current_thread_robot == "robot_b":
                                self.model.set_thread_robot = True
                            else:
                                self.ready.emit()
                        if "ERROR" in payload["response"]:
                            self.model.robots["robot_b"]["error"] = payload["response"].rsplit("_",1)[1]
                            if self.model.current_thread_robot == "robot_b":
                                self.model.error_thread_robot = True
                                sleep(0.3)
                                self.thread_triggers_off()
                            else:
                                self.error.emit()

        except Exception as ex:
            print("input exception", ex)

    def closePopout (self):
        command = {
            "popOut":"close"
            }
        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    from controller.model import model
    import sys
    app = QApplication(sys.argv)
    model = model.manager()
    client = mqttClient(model)
    sys.exit(app.exec_())

