"""
@author: MS. Marco Rutiaga Quezada

Upload file. Basic front code:
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
"""

import os
from flask import Flask, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
import requests

from datetime import datetime
from time import strftime
import pymysql
import json

import auto_modularities


host = "127.0.0.1"
user = "admin"
password = "4dm1n_001"
database = "eiaf"

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), '..\\')

#####################################  Upload Files Services ####################################
@app.route('/upload/modularities', methods=['POST'])
def uploadRef():
    response = {"items": 0}
    allowed_file = False
    file = None
    try:
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                filename = file.filename
                allowed_file = '.' in filename and \
                    filename.rsplit('.', 1)[1].lower() == "dat"
        if file and allowed_file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "ILX", filename))
            response["items"] = 1
    except Exception as ex:
        print("uploadRef Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        return response

@app.route('/update/modularities', methods=['POST'])
def updateRef():
    data = request.form['DBEVENT']
    print("DB a la que se cargn los DAT: ",data)
    ilxfaltantes = auto_modularities.makeModularities(data)
    return ilxfaltantes

@app.route('/update/modules', methods=['POST'])
def updateModules():
    response = {"items": 0}
    allowed_file = False
    file = None
    try:
        data = request.form['DBEVENT']
        print("DB a la que se carga la Info: ",data)
        usuario = request.form['USUARIO']
        print("Usuario que carga la info: ",usuario)
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                filename = file.filename
                allowed_file = '.' in filename and \
                    filename.rsplit('.', 1)[1].lower() in ['xls', 'xlsx']
        if file and allowed_file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], "modules", filename))
            auto_modularities.refreshModules(data)
            excelnew = {
                'DBEVENT': data,
                'ARCHIVO': filename,
                'USUARIO': usuario,
                'DATETIME': 'AUTO'
                }
            print("Información que se manda al POST DE EVENTOS HISTORIAL: ",excelnew)
            endpoint = f"http://127.0.0.1:5000/api/post/historial"
            responseHistorial = requests.post(endpoint, data = json.dumps(excelnew))
            response["items"] = 1
    except Exception as ex:
        print("updateModules Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        return response

#########################################  CRUD Services ########################################
@app.route("/api/get/<table>/<column_1>/<operation_1>/<value_1>/<column_2>/<operation_2>/<value_2>",methods=["GET"])
def GET(table, column_1, operation_1, value_1, column_2, operation_2, value_2):
    if column_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if value_2=='_':
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}';".format(value_1)
        else:
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}'".format(value_1)
            query += " AND " + column_2 + operation_2 + "'{}';".format(value_2)
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = database, cursorclass=pymysql.cursors.DictCursor)
    except Exception as ex:
        print("GET connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(query)
            result = cursor.fetchall()
            if len(result) > 0:
                response = {}
                keys = list(result[0])
                for key in keys:
                    response[key] = []
                    for item in result:
                        response[key].append(item.pop(key))         
            else:
                response = {"items": items}
    except Exception as ex:
        print("GET cursor Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/post/<table>",methods=["POST"])
def POST(table):
    def escape_name(s):
        name = '`{}`'.format(s.replace('`', '``'))
        return name
    data = request.get_json(force=True)
    try:
        if ("DBEVENT" in data):
            #print("True SI HAY DBEVENT")
            print("DBEVENT: ",data["DBEVENT"])
            connection = pymysql.connect(host = host, user = user, passwd = password, database = data["DBEVENT"])
            del data["DBEVENT"]
        else:
            #print ("False NO HAY DBEVENT, TODO FLUYE NORMAL")
            connection = pymysql.connect(host = host, user = user, passwd = password, database = database)
    except Exception as ex:
        print("POST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        query = "INSERT INTO " + table
        keys = list(data)
        cols = ', '.join(map(escape_name, keys))
        placeholders = ', '.join(['%({})s'.format(key) for key in keys])
        query += ' ({}) VALUES ({})'.format(cols, placeholders)
        for key in data:
            try:
                if key == "FECHA" or key == "DATETIME":
                    if data[key] == "AUTO":
                        data[key] = datetime.now().isoformat()
                if type(data[key]) == dict:
                    data[key] = json.dumps(data[key])
            except Exception as ex:
                print("keys inspection Exception: ", ex)
        with connection.cursor() as cursor:
            items = cursor.execute(query, data)
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("POST Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/delete/<table>/<int:ID>",methods=["POST"])
def DELETE(table, ID):
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = database)
    except Exception as ex:
        print("DELETE connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(f"DELETE FROM {table} WHERE ID={ID}")
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("DELETE Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/update/<table>/<int:ID>",methods=["POST"])
def UPDATE(table, ID):
    def escape_name(s):
        name = '`{}`'.format(s.replace('`', '``'))
        return name
    data = request.get_json(force=True)
    try:
        if ("DBEVENT" in data):
            #print("True SI HAY DBEVENT")
            print("DBEVENT: ",data["DBEVENT"])
            connection = pymysql.connect(host = host, user = user, passwd = password, database = data["DBEVENT"])
            del data["DBEVENT"]
        else:
            #print ("False NO HAY DBEVENT, TODO FLUYE NORMAL")
            connection = pymysql.connect(host = host, user = user, passwd = password, database = database)
    except Exception as ex:
        print("UPDATE connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        query = "UPDATE " + table + f" SET"
        for i in data:
            if i == "FECHA" or i == "DATETIME":
                if data[i] == "AUTO":
                    data[i] = datetime.now().isoformat()
            key = escape_name(i)
            if type(data[i]) == dict:
                data[i] = json.dumps(data[i])
            query += f' {key}=%({i})s,'
        query = query[:-1]
        query += f" WHERE ID={ID}"
        with connection.cursor() as cursor:
            items = cursor.execute(query,data)
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("UPDATE Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/get/preview/modularity/<ILX>",methods=["GET"])
def preview(ILX):
    endpoint = "http://127.0.0.1:5000/api/get/pdcr/variantes"
    pdcrVariantes = requests.get(endpoint).json()
    print("Lista Final de Variantes PDC-R: \n",pdcrVariantes)
    flag_l = False
    flag_m = False
    flag_s = False
    endpoint = f"http://127.0.0.1:5000/api/get/modularidades/MODULARIDAD/=/{ILX}/ACTIVO/=/1"
    response = requests.get(endpoint).json()
    #arrayModules = response["MODULOS_FUSIBLES"][0].split(",")
    modules = response["MODULOS_FUSIBLES"][0].split(sep = ",")
    print(f"\n\t\tMODULOS_FUSIBLES:\n{modules}")
    #print("Modulos SPLIT: ",arrayModules)
    modularity = {
        'PDC-P': {},
        'PDC-D': {},
        'PDC-R': {},
        'PDC-RMID': {},
        'PDC-RS': {},
        'PDC-S': {}, 
        'TBLU': {},
        'variante': {}
    }
    for module in modules:
        if module in pdcrVariantes["large"]:
            flag_l = True
        if module in pdcrVariantes["medium"]:
            flag_m = True
        if module in pdcrVariantes["small"]:
            flag_s = True
        #print("Module i de la Lista: "+module)
        endpoint_Module= f"http://127.0.0.1:5000/api/get/modulos_fusibles/MODULO/=/{module}/_/=/_"
        #print("Endpoint del módulo"+endpoint_Module)
        response = requests.get(endpoint_Module).json()
        #print("Modulo Informacion",response)
        if "MODULO" in response:
            if len(response["MODULO"]) == 1: 
                for j in response:
                    if j == "ID" or j == "MODULO":
                        response[j] = response[j][0]
                    else:
                        #print("j!!!!: ",j)
                        if j == "F96":
                            continue
                        response[j] = json.loads(response[j][0])
                        #print("response[j]",response[j])
                        for k in response[j]:
                            #print(k)
                            if response[j][k] != "empty":
                                modularity[j][k] = [response[j][k],module]
    print("\t\t+++++++++++ FLAGS de",ILX,":+++++++++++\n Flag S - ",flag_s," Flag M - ",flag_m," Flag L - ",flag_l)
    if flag_l == True:
        variante = "PDC-R"
    if flag_m == True and flag_l == False:
        variante = "PDC-RMID"
    if flag_s == True and flag_m == False:
        variante = "PDC-RS"
    if flag_s == False and flag_m == False and flag_l == False:
        variante = "N/A"
        print("La caja no contiene módulos pertenecientes a las categorías.")
    modularity["variante"] = variante
    print("Variante de Caja: ",variante)
    return modularity

@app.route("/api/get/pdcr/variantes",methods=["GET"])
def variantes():
    pdcrVariantes = {
    "small": [],
    "medium": [],
    "large": [],
    "battery-2": []
    }
    endpoint = "http://127.0.0.1:5000/api/get/definiciones/ACTIVE/=/1/_/_/_"
    pdcrVariantesDB = requests.get(endpoint).json()
    #print("pdcrVariantesDB-------",pdcrVariantesDB)
    if len(pdcrVariantesDB["MODULO"]) > 0:
        #print("Cantidad de Módulos: ",len(pdcrVariantesDB["MODULO"]))
        #print("Lista de Módulos: ",pdcrVariantesDB["MODULO"])
        #print("Lista de Variantes: ",pdcrVariantesDB["VARIANTE"])
        for i in pdcrVariantesDB["MODULO"]:
            #print("Modulo Actual (i)",i)
            #print("Index de Modulo Actual (i)",pdcrVariantesDB["MODULO"].index(i))
            #print("Variante correspondiente a Modulo Actual: ",pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)])
            if pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-R":
                pdcrVariantes["large"].append(i)
                #print("ES UNA PDC-R LARGE")
            elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RMID":
                #print("ES UNA PDC-R MEDIUM")
                pdcrVariantes["medium"].append(i)
            elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RS":
                #print("ES UNA PDC-R SMALL")
                pdcrVariantes["small"].append(i)
            elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "BATTERY-2":
                pdcrVariantes["battery-2"].append(i)
    return pdcrVariantes

################################################## Respaldos de Base de Datos Endpoint  ####################################################
@app.route("/api/get/bkup",methods=["GET"])
def bkup():
    items = {
        "status": False,
        "dir": "",
        "nombre": ""
        }
    ####### Cambiar Dirección de la carpeta destino donde se guardarán los Backups, dependiendo de la máquina o computadora en la que se correrá la API #######
    dest_folder = "C:/Users/EIAF-MBI/Documents/EIAF_BKUPS/DATABASE"
    print("Petición de BACKUP")
    try:
        if os.path.isdir(dest_folder):
            print("La Carpeta para respaldos SI existe!")
            path = os.getcwd()   # show current working directory (cwd)
            print("path",path)
            os.chdir('C:/xampp/mysql/bin')
            filestamp = strftime('%Y%m%d-%H%M%S')
            filename = "%s/%s-%s.sql" % (dest_folder, filestamp, database)
            db_dump = "mysqldump --single-transaction -h " + host + " -u " + user + " -p" + password + " " + database + " > " + filename
            os.system(db_dump)
            items["status"] = True
            items["dir"] = filename
            items["nombre"] = filestamp+"-"+database
            print("DATABASE BACKUP EXITOSO")
        else:
            print("La Carpeta para respaldos NO existe!")
            items["dir"] = dest_folder
    except Exception as ex:
        print("DB BKUP Exception: ",ex)
    return items

################################################## Crear Base de Datos (Evento)  ####################################################
@app.route("/api/post/newEvent",methods=["POST"])
def newEvent():
    host_fase = "127.0.0.1"
    user_fase = "amtc"
    password_fase = "4dm1n_001"
    charSet = "utf8mb4_bin"
    historial = {
        "DBEVENT": "",
        "ARCHIVO": "",
        "USUARIO": "",
        "DATETIME": "",
    }
    activo = {
        "DBEVENT": "",
        "ACTIVO": ""
    }

    data = request.get_json(force=True)
    print("Data: ",data)
    event_name = 'evento_'+data["EVENTO"]+"_X"+data["NUMERO"]+"_"+data["CONDUCCION"]
    historial["USUARIO"] = data["USUARIO"]
    historial["DATETIME"] = data["DATETIME"]
    historial["DBEVENT"] = event_name

    activo["ACTIVO"] = data["ACTIVO"]
    activo["DBEVENT"] = event_name
    try:
        connection = pymysql.connect(host = host_fase, user = user_fase, passwd = password_fase)
    except Exception as ex:
        print("generalPOST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute("create database "+event_name)
            sql = "use "+event_name
            cursor.execute(sql)
            definicionesTable = """CREATE TABLE definiciones (
            ID int primary key AUTO_INCREMENT,
            MODULO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            VARIANTE text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            DATETIME datetime NOT NULL,
            USUARIO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            ACTIVE tinyint NOT NULL
            )"""
            cursor.execute(definicionesTable)
            fusiblesTable = """CREATE TABLE modulos_fusibles (
            ID int primary key AUTO_INCREMENT,
            MODULO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `PDC-R` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `PDC-RMID` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `PDC-RS` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `PDC-S` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            TBLU longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `PDC-D` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            `PDC-P` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
            )"""
            cursor.execute(fusiblesTable)
            modularidadesTable = """CREATE TABLE modularidades (
            ID int primary key AUTO_INCREMENT, 
            MODULARIDAD text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            FECHA datetime NOT NULL,
            MODULOS_FUSIBLES text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            ACTIVO tinyint NOT NULL
            )"""
            cursor.execute(modularidadesTable)
            historialTable = """CREATE TABLE historial (
            ID int primary key AUTO_INCREMENT, 
            ARCHIVO longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL, 
            USUARIO text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
            DATETIME datetime NOT NULL
            )"""
            cursor.execute(historialTable)
            activoTable = """CREATE TABLE activo (
            ID int primary key AUTO_INCREMENT, 
            ACTIVO tinyint NOT NULL
            )"""
            cursor.execute(activoTable)
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("generalPOST Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        #print("Información que se manda al POST DE EVENTOS HISTORIAL: ",historial)
        endpoint = f"http://127.0.0.1:5000/api/post/historial"
        responseHistorial = requests.post(endpoint, data = json.dumps(historial))
        #print("Información que se manda al POST DE EVENTOS ACTIVO: ",activo)
        endpoint = f"http://127.0.0.1:5000/api/post/activo"
        responseActivo = requests.post(endpoint, data = json.dumps(activo))
        connection.close()
        return response

################################################## Eliminar Base de Datos (Evento)  ####################################################
@app.route("/api/delete/event",methods=["POST"])
def delEvent():
    host_fase = "127.0.0.1"
    user_fase = "amtc"
    password_fase = "4dm1n_001"
    charSet = "utf8mb4_bin"
    response = {"delete": 0}

    data = request.get_json(force=True)
    print("Data: ",data)
    #EVENTDELETE = data["DBEVENT"]
    try:
        connection = pymysql.connect(host = host_fase, user = user_fase, passwd = password_fase, database = data["DBEVENT"])
    except Exception as ex:
        print("Delete Event connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute("DROP DATABASE "+data["DBEVENT"])
        connection.commit()
        response["delete"] = 1
    except Exception as ex:
        print("Delete Event Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response
################################################## Consultar Bases de Datos (Eventos)  ####################################################
@app.route("/api/get/eventos",methods=["GET"])
def eventos():
    host_fase = "127.0.0.1"
    user_fase = "amtc"
    password_fase = "4dm1n_001"
    lista = {
        "eventos": {}
        }
    try:
        connection = pymysql.connect(host = host_fase, user = user_fase, passwd = password_fase)
    except Exception as ex:
        print("generalPOST connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute("SHOW DATABASES")
            l = cursor.fetchall()
            #print ("Lista de dbs: ",l)
            x = []
            for i in l:
                #print("imprimiendo I 0 ",i[0])
                if 'evento' in i[0]:
                    #print("Este contiene evento: ",i[0])
                    x.extend(i)
                    
                    endpoint = f"http://127.0.0.1:5000/api/get/{i[0]}/historial/all/-/-/-/-/-"
                    respHistorial = requests.get(endpoint).json()
                    endpoint = f"http://127.0.0.1:5000/api/get/{i[0]}/activo/all/-/-/-/-/-"
                    respActivo = requests.get(endpoint).json()
                    #print("Respuesta de Historial: ",respHistorial)
                    #print("Respuesta de Historial Archivo: ",respHistorial["ARCHIVO"])
                    #print("Respuesta de Activo: ",respActivo)
                    #print("Respuesta de Activo: ",respActivo["ACTIVO"])
                    if type(respHistorial["ARCHIVO"]) == list:
                        #print("Es una lista!")
                        lista["eventos"][i[0]] = [respHistorial["ARCHIVO"][-1],respActivo["ACTIVO"]]
                    else:
                        #print("No es una lista, es posible que sea solo un elemento o esté vacío")
                        lista["eventos"][i[0]] = [respHistorial["ARCHIVO"],respActivo["ACTIVO"]]
            #print("Lista de bases de datos: ",x)
            print("Lista de eventos final: ",lista)
        connection.commit()
    except Exception as ex:
        print("generalPOST Exception: ", ex)
    finally:
        connection.close()
        return lista

@app.route("/api/get/<db>/<table>/<column_1>/<operation_1>/<value_1>/<column_2>/<operation_2>/<value_2>",methods=["GET"])
def eventGET(table, column_1, operation_1, value_1, column_2, operation_2, value_2, db):
    if column_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if value_2=='_':
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}';".format(value_1)
        else:
            query = "SELECT * FROM " + table + " WHERE " + column_1 + operation_1 + "'{}'".format(value_1)
            query += " AND " + column_2 + operation_2 + "'{}';".format(value_2)
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = db, cursorclass=pymysql.cursors.DictCursor)
    except Exception as ex:
        print("GET connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(query)
            result = cursor.fetchall()
            if len(result) > 0:
                response = {}
                keys = list(result[0])
                for key in keys:
                    response[key] = []
                    for item in result:
                        response[key].append(item.pop(key))         
            else:
                response = {"items": items}
    except Exception as ex:
        print("GET cursor Exception: ", ex)
        response = {"exception" : ex.args}
    finally:
        connection.close()
        return response

@app.route("/api/get/<db>/preview/modularity/<ILX>",methods=["GET"])
def previewEvent(ILX,db):
    endpoint = f"http://127.0.0.1:5000/api/get/{db}/pdcr/variantes"
    pdcrVariantes = requests.get(endpoint).json()
    print("Lista Final de Variantes PDC-R: \n",pdcrVariantes)
    flag_l = False
    flag_m = False
    flag_s = False
    endpoint = f"http://127.0.0.1:5000/api/get/{db}/modularidades/MODULARIDAD/=/{ILX}/ACTIVO/=/1"
    response = requests.get(endpoint).json()
    #arrayModules = response["MODULOS_FUSIBLES"][0].split(",")
    modules = response["MODULOS_FUSIBLES"][0].split(sep = ",")
    print(f"\n\t\tMODULOS_FUSIBLES:\n{modules}")
    #print("Modulos SPLIT: ",arrayModules)
    modularity = {
        'PDC-P': {},
        'PDC-D': {},
        'PDC-R': {},
        'PDC-RMID': {},
        'PDC-RS': {},
        'PDC-S': {}, 
        'TBLU': {},
        'variante': {}
    }
    for module in modules:
        if module in pdcrVariantes["large"]:
            flag_l = True
        if module in pdcrVariantes["medium"]:
            flag_m = True
        if module in pdcrVariantes["small"]:
            flag_s = True
        #print("Module i de la Lista: "+module)
        endpoint_Module= f"http://127.0.0.1:5000/api/get/{db}/modulos_fusibles/MODULO/=/{module}/_/=/_"
        #print("Endpoint del módulo"+endpoint_Module)
        response = requests.get(endpoint_Module).json()
        #print("Modulo Informacion",response)
        if "MODULO" in response:
            if len(response["MODULO"]) == 1: 
                for j in response:
                    if j == "ID" or j == "MODULO":
                        response[j] = response[j][0]
                    else:
                        #print("j!!!!: ",j)
                        if j == "F96":
                            continue
                        response[j] = json.loads(response[j][0])
                        #print("response[j]",response[j])
                        for k in response[j]:
                            #print(k)
                            if response[j][k] != "empty":
                                modularity[j][k] = [response[j][k],module]
    print("\t\t+++++++++++ FLAGS de",ILX,":+++++++++++\n Flag S - ",flag_s," Flag M - ",flag_m," Flag L - ",flag_l)
    if flag_l == True:
        variante = "PDC-R"
    if flag_m == True and flag_l == False:
        variante = "PDC-RMID"
    if flag_s == True and flag_m == False:
        variante = "PDC-RS"
    if flag_s == False and flag_m == False and flag_l == False:
        variante = "N/A"
        print("La caja no contiene módulos pertenecientes a las categorías.")
    modularity["variante"] = variante
    print("Variante de Caja: ",variante)
    return modularity

@app.route("/api/get/<db>/pdcr/variantes",methods=["GET"])
def variantesEvent(db):
    pdcrVariantes = {
    "small": [],
    "medium": [],
    "large": [],
    }
    endpoint = f"http://127.0.0.1:5000/api/get/{db}/definiciones/ACTIVE/=/1/_/_/_"
    pdcrVariantesDB = requests.get(endpoint).json()
    #print("pdcrVariantesDB-------",pdcrVariantesDB)
    try:
        if len(pdcrVariantesDB["MODULO"]) > 0:
            #print("Cantidad de Módulos: ",len(pdcrVariantesDB["MODULO"]))
            #print("Lista de Módulos: ",pdcrVariantesDB["MODULO"])
            #print("Lista de Variantes: ",pdcrVariantesDB["VARIANTE"])
            for i in pdcrVariantesDB["MODULO"]:
                #print("Modulo Actual (i)",i)
                #print("Index de Modulo Actual (i)",pdcrVariantesDB["MODULO"].index(i))
                #print("Variante correspondiente a Modulo Actual: ",pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)])
                if pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-R":
                    pdcrVariantes["large"].append(i)
                    #print("ES UNA PDC-R LARGE")
                elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RMID":
                    #print("ES UNA PDC-R MEDIUM")
                    pdcrVariantes["medium"].append(i)
                elif pdcrVariantesDB["VARIANTE"][pdcrVariantesDB["MODULO"].index(i)] == "PDC-RS":
                    #print("ES UNA PDC-R SMALL")
                    pdcrVariantes["small"].append(i)
    except Exception as ex:
        print("Variantes Exception: ", ex)
        return {"exception": ex.args}
    return pdcrVariantes

@app.route("/api/delete/<db>/<table>/<int:ID>",methods=["POST"])
def deleteEvent(table, ID,db):
    try:
        connection = pymysql.connect(host = host, user = user, passwd = password, database = db)
    except Exception as ex:
        print("delete connection Exception: ", ex)
        return {"exception": ex.args}
    try:
        with connection.cursor() as cursor:
            items = cursor.execute(f"DELETE FROM {table} WHERE ID={ID}")
        connection.commit()
        response = {"items": items}
    except Exception as ex:
        print("dele Exception: ", ex)
        response = {"exception": ex.args}
    finally:
        connection.close()
        return response

@app.route('/database/<db>/<table>/<column_of_table_1>/<operation_1>/<val_1>/<column_of_table_2>/<operation_2>/<val_2>',methods=['GET'])
def value_of_a_tableEvent(table,column_of_table_1,operation_1,val_1,column_of_table_2,operation_2,val_2,db):
    if column_of_table_1=='all':
        query='SELECT * FROM ' +table+';'
    else:
        if val_2=='_':
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'";'
        else:
            query='SELECT * FROM ' +table+' WHERE '+column_of_table_1+operation_1+'"'+val_1+'" AND '+column_of_table_2+operation_2 +'"'+val_2+'";'
    print(query)
    #conexion con base de datos
    conexion =  pymysql.connect(host = host, user = user, passwd = password, database = db)
    cursor = conexion.cursor()
    cursor.execute(query)
    result = cursor.fetchone()
    
    if result == None:
        resp='NO HAY INFORMACION'
        response=resp
    else:
        resp='SI HAY INFORMACION'
        query = 'SELECT COLUMN_NAME FROM Information_Schema.Columns WHERE TABLE_NAME = ' + '"' + table + '";'
        cursor.execute(query)
        name_columns=cursor.fetchall()
        print(type(result))
        print(len(result))
        print(result)
        print(type(name_columns))
        print(len(name_columns))
        print(name_columns)

        dic={}
        for i in range(len(result)):
            dic[name_columns[i][0]]=result[i]
        print(dic)
        response=dic
    return response
##################################################################################################

if __name__ == '__main__':
    """
        host: naapnx-famx2:8080
        user: amtc
        pass: amtc
    """
    app.run("0.0.0.0", 5000)
