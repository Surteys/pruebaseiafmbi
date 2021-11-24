let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
document.getElementById("modulov_titulo").innerHTML = sessionStorage.getItem('modularidad');
let pdf_vision = document.getElementById('pdf_vision');
let modularidad_vision = document.getElementById('modularidad_vision');

let img_pdcr = document.getElementById('pdcr_image_v_canvas');
let img_pdcr_1 = document.getElementById('pdcr_1_image_v_canvas');
let img_pdcr_small = document.getElementById('pdcr_small_image_v_canvas');
let img_f96 = document.getElementById('f96_image_v_canvas');
let img_pdcs = document.getElementById('pdcs_image_v_canvas');
let img_tblu = document.getElementById('tblu_image_v_canvas');
let img_pdcd = document.getElementById('pdcd_image_v_canvas');
let img_pdcp = document.getElementById('pdcp_image_v_canvas');

var imgWidth_pdcr, imgHeight_pdcr, datosPrim_pdcr;
var imgWidth_pdcr_mid, imgHeight_pdcr_mid, datosPrim_pdcr_mid;
var imgWidth_pdcr_small, imgHeight_pdcr_small, datosPrim_pdcr_small;
var imgWidth_f96, imgHeight_f96, datosPrim_f96;
var imgWidth_pdcs, imgHeight_pdcs, datosPrim_pdcs;
var imgWidth_tblu, imgHeight_tblu, datosPrim_tblu;
var imgWidth_pdcd, imgHeight_pdcd, datosPrim_pdcd;
var imgWidth_pdcp, imgHeight_pdcp, datosPrim_pdcp;

