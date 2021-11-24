////////////// VARIABLES GLOBALES /////////////////////
var alertawarning = document.getElementById('alertawarning');

var fecha=document.getElementById("fecha");
var id=document.getElementById("id");
var modulo=document.getElementById("modulo");
var modularidad=document.getElementById("modularidad");
var HM=document.getElementById("HM");
var tipobusqueda=document.getElementById("tipobusqueda");
var tipobusqueda2=document.getElementById("tipobusqueda2");
var tipobusqueda3=document.getElementById("tipobusqueda3");
var nombre=document.getElementById("nombre");
var gafete=document.getElementById("gafete");

function fechaActual(){
  let fecha = new Date();
  let mes = fecha.getMonth()+1;
  let dia = fecha.getDate()+1;
  let ano = fecha.getFullYear();
  if (dia<10) {
    dia = '0'+dia;
  }
  if (mes<10) {
    mes = '0'+mes;
  }
  document.getElementById('fechaf').value = ano+"-"+mes+"-"+dia;
  fechaAnterior(mes, dia, ano);
}
function fechaAnterior(mes, dia, ano){
let fechaInicial = document.getElementById('fechai');
let mesAnterior = mes.length === 1? mes-2: ("0"+ (mes-2)).slice(-2);
let DiaAnterior = dia.length === 1? dia : ("0" + dia).slice(-2);
fechaInicial.setAttribute("value", `${ano}-${mesAnterior}-${DiaAnterior}`);
}

var options = {
  Historial : ["Fecha Inicial","HM"],
  Log : ["Fecha","ID","HM"],
  manager : ["Fecha","Nombre","Gafet"],
  modularidades : ["Fecha","Modularidad"],
  Modulos_Fusibles : ["ID","Modulo"],
  Usuarios : ["Fecha","Nombre","Gafet"],
  web : ["Fecha","Nombre","Gafet"]
}

$(function(){
var fillSecondary = function(){
  var selected = $('#selector').val();
  // if ($('#selector').val() == "manager") {
  //   $('#tipo_busqueda').empty();
  //   $('#tipo_busqueda').css("display","none");
  //   $('#label_busqueda').css("display","none");
  //   fecha.style.display = 'inline-block';
  //   HM.style.display = 'none';
  //   nombre.style.display = 'none';
  //   gafete.style.display = 'none';
  //   id.style.display = 'none';
  //   modulo.style.display = 'none';
  //   modularidad.style.display = 'none';
  // }else{
    $('#tipo_busqueda').css("display","inline-block");
    $('#label_busqueda').css("display","inline-block");
    $('#tipo_busqueda').empty();
    options[selected].forEach(function(element,index){
      $('#tipo_busqueda').append('<option value="'+element+'">'+element+'</option>');
    });
  // }
  switch ($('#tipo_busqueda').val()) {
    case "Fecha":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "Fecha Inicial":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "ID":
      // console.log("Búsqueda por id")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'inline-block';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    default:
    break;
  }
}
var cambio = function(){
  switch ($('#tipo_busqueda').val()) {
    case "Fecha":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "Fecha Inicial":
      // console.log("Búsqueda por FECHA")
      fecha.style.display = 'inline-block';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "HM":
      // console.log("Búsqueda por HM")
      fecha.style.display = 'none';
      HM.style.display = 'inline-block';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
      document.getElementById("hminput").focus();
    break;
    case "Nombre":
      // console.log("Búsqueda por Nombre")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'inline-block';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
      document.getElementById("nombreinput").focus();
    break;
    case "Gafet":
      // console.log("Búsqueda por Gafet")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'inline-block';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
      document.getElementById("gafeteinput").focus();
    break;
    case "ID":
      // console.log("Búsqueda por id")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'inline-block';
      modulo.style.display = 'none';
      modularidad.style.display = 'none';
    break;
    case "Modulo":
      // console.log("Búsqueda por modulo")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'inline-block';
      modularidad.style.display = 'none';
      document.getElementById("moduloinput").focus();
    break;
    case "Modularidad":
      // console.log("Búsqueda por Modularidad")
      fecha.style.display = 'none';
      HM.style.display = 'none';
      nombre.style.display = 'none';
      gafete.style.display = 'none';
      id.style.display = 'none';
      modulo.style.display = 'none';
      modularidad.style.display = 'inline-block';
      document.getElementById("modularidad_input").focus();
    break;  
    default:
    break;
  }
}
$('#selector').change(fillSecondary);
fillSecondary();
$('#tipo_busqueda').change(cambio);
cambio();
});

