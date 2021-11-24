let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);

document.getElementById("modulov_titulo").innerHTML = sessionStorage.getItem('edit_vision');
document.getElementById('modulo_vision').value = sessionStorage.getItem('edit_vision');
var edit_id = sessionStorage.getItem('edit_vision_id');

let img_pdcr = document.getElementById('pdcr_image_v_canvas');
let img_pdcr_1 = document.getElementById('pdcr_1_image_v_canvas');
let img_pdcr_small = document.getElementById('pdcr_small_image_v_canvas');
let img_pdcs = document.getElementById('pdcs_image_v_canvas');
let img_tblu = document.getElementById('tblu_image_v_canvas');
let img_pdcd = document.getElementById('pdcd_image_v_canvas');
let img_pdcp = document.getElementById('pdcp_image_v_canvas');

var imgWidth_pdcr, imgHeight_pdcr, datosPrim_pdcr;
var imgWidth_pdcr_mid, imgHeight_pdcr_mid, datosPrim_pdcr_mid;
var imgWidth_pdcr_small, imgHeight_pdcr_small, datosPrim_pdcr_small;
var imgWidth_pdcs, imgHeight_pdcs, datosPrim_pdcs;
var imgWidth_tblu, imgHeight_tblu, datosPrim_tblu;
var imgWidth_pdcd, imgHeight_pdcd, datosPrim_pdcd;
var imgWidth_pdcp, imgHeight_pdcp, datosPrim_pdcp;
var color = "empty";
var color_style = "blue";
let caja;
let hold_config;
let fusible_i;
let fusible_i2;
let fusible_f;
let fusible_f2;
let orientacion;
var fusible_imagen = new Image();
var modularity;
let caja_pdcr;

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
var fuses_value = {
    'PDC-P': {
        'MF1': color, 'MF2': color, 'F300': color, 'F301': color, 'F302': color, 'F303': color, 'F304': color, 'F305': color, 'F318': color, 
        'F319': color, 'F320': color, 'F321': color, 'F322': color, 'F323': color, 'F324': color, 'F325': color, 'F326': color, 'F327': color, 
        'F328': color, 'F329': color, 'F330': color, 'F331': color, 'F332': color, 'F333': color, 'F334': color, 'F335': color, 'E21': color, 
        'E22': color
    },
    'PDC-D': {
        'F200': color, 'F201': color, 'F202': color, 'F203': color, 'F204': color, 'F205': color, 'F206': color, 'F207': color, 'F208': color, 
        'F209': color, 'F210': color, 'F211': color, 'F212': color, 'F213': color, 'F214': color, 'F215': color, 'F216': color, 'F217': color, 
        'F218': color, 'F219': color, 'F220': color, 'F221': color, 'F222': color, 'F223': color, 'F224': color, 'F225': color, 'F226': color, 
        'F227': color, 'F228': color, 'F229': color, 'F230': color, 'F231': color, 'F232': color
    },
    'PDC-R': {
        'F400': color, 'F401': color, 'F402': color, 'F403': color, 'F404': color, 'F405': color, 'F411': color, 'F410': color, 'F409': color, 
        'F408': color, 'F407': color, 'F406': color, 'F412': color, 'F413': color, 'F414': color, 'F415': color, 'F416': color, 'F417': color, 
        'F420': color, 'F419': color, 'F418': color, 'F421': color, 'F422': color, 'F423': color, 'F424': color, 'F425': color, 'F426': color, 
        'F427': color, 'F428': color, 'F429': color, 'F430': color, 'F431': color, 'F437': color, 'F438': color, 'F439': color, 'F440': color, 
        'F441': color, 'F432': color, 'F433': color, 'F434': color, 'F435': color, 'F436': color, 'F442': color, 'F443': color, 'F444': color, 
        'F445': color, 'F446': color, 'F449': color, 'F448': color, 'F447': color, 'F450': color, 'F451': color, 'F452': color, 'F453': color, 
        'F454': color, 'F455': color, 'F456': color, 'F457': color, 'F458': color, 'F459': color, 'F460': color, 'F461': color, 'F462': color, 
        'F463': color, 'F464': color, 'F465': color, 'F466': color, 'F467': color, 'F468': color, 'F469': color, 'F470': color, 'F471': color, 
        'F472': color, 'F473': color, 'F474': color, 'F475': color, 'F476': color, 'F477': color, 'F478': color, 'F479': color, 'F480': color, 
        'F481': color, 'F482': color, 'RELX': color, 'RELU': color, 'RELT': color
    },
    'PDC-RMID': {
        'F400': color, 'F401': color, 'F402': color, 'F403': color, 'F404': color, 'F405': color, 'F411': color, 'F410': color, 'F409': color, 
        'F408': color, 'F407': color, 'F406': color, 'F412': color, 'F413': color, 'F414': color, 'F415': color, 'F416': color, 'F417': color, 
        'F420': color, 'F419': color, 'F418': color, 'F421': color, 'F422': color, 'F423': color, 'F424': color, 'F425': color, 'F426': color, 
        'F427': color, 'F428': color, 'F429': color, 'F430': color, 'F431': color, 'F437': color, 'F438': color, 'F439': color, 'F440': color, 
        'F441': color, 'F432': color, 'F433': color, 'F434': color, 'F435': color, 'F436': color, 'F442': color, 'F443': color, 'F444': color, 
        'F445': color, 'F446': color, 'F450': color, 'F451': color, 'F452': color, 'F453': color, 'F454': color, 'F455': color, 'F456': color, 
        'F457': color, 'F458': color, 'F459': color, 'F460': color, 'F461': color, 'RELX': color, 'RELU': color, 'RELT': color, 'F449': color, 
        'F448': color, 'F447': color
    },
    'PDC-RS': {
        'F400': color, 'F401': color, 'F402': color, 'F403': color, 'F404': color, 'F405': color, 'F411': color, 'F410': color, 'F409': color, 
        'F408': color, 'F407': color, 'F406': color, 'F412': color, 'F413': color, 'F414': color, 'F415': color, 'F416': color, 'F417': color, 
        'F420': color, 'F419': color, 'F418': color, 'F421': color, 'F422': color, 'F423': color, 'F424': color, 'F425': color, 'F426': color, 
        'F427': color, 'F428': color, 'F429': color, 'F430': color, 'F431': color, 'F437': color, 'F438': color, 'F439': color, 'F440': color, 
        'F441': color, 'F432': color, 'F433': color, 'F434': color, 'F435': color, 'F436': color, 'F442': color, 'F443': color, 'F444': color, 
        'F445': color, 'F446': color, 'F450': color, 'F451': color, 'F452': color, 'F453': color, 'F454': color, 'F455': color, 'F456': color, 
        'F457': color, 'F458': color, 'F459': color, 'F460': color, 'F461': color, 'RELX': color, 'RELU': color, 'RELT': color, 'F449': color, 
        'F448': color, 'F447': color
    },
    'PDC-S': {
        '1': color, '2': color, '3': color, '4': color, '5': color, '6': color
    }, 
    'TBLU': {
        '9': color, '8': color, '7': color, '6': color, '5': color, '4': color, '3': color, '2': color, '1': color
    }
}
var fuses_types = {
    'PDC-P': {
        'MF1': "MULTI", 'MF2': "MULTI", 'F300': "ATO", 'F301': "MINI", 'F302': "MINI", 'F303': "MINI", 'F304': "MINI", 'F305': "MINI", 'F318': "MINI", 
        'F319': "MINI", 'F320': "MINI", 'F321': "MINI", 'F322': "MINI", 'F323': "MINI", 'F324': "MINI", 'F325': "MINI", 'F326': "ATO", 'F327': "ATO", 
        'F328': "ATO", 'F329': "ATO", 'F330': "ATO", 'F331': "ATO", 'F332': "ATO", 'F333': "ATO", 'F334': "ATO", 'F335': "ATO", 'E21': "CONN", 
        'E22': "CONN"
    },
    'PDC-D': {
        'F200': "MINI", 'F201': "MINI", 'F202': "MINI", 'F203': "MINI", 'F204': "MINI", 'F205': "MINI", 'F206': "MINI", 'F207': "MINI", 'F208': "MINI", 
        'F209': "ATO", 'F210': "ATO", 'F211': "ATO", 'F212': "ATO", 'F213': "ATO", 'F214': "ATO", 'F215': "ATO", 'F216': "ATO", 'F217': "MINI", 
        'F218': "MINI", 'F219': "MINI", 'F220': "MINI", 'F221': "MINI", 'F222': "MINI", 'F223': "MINI", 'F224': "MINI", 'F225': "MINI", 'F226': "MINI", 
        'F227': "MINI", 'F228': "MINI", 'F229': "MINI", 'F230': "MINI", 'F231': "MINI", 'F232': "MINI"
    },
    'PDC-R': {
        'F400': "ATO", 'F401': "ATO", 'F402': "ATO", 'F403': "ATO", 'F404': "ATO", 'F405': "ATO", 'F411': "MINI", 'F410': "MINI", 'F409': "MINI", 
        'F408': "MINI", 'F407': "MINI", 'F406': "MINI", 'F412': "ATO", 'F413': "ATO", 'F414': "ATO", 'F415': "ATO", 'F416': "ATO", 'F417': "ATO", 
        'F420': "MAXI", 'F419': "MAXI", 'F418': "MAXI", 'F421': "ATO", 'F422': "ATO", 'F423': "ATO", 'F424': "ATO", 'F425': "ATO", 'F426': "ATO", 
        'F427': "MINI", 'F428': "MINI", 'F429': "MINI", 'F430': "MINI", 'F431': "MINI", 'F437': "MINI", 'F438': "MINI", 'F439': "MINI", 'F440': "MINI", 
        'F441': "MINI", 'F432': "MINI", 'F433': "MINI", 'F434': "MINI", 'F435': "MINI", 'F436': "MINI", 'F442': "MINI", 'F443': "MINI", 'F444': "MINI", 
        'F445': "MINI", 'F446': "MINI", 'F449': "MAXI", 'F448': "MAXI", 'F447': "MAXI", 'F450': "ATO", 'F451': "ATO", 'F452': "ATO", 'F453': "ATO", 
        'F454': "ATO", 'F455': "ATO", 'F456': "ATO", 'F457': "ATO", 'F458': "ATO", 'F459': "ATO", 'F460': "ATO", 'F461': "ATO", 'F462': "MAXI", 
        'F463': "MAXI", 'F464': "MAXI", 'F465': "MINI", 'F466': "MINI", 'F467': "MINI", 'F468': "MINI", 'F469': "MINI", 'F470': "MINI", 'F471': "ATO", 
        'F472': "ATO", 'F473': "ATO", 'F474': "ATO", 'F475': "ATO", 'F476': "ATO", 'F477': "ATO", 'F478': "ATO", 'F479': "ATO", 'F480': "ATO", 
        'F481': "ATO", 'F482': "ATO", 'RELX': "RELAY", 'RELU': "RELAY", 'RELT': "RELAY"
    },
    'PDC-RMID': {
        'F400': "ATO", 'F401': "ATO", 'F402': "ATO", 'F403': "ATO", 'F404': "ATO", 'F405': "ATO", 'F411': "MINI", 'F410': "MINI", 'F409': "MINI", 
        'F408': "MINI", 'F407': "MINI", 'F406': "MINI", 'F412': "ATO", 'F413': "ATO", 'F414': "ATO", 'F415': "ATO", 'F416': "ATO", 'F417': "ATO", 
        'F420': "MAXI", 'F419': "MAXI", 'F418': "MAXI", 'F421': "ATO", 'F422': "ATO", 'F423': "ATO", 'F424': "ATO", 'F425': "ATO", 'F426': "ATO", 
        'F427': "MINI", 'F428': "MINI", 'F429': "MINI", 'F430': "MINI", 'F431': "MINI", 'F437': "MINI", 'F438': "MINI", 'F439': "MINI", 'F440': "MINI", 
        'F441': "MINI", 'F432': "MINI", 'F433': "MINI", 'F434': "MINI", 'F435': "MINI", 'F436': "MINI", 'F442': "MINI", 'F443': "MINI", 'F444': "MINI", 
        'F445': "MINI", 'F446': "MINI", 'F450': "ATO", 'F451': "ATO", 'F452': "ATO", 'F453': "ATO", 'F454': "ATO", 'F455': "ATO", 'F456': "ATO", 
        'F457': "ATO", 'F458': "ATO", 'F459': "ATO", 'F460': "ATO", 'F461': "ATO", 'RELX': "RELAY", 'RELU': "RELAY", 'RELT': "RELAY", 'F449': "MAXI", 
        'F448': "MAXI", 'F447': "MAXI"
    },
    'PDC-RS': {
        'F400': "ATO", 'F401': "ATO", 'F402': "ATO", 'F403': "ATO", 'F404': "ATO", 'F405': "ATO", 'F411': "MINI", 'F410': "MINI", 'F409': "MINI", 
        'F408': "MINI", 'F407': "MINI", 'F406': "MINI", 'F412': "ATO", 'F413': "ATO", 'F414': "ATO", 'F415': "ATO", 'F416': "ATO", 'F417': "ATO", 
        'F420': "MAXI", 'F419': "MAXI", 'F418': "MAXI", 'F421': "ATO", 'F422': "ATO", 'F423': "ATO", 'F424': "ATO", 'F425': "ATO", 'F426': "ATO", 
        'F427': "MINI", 'F428': "MINI", 'F429': "MINI", 'F430': "MINI", 'F431': "MINI", 'F437': "MINI", 'F438': "MINI", 'F439': "MINI", 'F440': "MINI", 
        'F441': "MINI", 'F432': "MINI", 'F433': "MINI", 'F434': "MINI", 'F435': "MINI", 'F436': "MINI", 'F442': "MINI", 'F443': "MINI", 'F444': "MINI", 
        'F445': "MINI", 'F446': "MINI", 'F450': "ATO", 'F451': "ATO", 'F452': "ATO", 'F453': "ATO", 'F454': "ATO", 'F455': "ATO", 'F456': "ATO", 
        'F457': "ATO", 'F458': "ATO", 'F459': "ATO", 'F460': "ATO", 'F461': "ATO", 'RELX': "RELAY", 'RELU': "RELAY", 'RELT': "RELAY", 'F449': "MAXI", 
        'F448': "MAXI", 'F447': "MAXI"
    },
    'PDC-S': {
        '1': "ATO", '2': "ATO", '3': "ATO", '4': "ATO", '5': "ATO", '6': "ATO"
    }, 
    'TBLU': {
        '9': "ATO", '8': "ATO", '7': "ATO", '6': "ATO", '5': "ATO", '4': "ATO", '3': "ATO", '2': "ATO", '1': "ATO"
    }
}