var fuses_BB = {
    'PDC-D': {
        'F200': [[271, 572], [302, 584]], 'F201': [[271, 555], [302, 567]], 'F202': [[271, 540], [302, 552]], 'F203': [[271, 523], [302, 535]], 
        'F204': [[271, 504], [302, 516]], 'F205': [[271, 490], [302, 502]], 'F206': [[271, 471], [302, 483]], 'F207': [[271, 455], [302, 467]], 
        'F208': [[271, 438], [302, 451]], 'F209': [[367, 573], [417, 586]], 'F210': [[367, 553], [417, 567]], 'F211': [[367, 536], [417, 550]], 
        'F212': [[367, 520], [417, 533]], 'F213': [[367, 504], [417, 516]], 'F214': [[367, 486], [417, 499]], 'F215': [[367, 470], [417, 482]], 
        'F216': [[367, 451], [417, 465]], 'F217': [[290, 401], [309, 412]], 'F218': [[290, 384], [309, 395]], 'F219': [[290, 368], [309, 379]], 
        'F220': [[290, 351], [309, 362]], 'F221': [[290, 333], [309, 344]], 'F222': [[340, 402], [359, 414]], 'F223': [[340, 383], [359, 395]], 
        'F224': [[340, 366], [359, 378]], 'F225': [[340, 349], [359, 361]], 'F226': [[340, 332], [359, 344]], 'F227': [[373, 417], [392, 429]], 
        'F228': [[373, 401], [392, 413]], 'F229': [[373, 386], [392, 398]], 'F230': [[373, 367], [392, 379]], 'F231': [[373, 350], [392, 362]], 
        'F232': [[373, 333], [392, 345]]
    }, 
    'PDC-P': {
        'MF1': [[279, 276], [369, 288]], 'MF2': [[279, 295], [369, 307]], 'F300': [[282, 395], [326, 408]], 'F301': [[289, 380], [315, 390]], 
        'F302': [[289, 365], [314, 375]], 'F303': [[292, 350], [314, 361]], 'F304': [[291, 335], [315, 347]], 'F305': [[292, 322], [314, 331]], 
        'F318': [[343, 428], [368, 437]], 'F319': [[343, 415], [368, 424]], 'F320': [[343, 400], [368, 409]], 'F321': [[343, 384], [368, 393]], 
        'F322': [[343, 369], [368, 377]], 'F323': [[343, 355], [368, 363]], 'F324': [[343, 340], [368, 349]], 'F325': [[343, 326], [368, 335]], 
        'F326': [[378, 427], [422, 438]], 'F327': [[379, 413], [422, 425]], 'F328': [[379, 398], [423, 409]], 'F329': [[380, 384], [424, 395]], 
        'F330': [[380, 369], [422, 380]], 'F331': [[380, 354], [422, 364]], 'F332': [[381, 339], [422, 349]], 'F333': [[380, 324], [422, 335]], 
        'F334': [[380, 309], [422, 319]], 'F335': [[380, 294], [422, 307]], 'E21': [[287, 423], [295, 441]], 'E22': [[295, 442], [302, 460]]
    }, 
    'PDC-R': {           /*[x-LADO IZQ ←,Y-LADO SUPERIOR ↑][X-LADO DER →,Y-LADO INFERIOR ↓]*/
        'F400': [[510, 214], [519, 246]], 'F401': [[499, 214], [508, 246]], 'F402': [[487, 214], [497, 246]], 'F403': [[477, 214], [485, 246]], 
        'F404': [[467, 214], [475, 246]], 'F405': [[455, 214], [464, 246]], 'F411': [[385, 220], [392, 241]], 'F410': [[395, 220], [402, 241]], 
        'F409': [[403, 220], [412, 241]], 'F408': [[414, 220], [421, 241]], 'F407': [[423, 220], [432, 241]], 'F406': [[434, 220], [443, 241]], 
        'F412': [[527, 222], [558, 231]], 'F413': [[527, 211], [558, 220]], 'F414': [[527, 204], [558, 213]], 'F415': [[527, 193], [558, 202]], 
        'F416': [[527, 182], [558, 191]], 'F417': [[527, 171], [558, 180]], 'F420': [[326, 171], [374, 186]], 'F419': [[326, 195], [374, 210]], 
        'F418': [[326, 217], [374, 232]], 'F421': [[527, 144], [558, 153]], 'F422': [[527, 133], [558, 142]], 'F423': [[527, 122], [558, 131]], 
        'F424': [[527, 111], [558, 120]], 'F425': [[527, 102], [558, 111]], 'F426': [[527, 91],  [558, 100]], 'F427': [[495, 133], [504, 153]], 
        'F428': [[485, 133], [494, 153]], 'F429': [[475, 133], [484, 153]], 'F430': [[465, 133], [474, 153]], 'F431': [[453, 133], [462, 153]], 
        'F437': [[496, 111], [505, 130]], 'F438': [[487, 111], [495, 130]], 'F439': [[476, 111], [485, 130]], 'F440': [[465, 111], [474, 130]], 
        'F441': [[455, 111], [464, 130]], 'F432': [[432, 133], [441, 153]], 'F433': [[421, 133], [430, 153]], 'F434': [[410, 133], [419, 153]], 
        'F435': [[399, 133], [408, 153]], 'F436': [[388, 133], [397, 153]], 'F442': [[431, 111], [440, 130]], 'F443': [[420, 111], [429, 130]], 
        'F444': [[410, 111], [419, 129]], 'F445': [[399, 111], [408, 130]], 'F446': [[389, 111], [398, 130]], 'F449': [[326, 88],  [374, 104]], 
        'F448': [[326, 112], [374, 128]], 'F447': [[326, 137], [374, 153]], 'F450': [[512, 72],  [521, 103]], 'F451': [[501, 72],  [510, 103]], 
        'F452': [[490, 72],  [499, 103]], 'F453': [[479, 72],  [488, 103]], 'F454': [[469, 72],  [478, 103]], 'F455': [[458, 72],  [467, 103]], 
        'F456': [[435, 72],  [444, 103]], 'F457': [[424, 72],  [433, 103]], 'F458': [[413, 72],  [422, 103]], 'F459': [[402, 72],  [411, 103]], 
        'F460': [[391, 72],  [400, 103]], 'F461': [[380, 72],  [389, 103]], 'F462': [[240, 166], [256, 215]], 'F463': [[215, 166], [231, 215]], 
        'F464': [[191, 166], [207, 215]], 'F465': [[277, 107], [297, 115]], 'F466': [[277, 97],  [297, 105]], 'F467': [[277, 86],  [297, 94]], 
        'F468': [[277, 75],  [297, 83]],  'F469': [[277, 64],  [297, 72]],  'F470': [[277, 53],  [297, 61]],  'F471': [[231, 107], [264, 115]], 
        'F472': [[231, 97],  [264, 105]], 'F473': [[231, 86],  [264, 94]],  'F474': [[231, 75],  [264, 83]],  'F475': [[231, 64],  [264, 72]], 
        'F476': [[231, 53],  [264, 61]],  'F477': [[187, 107], [220, 115]], 'F478': [[187, 97],  [220, 105]], 'F479': [[187, 86],  [220, 94]], 
        'F480': [[187, 75],  [220, 83]],  'F481': [[187, 64],  [220, 71]],  'F482': [[187, 53],  [220, 61]],  'RELX': [[478, 162], [525, 206]], 
        'RELU': [[427, 162], [476, 206]], 'RELT': [[378, 162], [425, 206]]
    },
    'PDC-RMID': {
        'F400': [[613, 350], [627, 388]], 'F401': [[601, 350], [612, 388]], 'F402': [[587, 350], [599, 388]], 'F403': [[577, 350], [588, 388]], 
        'F404': [[565, 350], [576, 388]], 'F405': [[553, 350], [564, 388]], 'F411': [[463, 357], [474, 378]], 'F410': [[475, 357], [486, 378]], 
        'F409': [[487, 357], [496, 378]], 'F408': [[497, 357], [510, 378]], 'F407': [[512, 357], [523, 378]], 'F406': [[525, 357], [534, 378]], 
        'F412': [[633, 360], [673, 371]], 'F413': [[633, 348], [673, 359]], 'F414': [[633, 335], [673, 346]], 'F415': [[633, 323], [673, 334]], 
        'F416': [[633, 311], [673, 322]], 'F417': [[633, 297], [673, 308]], 'F420': [[398, 300], [455, 318]], 'F419': [[398, 330], [455, 348]], 
        'F418': [[398, 358], [455, 376]], 'F421': [[634, 272], [671, 284]], 'F422': [[634, 256], [671, 269]], 'F423': [[634, 244], [671, 255]], 
        'F424': [[634, 229], [671, 241]], 'F425': [[634, 217], [671, 228]], 'F426': [[634, 204], [671, 216]], 'F427': [[597, 256], [607, 280]], 
        'F428': [[585, 256], [595, 280]], 'F429': [[573, 256], [583, 280]], 'F430': [[561, 256], [571, 280]], 'F431': [[547, 256], [557, 280]], 
        'F437': [[600, 228], [610, 252]], 'F438': [[587, 228], [597, 252]], 'F439': [[575, 228], [585, 252]], 'F440': [[563, 228], [573, 252]], 
        'F441': [[550, 228], [560, 252]], 'F432': [[520, 256], [530, 280]], 'F433': [[508, 256], [518, 280]], 'F434': [[496, 256], [506, 280]], 
        'F435': [[484, 256], [494, 280]], 'F436': [[472, 256], [482, 280]], 'F442': [[518, 228], [528, 252]], 'F443': [[506, 228], [516, 252]], 
        'F444': [[494, 228], [504, 252]], 'F445': [[481, 228], [491, 252]], 'F446': [[469, 228], [479, 252]], 'F450': [[616, 180], [628, 218]], 
        'F451': [[604, 180], [615, 218]], 'F452': [[592, 180], [602, 218]], 'F453': [[577, 180], [589, 218]], 'F454': [[564, 180], [576, 218]], 
        'F455': [[553, 180], [563, 218]], 'F456': [[525, 180], [535, 218]], 'F457': [[514, 180], [524, 218]], 'F458': [[500, 180], [513, 218]], 
        'F459': [[487, 180], [497, 218]], 'F460': [[473, 180], [486, 218]], 'F461': [[463, 180], [474, 218]], 'RELX': [[578, 291], [629, 348]], 
        'RELU': [[517, 291], [573, 348]], 'RELT': [[461, 291], [512, 348]], 'F449': [[398, 200], [455, 224]], 'F448': [[398, 232], [455, 250]], 
        'F447': [[398, 260], [455, 278]]
    },
    'PDC-RS': {
        'F400': [[613, 350], [627, 388]], 'F401': [[601, 350], [612, 388]], 'F402': [[587, 350], [599, 388]], 'F403': [[577, 350], [588, 388]], 
        'F404': [[565, 350], [576, 388]], 'F405': [[553, 350], [564, 388]], 'F411': [[463, 357], [474, 378]], 'F410': [[475, 357], [486, 378]], 
        'F409': [[487, 357], [496, 378]], 'F408': [[497, 357], [510, 378]], 'F407': [[512, 357], [523, 378]], 'F406': [[525, 357], [534, 378]], 
        'F412': [[633, 360], [673, 371]], 'F413': [[633, 348], [673, 359]], 'F414': [[633, 335], [673, 346]], 'F415': [[633, 323], [673, 334]], 
        'F416': [[633, 311], [673, 322]], 'F417': [[633, 297], [673, 308]], 'F420': [[398, 300], [455, 318]], 'F419': [[398, 330], [455, 348]], 
        'F418': [[398, 358], [455, 376]], 'F421': [[634, 272], [671, 284]], 'F422': [[634, 256], [671, 269]], 'F423': [[634, 244], [671, 255]], 
        'F424': [[634, 229], [671, 241]], 'F425': [[634, 217], [671, 228]], 'F426': [[634, 204], [671, 216]], 'F427': [[597, 256], [607, 280]], 
        'F428': [[585, 256], [595, 280]], 'F429': [[573, 256], [583, 280]], 'F430': [[561, 256], [571, 280]], 'F431': [[547, 256], [557, 280]], 
        'F437': [[600, 228], [610, 252]], 'F438': [[587, 228], [597, 252]], 'F439': [[575, 228], [585, 252]], 'F440': [[563, 228], [573, 252]], 
        'F441': [[550, 228], [560, 252]], 'F432': [[520, 256], [530, 280]], 'F433': [[508, 256], [518, 280]], 'F434': [[496, 256], [506, 280]], 
        'F435': [[484, 256], [494, 280]], 'F436': [[472, 256], [482, 280]], 'F442': [[518, 228], [528, 252]], 'F443': [[506, 228], [516, 252]], 
        'F444': [[494, 228], [504, 252]], 'F445': [[481, 228], [491, 252]], 'F446': [[469, 228], [479, 252]], 'F450': [[616, 180], [628, 218]], 
        'F451': [[604, 180], [615, 218]], 'F452': [[592, 180], [602, 218]], 'F453': [[577, 180], [589, 218]], 'F454': [[564, 180], [576, 218]], 
        'F455': [[553, 180], [563, 218]], 'F456': [[525, 180], [535, 218]], 'F457': [[514, 180], [524, 218]], 'F458': [[500, 180], [513, 218]], 
        'F459': [[487, 180], [497, 218]], 'F460': [[473, 180], [486, 218]], 'F461': [[463, 180], [474, 218]], 'RELX': [[578, 291], [629, 348]], 
        'RELU': [[517, 291], [573, 348]], 'RELT': [[461, 291], [512, 348]], 'F449': [[398, 200], [455, 224]], 'F448': [[398, 232], [455, 250]], 
        'F447': [[398, 260], [455, 278]]
    },
    'F96': {
        'F96': [[257, 346], [480, 417]]
    },
    'PDC-S': {
        '1': [[439, 218], [486, 392]], '2': [[494, 218], [540, 389]], '3': [[550, 218], [596, 387]], '4': [[607, 219], [653, 387]], 
        '5': [[661, 218], [711, 382]], '6': [[719, 218], [763, 380]]
    }, 
    'TBLU': {
        '9': [[79, 531], [117, 600]], '8': [[125, 531], [159, 599]], '7': [[167, 531], [207, 599]], '6': [[212, 531], [251, 600]], 
        '5': [[257, 531], [296, 600]], '4': [[300, 531], [338, 601]], '3': [[347, 531], [385, 600]], '2': [[388, 531], [428, 598]], 
        '1': [[435, 531], [472, 600]]
    }
}