function cleardiv(){
  document.getElementById("resultado").innerHTML = "";
}
// Función que se ejecuta al oprimir el botón "Obtener Resultados"
function capturar(){
  if (sessionStorage.getItem('tipo') == null) {
    alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">Necesita inicar sesión para visualizar esta información.</div>'
  } else {
    var tabla=document.getElementById("selector").value;
    // console.log(tabla);
    switch (tabla){
      case "Historial":
      cleardiv();
      cargarportipo_log();
      console.log("Obtener Resultados de Historial");
      break;
      case "Log":
      cleardiv();
      cargarportipo_log();
      console.log("Obtener Resultados de Log");
      break;
      case "Modulos_Fusibles":
      cleardiv();
      cargarmodulo();
      console.log("Obtener Resultados de Modulos_Fusibles");
      break;
      case "modularidades":
      cleardiv();
      cargarpedido();
      console.log("Obtener Resultados de Modularidades");
      break;
      case "Usuarios":
      cleardiv();
      cargarportipo_usuarios();
      console.log("Obtener Resultados de Usuarios");
      break;
      case "web":
      cleardiv();
      cargarportipo();
      console.log("Obtener Resultados de Web");
      break;
      case "manager":
      cleardiv();
      cargarportipo_usuarios();
      console.log("Obtener Resultados de Manager");
      break;
      default:
      console.log("No pasa nada");
    }
  }
}


//////////////// AL SELECCIONAR TABLAS QUE NECESITEN REALIZAR CONSULTAS EN BASE A "Datetime" SE EJECUTARÁ ESTA FUNCIÓN //////////////////////////////////
function cargardatetime(){
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/fecha/>/"+document.getElementById('fechai').value+"/fecha/</"+document.getElementById('fechaf').value)
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("ACTIVO"),1,"ID","ACTIVO");
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
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
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

$(document).on('click','.btn-ver-estado', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/pedidos/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/log/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});

function cargarfecha(){
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/fecha/>/"+document.getElementById('fechai').value+"/fecha/</"+document.getElementById('fechaf').value)
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log(colnames);
      // console.log("Elemento eliminado",colnames.splice(colnames.indexOf("GAFET"),1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}
//////////////// AL SELECCIONAR TABLAS QUE NECESITEN REALIZAR CONSULTAS EN BASE AL "ID" SE EJECUTARÁ ESTA FUNCIÓN ////////////////////////
function cargarmodulo(){
  switch ($('#tipo_busqueda').val()){
    case "Modulo":  
    var moduloinput = document.getElementById("moduloinput").value;
    // console.log(moduloinput);
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/modulo/=/"+moduloinput+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      }else{
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        // console.log("Colnames: ",colnames);
        var filas = data[colnames[0]];
        // console.log("Resultado: ",filas);
        //CREACIÓN DE TABLA
        var myTableDiv = document.getElementById("resultado");
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
        //FILAS DE LA TABLA
        for (i = 0; i < 1; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            switch (colnames[j]){
            case "PDC-R":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja1_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-RMID":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja2_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-S":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja3_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "TBLU":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja4_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-D":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja5_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "PDC-P":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-caja6_1');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            default:
            td.appendChild(document.createTextNode(data[colnames[j]]));
            break;
          }
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function() {
          $('#myTable').DataTable({
            responsive:true
          });
        } );
      }
    })
    break;
    case "ID":
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/>/"+document.getElementById('idi').value+"/id/</"+document.getElementById('idf').value)
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      }else{
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        var filas = data[colnames[0]].length;
        //CREACIÓN DE TABLA
        var myTableDiv = document.getElementById("resultado");
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
        //FILAS DE LA TABLA
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            switch (colnames[j]){
              case "PDC-R":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja1');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-RMID":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja2');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-S":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja3');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "TBLU":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja4');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-D":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja5');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              case "PDC-P":
              var boton = document.createElement('button');
              var icono = document.createElement('i');
              icono.classList.add("fas");
              icono.classList.add("fa-archive");
              boton.title = "Ver Información";
              boton.classList.add('btn');
              boton.classList.add('btn-info');
              boton.classList.add('btn-ver-caja6');
              boton.style.width="60px";
              boton.appendChild(icono);
              td.appendChild(boton);
              break;
              default:
              td.appendChild(document.createTextNode(data[colnames[j]][i]));
              break;
            }
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
        myTableDiv.appendChild(table);
        $(document).ready(function() {
          $('#myTable').DataTable({
            responsive:true
          });
        } );
      }
    })

  }
}