var historial="";
var pdcr_caja="";
var pdcr_caja_to_db="";

var pdcr_array=[]
var pdcr_puntos=[]

var pdcr_1_array=[]
var pdcr_1_puntos=[]

var pdcr_small_array=[]
var pdcr_small_puntos=[]

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
    fetch(dominio+"/api/get/"+DBEVENT+"/modulos_fusibles/ID/=/"+edit_id+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{    
        console.log("DATA: ",data)
        modularity = data
    
	var keys = Object.keys(modularity)
	// console.log(keys);
	for (var i = 0; i < keys.length; i++) {
        // console.log("CAJA: ",keys[i]);
        if (keys[i] == 'ID' || keys[i] == 'MODULO') {
            // console.log("Columnas de ID y MODULO no se tomarán en cuenta");
        } else{
            // console.log(data[keys[i]]);
            if (data[keys[i]] == '{}') {
                // console.log('VACIO');
            } else{
                // console.log("CAJA: ",keys[i]);
                // console.log("Convertido el parse", JSON.parse(data[keys[i]]));
                var array_fus = Object.keys(JSON.parse(data[keys[i]]));
                // console.log("ARRAY DE FUSIBLES: ",array_fus);
                var lista_fusibles = data[keys[i]];
                // console.log("LISTA DE FUSIBLES A CONVERTIR: ",lista_fusibles);
                // console.log("LISTA DE FUSIBLES CONVERTIDO: ",JSON.parse(lista_fusibles));
                var fusibles = Object.keys(JSON.parse(lista_fusibles))
                // console.log("Fusibles: ",fusibles);
                // console.log("FUSES_VALUE: ",fuses_value)
                for (var j = 0; j < fusibles.length; j++) {
                    // console.log("Fusible: ",fusibles[j])
                    // console.log("Valor del Fusible: ",JSON.parse(lista_fusibles)[fusibles[j]]);
                    fuses_value[keys[i]][fusibles[j]] = JSON.parse(lista_fusibles)[fusibles[j]];
                    if (modularity["PDC-RS"][0] != '{}') {
                        console.log("CAJA PDC-RS")
                        caja_pdcr = "s";
                        if (keys[i] == "PDC-RS" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                            pdcr_small_array.push(fusibles[j]);
                        }
                    }else if(modularity["PDC-RMID"][0] != '{}'){
                        console.log("CAJA PDC-RMID")
                        caja_pdcr = "m";
                        if (keys[i] == "PDC-RMID" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                            pdcr_1_array.push(fusibles[j]);
                        }
                    }else if(modularity["PDC-R"][0] != '{}'){
                        console.log("CAJA PDC-R")
                        caja_pdcr = "r";
                        if (keys[i] == "PDC-R" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                            pdcr_array.push(fusibles[j]);
                        }
                    }
                    // if (modularity["PDC-RMID"][0] == '{}') {
                    //     caja_pdcr = "r";
                    //     if (keys[i] == "PDC-R" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                    //         pdcr_array.push(fusibles[j]);
                    //     }
                    // }else{
                    //     caja_pdcr = "m";
                    //     if (keys[i] == "PDC-RMID" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                    //         pdcr_1_array.push(fusibles[j]);
                    //     }
                    // }
                    if (modularity["PDC-R"] == '{}' && modularity["PDC-RMID"] == '{}' && modularity["PDC-RS"] == '{}'){
                        document.getElementById('caja_pdcr').innerHTML = 'Esta Modularidad no cuenta con ninguna configuración para la caja PDC-R.'
                    }
                    if (keys[i] == "PDC-S" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                        pdcs_array.push(fusibles[j]);
                        // cargar_imagen_pdcs();
                    }
                    if (keys[i] == "TBLU" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                        tblu_array.push(fusibles[j]);
                        // cargar_imagen_tblu();
                    }
                    if (keys[i] == "PDC-D" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                        pdcd_array.push(fusibles[j]);
                        // cargar_imagen_pdcd();
                    }
                    if (keys[i] == "PDC-P" && JSON.parse(lista_fusibles)[fusibles[j]] != "empty") {
                        pdcp_array.push(fusibles[j]);
                        // cargar_imagen_pdcp();
                    }
                }
        }
    }
}
    console.log("Tipo de Caja PDC-R: ",caja_pdcr);
    if (caja_pdcr == "r") {
        console.log("Mostrando Caja PDC-R");
        $("#pdcr_option > option[value='PDCR']").attr("selected",true);
			pdcr_caja="pdcr";
			pdcr_caja_to_db="PDC-R";
			document.getElementById('caja_pdcr').style.display="block";
        precargar_imagen_pdcr();
    }else if(caja_pdcr == "m"){
        console.log("Mostrando Caja PDC-RMID");
        $("#pdcr_option > option[value='PDCR_1']").attr("selected",true);
			pdcr_caja="pdcr_1";
			pdcr_caja_to_db="PDC-RMID";
			document.getElementById('caja_pdcr_1').style.display="block";
        precargar_imagen_pdcr_1();
    }else if(caja_pdcr == "s"){
        console.log("Mostrando Caja PDC-RS");
        $("#pdcr_option > option[value='PDCR_SMALL']").attr("selected",true);
			pdcr_caja="pdcr_small";
			pdcr_caja_to_db="PDC-RS";
			document.getElementById('caja_pdcr_small').style.display="block";
        precargar_imagen_pdcr_small();
    }
    precargar_imagen_pdcd();
    precargar_imagen_pdcs();
    precargar_imagen_tblu();
    precargar_imagen_pdcp();
    })
}

