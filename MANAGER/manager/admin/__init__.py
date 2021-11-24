from PyQt5.QtWidgets import QDialog, QMessageBox
from PyQt5.QtCore import pyqtSignal, QTimer, QObject, Qt
from paho.mqtt.client import Client
from pickle import load, dump
from os.path import exists
from cv2 import imwrite
from os import system
import json

from admin import admin

class Admin (QDialog):
    rcv     = pyqtSignal(dict)

    def __init__(self, data):
        self.data = data
        super().__init__(data.mainWindow)
        self.ui = admin.Ui_admin()
        self.ui.setupUi(self)
        self.user_type = self.data.local_data["user"]["type"]
        self.client = Client()
        self.config = {}
        self.kiosk_mode = True
        self.torques = False

        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        QTimer.singleShot(100, self.startClient)

        if self.data.config_data["untwist"]:
            self.ui.checkBox_4.setChecked(True)
        else:
            self.ui.checkBox_4.setChecked(False)
        if self.data.config_data["flexible_mode"]:
            self.ui.checkBox_5.setChecked(True)
        else:
            self.ui.checkBox_5.setChecked(False)
        if self.data.config_data["backward"]:
            self.ui.checkBox_6.setChecked(True)
        else:
            self.ui.checkBox_6.setChecked(False)


        self.ui.btn_torque.clicked.connect(self.manualTorque)
        self.ui.btn_reset.clicked.connect(self.resetMachine)
        self.ui.btn_off.clicked.connect(self.poweroff)

        self.ui.checkBox_1.stateChanged.connect(self.onClicked_1)
        self.ui.checkBox_2.stateChanged.connect(self.onClicked_2)
        self.ui.checkBox_3.stateChanged.connect(self.onClicked_3)
        self.ui.checkBox_4.stateChanged.connect(self.onClicked_4)
        self.ui.checkBox_5.stateChanged.connect(self.onClicked_5)
        self.ui.checkBox_6.stateChanged.connect(self.onClicked_6)

        self.data.transitions.torque_bw.connect(self.torqueUpdate)

        
        self.permissions()

####################### Show widget with corresponding permissions ########################

    def permissions (self):
        if self.user_type == "AMTC":
            self.ui.btn_off.setEnabled(True)
            self.ui.btn_reset.setEnabled(True)
            self.ui.btn_torque.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(True)
            self.ui.checkBox_3.setEnabled(True)
            self.ui.checkBox_4.setEnabled(True)
            self.ui.checkBox_5.setEnabled(True)
            self.ui.checkBox_6.setEnabled(True)
        elif self.user_type == "CALIDAD":
            self.ui.btn_off.setEnabled(False)
            self.ui.btn_reset.setEnabled(False)
            self.ui.btn_torque.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
            self.ui.checkBox_4.setEnabled(True)
            self.ui.checkBox_5.setEnabled(True)
            self.ui.checkBox_6.setEnabled(True)
        elif self.user_type == "MANTENIMIENTO":
            self.ui.btn_off.setEnabled(True)
            self.ui.btn_reset.setEnabled(True)
            self.ui.btn_torque.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(True)
            self.ui.checkBox_3.setEnabled(True)
            self.ui.checkBox_4.setEnabled(False)
            self.ui.checkBox_5.setEnabled(False)
            self.ui.checkBox_6.setEnabled(True)
        elif self.user_type == "PRODUCCION":
            self.ui.btn_off.setEnabled(False)
            self.ui.btn_reset.setEnabled(False)
            self.ui.btn_torque.setEnabled(False)
            self.ui.checkBox_1.setEnabled(False)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
            self.ui.checkBox_4.setEnabled(False)
            self.ui.checkBox_5.setEnabled(False)
            self.ui.checkBox_6.setEnabled(False)
        elif self.user_type == "OPERADOR":
            self.ui.btn_off.setEnabled(False)
            self.ui.btn_reset.setEnabled(False)
            self.ui.btn_torque.setEnabled(False)
            self.ui.checkBox_1.setEnabled(False)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
            self.ui.checkBox_4.setEnabled(False)
            self.ui.checkBox_5.setEnabled(False)
            self.ui.checkBox_6.setEnabled(False)
        self.show()