$(document).on('click','.btn-ver-caja1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja2', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja3', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja4', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja5', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja6', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});

$(document).on('click','.btn-ver-caja1_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja2_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja3_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja4_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja5_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
$(document).on('click','.btn-ver-caja6_1', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    console.log("Header Responsive: ",id_info);
    var id_info_responsive = header.parent().prev().find("td:first").text();
    console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/id/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});
function cargarnombre(){
  var nombreinput = document.getElementById("nombreinput").value;
  // console.log(nombreinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/nombre/=/"+nombreinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(1,1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargargafete(){
  var gafeteinput = document.getElementById("gafeteinput").value;
  // console.log(gafeteinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/gafet/=/"+gafeteinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(1,1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      // console.log("Resultado: ",filas);
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          td.appendChild(document.createTextNode(data[colnames[j]][i]));
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargarnombre_usuarios(){
  var nombreinput = document.getElementById("nombreinput").value;
  // console.log(nombreinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/nombre/=/"+nombreinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';    
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(2,1));
      // console.log("el nuevo array: ", colnames);
      
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
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
      //FILAS DE LA TABLA
      if (document.getElementById('selector').value == "manager") {
        console.log("Es manager");
        var filas = data[colnames[0]].length;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }else{
        var filas = 1;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }
      // console.log("Resultado: ",filas);
      
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargargafete_usuarios(){
  var gafeteinput = document.getElementById("gafeteinput").value;
  // console.log(gafeteinput);
  fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/gafet/=/"+gafeteinput+"/_/=/_")
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      colnames.splice(colnames.indexOf("GAFET"),1);
      // console.log("Colnames: ",colnames);
      // console.log("Elemento eliminado",colnames.splice(2,1));
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]];
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
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
      //FILAS DE LA TABLA
      if (document.getElementById('selector').value == "manager") {
        console.log("Es manager");
        var filas = data[colnames[0]].length;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }else{
        var filas = 1;
        for (i = 0; i < filas; i++) {
          var tr = document.createElement('TR');
          for (j = 0; j < colnames.length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(data[colnames[j]]));
            tr.appendChild(td)
          }
          tableBody.appendChild(tr);
        }
      }
      // console.log("Resultado: ",filas);
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

function cargarpedido(){
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    cargardatetime();
    break;
    case "Modularidad":
    var modularidad_input = document.getElementById("modularidad_input").value;
    // console.log(modularidad_input);
    fetch(dominio+"/api/get/"+document.getElementById('selector').value+"/modularidad/=/"+modularidad_input+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      if (data.items == 0) {
        console.log("No hay coincidencias");
        alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
      }else{
        alertawarning.innerHTML = '';
        var colnames = Object.keys(data);
        colnames.splice(colnames.indexOf("ID"),1);
        colnames.splice(colnames.indexOf("ACTIVO"),1,"ID","ACTIVO");
        // console.log("Colnames: ",colnames);
        var filas = data[colnames[0]];
        // console.log("Resultado: ",filas);
          //CREACIÓN DE TABLA
          var myTableDiv = document.getElementById("resultado");
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
            //FILAS DE LA TABLA
            for (i = 0; i < 1; i++) {
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
              tableBody.appendChild(tr);
            }
            myTableDiv.appendChild(table);
            $(document).ready(function() {
              $('#myTable').DataTable({
                responsive:true
              });
            } );
          }
        })
    break;
  }
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
    fetch(dominio+"/api/get/modularidades/ID/=/"+id_info_responsive+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[id_info]);
      document.getElementById("informacion").innerHTML = data[id_info];
      $('#mostrar').click();
    })  
  } else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
    fetch(dominio+"/api/get/modularidades/ID/=/"+id_info+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      // console.log(data);
      // console.log(data[header_info]);
      document.getElementById("informacion").innerHTML = data[header_info];
      $('#mostrar').click();
    })
  }
});