function precargar_imagen_pdcr(){
    var t1 = new ToolTip_pdcr(img_pdcr, "This is a tool-tip", 150);
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
            if (hold_config == true) {
                pintar_2();
            }else{
                preview()
            }

            function preview(){
                (async() => {
                    // console.log("MI ARRAY PDC-R: ",pdcr_array)
                    for (let i = 0; i < pdcr_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = JSON.parse(modularity["PDC-R"])[pdcr_array[i]];
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

            img_pdcr.onmouseup = function(event){
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-R']);
                let keys_pdcr = Object.keys(fuses_BB['PDC-R']);
                // console.log("KEYS DE PDCS: ",keys_pdcr);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcr_image_v_canvas").getBoundingClientRect();
                pixelx=x-window.scrollX-X.left
                pixely=y-window.scrollY-X.top
                // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for(i=0;i<keys_pdcr.length;i++){
                    if(pixelx>=fuses_BB['PDC-R'][keys_pdcr[i]][0][0] && pixelx<=fuses_BB['PDC-R'][keys_pdcr[i]][1][0] && pixely>=fuses_BB['PDC-R'][keys_pdcr[i]][0][1] && pixely<=fuses_BB['PDC-R'][keys_pdcr[i]][1][1] && color!="empty" && caja == "pdcr"){
                        var temporal_text="Esta dentro de "+keys_pdcr[i]
                        // console.log("TEMPORAL TEXT",temporal_text)
                        fusible_i = fuses_BB['PDC-R'][keys_pdcr[i]][0][0];
                        fusible_f = fuses_BB['PDC-R'][keys_pdcr[i]][0][1];
                        fusible_i2 = fuses_BB['PDC-R'][keys_pdcr[i]][1][0];
                        fusible_f2 = fuses_BB['PDC-R'][keys_pdcr[i]][1][1];
                        // console.log(fusible_i);
                        // console.log(fusible_i2);
                        // console.log(fusible_f);
                        // console.log(fusible_f2);
                        element=keys_pdcr[i]
                        fuses_value["PDC-R"][element] = color
                        // console.log(fuses_value);
                        fusible = element;

                        if (pdcr_array.length!=0){
                            if(pdcr_array.indexOf(element)!=-1){
                                fuses_value["PDC-R"][element] = "empty";
                                pdcr_array.splice(pdcr_array.indexOf(element),1)
                                restaurar_pdcr(ctx_pdcr,img_pdcr);
                                pintar_2()
                            }
                            else{
                                var temp = color.split(",");
                                if (temp[0] == "eliminar"){
                                    console.log("Fusible eliminado")
                                    fuses_value["PDC-R"][element] = "empty";
                                    return
                                }else{
                                    if (temp[0] != fuses_types["PDC-R"][element]){
                                        console.log("NO COINCIDE")
                                        fuses_value["PDC-R"][element] = "empty";
                                        $("#warning-alert-PDCR").fadeTo(2000, 500).slideUp(500, function() {
                                        $("#warning-alert-PDCR").slideUp(500);
                                        });
                                        return
                                    }
                                }
                                pdcr_array.push(element)
                                pintar()
                            }
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-R"][element] = "empty";
                                return
                            }else{
                                if (temp[0] != fuses_types["PDC-R"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-R"][element] = "empty";
                                    $("#warning-alert-PDCR").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCR").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcr_array.push(element)
                            pintar()
                        }
                        // console.log("LEYENDO ARRAY 2: ",pdcr_array);
                    }
                }
                console.log("FUSIBLE: ",fusible);
            }

            function pintar(){
                // console.log("MI ARRAY PDC-R: ",pdcr_array)
                pdcr_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    ctx_pdcr.beginPath();
                    getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                    let cavidad = pdcr_array[indice];
                    // console.log("fusible_i : ",fusible_i);
                    // console.log("CAVIDAD : ",cavidad);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }
                    fusible_imagen.src = "static/content/cajas/interior/fusibles/"+color+orientacion+".jpg";
                    // console.log(fusible_imagen.src);
                    fusible_imagen.onload = function(){
                        ctx_pdcr.drawImage(this,fusible_i, fusible_f,xDistance,yDistance);
                    }
                });
            }

            function pintar_2(){
                pdcr_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    
                    var fusible_imagen_pdcr = new Image();
                    pdcr_array[indice]
                    let cavidad = pdcr_array[indice];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-R"][pdcr_array[indice]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-R"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-R"][cavidad][0][1];
                    let cavidadx2 = fuses_BB["PDC-R"][cavidad][1][0];
                    let cavidady2 = fuses_BB["PDC-R"][cavidad][1][1];
                    // console.log("CAVIDAD X INICIAL: ",cavidadx);
                    // console.log("CAVIDAD X FINAL: ",cavidadx2);
                    // console.log("CAVIDAD Y INICIAL: ",cavidady);
                    // console.log("CAVIDAD Y FINAL: ",cavidady2);
                    getDistance(cavidadx,cavidady,cavidadx2,cavidady2);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }

                    switch (fusibleColocado){
                        case "MINI,5,beige":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,7.5,brown":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,10,red":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,30,green":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,15,blue":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,25,white":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,20,yellow":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MAXI,40,amber":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MAXI,50,red":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,15,blue":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "RELAY,60,red":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "RELAY,70,gray":
                            ctx_pdcr.beginPath();
                            fusible_imagen_pdcr.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr.onload = function(){
                                getDistance(fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],fuses_BB['PDC-R'][cavidad][1][0],fuses_BB['PDC-R'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-R'][cavidad][0][0])
                                ctx_pdcr.drawImage(this,fuses_BB['PDC-R'][cavidad][0][0], fuses_BB['PDC-R'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                    }
                });
            }
        }
    }
}

function precargar_imagen_pdcr_1(){
    var t1 = new ToolTip_pdcr_1(img_pdcr_1, "This is a tool-tip", 150);
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
            
            if (hold_config == true) {
                pintar_2();
            }else{
                preview()
            }

            function preview(){
                (async() => {
                    // console.log("MI ARRAY PDC-RMID: ",pdcr_1_array)
                    for (let i = 0; i < pdcr_1_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_1_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = JSON.parse(modularity["PDC-RMID"])[pdcr_1_array[i]];
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

            img_pdcr_1.onmouseup = function(event){
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-RMID']);
                let keys_pdcr_mid = Object.keys(fuses_BB['PDC-RMID']);
                // console.log("KEYS DE PDCS: ",keys_pdcr_mid);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcr_1_image_v_canvas").getBoundingClientRect();
                pixelx=x-window.scrollX-X.left
                pixely=y-window.scrollY-X.top
                // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for(i=0;i<keys_pdcr_mid.length;i++){
                    if(pixelx>=fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][0][0] && pixelx<=fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][1][0] && pixely>=fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][0][1] && pixely<=fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][1][1] && color!="empty" && caja == "pdcr_mid"){
                        var temporal_text="Esta dentro de "+keys_pdcr_mid[i]
                        // console.log("TEMPORAL TEXT",temporal_text)
                        fusible_i = fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][0][0];
                        fusible_f = fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][0][1];
                        fusible_i2 = fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][1][0];
                        fusible_f2 = fuses_BB['PDC-RMID'][keys_pdcr_mid[i]][1][1];
                        // console.log(fusible_i);
                        // console.log(fusible_i2);
                        // console.log(fusible_f);
                        // console.log(fusible_f2);
                        element=keys_pdcr_mid[i]
                        fuses_value["PDC-RMID"][element] = color
                        // console.log(fuses_value);
                        fusible = element;

                        if (pdcr_1_array.length!=0){
                            if(pdcr_1_array.indexOf(element)!=-1){
                                fuses_value["PDC-RMID"][element] = "empty";
                                pdcr_1_array.splice(pdcr_1_array.indexOf(element),1)
                                restaurar_pdcr_1(ctx_pdcr_mid,img_pdcr_1);
                                pintar_2()
                            }
                            else{
                                var temp = color.split(",");
                                if (temp[0] == "eliminar"){
                                    console.log("Fusible eliminado")
                                    fuses_value["PDC-RMID"][element] = "empty";
                                    return
                                }else{
                                    if (temp[0] != fuses_types["PDC-RMID"][element]){
                                        console.log("NO COINCIDE")
                                        fuses_value["PDC-RMID"][element] = "empty";
                                        $("#warning-alert-PDCRMID").fadeTo(2000, 500).slideUp(500, function() {
                                        $("#warning-alert-PDCRMID").slideUp(500);
                                        });
                                        return
                                    }
                                }
                                pdcr_1_array.push(element)
                                pintar()
                            }
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-RMID"][element] = "empty";
                                return
                            }else{
                                if (temp[0] != fuses_types["PDC-RMID"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-RMID"][element] = "empty";
                                    $("#warning-alert-PDCRMID").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCRMID").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcr_1_array.push(element)
                            pintar()
                        }
                        // console.log("LEYENDO ARRAY 2: ",pdcr_1_array);
                    }
                }
                console.log("FUSIBLE: ",fusible);
            }

            function pintar(){
                // console.log("MI ARRAY PDC-RMID: ",pdcr_1_array)
                pdcr_1_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    ctx_pdcr_mid.beginPath();
                    getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                    let cavidad = pdcr_1_array[indice];
                    // console.log("fusible_i : ",fusible_i);
                    // console.log("CAVIDAD : ",cavidad);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }
                    fusible_imagen.src = "static/content/cajas/interior/fusibles/"+color+orientacion+".jpg";
                    // console.log(fusible_imagen.src);
                    fusible_imagen.onload = function(){
                        ctx_pdcr_mid.drawImage(this,fusible_i, fusible_f,xDistance,yDistance);
                    }
                });
            }

            function pintar_2(){
                pdcr_1_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    
                    var fusible_imagen_pdcr_mid = new Image();
                    pdcr_1_array[indice]
                    let cavidad = pdcr_1_array[indice];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-RMID"][pdcr_1_array[indice]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-RMID"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-RMID"][cavidad][0][1];
                    let cavidadx2 = fuses_BB["PDC-RMID"][cavidad][1][0];
                    let cavidady2 = fuses_BB["PDC-RMID"][cavidad][1][1];
                    // console.log("CAVIDAD X INICIAL: ",cavidadx);
                    // console.log("CAVIDAD X FINAL: ",cavidadx2);
                    // console.log("CAVIDAD Y INICIAL: ",cavidady);
                    // console.log("CAVIDAD Y FINAL: ",cavidady2);
                    getDistance(cavidadx,cavidady,cavidadx2,cavidady2);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }

                    switch (fusibleColocado){
                        case "MINI,5,beige":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,7.5,brown":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,10,red":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,30,green":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,15,blue":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,25,white":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,20,yellow":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MAXI,40,amber":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MAXI,50,red":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,15,blue":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "RELAY,60,red":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "RELAY,70,gray":
                            ctx_pdcr_mid.beginPath();
                            fusible_imagen_pdcr_mid.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_mid.onload = function(){
                                getDistance(fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],fuses_BB['PDC-RMID'][cavidad][1][0],fuses_BB['PDC-RMID'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RMID'][cavidad][0][0])
                                ctx_pdcr_mid.drawImage(this,fuses_BB['PDC-RMID'][cavidad][0][0], fuses_BB['PDC-RMID'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                    }
                });
            }
        }
    }
}