###################################### MQTT Client ########################################

    def startClient(self):
        try:
            self.client.connect(host = "127.0.0.1", port = 1883, keepalive = 60)
            self.client.loop_start()
        except Exception as ex:
            print("Admin MQTT client connection fail. Exception:\n", ex.args)

    def stopClient (self):
        self.client.loop_stop()
        self.client.disconnect()
        
    def resetClient (self):
        self.stop()
        self.start()

    def on_connect(self, client, userdata, flags, rc):
        client.subscribe("#")
        print("Admin MQTT client connected with code [{}]".format(rc))

    def on_message(self, client, userdata, message):
        try:
            dic = {
                "topic": message.topic,
                "payload": json.loads(message.payload)
                }
            self.rcv.emit(dic)
        except Exception as ex:
            print("Admin MQTT client on_message() Exception:\n", ex.args)
   
###################################### Buttons Actions #####################################

    def manualTorque(self):
        if self.torques:
            self.ui.btn_torque.setStyleSheet("background-color : gray") 
            self.torques = False
            for i in self.data.torques:
                self.client.publish(self.data.pub_topics["plc"], json.dumps({i: False}))
        else:
            self.ui.btn_torque.setStyleSheet("background-color : green") 
            self.torques = True
            for i in self.data.torques:
                if self.data.config_data["backward"]:
                    self.client.publish(self.data.pub_topics["plc"], json.dumps({i: True}))
                else:
                    if self.data.torques[i]["torque_bw"]:
                        self.client.publish(self.data.pub_topics["plc"], json.dumps({i: False}))
                    else:
                        self.client.publish(self.data.pub_topics["plc"], json.dumps({i: True}))

    def resetMachine(self):
        choice = QMessageBox.question(self, 'Reiniciar', "Estas seguro de reiniciar la estación?",QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if choice == QMessageBox.Yes:
            system("shutdown /r")
            self.client.publish("config/status", '{"shutdown": true}')
            self.close()
        else:
            pass

    def poweroff(self):
        choice = QMessageBox.question(self, 'Apagar', "Estas seguro de apagar la estación?",QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if choice == QMessageBox.Yes:
            system("shutdown /s")
            self.client.publish("config/status", '{"shutdown": true}')
            self.close()
        else:
            pass

###################################### Checkbox Actions #####################################

    def onClicked_1(self):
        if self.ui.checkBox_1.isChecked() and self.kiosk_mode:
            system("start explorer.exe")
            self.kiosk_mode = False

    def onClicked_2(self):
        if self.ui.checkBox_2.isChecked():
            self.client.publish("System",json.dumps({"window" : True}), qos = 2)
        else:
            self.client.publish("System",json.dumps({"window" : False}), qos = 2)

    def onClicked_3(self):
        if self.ui.checkBox_3.isChecked():
            self.client.publish("visycam/set",json.dumps({"window" : True}), qos = 2)
        else:
            self.client.publish("visycam/set",json.dumps({"window" : False}), qos = 2)
            
    def onClicked_4(self):
        if self.ui.checkBox_4.isChecked():
            self.data.config_data["untwist"] = True
        else:
            self.data.config_data["untwist"] = False

    def onClicked_5(self):
        if self.ui.checkBox_5.isChecked():
            self.data.config_data["flexible_mode"] = True
        else:
            self.data.config_data["flexible_mode"] = False

    def onClicked_6(self):
        if self.ui.checkBox_6.isChecked():
            self.data.config_data["backward"] = True
            if self.torques:
                for i in self.data.torques:
                    self.client.publish(self.data.pub_topics["plc"], json.dumps({i: True}))
        else:
            self.data.config_data["backward"] = False
            for i in self.data.torques:
                if self.data.torques[i]["torque_bw"]:
                    self.client.publish(self.data.pub_topics["plc"], json.dumps({i: False}))
###################################### Events Functions ##################################
    def torqueUpdate(self):
        if self.torques:
            for i in self.data.torques:
                if self.data.config_data["backward"]:
                    self.client.publish(self.data.pub_topics["plc"], json.dumps({i: True}))
                else:
                    if self.data.torques[i]["torque_bw"]:
                        self.client.publish(self.data.pub_topics["plc"], json.dumps({i: False}))
                    else:
                        self.client.publish(self.data.pub_topics["plc"], json.dumps({i: True}))

###################################### Close Actions #####################################

    def closeEvent(self, event):
        with open("data\config", "wb") as f:
            dump(self.data.config_data, f, protocol=3)

        self.client.publish(self.data.pub_topics["plc"], '{"torque_12mm": false}')
        self.client.publish(self.data.pub_topics["plc"], '{"torque_10mm": false}')

        self.client.publish("config/status", '{"finish": true}')
        #system("taskkill /f /im explorer.exe")
        self.stopClient()
        event.accept()
        self.deleteLater()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")


