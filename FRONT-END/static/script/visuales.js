let DBEVENT = sessionStorage.getItem('DBEVENT');
console.log("DB EVENT ACTUAL: ",DBEVENT);
let modif_name_1 = DBEVENT.replace(/_/g, '-') // Se reemplazan los "_" encontrados en el nombre del Evento por "-" 
let modif_name_2 = modif_name_1.replace("evento-", '') // Se elimina el string inicial "evento-" del nombre
let eventoFinal = modif_name_2.toUpperCase()
document.getElementById('tituloEvento').innerText = eventoFinal;
var id;
function cleardiv(){
  document.getElementById("tabla").innerHTML = "";
}

function cargartabla(){
  cleardiv();
  fetch(dominio+"/api/get/"+DBEVENT+"/modularidades/ID/>/0/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("Sin registro alguno");
      document.getElementById("tabla").innerHTML = "<label>Tabla sin registros.</label>";
    }else{
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("ACTIVO"),1,"ID","ACTIVO");
      // console.log("Columnas: ", colnames);
      var filas = data[colnames[1]].length;
      // console.log("Num de Registros:",filas);

      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("tabla");
      var table = document.createElement('TABLE');
      var tableBody = document.createElement('TBODY');
      var Encabezados = document.createElement('THEAD');

      table.id = "myTable";
      table.classList.add('display');
      table.classList.add('nowrap');
      table.cellSpacing="0";
      table.width="100%";
      table.border = '2';
      table.appendChild(Encabezados);
      table.appendChild(tableBody);
      tableBody.align="center";
      //FIN DE CREACIÓN DE TABLA

      //ENCABEZADOS DE LA TABLA
      var tr = document.createElement('TR');
      Encabezados.appendChild(tr);
      for (i = 0; i < colnames.length; i++) {
        var th = document.createElement('TH')
        th.width = '100';
        th.appendChild(document.createTextNode(colnames[i]));
        tr.appendChild(th).style.backgroundColor="#0DBED6";
      }
      var th = document.createElement('TH')
      th.width = '100';
      th.appendChild(document.createTextNode('Operación'));
      tr.appendChild(th).style.backgroundColor="#0DBED6";
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          switch (colnames[j]){
            case "MODULOS_FUSIBLES":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-modulos');
            boton.style.width="60px"
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            default:
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
          }
          tr.appendChild(td)
        }
        var td = document.createElement('TD');
        var boton = document.createElement('button');
        var ver = document.createElement('i');
        ver.classList.add("fas");
        ver.classList.add("fa-eye");
        boton.title = 'Ver Modularidad';
        boton.classList.add('btn');
        boton.classList.add('btn-warning');
        boton.classList.add('btn-ver');
        boton.appendChild(ver);
        td.appendChild(boton);
        tr.appendChild(td)
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable();
      });
    }
  })
}

$(document).on('click','.btn-ver-modulos', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modularidades/ID/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar_modulos').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+DBEVENT+"/modularidades/ID/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar_modulos').click();
    })
  }
});

$(document).on('click','.btn-ver', function(){
  var edit_id = $(this).parent().parent().children().first().text();
  var edit= $(this).parent().parent().children().next().next().next().first().text();
  id = edit_id;
  console.log("Nombre del Módulo: ", edit);
  console.log("Id de Módulo: ",edit_id);
  sessionStorage.setItem("modularidad", edit);
  location.href = "preview.html";
});