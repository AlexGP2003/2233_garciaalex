sala = 1

imagen_sala=[]
imagen_mesa=[]

cambio_sala = true;

window.addEventListener("load",function(){
    salas();
    listar();
    this.document.getElementById("formulario_reserva").addEventListener("submit",function(){
        event.preventDefault()
        error = false
        hora_dia = document.getElementById("dia_hora_reserva").value;
        hora_dia = hora_dia.split('T');
        if(hora_dia.length==1){
            error = true
        }else{
            hora_inicio = new Date("March 1, 2012 "+hora_dia[1]) 
            dia = new Date(hora_dia)
        }
        hora_fin_valor = document.getElementById("hora_fin_reserva").value;
        if(hora_fin_valor==null || hora_fin_valor==""){
            error = true

        }else{
            hora_fin = new Date("March 1, 2012 "+ hora_fin_valor)    
        }
        if(!error){
            dia_hoy = new Date(Date.now())
            tiempo_entre_dias = dia-dia_hoy 
            if (tiempo_entre_dias <= 0){
                alert("Falla dia")
            }else{
                tiempo_entre_horas = hora_fin-hora_inicio
                if(tiempo_entre_horas<=7200000 && tiempo_entre_horas>0){
                    alert("reserva ok")
                }else{
                    alert("Falla tiempo")
                }
            }
        }else{
            alert("Falla datos")
        }
    })

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
    imagen_mesa=[]
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