function precargar_imagen_pdcr_small(){
    var t1 = new ToolTip_pdcr_small(img_pdcr_small, "This is a tool-tip", 150);
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
            
            if (hold_config == true) {
                pintar_2();
            }else{
                preview()
            }

            function preview(){
                (async() => {
                    // console.log("MI ARRAY PDC-RS: ",pdcr_small_array)
                    for (let i = 0; i < pdcr_small_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcr_small_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = JSON.parse(modularity["PDC-RS"])[pdcr_small_array[i]];
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

            img_pdcr_small.onmouseup = function(event){
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-RS']);
                let keys_pdcr_small = Object.keys(fuses_BB['PDC-RS']);
                // console.log("KEYS DE PDCS: ",keys_pdcr_small);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcr_small_image_v_canvas").getBoundingClientRect();
                pixelx=x-window.scrollX-X.left
                pixely=y-window.scrollY-X.top
                // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for(i=0;i<keys_pdcr_small.length;i++){
                    if(pixelx>=fuses_BB['PDC-RS'][keys_pdcr_small[i]][0][0] && pixelx<=fuses_BB['PDC-RS'][keys_pdcr_small[i]][1][0] && pixely>=fuses_BB['PDC-RS'][keys_pdcr_small[i]][0][1] && pixely<=fuses_BB['PDC-RS'][keys_pdcr_small[i]][1][1] && color!="empty" && caja == "pdcr_small"){
                        var temporal_text="Esta dentro de "+keys_pdcr_small[i]
                        // console.log("TEMPORAL TEXT",temporal_text)
                        fusible_i = fuses_BB['PDC-RS'][keys_pdcr_small[i]][0][0];
                        fusible_f = fuses_BB['PDC-RS'][keys_pdcr_small[i]][0][1];
                        fusible_i2 = fuses_BB['PDC-RS'][keys_pdcr_small[i]][1][0];
                        fusible_f2 = fuses_BB['PDC-RS'][keys_pdcr_small[i]][1][1];
                        // console.log(fusible_i);
                        // console.log(fusible_i2);
                        // console.log(fusible_f);
                        // console.log(fusible_f2);
                        element=keys_pdcr_small[i]
                        fuses_value["PDC-RS"][element] = color
                        // console.log(fuses_value);
                        fusible = element;

                        if (pdcr_small_array.length!=0){
                            if(pdcr_small_array.indexOf(element)!=-1){
                                fuses_value["PDC-RS"][element] = "empty";
                                pdcr_small_array.splice(pdcr_small_array.indexOf(element),1)
                                restaurar_pdcr_small(ctx_pdcr_small,img_pdcr_small);
                                pintar_2()
                            }
                            else{
                                var temp = color.split(",");
                                if (temp[0] == "eliminar"){
                                    console.log("Fusible eliminado")
                                    fuses_value["PDC-RS"][element] = "empty";
                                    return
                                }else{
                                    if (temp[0] != fuses_types["PDC-RS"][element]){
                                        console.log("NO COINCIDE")
                                        fuses_value["PDC-RS"][element] = "empty";
                                        $("#warning-alert-PDCRS").fadeTo(2000, 500).slideUp(500, function() {
                                        $("#warning-alert-PDCRS").slideUp(500);
                                        });
                                        return
                                    }
                                }
                                pdcr_small_array.push(element)
                                pintar()
                            }
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado")
                                fuses_value["PDC-RS"][element] = "empty";
                                return
                            }else{
                                if (temp[0] != fuses_types["PDC-RS"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-RS"][element] = "empty";
                                    $("#warning-alert-PDCRS").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCRS").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcr_small_array.push(element)
                            pintar()
                        }
                        // console.log("LEYENDO ARRAY 2: ",pdcr_small_array);
                    }
                }
                console.log("FUSIBLE: ",fusible);
            }

            function pintar(){
                // console.log("MI ARRAY PDC-RS: ",pdcr_small_array)
                pdcr_small_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    ctx_pdcr_small.beginPath();
                    getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                    let cavidad = pdcr_small_array[indice];
                    // console.log("fusible_i : ",fusible_i);
                    // console.log("CAVIDAD : ",cavidad);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }
                    fusible_imagen.src = "static/content/cajas/interior/fusibles/"+color+orientacion+".jpg";
                    // console.log(fusible_imagen.src);
                    fusible_imagen.onload = function(){
                        ctx_pdcr_small.drawImage(this,fusible_i, fusible_f,xDistance,yDistance);
                    }
                });
            }

            function pintar_2(){
                pdcr_small_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    
                    var fusible_imagen_pdcr_small = new Image();
                    pdcr_small_array[indice]
                    let cavidad = pdcr_small_array[indice];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-RS"][pdcr_small_array[indice]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    let cavidadx = fuses_BB["PDC-RS"][cavidad][0][0];
                    let cavidady = fuses_BB["PDC-RS"][cavidad][0][1];
                    let cavidadx2 = fuses_BB["PDC-RS"][cavidad][1][0];
                    let cavidady2 = fuses_BB["PDC-RS"][cavidad][1][1];
                    // console.log("CAVIDAD X INICIAL: ",cavidadx);
                    // console.log("CAVIDAD X FINAL: ",cavidadx2);
                    // console.log("CAVIDAD Y INICIAL: ",cavidady);
                    // console.log("CAVIDAD Y FINAL: ",cavidady2);
                    getDistance(cavidadx,cavidady,cavidadx2,cavidady2);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }

                    switch (fusibleColocado){
                        case "MINI,5,beige":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,7.5,brown":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,10,red":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,30,green":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,15,blue":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,25,white":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "ATO,20,yellow":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MAXI,40,amber":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MAXI,50,red":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,15,blue":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "RELAY,60,red":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "RELAY,70,gray":
                            ctx_pdcr_small.beginPath();
                            fusible_imagen_pdcr_small.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcr_small.onload = function(){
                                getDistance(fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],fuses_BB['PDC-RS'][cavidad][1][0],fuses_BB['PDC-RS'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-RS'][cavidad][0][0])
                                ctx_pdcr_small.drawImage(this,fuses_BB['PDC-RS'][cavidad][0][0], fuses_BB['PDC-RS'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                    }
                });
            }
        }
    }
}

function precargar_imagen_pdcs(){
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
            let keys_pdcs = Object.keys(fuses_BB['PDC-S']);
            // console.log("La Caja a pintar es la siguiente: PDC-S");
            preview()

            function preview(){
                (async() => {
                    // console.log("MI ARRAY PDC-S: ",pdcs_array)
                    for (let i = 0; i < pdcs_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcs_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = JSON.parse(modularity["PDC-S"])[pdcs_array[i]];
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

            img_pdcs.onmouseup = function(event){
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-S']);
                console.log("KEYS DE PDCS: ",keys_pdcs);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcs_image_v_canvas").getBoundingClientRect();
                pixelx=x-window.scrollX-X.left
                pixely=y-window.scrollY-X.top
                // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for(i=1;i<keys_pdcs.length+1;i++){
                    if(pixelx>=fuses_BB['PDC-S'][i][0][0] && pixelx<=fuses_BB['PDC-S'][i][1][0] && pixely>=fuses_BB['PDC-S'][i][0][1] && pixely<=fuses_BB['PDC-S'][i][1][1] && color!="empty" && caja == "pdcs"){
                        var temporal_text="Esta dentro de "+keys_pdcs[i-1]
                        fusible_i = fuses_BB['PDC-S'][keys_pdcs[i-1]][0][0];
                        fusible_f = fuses_BB['PDC-S'][keys_pdcs[i-1]][0][1];
                        fusible_i2 = fuses_BB['PDC-S'][keys_pdcs[i-1]][1][0];
                        fusible_f2 = fuses_BB['PDC-S'][keys_pdcs[i-1]][1][1];
                        // console.log(fusible_i);
                        // console.log(fusible_i2);
                        // console.log(fusible_f);
                        // console.log(fusible_f2);
                        // console.log("TEMPORAL TEXT",temporal_text)
                        element=keys_pdcs[i-1]
                        fuses_value["PDC-S"][element] = color
                        // console.log(fuses_value);
                        fusible = element;

                        if (pdcs_array.length!=0){
                            if(pdcs_array.indexOf(element)!=-1){
                                fuses_value["PDC-S"][element] = "empty";
                                pdcs_array.splice(pdcs_array.indexOf(element),1)
                                restaurar_pdcs(ctx,img_pdcs);
                                pintar_2()
                            }
                            else{
                                var temp = color.split(",");
                                if (temp[0] == "eliminar"){
                                    console.log("Fusible eliminado");
                                    fuses_value["PDC-S"][element] = "empty";
                                    return
                                }
                                pdcs_array.push(element)
                                pintar()
                            }
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado");
                                fuses_value["PDC-S"][element] = "empty";
                                return
                            }
                            pdcs_array.push(element)
                            pintar()
                        }
                        // console.log("LEYENDO ARRAY 2: ",pdcs_array);
                    }
                }
                console.log("FUSIBLE: ",fusible);
            }

            function pintar(){
                // console.log("MI ARRAY PDCS: ",pdcs_array)
                pdcs_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    ctx.beginPath();
                    if (fusible_i > fusible_f){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }
                    fusible_imagen.src = "static/content/cajas/interior/fusibles/"+color+orientacion+".jpg";
                    fusible_imagen.onload = function(){
                        getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2)
                        ctx.drawImage(this,fusible_i, fusible_f,xDistance,yDistance);
                    }
                });
            }

            function pintar_2(){
                pdcs_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    
                    var fusible_imagen_pdcs = new Image();
                    pdcs_array[indice]
                    let cavidad = pdcs_array[indice];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-S"][pdcs_array[indice]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    switch (fusibleColocado){
                        case "ATO,10,red":
                        ctx.beginPath();
                        fusible_imagen_pdcs.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcs.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad);
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-S'][cavidad][0][0]);
                            ctx.drawImage(this,fuses_BB['PDC-S'][cavidad][0][0], fuses_BB['PDC-S'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,7.5,brown":
                        ctx.beginPath();
                        fusible_imagen_pdcs.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcs.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad);
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-S'][cavidad][0][0]);
                            ctx.drawImage(this,fuses_BB['PDC-S'][cavidad][0][0], fuses_BB['PDC-S'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,5,beige":
                        ctx.beginPath();
                        fusible_imagen_pdcs.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcs.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad);
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-S'][cavidad][0][0]);
                            ctx.drawImage(this,fuses_BB['PDC-S'][cavidad][0][0], fuses_BB['PDC-S'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,15,blue":
                        ctx.beginPath();
                        fusible_imagen_pdcs.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcs.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad);
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-S'][cavidad][0][0]);
                            ctx.drawImage(this,fuses_BB['PDC-S'][cavidad][0][0], fuses_BB['PDC-S'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,30,green":
                        ctx.beginPath();
                        fusible_imagen_pdcs.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcs.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad);
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-S'][cavidad][0][0]);
                            ctx.drawImage(this,fuses_BB['PDC-S'][cavidad][0][0], fuses_BB['PDC-S'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                    }
                })
            }
        }
    }
}

function precargar_imagen_tblu(){
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
            preview()

            function preview(){
                (async() => {
                    // console.log("MI ARRAY TBLU: ",tblu_array)
                    for (let i = 0; i < tblu_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = tblu_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = JSON.parse(modularity["TBLU"])[tblu_array[i]];
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

            img_tblu.onmouseup = function(event){
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['TBLU']);
                let keys_tblu = Object.keys(fuses_BB['TBLU']);
                // console.log("KEYS DE TBLU: ",keys_tblu);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("tblu_image_v_canvas").getBoundingClientRect();
                pixelx=x-window.scrollX-X.left
                pixely=y-window.scrollY-X.top
                // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for(i=0;i<keys_tblu.length;i++){
                    if(pixelx>=fuses_BB['TBLU'][keys_tblu[i]][0][0] && pixelx<=fuses_BB['TBLU'][keys_tblu[i]][1][0] && pixely>=fuses_BB['TBLU'][keys_tblu[i]][0][1] && pixely<=fuses_BB['TBLU'][keys_tblu[i]][1][1] && color!="empty" && caja == "tblu"){
                        var temporal_text="Esta dentro de "+keys_tblu[i]
                        // console.log("TEMPORAL TEXT",temporal_text)
                        fusible_i = fuses_BB['TBLU'][keys_tblu[i]][0][0];
                        fusible_f = fuses_BB['TBLU'][keys_tblu[i]][0][1];
                        fusible_i2 = fuses_BB['TBLU'][keys_tblu[i]][1][0];
                        fusible_f2 = fuses_BB['TBLU'][keys_tblu[i]][1][1];
                        // console.log(fusible_i);
                        // console.log(fusible_i2);
                        // console.log(fusible_f);
                        // console.log(fusible_f2);
                        element=keys_tblu[i]
                        fuses_value["TBLU"][element] = color
                        // console.log(fuses_value);
                        fusible = element;

                        if (tblu_array.length!=0){
                            if(tblu_array.indexOf(element)!=-1){
                                fuses_value["TBLU"][element] = "empty";
                                tblu_array.splice(tblu_array.indexOf(element),1)
                                restaurar_tblu(ctx_tblu,img_tblu);
                                pintar_2()
                            }
                            else{
                                var temp = color.split(",");
                                if (temp[0] == "eliminar"){
                                    console.log("Fusible eliminado");
                                    fuses_value["TBLU"][element] = "empty";
                                    return
                                }
                                tblu_array.push(element)
                                pintar()
                            }
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado");
                                fuses_value["TBLU"][element] = "empty";
                                return
                            }
                            tblu_array.push(element)
                            pintar()
                        }
                        // console.log("LEYENDO ARRAY 2: ",tblu_array);
                    }
                }
                console.log("FUSIBLE: ",fusible);
            }

            function pintar(){
                // console.log("MI ARRAY TBLU: ",tblu_array)
                tblu_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    ctx_tblu.beginPath();
                    fusible_imagen.src = "static/content/cajas/interior/fusibles/"+color+".jpg";
                    fusible_imagen.onload = function(){
                        getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2)
                        ctx_tblu.drawImage(this,fusible_i, fusible_f,xDistance,yDistance);
                    }
                });
            }

            function pintar_2(){
                tblu_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    
                    var fusible_imagen_tblu = new Image();
                    tblu_array[indice]
                    let cavidad = tblu_array[indice];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["TBLU"][tblu_array[indice]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    switch (fusibleColocado){
                        case "ATO,10,red_clear":
                        ctx_tblu.beginPath();
                        fusible_imagen_tblu.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+".jpg";
                        fusible_imagen_tblu.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['TBLU'][cavidad][0][0])
                            ctx_tblu.drawImage(this,fuses_BB['TBLU'][cavidad][0][0], fuses_BB['TBLU'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,5,beige_clear":
                        ctx_tblu.beginPath();
                        fusible_imagen_tblu.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+".jpg";
                        fusible_imagen_tblu.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['TBLU'][cavidad][0][0])
                            ctx_tblu.drawImage(this,fuses_BB['TBLU'][cavidad][0][0], fuses_BB['TBLU'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,15,blue_clear":
                        ctx_tblu.beginPath();
                        fusible_imagen_tblu.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+".jpg";
                        fusible_imagen_tblu.onload = function(){
                            getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['TBLU'][cavidad][0][0])
                            ctx_tblu.drawImage(this,fuses_BB['TBLU'][cavidad][0][0], fuses_BB['TBLU'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                    }
                });
            }
        }
    }
}