var modularity;
var fusible_imagen = new Image();
let orientacion;
let caja_pdcr;

var historial="";
var pdcr_caja="";
var pdcr_caja_to_db="";

var pdcr_array=[]
var pdcr_puntos=[]

var pdcr_1_array=[]
var pdcr_1_puntos=[]

var pdcr_small_array=[]
var pdcr_small_puntos=[]

var f96_array=[]
var f96_puntos=[]

var pdcs_array=[]
var pdcs_puntos=[]

var tblu_array=[]
var tblu_puntos=[]

var pdcd_array=[]
var pdcd_puntos=[]

var pdcp_array=[]
var pdcp_puntos=[]

function iniciar_pagina(){
    // console.log(modularity);
    // cargar_imagen_pdcs();
    // cargar_imagen_tblu();
    // cargar_imagen_pdcd();
    // cargar_imagen_pdcp();
    cargar_info();
}
var loading = document.getElementsByClassName("loading");

function getDistance_pdcr(x1, y1, x2, y2){
    xDistance_pdcr = x2 - x1;
    yDistance_pdcr = y2 - y1;
}
function getDistance_pdcr_mid(x1, y1, x2, y2){
    xDistance_pdcr_mid = x2 - x1;
    yDistance_pdcr_mid = y2 - y1;
}
function getDistance_pdcr_small(x1, y1, x2, y2){
    xDistance_pdcr_small = x2 - x1;
    yDistance_pdcr_small = y2 - y1;
}
function getDistance_f96(x1, y1, x2, y2){
    xDistance_f96 = x2 - x1;
    yDistance_f96 = y2 - y1;
}
function getDistance_pdcs(x1, y1, x2, y2){
    xDistance_pdcs = x2 - x1;
    yDistance_pdcs = y2 - y1;
    // console.log("Distancia en X: ",xDistance);
    // console.log("Distancia en Y: ",yDistance);
}
function getDistance_tblu(x1, y1, x2, y2){
    xDistance_tblu = x2 - x1;
    yDistance_tblu = y2 - y1;
}
function getDistance_pdcd(x1, y1, x2, y2){
    xDistance_pdcd = x2 - x1;
    yDistance_pdcd = y2 - y1;
}
function getDistance_pdcp(x1, y1, x2, y2){
    xDistance_pdcp = x2 - x1;
    yDistance_pdcp = y2 - y1;
}

