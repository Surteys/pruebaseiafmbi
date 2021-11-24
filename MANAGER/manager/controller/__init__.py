from PyQt5.QtCore import QObject, QStateMachine, QState, pyqtSlot, pyqtSignal, QTimer
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
        self.model              = Model(parent = self)
        self.client             = MqttClient(self.model, parent = self)
        self.model.transitions  = self.client
        self.model.mainWindow   = parent
        self.stateMachine       = QStateMachine(self)

        self.startup        = Startup(model = self.model)
        self.show_login     = Login(model = self.model)
        self.check_login    = CheckLogin(model = self.model)

        self.process        = QState()
        self.start_cycle    = StartCycle(model = self.model, parent = self.process)
        self.scan_qr        = ScanQr(model = self.model, parent = self.process)
        self.check_qr       = CheckQr(model = self.model, parent = self.process)
        self.qr_rework      = QrRework(model = self.model)
        self.clamps_monitor_a = ClampsMonitor(module = "clamps_a",model = self.model, parent = self.process)
        self.clamps_monitor_b = ClampsMonitor(module = "clamps_b",model = self.model, parent = self.process)
        self.clamps_standby_a = Clamps_Standby(module = "clamps_a",model = self.model, parent = self.process)
        self.clamps_standby_b = Clamps_Standby(module = "clamps_b",model = self.model, parent = self.process)
        
        self.config         = Config(model = self.model)
        self.reset          = Reset(model = self.model)
        self.finish         = Finish(model = self.model, parent = self.process)

        self.robot_a        = robot.Robot(module = "robot_a", model = self.model, parent = self.process)
        self.robot_b        = robot.Robot(module = "robot_b", model = self.model, parent = self.process)
        
        self.startup.addTransition(self.startup.ok, self.show_login)
        self.show_login.addTransition(self.client.ID, self.check_login)
        self.show_login.addTransition(self.client.login, self.show_login)
        self.check_login.addTransition(self.check_login.nok, self.show_login)
        self.check_login.addTransition(self.check_login.ok, self.start_cycle)
        self.start_cycle.addTransition(self.client.config, self.config)
        self.config.addTransition(self.client.config_ok, self.start_cycle)
        self.start_cycle.addTransition(self.client.logout, self.startup)
        self.start_cycle.addTransition(self.client.start, self.scan_qr)
        self.scan_qr.addTransition(self.client.code, self.check_qr)
        self.check_qr.addTransition(self.check_qr.nok, self.scan_qr)
        self.check_qr.addTransition(self.check_qr.rework, self.qr_rework)
        self.qr_rework.addTransition(self.qr_rework.ok, self.check_qr)
        self.check_qr.addTransition(self.check_qr.ok, self.clamps_monitor_a)

        #################################################################
        self.clamps_monitor_a.addTransition(self.client.clamp, self.clamps_monitor_a)
        self.clamps_monitor_a.addTransition(self.clamps_monitor_a.ok, self.clamps_standby_a)
        self.clamps_standby_a.addTransition(self.client.start, self.robot_a)
        self.robot_a.addTransition(self.robot_a.ok, self.clamps_monitor_b)

        self.clamps_monitor_b.addTransition(self.client.clamp, self.clamps_monitor_b)
        self.clamps_monitor_b.addTransition(self.clamps_monitor_b.ok, self.clamps_standby_b)
        self.clamps_standby_b.addTransition(self.client.start, self.robot_b)
        self.robot_b.addTransition(self.robot_b.ok, self.finish) 
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
          