function precargar_imagen_pdcd(){
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
            preview()

            function preview(){
                (async() => {
                    // console.log("MI ARRAY PDC-D: ",pdcd_array)
                    for (let i = 0; i < pdcd_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcd_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = JSON.parse(modularity["PDC-D"])[pdcd_array[i]];
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

            img_pdcd.onmouseup = function(event){
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-D']);
                let keys_pdcd = Object.keys(fuses_BB['PDC-D']);
                // console.log("KEYS DE PDCS: ",keys_pdcd);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcd_image_v_canvas").getBoundingClientRect();
                pixelx=x-window.scrollX-X.left
                pixely=y-window.scrollY-X.top
                // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for(i=0;i<keys_pdcd.length;i++){
                    if(pixelx>=fuses_BB['PDC-D'][keys_pdcd[i]][0][0] && pixelx<=fuses_BB['PDC-D'][keys_pdcd[i]][1][0] && pixely>=fuses_BB['PDC-D'][keys_pdcd[i]][0][1] && pixely<=fuses_BB['PDC-D'][keys_pdcd[i]][1][1] && color!="empty" && caja == "pdcd"){
                        var temporal_text="Esta dentro de "+keys_pdcd[i]
                        // console.log("TEMPORAL TEXT",temporal_text)
                        fusible_i = fuses_BB['PDC-D'][keys_pdcd[i]][0][0];
                        fusible_f = fuses_BB['PDC-D'][keys_pdcd[i]][0][1];
                        fusible_i2 = fuses_BB['PDC-D'][keys_pdcd[i]][1][0];
                        fusible_f2 = fuses_BB['PDC-D'][keys_pdcd[i]][1][1];
                        // console.log(fusible_i);
                        // console.log(fusible_i2);
                        // console.log(fusible_f);
                        // console.log(fusible_f2);
                        element=keys_pdcd[i]
                        fuses_value["PDC-D"][element] = color
                        // console.log(fuses_value);
                        fusible = element;

                        if (pdcd_array.length!=0){
                            if(pdcd_array.indexOf(element)!=-1){
                                fuses_value["PDC-D"][element] = "empty";
                                pdcd_array.splice(pdcd_array.indexOf(element),1)
                                restaurar_pdcd(ctx_pdcd,img_pdcd);
                                pintar_2()
                            }
                            else{
                                var temp = color.split(",");
                                if (temp[0] == "eliminar"){
                                    console.log("Fusible eliminado");
                                    fuses_value["PDC-D"][element] = "empty";
                                    return
                                }else{
                                    if (temp[0] != fuses_types["PDC-D"][element]){
                                        console.log("NO COINCIDE")
                                        fuses_value["PDC-D"][element] = "empty";
                                        $("#warning-alert-PDCD").fadeTo(2000, 500).slideUp(500, function() {
                                        $("#warning-alert-PDCD").slideUp(500);
                                        });
                                        return
                                    }
                                }
                                pdcd_array.push(element)
                                pintar()
                            }
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado");
                                fuses_value["PDC-D"][element] = "empty";
                                return
                            }else{
                                if (temp[0] != fuses_types["PDC-D"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-D"][element] = "empty";
                                    $("#warning-alert-PDCD").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCD").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcd_array.push(element)
                            pintar()
                        }
                        // console.log("LEYENDO ARRAY 2: ",pdcd_array);
                    }
                }
                console.log("FUSIBLE: ",fusible);
            }

            function pintar(){
                // console.log("MI ARRAY PDC-D: ",pdcd_array)
                pdcd_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    ctx_pdcd.beginPath();
                    getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }
                    fusible_imagen.src = "static/content/cajas/interior/fusibles/"+color+orientacion+".jpg";
                    // console.log(fusible_imagen.src);
                    fusible_imagen.onload = function(){
                        ctx_pdcd.drawImage(this,fusible_i, fusible_f,xDistance,yDistance);
                    }
                });
            }

            function pintar_2(){
                pdcd_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    
                    var fusible_imagen_pdcd = new Image();
                    pdcd_array[indice]
                    let cavidad = pdcd_array[indice];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-D"][pdcd_array[indice]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    switch (fusibleColocado){
                        case "ATO,5,beige":
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MINI,5,beige":
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MINI,7.5,brown":
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,7.5,brown":
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MINI,10,red":
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,30,green":
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MINI,15,blue":
                            // console.log("kjnerbvfdsihgbngrbinrsibnirtsbjtrg")
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,25,white":
                        ctx_pdcd.beginPath();
                        fusible_imagen_pdcd.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                        fusible_imagen_pdcd.onload = function(){
                            getDistance(fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],fuses_BB['PDC-D'][cavidad][1][0],fuses_BB['PDC-D'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-D'][cavidad][0][0])
                            ctx_pdcd.drawImage(this,fuses_BB['PDC-D'][cavidad][0][0], fuses_BB['PDC-D'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                    }
                });
            }
        }
    }
}

function precargar_imagen_pdcp(){
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
            preview()

            function preview(){
                (async() => {
                    // console.log("MI ARRAY PDC-P: ",pdcp_array)
                    for (let i = 0; i < pdcp_array.length; i++) {
                        var fusible_imagen = new Image();
                        let cavidad = pdcp_array[i];
                        // console.log("CAVIDAD : ",cavidad);
                        let fusibleColocado = JSON.parse(modularity["PDC-P"])[pdcp_array[i]];
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

            img_pdcp.onmouseup = function(event){
                var fusible;
                // console.log(fuses_BB);
                // console.log(fuses_BB['PDC-P']);
                let keys_pdcp = Object.keys(fuses_BB['PDC-P']);
                // console.log("KEYS DE PDCS: ",keys_pdcp);
                var x = event.pageX;
                var y = event.pageY;
                var coor = "X coords: " + x + ", Y coords: " + y;
                // console.log(coor);
                var X = document.getElementById("pdcp_image_v_canvas").getBoundingClientRect();
                pixelx=x-window.scrollX-X.left
                pixely=y-window.scrollY-X.top
                // console.log("Pixel x: "+pixelx+" Pixel y: "+pixely);

                for(i=0;i<keys_pdcp.length;i++){
                    if(pixelx>=fuses_BB['PDC-P'][keys_pdcp[i]][0][0] && pixelx<=fuses_BB['PDC-P'][keys_pdcp[i]][1][0] && pixely>=fuses_BB['PDC-P'][keys_pdcp[i]][0][1] && pixely<=fuses_BB['PDC-P'][keys_pdcp[i]][1][1] && color!="empty" && caja == "pdcp"){
                        var temporal_text="Esta dentro de "+keys_pdcp[i]
                        // console.log("TEMPORAL TEXT",temporal_text)
                        fusible_i = fuses_BB['PDC-P'][keys_pdcp[i]][0][0];
                        fusible_f = fuses_BB['PDC-P'][keys_pdcp[i]][0][1];
                        fusible_i2 = fuses_BB['PDC-P'][keys_pdcp[i]][1][0];
                        fusible_f2 = fuses_BB['PDC-P'][keys_pdcp[i]][1][1];
                        // console.log(fusible_i);
                        // console.log(fusible_i2);
                        // console.log(fusible_f);
                        // console.log(fusible_f2);
                        element=keys_pdcp[i]
                        fuses_value["PDC-P"][element] = color
                        // console.log(fuses_value);
                        fusible = element;

                        if (pdcp_array.length!=0){
                            if(pdcp_array.indexOf(element)!=-1){
                                fuses_value["PDC-P"][element] = "empty";
                                pdcp_array.splice(pdcp_array.indexOf(element),1)
                                restaurar_pdcp(ctx_pdcp,img_pdcp);
                                pintar_2()
                            }
                            else{
                                var temp = color.split(",");
                                if (temp[0] == "eliminar"){
                                    console.log("Fusible eliminado");
                                    fuses_value["PDC-P"][element] = "empty";
                                    return
                                }else{
                                    if (temp[0] != fuses_types["PDC-P"][element]){
                                        console.log("NO COINCIDE")
                                        fuses_value["PDC-P"][element] = "empty";
                                        $("#warning-alert-PDCP").fadeTo(2000, 500).slideUp(500, function() {
                                        $("#warning-alert-PDCP").slideUp(500);
                                        });
                                        return
                                    }
                                }
                                pdcp_array.push(element)
                                pintar()
                            }
                        }
                        else{
                            var temp = color.split(",");
                            if (temp[0] == "eliminar"){
                                console.log("Fusible eliminado");
                                fuses_value["PDC-P"][element] = "empty";
                                return
                            }else{
                                if (temp[0] != fuses_types["PDC-P"][element]){
                                    console.log("NO COINCIDE")
                                    fuses_value["PDC-P"][element] = "empty";
                                    $("#warning-alert-PDCP").fadeTo(2000, 500).slideUp(500, function() {
                                    $("#warning-alert-PDCP").slideUp(500);
                                    });
                                    return
                                }
                            }
                            pdcp_array.push(element)
                            pintar()
                        }
                        // console.log("LEYENDO ARRAY 2: ",pdcp_array);
                    }
                }
                console.log("FUSIBLE: ",fusible);
            }

            function pintar(){
                // console.log("MI ARRAY PDC-P: ",pdcp_array)
                pdcp_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    ctx_pdcp.beginPath();
                    getDistance(fusible_i,fusible_f,fusible_i2,fusible_f2);
                    if (yDistance > xDistance){
                        orientacion = "v";
                        // console.log("Vertical")
                    }else{
                        // console.log("Horizontal")
                        orientacion = "h";
                    }
                    fusible_imagen.src = "static/content/cajas/interior/fusibles/"+color+orientacion+".jpg";
                    // console.log(fusible_imagen.src);
                    fusible_imagen.onload = function(){
                        ctx_pdcp.drawImage(this,fusible_i, fusible_f,xDistance,yDistance);
                    }
                });
            }

            function pintar_2(){
                pdcp_array.forEach( function(valor, indice, array) {
                    // console.log("En el índice " + indice + " hay este valor: " + valor);
                    
                    var fusible_imagen_pdcp = new Image();
                    pdcp_array[indice]
                    let cavidad = pdcp_array[indice];
                    // console.log("CAVIDAD : ",cavidad);
                    let fusibleColocado = fuses_value["PDC-P"][pdcp_array[indice]];
                    // console.log("Fusible Colocado: ",fusibleColocado);

                    switch (fusibleColocado){
                        case "MINI,5,beige":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                                getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                                // console.log("Fusible a Repintar: ",cavidad)
                                // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                                ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                            }
                        break;
                        case "MINI,7.5,brown":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MINI,10,red":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,30,green":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,25,white":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MINI,15,blue":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "ATO,15,blue":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MULTI,5,beige":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                        case "MULTI,7.5,brown":
                            ctx_pdcp.beginPath();
                            fusible_imagen_pdcp.src = "static/content/cajas/interior/fusibles/"+fusibleColocado+orientacion+".jpg";
                            fusible_imagen_pdcp.onload = function(){
                            getDistance(fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],fuses_BB['PDC-P'][cavidad][1][0],fuses_BB['PDC-P'][cavidad][1][1]);
                            // console.log("Fusible a Repintar: ",cavidad)
                            // console.log("Posición del Fusible a repintar: ",fuses_BB['PDC-P'][cavidad][0][0])
                            ctx_pdcp.drawImage(this,fuses_BB['PDC-P'][cavidad][0][0], fuses_BB['PDC-P'][cavidad][0][1],xDistance,yDistance);
                        }
                        break;
                    }
                });
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
            if (fuses_value['PDC-S'][cavidad] == "empty") {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['PDC-S'][cavidad];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip;
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
            if (fuses_value['PDC-R'][cavidad] == "empty" || fuses_value['PDC-R'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['PDC-R'][cavidad];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip;
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
            if (fuses_value['PDC-RMID'][cavidad] == "empty" || fuses_value['PDC-RMID'][cavidad] == undefined) {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['PDC-RMID'][cavidad];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip;
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
                if (fuses_value['PDC-RS'][cavidad] == "empty" || fuses_value['PDC-RS'][cavidad] == undefined) {
                    fusible_tooltip = "Vacío";
                }else{
                    fusible_tooltip = fuses_value['PDC-RS'][cavidad];
                }
                div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip;
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
            if (fuses_value['TBLU'][cavidad] == "empty") {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['TBLU'][cavidad];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip;
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
// check mouse position, add limits as wanted... just for example:
function check(e) {
    if(parent.contains(div)){
        hide();
    }
    var pos = getPos(e),
        posAbs = {x: e.clientX, y: e.clientY};  // div is fixed, so use clientX/Y
    for(i=0;i<keys_cavidad.length;i++){
        let fusible_tooltip;
        if (!visible && pos.x>=fuses_BB['PDC-D'][keys_cavidad[i]][0][0] && pos.x<=fuses_BB['PDC-D'][keys_cavidad[i]][1][0] && pos.y>=fuses_BB['PDC-D'][keys_cavidad[i]][0][1] && pos.y<=fuses_BB['PDC-D'][keys_cavidad[i]][1][1]) {
            cavidad = keys_cavidad[i];
            // set some initial styles, can be replaced by class-name etc.
            div.style.cssText = "position:fixed;padding:7px;font-weight: bold;color:#000;background:rgba(51, 255, 252, 0.6);pointer-events:none;width:" + width + "px";
            if (fuses_value['PDC-D'][cavidad] == "empty") {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['PDC-D'][cavidad];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip;
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
            if (fuses_value['PDC-P'][cavidad] == "empty") {
                fusible_tooltip = "Vacío";
            }else{
                fusible_tooltip = fuses_value['PDC-P'][cavidad];
            }
            div.innerHTML = 'Cavidad: '+cavidad+'<br>Fusible: '+fusible_tooltip;
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

//////////////////////////////////////////// Edición de los Módulos ////////////////////////////////////////////
function change_caja_pdcr(){
    if(document.getElementById('pdcr_option').value==='Seleccione la caja PDCR...'){
    // console.log("seleccione una caja")
    document.getElementById('caja_pdcr').style.display="none"
    document.getElementById('caja_pdcr_1').style.display="none"
    document.getElementById('caja_pdcr_small').style.display="none"
    pdcr_caja=""
    pdcr_caja_to_db=""
    }
    ////// PDC-R //////
    if(document.getElementById('pdcr_option').value==='PDCR'){
        // console.log("pdcr")
        document.getElementById('caja_pdcr').style.display="block";
        document.getElementById('caja_pdcr_1').style.display="none";
        document.getElementById('caja_pdcr_small').style.display="none";
        pdcr_caja="pdcr";
        pdcr_caja_to_db="PDC-R";
        ////// Si la PDC-RMID tiene fusibles: //////
        if (pdcr_1_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles?");
            if(hold_config){
                console.log(hold_config);
                
                pdcr_array=pdcr_1_array.slice()
                // console.log("Fuses Value de PDC-RMID : ",fuses_value["PDC-RMID"])
                for (let index = 0; index < pdcr_1_array.length; index++) {
                    // console.log("Fusibles: ",pdcr_1_array[index]);
                    // console.log("Fusible valor en fusevalue: ",fuses_value["PDC-RMID"][pdcr_1_array[index]]);
                    fuses_value["PDC-R"][pdcr_1_array[index]] = fuses_value["PDC-RMID"][pdcr_1_array[index]].slice();
                    // console.log("fusible en pdcr:",fuses_value["PDC-R"][pdcr_1_array[index]]);
                    fuses_value["PDC-RMID"][pdcr_1_array[index]] = "empty";
                }
                pdcr_1_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
            }else{
                console.log(hold_config);
                for (let index = 0; index < pdcr_1_array.length; index++) {
                    fuses_value["PDC-RMID"][pdcr_1_array[index]] = "empty";
                }
                pdcr_array=[];
                pdcr_1_array=[];
                pdcr_small_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
            }
        }
        ////// Si la PDC-RS tiene fusibles: //////
        else if (pdcr_small_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles?");
            if(hold_config){
                console.log(hold_config);
                
                pdcr_array=pdcr_small_array.slice()
                // console.log("Fuses Value de PDC-RS : ",fuses_value["PDC-RS"])
                for (let index = 0; index < pdcr_small_array.length; index++) {
                    // console.log("Fusibles: ",pdcr_small_array[index]);
                    // console.log("Fusible valor en fusevalue: ",fuses_value["PDC-RS"][pdcr_small_array[index]]);
                    fuses_value["PDC-R"][pdcr_small_array[index]] = fuses_value["PDC-RS"][pdcr_small_array[index]].slice();
                    // console.log("fusible en pdcr:",fuses_value["PDC-R"][pdcr_small_array[index]]);
                    fuses_value["PDC-RS"][pdcr_small_array[index]] = "empty";
                }
                pdcr_small_array=[];
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
            }else{
                console.log(hold_config);
                for (let index = 0; index < pdcr_small_array.length; index++) {
                    fuses_value["PDC-RS"][pdcr_small_array[index]] = "empty";
                }
                pdcr_array=[];
                pdcr_1_array=[];
                pdcr_small_array=[];
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
            }
        }else{
            hold_config = false;
            pdcr_array=[]
            pdcr_1_array=[]
            pdcr_small_array=[]
        }
        precargar_imagen_pdcr();
        console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
        console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
        console.log("PDC-R ARRAY FINAL: ",pdcr_array);
    }
    ////// PDC-RMID //////
    if(document.getElementById('pdcr_option').value==='PDCR_1'){
        // console.log("pdcr_1")
        document.getElementById('caja_pdcr').style.display="none";
        document.getElementById('caja_pdcr_1').style.display="block";
        document.getElementById('caja_pdcr_small').style.display="none";
        pdcr_caja="pdcr_1";
        pdcr_caja_to_db="PDC-RMID";
        ////// Si la PDC-R tiene fusibles: //////
        if (pdcr_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles?");
            if(hold_config){
                console.log(hold_config);
                
                // console.log("fuses value : ",fuses_value["PDC-R"])
                for (let index = 0; index < pdcr_array.length; index++) {
                    // console.log("Fusible: ",pdcr_array[index]);
                    if (fuses_value["PDC-RMID"].hasOwnProperty(pdcr_array[index])) {
                        pdcr_1_array.push(pdcr_array[index]);
                        // console.log("Si Existe",fuses_value["PDC-RMID"].hasOwnProperty(pdcr_array[index]))
                        fuses_value["PDC-RMID"][pdcr_array[index]] = fuses_value["PDC-R"][pdcr_array[index]].slice();
                        // console.log("Fusible Copiado a caja destino:",fuses_value["PDC-RMID"][pdcr_array[index]]);
                        fuses_value["PDC-R"][pdcr_array[index]] = "empty";
                    }else{
                        console.log("Fusible no copiado: ",pdcr_array[index]);
                    }
                    
                }
                pdcr_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
            }else{
                console.log(hold_config);
                for (let index = 0; index < pdcr_array.length; index++) {
                    fuses_value["PDC-R"][pdcr_array[index]] = "empty";
                }
                pdcr_array=[];
                pdcr_1_array=[];
                pdcr_small_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
                // console.log("PDC-RMID fuses FINAL: ",fuses_value["PDC-RMID"]);
                // console.log("PDC-R fuses FINAL: ",fuses_value["PDC-R"]);
            }
        }
        ////// Si la PDC-RS tiene fusibles: //////
        else if (pdcr_small_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles?");
            if(hold_config){
                console.log(hold_config);
                // console.log("fuses value : ",fuses_value["PDC-RS"])
                for (let index = 0; index < pdcr_small_array.length; index++) {
                    // console.log("Fusible: ",pdcr_small_array[index]);
                    if (fuses_value["PDC-RMID"].hasOwnProperty(pdcr_small_array[index])) {
                        pdcr_1_array.push(pdcr_small_array[index]);
                        // console.log("Si Existe",fuses_value["PDC-RMID"].hasOwnProperty(pdcr_small_array[index]))
                        fuses_value["PDC-RMID"][pdcr_small_array[index]] = fuses_value["PDC-RS"][pdcr_small_array[index]].slice();
                        // console.log("Fusible Copiado a caja destino:",fuses_value["PDC-RMID"][pdcr_small_array[index]]);
                        fuses_value["PDC-RS"][pdcr_small_array[index]] = "empty";
                    }else{
                        console.log("Fusible no copiado: ",pdcr_small_array[index]);
                    }
                    
                }
                pdcr_small_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
            }else{
                console.log(hold_config);
                for (let index = 0; index < pdcr_small_array.length; index++) {
                    fuses_value["PDC-RS"][pdcr_small_array[index]] = "empty";
                }
                pdcr_array=[];
                pdcr_1_array=[];
                pdcr_small_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
                // console.log("PDC-RMID fuses FINAL: ",fuses_value["PDC-RMID"]);
                // console.log("PDC-RS fuses FINAL: ",fuses_value["PDC-RS"]);
            }
        }else{
            hold_config = false;
            pdcr_array=[]
            pdcr_1_array=[]
            pdcr_small_array=[]
        }
        precargar_imagen_pdcr_1();
        console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
        console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
        console.log("PDC-R ARRAY FINAL: ",pdcr_array);
    }
    ////// PDC-RS //////
    if(document.getElementById('pdcr_option').value==='PDCR_SMALL'){
        // console.log("pdcr_small")
        document.getElementById('caja_pdcr').style.display="none";
        document.getElementById('caja_pdcr_1').style.display="none";
        document.getElementById('caja_pdcr_small').style.display="block";
        pdcr_caja="pdcr_small";
        pdcr_caja_to_db="PDC-RS";
        ////// Si la PDC-R tiene fusibles: //////
        if (pdcr_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles?");
            if(hold_config){
                console.log(hold_config);
                
                // console.log("fuses value : ",fuses_value["PDC-R"])
                for (let index = 0; index < pdcr_array.length; index++) {
                    // console.log("Fusible: ",pdcr_array[index]);
                    if (fuses_value["PDC-RS"].hasOwnProperty(pdcr_array[index])) {
                        pdcr_small_array.push(pdcr_array[index]);
                        // console.log("Si Existe",fuses_value["PDC-RS"].hasOwnProperty(pdcr_array[index]))
                        fuses_value["PDC-RS"][pdcr_array[index]] = fuses_value["PDC-R"][pdcr_array[index]].slice();
                        // console.log("Fusible Copiado a caja destino:",fuses_value["PDC-RS"][pdcr_array[index]]);
                        fuses_value["PDC-R"][pdcr_array[index]] = "empty";
                    }else{
                        console.log("Fusible no copiado: ",pdcr_array[index]);
                    }
                    
                }
                pdcr_array=[];
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
            }else{
                console.log(hold_config);
                for (let index = 0; index < pdcr_array.length; index++) {
                    fuses_value["PDC-R"][pdcr_array[index]] = "empty";
                }
                pdcr_array=[];
                pdcr_1_array=[];
                pdcr_small_array=[];
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
                // console.log("PDC-R ARRAY FINAL: ",pdcr_array);
                // console.log("PDC-RS fuses FINAL: ",fuses_value["PDC-RS"]);
                // console.log("PDC-R fuses FINAL: ",fuses_value["PDC-R"]);
            }
        }
        ////// Si la PDC-RMID tiene fusibles: //////
        else if (pdcr_1_array.length != 0) {
            hold_config = confirm("Desea mantener la configuración de fusibles?");
            if(hold_config){
                console.log(hold_config);
                
                pdcr_small_array=pdcr_1_array.slice()
                // console.log("Fuses Value de PDC-RMID : ",fuses_value["PDC-RMID"])
                for (let index = 0; index < pdcr_1_array.length; index++) {
                    // console.log("Fusibles: ",pdcr_1_array[index]);
                    // console.log("Fusible valor en fusevalue: ",fuses_value["PDC-RMID"][pdcr_1_array[index]]);
                    fuses_value["PDC-RS"][pdcr_1_array[index]] = fuses_value["PDC-RMID"][pdcr_1_array[index]].slice();
                    // console.log("fusible en pdcr:",fuses_value["PDC-RS"][pdcr_1_array[index]]);
                    fuses_value["PDC-RMID"][pdcr_1_array[index]] = "empty";
                }
                pdcr_1_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
            }else{
                console.log(hold_config);
                for (let index = 0; index < pdcr_1_array.length; index++) {
                    fuses_value["PDC-RMID"][pdcr_1_array[index]] = "empty";
                }
                pdcr_array=[];
                pdcr_1_array=[];
                pdcr_small_array=[];
                // console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
                // console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
            }
        }else{
            hold_config = false;
            pdcr_array=[]
            pdcr_1_array=[]
            pdcr_small_array=[]
        }
        precargar_imagen_pdcr_small();
        console.log("PDC-RMID ARRAY FINAL: ",pdcr_1_array);
        console.log("PDC-RS ARRAY FINAL: ",pdcr_small_array);
        console.log("PDC-R ARRAY FINAL: ",pdcr_array);
    }
}

function getDistance(x1, y1, x2, y2){
    xDistance = x2 - x1;
    yDistance = y2 - y1;
    // console.log("Distancia en X: ",xDistance);
    // console.log("Distancia en Y: ",yDistance);
}

$("#beige_pdcr").on("click",function(){
    color = "MINI,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_pdcr").on("click",function(){
    color = "MINI,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_pdcr").on("click",function(){
    color = "MINI,10,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#verde_pdcr").on("click",function(){
    color = "ATO,30,green";
    color_style = "#008000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_ato_pdcr").on("click",function(){
    color = "ATO,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#natural_pdcr").on("click",function(){
    color = "ATO,25,white";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#amarillo_pdcr").on("click",function(){
    color = "ATO,20,yellow";
    color_style = "#FFFF00";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#naranja_pdcr").on("click",function(){
    color = "MAXI,40,amber";
    color_style = "#FFA500";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_50_pdcr").on("click",function(){
    color = "MAXI,50,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_mini_pdcr").on("click",function(){
    color = "MINI,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#relx_pdcr").on("click",function(){
    color = "RELAY,60,red";
    color_style = "#FF00FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#relt_pdcr").on("click",function(){
    color = "RELAY,70,gray";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});
$("#eliminar_pdcr").on("click",function(){
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcr";
    console.log("Caja seleccionada: ",caja);
});

function restaurar_pdcr(ctx_pdcr,img_pdcr){
    var datosimagen = ctx_pdcr.getImageData(0,0,imgWidth_pdcr,imgHeight_pdcr);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcr[i];
        datos[i+1] = datosPrim_pdcr[i+1];
        datos[i+2] = datosPrim_pdcr[i+2];
    }
    ctx_pdcr.putImageData(datosimagen,0,0);
}

$("#beige_pdcr_mid").on("click",function(){
    color = "MINI,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_pdcr_mid").on("click",function(){
    color = "MINI,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_pdcr_mid").on("click",function(){
    color = "MINI,10,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#verde_pdcr_mid").on("click",function(){
    color = "ATO,30,green";
    color_style = "#008000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_ato_pdcr_mid").on("click",function(){
    color = "ATO,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#natural_pdcr_mid").on("click",function(){
    color = "ATO,25,white";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#amarillo_pdcr_mid").on("click",function(){
    color = "ATO,20,yellow";
    color_style = "#FFFF00";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#naranja_pdcr_mid").on("click",function(){
    color = "MAXI,40,amber";
    color_style = "#FFA500";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_50_pdcr_mid").on("click",function(){
    color = "MAXI,50,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_mini_pdcr_mid").on("click",function(){
    color = "MINI,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#relx_pdcr_mid").on("click",function(){
    color = "RELAY,60,red";
    color_style = "#FF00FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#relt_pdcr_mid").on("click",function(){
    color = "RELAY,70,gray";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});
$("#eliminar_pdcr_mid").on("click",function(){
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_mid";
    console.log("Caja seleccionada: ",caja);
});

function restaurar_pdcr_1(ctx_pdcr_mid,img_pdcr_1){
    var datosimagen = ctx_pdcr_mid.getImageData(0,0,imgWidth_pdcr_mid,imgHeight_pdcr_mid);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcr_mid[i];
        datos[i+1] = datosPrim_pdcr_mid[i+1];
        datos[i+2] = datosPrim_pdcr_mid[i+2];
    }
    ctx_pdcr_mid.putImageData(datosimagen,0,0);
}

$("#beige_pdcr_small").on("click",function(){
    color = "MINI,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_pdcr_small").on("click",function(){
    color = "MINI,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_pdcr_small").on("click",function(){
    color = "MINI,10,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#verde_pdcr_small").on("click",function(){
    color = "ATO,30,green";
    color_style = "#008000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_ato_pdcr_small").on("click",function(){
    color = "ATO,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#natural_pdcr_small").on("click",function(){
    color = "ATO,25,white";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#amarillo_pdcr_small").on("click",function(){
    color = "ATO,20,yellow";
    color_style = "#FFFF00";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#naranja_pdcr_small").on("click",function(){
    color = "MAXI,40,amber";
    color_style = "#FFA500";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_50_pdcr_small").on("click",function(){
    color = "MAXI,50,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_mini_pdcr_small").on("click",function(){
    color = "MINI,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#relx_pdcr_small").on("click",function(){
    color = "RELAY,60,red";
    color_style = "#FF00FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#relt_pdcr_small").on("click",function(){
    color = "RELAY,70,gray";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});
$("#eliminar_pdcr_small").on("click",function(){
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcr_small";
    console.log("Caja seleccionada: ",caja);
});

function restaurar_pdcr_small(ctx_pdcr_small,img_pdcr_small){
    var datosimagen = ctx_pdcr_small.getImageData(0,0,imgWidth_pdcr_small,imgHeight_pdcr_small);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcr_small[i];
        datos[i+1] = datosPrim_pdcr_small[i+1];
        datos[i+2] = datosPrim_pdcr_small[i+2];
    }
    ctx_pdcr_small.putImageData(datosimagen,0,0);
}

$("#rojo_pdcs").on("click",function(){
    color = "ATO,10,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcs";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_pdcs").on("click",function(){
    color = "ATO,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcs";
    console.log("Caja seleccionada: ",caja);
});
$("#beige_pdcs").on("click",function(){
    color = "ATO,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcs";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_pdcs").on("click",function(){
    color = "ATO,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcs";
    console.log("Caja seleccionada: ",caja);
});
$("#verde_pdcs").on("click",function(){
    color = "ATO,30,green";
    color_style = "#008000";
    console.log("Color seleccionado: ",color)
    caja = "pdcs";
    console.log("Caja seleccionada: ",caja);
});
$("#eliminar_pdcs").on("click",function(){
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcs";
    console.log("Caja seleccionada: ",caja);
});
function restaurar_pdcs(ctx,img_pdcs){
    var datosimagen = ctx.getImageData(0,0,imgWidth_pdcs,imgHeight_pdcs);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcs[i];
        datos[i+1] = datosPrim_pdcs[i+1];
        datos[i+2] = datosPrim_pdcs[i+2];
    }
    ctx.putImageData(datosimagen,0,0);
}

$("#rojo_tblu").on("click",function(){
    color = "ATO,10,red_clear";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "tblu";
    console.log("Caja seleccionada: ",caja);
});
$("#beige_tblu").on("click",function(){
    color = "ATO,5,beige_clear";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "tblu";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_tblu").on("click",function(){
    color = "ATO,15,blue_clear";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "tblu";
    console.log("Caja seleccionada: ",caja);
});
$("#eliminar_tblu").on("click",function(){
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "tblu";
    console.log("Caja seleccionada: ",caja);
});

function restaurar_tblu(ctx_tblu,img_tblu){
    var datosimagen = ctx_tblu.getImageData(0,0,imgWidth_tblu,imgHeight_tblu);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_tblu[i];
        datos[i+1] = datosPrim_tblu[i+1];
        datos[i+2] = datosPrim_tblu[i+2];
    }
    ctx_tblu.putImageData(datosimagen,0,0);
}

$("#beige_ato_pdcd").on("click",function(){
    color = "ATO,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#beige_mini_pdcd").on("click",function(){
    color = "MINI,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_mini_pdcd").on("click",function(){
    color = "MINI,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_ato_pdcd").on("click",function(){
    color = "ATO,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_pdcd").on("click",function(){
    color = "MINI,10,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#verde_pdcd").on("click",function(){
    color = "ATO,30,green";
    color_style = "#008000";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_pdcd").on("click",function(){
    color = "MINI,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#natural_pdcd").on("click",function(){
    color = "ATO,25,white";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
$("#eliminar_pdcd").on("click",function(){
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcd";
    console.log("Caja seleccionada: ",caja);
});
function restaurar_pdcd(ctx_pdcd,img_pdcd){
    var datosimagen = ctx_pdcd.getImageData(0,0,imgWidth_pdcd,imgHeight_pdcd);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcd[i];
        datos[i+1] = datosPrim_pdcd[i+1];
        datos[i+2] = datosPrim_pdcd[i+2];
    }
    ctx_pdcd.putImageData(datosimagen,0,0);
}

$("#beige_pdcp").on("click",function(){
    color = "MINI,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_mini_pdcp").on("click",function(){
    color = "MINI,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#cafe_multi_pdcp").on("click",function(){
    color = "MULTI,7.5,brown";
    color_style = "#8B4513";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#rojo_pdcp").on("click",function(){
    color = "MINI,10,red";
    color_style = "#FF0000";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#verde_pdcp").on("click",function(){
    color = "ATO,30,green";
    color_style = "#008000";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#natural_pdcp").on("click",function(){
    color = "ATO,25,white";
    color_style = "#FFFFFF";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_mini_pdcp").on("click",function(){
    color = "MINI,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#azul_ato_pdcp").on("click",function(){
    color = "ATO,15,blue";
    color_style = "#0000FF";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#amarillo_pdcp").on("click",function(){
    color = "MULTI,5,beige";
    color_style = "#FFD700";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});
$("#eliminar_pdcp").on("click",function(){
    color = "eliminar";
    color_style = "#A9A9A9";
    console.log("Color seleccionado: ",color)
    caja = "pdcp";
    console.log("Caja seleccionada: ",caja);
});

function restaurar_pdcp(ctx_pdcp,img_pdcp){
    var datosimagen = ctx_pdcp.getImageData(0,0,imgWidth_pdcp,imgHeight_pdcp);
    var datos = datosimagen.data;
    for (var i = 0; i < datos.length; i++) {
        datos[i] = datosPrim_pdcp[i];
        datos[i+1] = datosPrim_pdcp[i+1];
        datos[i+2] = datosPrim_pdcp[i+2];
    }
    ctx_pdcp.putImageData(datosimagen,0,0);
}

function build_dic(){
    if(pdcr_caja==""){
        document.getElementById("informacion").innerHTML = "No ha seleccionado ninguna de las opciones para la caja <span class='badge progress-bar-danger'>PDC-R</span>.";
        $('#mostrar').click();
    }else{
        if(historial==""){
            add_module_vision()
        }
        else{
            document.getElementById("informacion").innerHTML = "El nombre del Módulo que intenta agregar <span class='badge progress-bar-danger'>ya existe</span>.";
            $('#mostrar').click();
        }
    }
}

function add_module_vision(){
    // console.log("VALOR FINAL: ",fuses_value);
    modulo_db=document.getElementById('modulo_vision').value;
    // console.log(pdcr_caja_to_db)
    if (modulo_db.length == 0) {
        document.getElementById("informacion").innerHTML = "Es necesario agregar un <span class='badge progress-bar-danger'>nombre</span> al módulo. Intente de nuevo.";
        $('#mostrar').click();
    }else{
        const newPost = {
            "DBEVENT": DBEVENT,
            MODULO:modulo_db,
            "PDC-R": {},
            "PDC-RMID": {},
            "PDC-RS": {},
            "PDC-S": fuses_value['PDC-S'],
            "TBLU": fuses_value['TBLU'],
            "PDC-D": fuses_value['PDC-D'],
            "PDC-P": fuses_value['PDC-P']
        }

        if (pdcr_caja_to_db == "PDC-R") {
            newPost["PDC-R"] = fuses_value['PDC-R']
            newPost["PDC-RMID"] = {}
            newPost["PDC-RS"] = {}
        }else if(pdcr_caja_to_db == "PDC-RMID"){
            newPost["PDC-RMID"] = fuses_value['PDC-RMID']
            newPost["PDC-R"] = {}
            newPost["PDC-RS"] = {}
        }else if(pdcr_caja_to_db == "PDC-RS"){
            newPost["PDC-RS"] = fuses_value['PDC-RS']
            newPost["PDC-R"] = {}
            newPost["PDC-RMID"] = {}
        }
        // console.log("ESTE ES EL NEWPOST",newPost);

        fetch(dominio+'/api/update/modulos_fusibles/'+edit_id,{
            method: 'POST',
            body: JSON.stringify(newPost),
            headers:{
                "Content-type": "application/json"
            }
        }).then(res=>res.json())
        .then(function (data){
            console.log(data);
            location.replace("edit_modulos.html")
        })
        .catch(function(err) {
            console.log(err);
        });
    }
}

function get_valid_pedido(){
    historial="";
    // console.log(document.getElementById("modulo_vision").value)
    if(document.getElementById("modulo_vision").value!=""){
        // get the id
        endpoint=dominio+'/api/get/'+DBEVENT+'/modulos_fusibles/modulo/=/'+document.getElementById("modulo_vision").value+'/_/=/_'
        // console.log(endpoint)
        fetch(endpoint,{
        	method: 'GET',
        	headers:{
        		"Content-type": "application/json"
        	}
        }).then(res=>res.json())
        .then(function (data){
        	// console.log(data);
        	// console.log(data.MODULO);
            if (data.items != 0) {
                if (data.MODULO == sessionStorage.getItem('edit_vision')) {
                    historial="";
                    alert_get_historial.innerHTML ="";
                }else{
                    historial="si existe"
                    alert_get_historial.innerHTML = '<div class="alert alert-warning" role="alert">El pedido "'+document.getElementById("modulo_vision").value+'" ya existe</div>'
                    // console.log(historial)
                }
            }
            // console.log(historial)
        })
        .catch(function(err) {
            console.log(err);
        });
        alert_get_historial.innerHTML = '<div class="alert alert-success" role="alert">El pedido "'+document.getElementById("modulo_vision").value+'" no existe</div>'
        // console.log(historial)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
        if(e.keyCode == 13) {
            e.preventDefault();
        }
    }))
});

$('#modal_info').find(".modal-header").css("background", "#f44336");