function cargar_info(){
    fetch(dominio+"/api/get/"+DBEVENT+"/preview/modularity/"+sessionStorage.getItem('modularidad'))
    .then(data=>data.json())
    .then(data=>{
        for (let index = 0; index < loading.length; index++) {
            loading[index].style.display = 'none';
        }
        pdf_vision.style.display = 'inline-flex';
        console.log("DATA: ",data)
        modularity = data
        console.log("ESTA ES LA VARIANTE: ",modularity['variante'])
    
	var keys = Object.keys(modularity)
	// console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		// console.log("CAJA: ",keys[i]);
		if (modularity[keys[i]] == '{}') {
		} else{
			var fusibles = Object.keys(modularity[keys[i]]);
			// console.log("ARRAY DE FUSIBLES: ",fusibles);
			// console.log(fusibles);
			for (var j = 0; j < fusibles.length; j++) {
				// console.log("Fusible: ",fusibles[j])
				// console.log("Valor del Fusible: ",modularity[keys[i]][fusibles[j]]);
                if (modularity['variante'] == "PDC-R"){
                    if (keys[i] == "PDC-R" | keys[i] == "PDC-RMID" | keys[i] == "PDC-RS") {
                        if (fusibles[j] != "F96") {
                            pdcr_array.push(fusibles[j]);
                        }else{
                            f96_array.push(fusibles[j]);
                            cargar_imagen_f96();
                        }
                    }
                }
                else if (modularity['variante'] == "PDC-RMID"){
                    if (keys[i] == "PDC-R" | keys[i] == "PDC-RMID" | keys[i] == "PDC-RS") {
                        if (fusibles[j] != "F96") {
                            pdcr_1_array.push(fusibles[j]);
                        }else{
                            f96_array.push(fusibles[j]);
                            cargar_imagen_f96();
                        }
                    }
                }
                else if (modularity['variante'] == "PDC-RS"){
                    if (keys[i] == "PDC-R" | keys[i] == "PDC-RMID" | keys[i] == "PDC-RS") {
                        if (fusibles[j] != "F96") {
                            pdcr_small_array.push(fusibles[j]);
                        }else{
                            f96_array.push(fusibles[j]);
                            cargar_imagen_f96();
                        }
                        console.log("MOSTRANDO PDC-RS (Aún falta esta parte en el código por lo que la visualización en la pag web será incierta)")
                    }
                }
                else if (modularity['variante'] == "N/A"){
                    console.log("Esta Modularidad no cuenta con módulos que determinen alguna variante de la caja PDC-R")
                    document.getElementById('caja_pdcr').innerHTML = 'Esta Modularidad no cuenta con ninguna configuración para la caja PDC-R.'
                }
                if (JSON.stringify(modularity["PDC-R"]) == '{}' && JSON.stringify(modularity["PDC-RMID"]) == '{}'){
                    document.getElementById('caja_pdcr').innerHTML = 'Esta Modularidad no cuenta con ninguna configuración para la caja PDC-R.'
                }
                if (keys[i] == "PDC-S") {
                    pdcs_array.push(fusibles[j]);
                    // cargar_imagen_pdcs();
                }
                if (keys[i] == "TBLU") {
                    tblu_array.push(fusibles[j]);
                    // cargar_imagen_tblu();
                }
                if (keys[i] == "PDC-D") {
                    pdcd_array.push(fusibles[j]);
                    // cargar_imagen_pdcd();
                }
                if (keys[i] == "PDC-P") {
                    pdcp_array.push(fusibles[j]);
                    // cargar_imagen_pdcp();
                }
			}
		}
	}
    // console.log("Tipo de Caja PDC-R: ",caja_pdcr);
    // if (caja_pdcr == "r") {
    //     console.log("Mostrando Caja PDC-R");
    //     document.getElementById('pdcr_title').innerHTML = 'PDC-R';
    //     document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_image_v_canvas" class="img-fluid" style="margin-left: 15%"></canvas>';
    //     img_pdcr = document.getElementById('pdcr_image_v_canvas');
    //     var t1 = new ToolTip_pdcr(img_pdcr, "This is a tool-tip", 150);
    //     cargar_imagen_pdcr();
    // }else{
    //     console.log("Mostrando Caja PDC-RMID");
    //     document.getElementById('pdcr_title').innerHTML = 'PDC-RMID';
    //     document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_1_image_v_canvas" class="img-fluid" style="margin-left: 9%"></canvas>';
    //     img_pdcr_1 = document.getElementById('pdcr_1_image_v_canvas');
    //     var t1 = new ToolTip_pdcr_1(img_pdcr_1, "This is a tool-tip", 150);
    //     cargar_imagen_pdcr_1();
    // }

    if (modularity['variante'] == "PDC-R") { /// Si la caja es PDC-R mostrará dicho canvas tanto para Visión como para Torque
        console.log("Mostrando Caja PDC-R");
        document.getElementById('pdcr_title').innerHTML = 'PDC-R';
        document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_image_v_canvas" class="img-fluid" style="margin-left: 15%"></canvas>';
        img_pdcr = document.getElementById('pdcr_image_v_canvas');
        var t1 = new ToolTip_pdcr(img_pdcr, "This is a tool-tip", 150);
        cargar_imagen_pdcr();
    }
    else if (modularity['variante'] == "PDC-RMID"){
        console.log("Mostrando Caja PDC-RMID"); /// Si la caja es PDC-RMID mostrará dicho canvas tanto para Visión como para Torque
        document.getElementById('pdcr_title').innerHTML = 'PDC-RMID';
        document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_1_image_v_canvas" class="img-fluid" style="margin-left: 9%"></canvas>';
        img_pdcr_1 = document.getElementById('pdcr_1_image_v_canvas');
        var t1 = new ToolTip_pdcr_1(img_pdcr_1, "This is a tool-tip", 150);
        cargar_imagen_pdcr_1();
    }
    else if (modularity['variante'] == "PDC-RS"){
        console.log("Mostrando Caja PDC-RS"); /// Si la caja es PDC-RS mostrará dicho canvas tanto para Visión como para Torque
        document.getElementById('pdcr_title').innerHTML = 'PDC-RS';
        document.getElementById('caja_pdcr').innerHTML = '<canvas id="pdcr_small_image_v_canvas" class="img-fluid" style="margin-left: 9%"></canvas>';
        img_pdcr_small = document.getElementById('pdcr_small_image_v_canvas');
        var t1 = new ToolTip_pdcr_small(img_pdcr_small, "This is a tool-tip", 150);
        cargar_imagen_pdcr_small();
    }


    if (f96_array.length == 0){
        console.log("No lleva F96",f96_array)
        document.getElementById('f96_n/a').innerHTML = 'No Aplica para esta Modularidad';
    }
    cargar_imagen_pdcd();
    cargar_imagen_pdcs();
    cargar_imagen_tblu();
    cargar_imagen_pdcp();
    })
}