function cargarportipo(){
  // console.log("Este es el tipo que seleccionó: ",document.getElementById("tipo").value);
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    // console.log("mostrando resultados por fecha");
    cargarfecha();
    break;
    case "Nombre":
    // console.log("mostrando resultados por nombre");
    cargarnombre();
    break;
    case "Gafet":
    // console.log("mostrando resultados por nombre");
    cargargafete();
    break;
  }
}

function cargarportipo_usuarios(){
  // console.log("Este es el tipo que seleccionó: ",document.getElementById("tipo").value);
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    // console.log("mostrando resultados porfecha");
    cargarfecha();
    break;
    case "Nombre":
    // console.log("mostrando resultados por nombre");
    cargarnombre_usuarios();
    break;
    case "Gafet":
    // console.log("mostrando resultados por nombre");
    cargargafete_usuarios();
    break;
  }
}

//////////////// AL SELECCIONAR LA TABLA "Historial" SE EJECUTARÁ ESTA FUNCIÓN PARA REALIZAR LA CONSULTA DE LOS DATOS A LA TABLA CORRESPONDIENTE ///////////////////////
function cargarportipo_log(){
  switch ($('#tipo_busqueda').val()){
    case "Fecha":
    console.log("mostrando resultados por FECHA");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/fecha/>/"+document.getElementById('fechai').value+"/fecha/</"+document.getElementById('fechaf').value;
    break;
    case "Fecha Inicial":
    console.log("mostrando resultados por FECHA");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/inicio/>/"+document.getElementById('fechai').value+"/inicio/</"+document.getElementById('fechaf').value;
    break;
    case "ID":
    console.log("mostrando resultados por ID");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/id/>/"+document.getElementById('idi').value+"/id/</"+document.getElementById('idf').value;
    break;
    case "HM":
    console.log("mostrando resultados por HM");
    var url = dominio+"/api/get/"+document.getElementById('selector').value+"/hm/=/"+document.getElementById('hminput').value+"/_/=/_";
    break;
  }
  fetch(url)
  .then(data=>data.json())
  .then(data=>{
    // console.log(data);
    if (data.items == 0) {
      console.log("No hay coincidencias");
      alertawarning.innerHTML = '<div class="alert alert-warning" role="alert">No existen coincidencias en la base de datos.</div>';
    }else{
      alertawarning.innerHTML = '';
      var colnames = Object.keys(data);
      // console.log(colnames);
      if (document.getElementById('selector').value == "Historial") {
      colnames.splice(colnames.indexOf("ID"),1);
      colnames.splice(colnames.indexOf("RESULTADO"),1);
      colnames.splice(colnames.indexOf("INICIO"),1);
      colnames.splice(colnames.indexOf("FIN"),1,"ID","INICIO","FIN","RESULTADO");
      }
      // console.log("el nuevo array: ", colnames);
      var filas = data[colnames[0]].length;
      //CREACIÓN DE TABLA
      var myTableDiv = document.getElementById("resultado");
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
      //FILAS DE LA TABLA
      for (i = 0; i < filas; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < colnames.length; j++) {
          var td = document.createElement('TD')
          switch (colnames[j]){
            case "FUSIBLES":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-fusibles');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;
            case "REINTENTOS":
            var boton = document.createElement('button');
            var icono = document.createElement('i');
            icono.classList.add("fas");
            icono.classList.add("fa-archive");
            boton.title = "Ver Información";
            boton.classList.add('btn');
            boton.classList.add('btn-info');
            boton.classList.add('btn-ver-reintentos');
            boton.style.width="60px";
            boton.appendChild(icono);
            td.appendChild(boton);
            break;          
            default:
            td.appendChild(document.createTextNode(data[colnames[j]][i]));
            break;
          }
          tr.appendChild(td)
        }
        tableBody.appendChild(tr);
      }
      myTableDiv.appendChild(table);
      $(document).ready(function() {
        $('#myTable').DataTable({
          responsive:true
        });
      } );
    }
  })
}

