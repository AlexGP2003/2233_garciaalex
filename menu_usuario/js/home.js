sala = 1

imagen_sala=[]
imagen_mesa=[]

cambio_sala = true;

window.addEventListener("load",function(){
    salas();
    listar();
})

function guardar_fotos(){
    document.getElementById("contenedor_img_mesa").style.backgroundImage=`url("../img/`+imagen_mesa[mesa]+`")`
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
           document.getElementById("contenedor_img_sala").style.backgroundImage=`url("../img/`+imagen_sala[sala_foto]+`")`
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
    if(cambio_sala){
        set_img_1 = false
    }
    select_mesa = document.getElementById("select_mesa");
    var formdata = new FormData();
    formdata.append("sala",sala);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/recoger_valores.php');
    ajax.onload=function (){
        if(ajax.status==200){
            cadena = "<select onchange='change_img_mesa()' id='select_mesa' class='form-select' aria-label='.form-select-lg example'>";
           if(ajax.responseText!="error"){
            resul = JSON.parse(ajax.responseText)
            resul.forEach(element => {
                if(!set_img_1){
                    mesa = element.id_mesa
                    set_img_1 = true
                }
                imagen_mesa[element.id_mesa]=element.foto_mesa
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
    cambio_sala = true;
    listar(); 
}

function change_img_mesa(){
    campo = event.srcElement
    mesa = campo.options[campo.selectedIndex].value
    document.getElementById("contenedor_img_mesa").style.backgroundImage=`url("../img/`+imagen_mesa[mesa]+`")`
}