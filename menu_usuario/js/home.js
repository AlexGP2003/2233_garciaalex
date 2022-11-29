sala = 1
mesa = 1

imagen_sala=[]
imagen_mesa=[]


window.addEventListener("load",function(){
    salas();
    listar();
    guardar_fotos()
})

function guardar_fotos(){
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/recoger_valores_sala.php');
    ajax.onload=function (){
        if(ajax.status==200){
           if(ajax.responseText!="error"){
            resul = JSON.parse(ajax.responseText)
            resul.forEach(element => {
                imagen_sala.push(element.foto)
            });
           }
           sala_foto = sala-1
           console.log(sala_foto)
           document.getElementById("contenedor_img_sala").style.backgroundImage=`url("../img/`+imagen_sala[sala_foto]+`")`
           console.log(imagen_sala)
        }else{
        }
    }
    ajax.send();
}
function salas(){
    select_sala = document.getElementById("select_sala");
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/recoger_valores_sala.php');
    ajax.onload=function (){
        if(ajax.status==200){
            cadena = "<select id='select_sala_elementos' onchange=ajustar_mesas() class='form-select' aria-label='.form-select-lg example'>";
           if(ajax.responseText!="error"){
            resul = JSON.parse(ajax.responseText)
            resul.forEach(element => {
                cadena += "<option value="+element.id_sala+">"+element.nombre_sala+"</option>";
            });
            cadena += "</select>";
            select_sala.innerHTML = cadena
           }
        }else{
        }
    }
    ajax.send();
}
function listar() {
    select_mesa = document.getElementById("select_mesa");
    var formdata = new FormData();
    formdata.append("sala",sala);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/recoger_valores.php');
    ajax.onload=function (){
        if(ajax.status==200){
            cadena = "<select class='form-select' aria-label='.form-select-lg example'>";
           if(ajax.responseText!="error"){
            resul = JSON.parse(ajax.responseText)
            resul.forEach(element => {
                cadena += "<option value="+element.id_mesa+">Mesa "+element.numero_mesa+"</option>";
            });
            cadena += "</select>";
            select_mesa.innerHTML = cadena
            guardar_fotos()
           }
        }else{
        }
    }
    ajax.send(formdata);
}

function ajustar_mesas(){
    var nuevo_valor_sala = document.getElementById("select_sala_elementos").options[document.getElementById("select_sala_elementos").selectedIndex].value
    sala = nuevo_valor_sala
    listar(); 
}