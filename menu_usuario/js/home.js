sala = 1
mesa = 1

window.addEventListener("load",function(){
    salas();
    listar();
})


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