$(document).on('click','.btn-ver-fusibles', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  var id_info_responsive = header.parent().prev().find("td:first").text();
  let case_fetch = isNaN(id_info)==true? id_info_responsive:id_info;
  let case_JSON_PARSE = isNaN(id_info)==true?  id_info:header_info;
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    //console.log("Header Responsive: ",id_info);
    //console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
  }
   else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
  }
    fetch(dominio+"/api/get/historial/id/=/"+case_fetch+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[case_JSON_PARSE]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
        // console.log("Aqui esta la CAJA:",caja);
         let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
        
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         
         let grid = document.createElement("div");
         grid.classList = "grid-box";
         nav.appendChild(grid);
         for (let j = 0; j < get_cavidad.length; j++) {
          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          //let boxValue = valores.replace(re, 'N/A');
          span.innerHTML = `<p>${obj_cavidad}: ${valores}</p>`;
          grid.appendChild(span);
         }
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    }) 
});
$(document).on('click','.btn-ver-reintentos', function(){
  var id_info = $(this).parent().parent().children().first().text();
  var header = $(this).closest("td");
  var header_info = header.closest( "table" ).find( "thead > tr > th" ).eq( header.index() ).text();
  var id_info_responsive = header.parent().prev().find("td:first").text();
  let case_fetch = isNaN(id_info)==true? id_info_responsive:id_info;
  let case_JSON_PARSE = isNaN(id_info)==true?  id_info:header_info;
  if (isNaN(id_info)==true) {
    // console.log("CAMPO EN MODO RESPONSIVE");
    //console.log("Header Responsive: ",id_info);
    //console.log("ID Responsive del registro: ",id_info_responsive);
    document.getElementById("header").innerHTML = id_info;
  }
   else{
    console.log("ID del registro: ",id_info);
    console.log("Header: ",header_info);
    document.getElementById("header").innerHTML = header_info;
  }
    fetch(dominio+"/api/get/historial/id/=/"+case_fetch+"/_/=/_")
    .then(data=>data.json())
    .then(data=>{
      document.getElementById("informacion").innerHTML = "";
      // console.log(data);
      // console.log(data[header_info]);
      let re = /0/g;
      dataParse = JSON.parse(data[case_JSON_PARSE]);
      // console.log("Convertido a JSON: ",dataParse)
      dataKeys = Object.keys(dataParse)
      // console.log("dataKeys: ",dataKeys)
      let div = document.createElement("div");
      for (let i = 0; i < dataKeys.length; i++) {
         let nav = document.createElement("nav");
         let caja = dataKeys[i];
         nav.id = "titulo-caja"
         nav.innerHTML = "<b>"+caja+"</b>";
         div.appendChild(nav);
        // console.log("Aqui esta la CAJA:",caja);
         let cavidades = dataParse[caja];
        //console.log("Aquí en object: ",cavidades)
         let get_cavidad = Object.getOwnPropertyNames(cavidades);
         let grid = document.createElement("div");
         grid.classList = "grid-box";
         nav.appendChild(grid);
         for (let j = 0; j < get_cavidad.length; j++) {
          let obj_cavidad = get_cavidad[j];
          //console.log ("cavidad",obj_cavidad);
          //console.log ("valor",cavidades[obj_cavidad]);
          let span = document.createElement("span");
          span.classlist = "caja-valor";
          let valores = JSON.stringify(cavidades[obj_cavidad]);
          //console.log("Aqui en string: ",valores)
          //let boxValue = valores.replace(re, 'N/A');
          span.innerHTML = `<p>${obj_cavidad}: ${valores}</p>`;
          grid.appendChild(span);
         }
      }
     
      document.getElementById("informacion").appendChild(div) 
      $('#mostrar').click();
    }) 
});

//////////////// Jquerys que evitan que un campo de texto actúe como "Submit" al momento de dar "Enter" ///////////////////////

$('#modulo').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#modularidad').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#nombre').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#gafete').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});

$('#HM').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    capturar();
  }
});