function cargar_imagen_pdcr(){
    if (img_pdcr.getContext) {
        var ctx_pdcr = img_pdcr.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr/pdcr.jpg";
        img.onload = function(){
            imgWidth_pdcr = this.width;
            imgHeight_pdcr = this.height;
            img_pdcr.width = imgWidth_pdcr;
            img_pdcr.height = imgHeight_pdcr;
            // console.log("imgWidth_pdcr: ",imgWidth_pdcr);
            // console.log("imgHeight_pdcr: ",imgHeight_pdcr);
            // console.log("img_pdcr.width: ",img_pdcr.width);
            // console.log("img_pdcr.height: ",img_pdcr.height);
            ctx_pdcr.drawImage(this,0,0,imgWidth_pdcr,imgHeight_pdcr);
            var datosimagen = ctx_pdcr.getImageData(0,0,imgWidth_pdcr,imgHeight_pdcr);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr = datosimagen.data;
            ctx_pdcr.fillStyle = "#0F53F1";
            ctx_pdcr.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-R");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-R: ",pdcr_array)
                    for (let i = 0; i < pdcr_array.length; i++) {
                        let fusibleColocado;
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        if (modularity["PDC-R"].hasOwnProperty(pdcr_array[i])){
                            fusibleColocado = modularity["PDC-R"][pdcr_array[i]][0];
                        }
                        else if (modularity["PDC-RMID"].hasOwnProperty(pdcr_array[i])){
                            fusibleColocado = modularity["PDC-RMID"][pdcr_array[i]][0];
                        }
                        else if (modularity["PDC-RS"].hasOwnProperty(pdcr_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_array[i]][0];
                        }  
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-R"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-R"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-R"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-R"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcr(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("PDC-R DISTANCE X",xDistance_pdcr)
                        // console.log("PDC-R DISTANCE Y",yDistance_pdcr)
                        if (yDistance_pdcr > xDistance_pdcr){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcr.beginPath();
                                // console.log("PDC-R DISTANCE X dentro del onload",xDistance_pdcr)
                                // console.log("PDC-R DISTANCE Y dentro del onload",yDistance_pdcr)
                                ctx_pdcr.drawImage(this,cavidadx, cavidady,xDistance_pdcr,yDistance_pdcr);
                                ctx_pdcr.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcr_1(){
    if (img_pdcr_1.getContext) {
        var ctx_pdcr_mid = img_pdcr_1.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_1/pdcr_1.jpg";
        img.onload = function(){
            imgWidth_pdcr_mid = this.width;
            imgHeight_pdcr_mid = this.height;
            img_pdcr_1.width = imgWidth_pdcr_mid;
            img_pdcr_1.height = imgHeight_pdcr_mid;
            // console.log("imgWidth_pdcr_mid: ",imgWidth_pdcr_mid);
            // console.log("imgHeight_pdcr_mid: ",imgHeight_pdcr_mid);
            // console.log("img_pdcr_1.width: ",img_pdcr_1.width);
            // console.log("img_pdcr_1.height: ",img_pdcr_1.height);
            ctx_pdcr_mid.drawImage(this,0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            var datosimagen = ctx_pdcr_mid.getImageData(0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_mid = datosimagen.data;
            ctx_pdcr_mid.fillStyle = "#0F53F1";
            ctx_pdcr_mid.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-RMID");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-RMID: ",pdcr_1_array)
                    for (let i = 0; i < pdcr_1_array.length; i++) {
                        let fusibleColocado;
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_1_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        if (modularity["PDC-RMID"].hasOwnProperty(pdcr_1_array[i])){
                            fusibleColocado = modularity["PDC-RMID"][pdcr_1_array[i]][0];
                        }
                        else if (modularity["PDC-RS"].hasOwnProperty(pdcr_1_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_1_array[i]][0];
                        }
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-RMID"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-RMID"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-RMID"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-RMID"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcr_mid(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("PDC-RMID DISTANCE X",xDistance_pdcr_mid)
                        // console.log("PDC-RMID DISTANCE Y",yDistance_pdcr_mid)
                        if (yDistance_pdcr_mid > xDistance_pdcr_mid){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcr_mid.beginPath();
                                // console.log("PDC-RMID DISTANCE X dentro del onload",xDistance_pdcr_mid)
                                // console.log("PDC-RMID DISTANCE Y dentro del onload",yDistance_pdcr_mid)
                                ctx_pdcr_mid.drawImage(this,cavidadx, cavidady,xDistance_pdcr_mid,yDistance_pdcr_mid);
                                ctx_pdcr_mid.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcr_small(){
    if (img_pdcr_small.getContext) {
        var ctx_pdcr_small = img_pdcr_small.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcr_small/pdcrs.jpg";
        img.onload = function(){
            imgWidth_pdcr_small = this.width;
            imgHeight_pdcr_small = this.height;
            img_pdcr_small.width = imgWidth_pdcr_small;
            img_pdcr_small.height = imgHeight_pdcr_small;
            // console.log("imgWidth_pdcr_small: ",imgWidth_pdcr_small);
            // console.log("imgHeight_pdcr_small: ",imgHeight_pdcr_small);
            // console.log("img_pdcr_small.width: ",img_pdcr_small.width);
            // console.log("img_pdcr_small.height: ",img_pdcr_small.height);
            ctx_pdcr_small.drawImage(this,0,0,imgWidth_pdcr_small,imgHeight_pdcr_small);
            var datosimagen = ctx_pdcr_small.getImageData(0,0,imgWidth_pdcr_small,imgHeight_pdcr_small);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcr_small = datosimagen.data;
            ctx_pdcr_small.fillStyle = "#0F53F1";
            ctx_pdcr_small.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-RS");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-RS: ",pdcr_small_array)
                    for (let i = 0; i < pdcr_small_array.length; i++) {
                        let fusibleColocado;
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_small_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        if (modularity["PDC-RS"].hasOwnProperty(pdcr_small_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_small_array[i]][0];
                        }
                        else if (modularity["PDC-RS"].hasOwnProperty(pdcr_small_array[i])){
                            fusibleColocado = modularity["PDC-RS"][pdcr_small_array[i]][0];
                        }
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-RS"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-RS"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-RS"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-RS"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcr_small(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("PDC-RS DISTANCE X",xDistance_pdcr_small)
                        // console.log("PDC-RS DISTANCE Y",yDistance_pdcr_small)
                        if (yDistance_pdcr_small > xDistance_pdcr_small){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcr_small.beginPath();
                                // console.log("PDC-RS DISTANCE X dentro del onload",xDistance_pdcr_small)
                                // console.log("PDC-RS DISTANCE Y dentro del onload",yDistance_pdcr_small)
                                ctx_pdcr_small.drawImage(this,cavidadx, cavidady,xDistance_pdcr_small,yDistance_pdcr_small);
                                ctx_pdcr_small.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_f96(){
    if (img_f96.getContext) {
        var ctx_f96 = img_f96.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/f96/f96.jpg";
        img.onload = function(){
            imgWidth_f96 = this.width;
            imgHeight_f96 = this.height;
            img_f96.width = imgWidth_f96;
            img_f96.height = imgHeight_f96;
            // console.log("imgWidth_f96: ",imgWidth_f96);
            // console.log("imgHeight_f96: ",imgHeight_f96);
            // console.log("img_f96.width: ",img_f96.width);
            // console.log("img_f96.height: ",img_f96.height);
            ctx_f96.drawImage(this,0,0,imgWidth_f96,imgHeight_f96);
            var datosimagen = ctx_f96.getImageData(0,0,imgWidth_f96,imgHeight_f96);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_f96 = datosimagen.data;
            ctx_f96.fillStyle = "#0F53F1";
            ctx_f96.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-RMID");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY F96: ",f96_array)
                    for (let i = 0; i < f96_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = f96_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-RMID"][f96_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["F96"][cavidad][0][0];
                        let cavidady = fuses_BB["F96"][cavidad][0][1];
                        let cavidadw = fuses_BB["F96"][cavidad][1][0];
                        let cavidadh = fuses_BB["F96"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_f96(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("F96 DISTANCE X",xDistance_f96)
                        // console.log("F96 DISTANCE Y",yDistance_f96)
                        if (yDistance_f96 > xDistance_f96){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_f96.beginPath();
                                // console.log("F96 DISTANCE X dentro del onload",xDistance_f96)
                                // console.log("F96 DISTANCE Y dentro del onload",yDistance_f96)
                                ctx_f96.drawImage(this,cavidadx, cavidady,xDistance_f96,yDistance_f96);
                                ctx_f96.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcs(){
    if (img_pdcs.getContext) {
        var ctx = img_pdcs.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcs/pdcs.jpg";
        img.onload = function(){
            imgWidth_pdcs = this.width;
            imgHeight_pdcs = this.height;
            img_pdcs.width = imgWidth_pdcs;
            img_pdcs.height = imgHeight_pdcs;
            // console.log("imgWidth_pdcs: ",imgWidth_pdcs);
            // console.log("imgHeight_pdcs: ",imgHeight_pdcs);
            // console.log("img_pdcs.width: ",img_pdcs.width);
            // console.log("img_pdcs.height: ",img_pdcs.height);
            ctx.drawImage(this,0,0,imgWidth_pdcs,imgHeight_pdcs);
            var datosimagen = ctx.getImageData(0,0,imgWidth_pdcs,imgHeight_pdcs);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcs = datosimagen.data;
            ctx.fillStyle = "#0F53F1";
            ctx.lineWidth = "4";
            // console.log("La Caja a pintar es la siguiente: PDC-S");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-S: ",pdcs_array)
                    for (let i = 0; i < pdcs_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcs_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-S"][pdcs_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-S"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-S"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-S"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-S"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcs(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("PDC-S DISTANCE X",xDistance_pdcs)
                        // console.log("PDC-S DISTANCE Y",yDistance_pdcs)
                        if (yDistance_pdcs > xDistance_pdcs){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx.beginPath();
                                // console.log("PDC-S DISTANCE X dentro del onload",xDistance_pdcs)
                                // console.log("PDC-S DISTANCE Y dentro del onload",yDistance_pdcs)
                                ctx.drawImage(this,cavidadx, cavidady,xDistance_pdcs,yDistance_pdcs);
                                ctx.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_tblu(){
    if (img_tblu.getContext) {
        var ctx_tblu = img_tblu.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/btlu/btlu.jpg";
        img.onload = function(){
            imgWidth_tblu = this.width;
            imgHeight_tblu = this.height;
            img_tblu.width = imgWidth_tblu;
            img_tblu.height = imgHeight_tblu;
            // console.log("imgWidth_tblu: ",imgWidth_tblu);
            // console.log("imgHeight_tblu: ",imgHeight_tblu);
            // console.log("img_tblu.width: ",img_tblu.width);
            // console.log("img_tblu.height: ",img_tblu.height);
            ctx_tblu.drawImage(this,0,0,imgWidth_tblu,imgHeight_tblu);
            var datosimagen = ctx_tblu.getImageData(0,0,imgWidth_tblu,imgHeight_tblu);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_tblu = datosimagen.data;
            ctx_tblu.fillStyle = "#0F53F1";
            ctx_tblu.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: TBLU");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY TBLU: ",tblu_array)
                    for (let i = 0; i < tblu_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = tblu_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["TBLU"][tblu_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["TBLU"][cavidad][0][0];
                        let cavidady = fuses_BB["TBLU"][cavidad][0][1];
                        let cavidadw = fuses_BB["TBLU"][cavidad][1][0];
                        let cavidadh = fuses_BB["TBLU"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_tblu(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("TBLU DISTANCE X",xDistance_tblu)
                        // console.log("TBLU DISTANCE Y",yDistance_tblu)
                        if (yDistance_tblu > xDistance_tblu){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_tblu.beginPath();
                                // console.log("TBLU DISTANCE X dentro del onload",xDistance_tblu)
                                // console.log("TBLU DISTANCE Y dentro del onload",yDistance_tblu)
                                ctx_tblu.drawImage(this,cavidadx, cavidady,xDistance_tblu,yDistance_tblu);
                                ctx_tblu.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcd(){
    if (img_pdcd.getContext) {
        var ctx_pdcd = img_pdcd.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcd/pdcd.jpg";
        img.onload = function(){
            imgWidth_pdcd = this.width;
            imgHeight_pdcd = this.height;
            img_pdcd.width = imgWidth_pdcd;
            img_pdcd.height = imgHeight_pdcd;
            ctx_pdcd.drawImage(this,0,0,imgWidth_pdcd,imgHeight_pdcd);
            var datosimagen = ctx_pdcd.getImageData(0,0,imgWidth_pdcd,imgHeight_pdcd);
            datosPrim_pdcd = datosimagen.data;
            ctx_pdcd.fillStyle = "#0F53F1";
            ctx_pdcd.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-D");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-D: ",pdcd_array)
                    for (let i = 0; i < pdcd_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcd_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-D"][pdcd_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-D"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-D"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-D"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-D"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcd(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("PDC-D DISTANCE X",xDistance_pdcd)
                        // console.log("PDC-D DISTANCE Y",yDistance_pdcd)
                        if (yDistance_pdcd > xDistance_pdcd){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcd.beginPath();
                                // console.log("PDC-D DISTANCE X dentro del onload",xDistance_pdcd)
                                // console.log("PDC-D DISTANCE Y dentro del onload",yDistance_pdcd)
                                ctx_pdcd.drawImage(this,cavidadx, cavidady,xDistance_pdcd,yDistance_pdcd);
                                ctx_pdcd.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

function cargar_imagen_pdcp(){
    if (img_pdcp.getContext) {
        var ctx_pdcp = img_pdcp.getContext("2d");
        var img = new Image();
        img.src = "static/content/cajas/interior/pdcp/pdcp.jpg";
        img.onload = function(){
            imgWidth_pdcp = this.width;
            imgHeight_pdcp = this.height;
            img_pdcp.width = imgWidth_pdcp;
            img_pdcp.height = imgHeight_pdcp;
            // console.log("imgWidth_pdcp: ",imgWidth_pdcp);
            // console.log("imgHeight_pdcp: ",imgHeight_pdcp);
            // console.log("img_pdcp.width: ",img_pdcp.width);
            // console.log("img_pdcp.height: ",img_pdcp.height);
            ctx_pdcp.drawImage(this,0,0,imgWidth_pdcp,imgHeight_pdcp);
            var datosimagen = ctx_pdcp.getImageData(0,0,imgWidth_pdcp,imgHeight_pdcp);
            // console.log("datos imagen: ",datosimagen)
            datosPrim_pdcp = datosimagen.data;
            ctx_pdcp.fillStyle = "#0F53F1";
            ctx_pdcp.lineWidth = "3";
            // console.log("La Caja a pintar es la siguiente: PDC-P");
            pintar()

            function pintar(){
                (async() => {
                    // console.log("MI ARRAY PDC-P: ",pdcp_array)
                    for (let i = 0; i < pdcp_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcp_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = modularity["PDC-P"][pdcp_array[i]][0];
                        // console.log("Fusible Colocado: ",fusibleColocado);

                        let cavidadx = fuses_BB["PDC-P"][cavidad][0][0];
                        let cavidady = fuses_BB["PDC-P"][cavidad][0][1];
                        let cavidadw = fuses_BB["PDC-P"][cavidad][1][0];
                        let cavidadh = fuses_BB["PDC-P"][cavidad][1][1];
                        // console.log(cavidadx)
                        // console.log(cavidady)
                        // console.log(cavidadw)
                        // console.log(cavidadh)
                        getDistance_pdcp(cavidadx,cavidady,cavidadw,cavidadh);
                        // console.log("PDC-P DISTANCE X",xDistance_pdcp)
                        // console.log("PDC-P DISTANCE Y",yDistance_pdcp)
                        if (yDistance_pdcp > xDistance_pdcp){
                            orientacion = "v";
                            // console.log("Vertical")
                        }else{
                            // console.log("Horizontal")
                            orientacion = "h";
                        }
                        fusible_imagen.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        // console.log(fusible_imagen.src);
                        await new Promise((resolve,reject)=>{
                            fusible_imagen.onload = function(){
                                ctx_pdcp.beginPath();
                                // console.log("PDC-P DISTANCE X dentro del onload",xDistance_pdcp)
                                // console.log("PDC-P DISTANCE Y dentro del onload",yDistance_pdcp)
                                ctx_pdcp.drawImage(this,cavidadx, cavidady,xDistance_pdcp,yDistance_pdcp);
                                ctx_pdcp.closePath();
                                resolve();
                            }
                            fusible_imagen.onerror = function(){
                                // console.log("ERROR AL CARGAR LA IMAGEN")
                                reject();
                            }

                        });
                        
                        
                    }
                })()
            }
        }
    }
}

//////////////////////////////////////////// ToolTips para Cavidades ////////////////////////////////////////////
// create a tool-tip instance:
var t1 = new ToolTip_pdcs(img_pdcs, "This is a tool-tip", 150);
// The Tool-Tip instance:
function ToolTip_pdcs(img_pdcs, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcs.parentNode,               // parent node for img_pdcs
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcs
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-S']);
// console.log("KEYS DE PDCS: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=1;i<keys_cavidad.length+1;i++){
        let fusible_tooltip;
        if (!visible && pos.x>=fuses_BB['PDC-S'][i][0][0] && pos.x<=fuses_BB['PDC-S'][i][1][0] && pos.y>=fuses_BB['PDC-S'][i][0][1] && pos.y<=fuses_BB['PDC-S'][i][1][1]) {
            cavidad = keys_cavidad[i-1];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-S'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-S'][cavidad][0];
                module = modularity['PDC-S'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcs
function getPos(e) {
    var r = img_pdcs.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcs.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-R ToolTip
function ToolTip_pdcr(img_pdcr, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcr.parentNode,               // parent node for img_pdcr
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcr
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-R']);
// console.log("KEYS DE PDC-R: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-R'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-R'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-R'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-R'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-R'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-R'][cavidad][0];
                module = modularity['PDC-R'][cavidad][1];
            }
            else if (modularity['PDC-RMID'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RMID'][cavidad][0];
                module = modularity['PDC-RMID'][cavidad][1];
            }
            else if (modularity['PDC-RS'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RS'][cavidad][0];
                module = modularity['PDC-RS'][cavidad][1];
            }else{
                fusible_tooltip = "Vacío";
                module = "N/A";
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcr
function getPos(e) {
    var r = img_pdcr.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcr.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-RMID ToolTip
function ToolTip_pdcr_1(img_pdcr_1, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcr_1.parentNode,               // parent node for img_pdcr_1
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcr_1
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-RMID']);
// console.log("KEYS DE PDC-RMID: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-RMID'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-RMID'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-RMID'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-RMID'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-RMID'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RMID'][cavidad][0];
                module = modularity['PDC-RMID'][cavidad][1];
            }
            else if (modularity['PDC-RS'].hasOwnProperty(cavidad)){
                fusible_tooltip = modularity['PDC-RS'][cavidad][0];
                module = modularity['PDC-RS'][cavidad][1];
            }else{
                fusible_tooltip = "Vacío";
                module = "N/A";
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcr_1
function getPos(e) {
    var r = img_pdcr_1.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcr_1.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-RS ToolTip
function ToolTip_pdcr_small(img_pdcr_small, text, width) {
    var me = this,                                // self-reference for event handlers
    div = document.createElement("div"),      // the tool-tip div
    parent = img_pdcr_small.parentNode,               // parent node for img_pdcr_small
    visible = false;                          // current status
    // show the tool-tip
    this.show = function(pos) {
        if (!visible) {                             // ignore if already shown (or reset time)
            visible = true;                           // lock so it's only shown once
            setDivPos(pos);                           // set position
            parent.appendChild(div);                // add to parent of img_pdcr_small
        }
    }
    // hide the tool-tip
    function hide() {
        visible = false;                            // hide it after timeout
        if (parent.contains(div)) {
            parent.removeChild(div);                    // remove from DOM
        }
    }
    
    let keys_cavidad = Object.keys(fuses_BB['PDC-RS']);
    // console.log("KEYS DE PDC-RS: ",keys_cavidad);
    let cavidad;
    let module;
    // check mouse position, add limits as wanted... just for example:
    function check(e) {
        if(parent.contains(div)){
            hide();
        }
        var pos = getPos(e),
            posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
        for(i=0;i<keys_cavidad.length;i++){
            if (!visible && pos.x>=fuses_BB['PDC-RS'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-RS'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-RS'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-RS'][keys_cavidad[i]][1][1]) {
                cavidad = keys_cavidad[i];
                // set some initial styles, can be replaced by class-name etc.
                div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
                if (modularity['PDC-RS'].hasOwnProperty(cavidad)){
                    fusible_tooltip = modularity['PDC-RS'][cavidad][0];
                    module = modularity['PDC-RS'][cavidad][1];
                }else{
                    fusible_tooltip = "Vacío";
                    module = "N/A";
                }
                div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
                me.show(posAbs);                          // show tool-tip at this pos
            }
            else setDivPos(posAbs);
        }// otherwise, update position
    }
    // get mouse position relative to img_pdcr_small
    function getPos(e) {
        var r = img_pdcr_small.getBoundingClientRect();
        return {x: e.clientX - r.left, y: e.clientY - r.top}
    }
    // update and adjust div position if needed (anchor to a different corner etc.)
    function setDivPos(pos) {
        if (visible){
        if (pos.x < 0) pos.x = 0;
        if (pos.y < 0) pos.y = 0;
        // other bound checks here
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        }
    }
    // we need to use shared event handlers:
    img_pdcr_small.addEventListener("mousemove", check);
    $(document).on('wheel', function(){ 
        hide();
    });
    }
//  TBLU ToolTip
var t1 = new ToolTip_tblu(img_tblu, "This is a tool-tip", 150);
function ToolTip_tblu(img_tblu, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_tblu.parentNode,               // parent node for img_tblu
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_tblu
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['TBLU']);
// console.log("KEYS DE PDCS: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=1;i<keys_cavidad.length+1;i++){
        if (!visible && pos.x>=fuses_BB['TBLU'][i][0][0] && pos.x<=fuses_BB['TBLU'][i][1][0] && pos.y>=fuses_BB['TBLU'][i][0][1] && pos.y<=fuses_BB['TBLU'][i][1][1]) {
            cavidad = keys_cavidad[i-1];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['TBLU'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['TBLU'][cavidad][0];
                module = modularity['TBLU'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_tblu
function getPos(e) {
    var r = img_tblu.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_tblu.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-D ToolTip
var t1 = new ToolTip_pdcd(img_pdcd, "This is a tool-tip", 150);
function ToolTip_pdcd(img_pdcd, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcd.parentNode,               // parent node for img_pdcd
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcd
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-D']);
// console.log("KEYS DE PDC-D: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-D'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-D'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-D'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-D'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-D'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-D'][cavidad][0];
                module = modularity['PDC-D'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcd
function getPos(e) {
    var r = img_pdcd.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcd.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  PDC-P ToolTip
var t1 = new ToolTip_pdcp(img_pdcp, "This is a tool-tip", 150);
function ToolTip_pdcp(img_pdcp, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_pdcp.parentNode,               // parent node for img_pdcp
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_pdcp
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['PDC-P']);
// console.log("KEYS DE PDC-P: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['PDC-P'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-P'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-P'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-P'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-P'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-P'][cavidad][0];
                module = modularity['PDC-P'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_pdcp
function getPos(e) {
    var r = img_pdcp.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_pdcp.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}
//  F96 ToolTip
var t1 = new ToolTip_f96(img_f96, "This is a tool-tip", 150);
function ToolTip_f96(img_f96, text, width) {
var me = this,                                // self-reference for event handlers
div = document.createElement("div"),      // the tool-tip div
parent = img_f96.parentNode,               // parent node for img_f96
visible = false;                          // current status
// show the tool-tip
this.show = function(pos) {
    if (!visible) {                             // ignore if already shown (or reset time)
        visible = true;                           // lock so it's only shown once
        setDivPos(pos);                           // set position
        parent.appendChild(div);                // add to parent of img_f96
    }
}
// hide the tool-tip
function hide() {
    visible = false;                            // hide it after timeout
    if (parent.contains(div)) {
        parent.removeChild(div);                    // remove from DOM
    }
}

let keys_cavidad = Object.keys(fuses_BB['F96']);
// console.log("KEYS DE F96: ",keys_cavidad);
let cavidad;
let module;
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        if (!visible && pos.x>=fuses_BB['F96'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['F96'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['F96'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['F96'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (modularity['PDC-RMID'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
                module = "N/A";
            }else{
                fusible_tooltip = modularity['PDC-RMID'][cavidad][0];
                module = modularity['PDC-RMID'][cavidad][1];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip+'<br>Módulo: '+module;
            me.show(posAbs);                          // show tool-tip at this pos
        }
        else setDivPos(posAbs);
    }// otherwise, update position
}
// get mouse position relative to img_f96
function getPos(e) {
    var r = img_f96.getBoundingClientRect();
    return {x: e.clientX - r.left, y: e.clientY - r.top}
}
// update and adjust div position if needed (anchor to a different corner etc.)
function setDivPos(pos) {
    if (visible){
    if (pos.x < 0) pos.x = 0;
    if (pos.y < 0) pos.y = 0;
    // other bound checks here
    div.style.left = pos.x + "px";
    div.style.top = pos.y + "px";
    }
}
// we need to use shared event handlers:
img_f96.addEventListener("mousemove", check);
$(document).on('wheel', function(){ 
    hide();
});
}

//////////////////////////////////////////// DESCARGA DE VISUALES ////////////////////////////////////////////
//-----------------------------  VISIÓN
$('#pdf_vision').on('click', function(){
    console.log("Click en descargar visuales para visión");
    let $elemento = modularidad_vision;
    html2pdf()
    .set({
        margin:1,
        filename: sessionStorage.getItem('modularidad')+' Vision Visuales',
        html2canvas: {
            scale: 3,
            letterRendering: true,
        },
        jsPDF: {
            unit: "in",
            format: "a3",
            orientation: 'portrait'
        },
        pagebreak: {
            mode: ['avoid-all','css','legacy']
        }
    })
    .from($elemento)
    .save()
    .catch(err => console.log(err));
});