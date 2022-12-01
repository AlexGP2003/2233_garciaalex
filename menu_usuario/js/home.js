sala = 1

imagen_sala=[]
imagen_mesa=[]

cambio_sala = true;

window.addEventListener("load",function(){
    salas();
    listar();
    document.getElementById("dia_hora_reserva").addEventListener("change",function(){
        listar();
    })
    document.getElementById("hora_fin_reserva").addEventListener("change",function(){
        listar();
    })
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Este día no es válido',
                  })
            }else{
                tiempo_entre_horas = hora_fin-hora_inicio
                if(tiempo_entre_horas<=7200000 && tiempo_entre_horas>0){
                    reserva();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Las horas deben ser validas y no pueden superar las 2 horas por reserva',
                      })
                }
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Tienes que rellenar el formulario',
              })
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
    fecha_hora = document.getElementById("dia_hora_reserva").value
    hora_fin = document.getElementById("hora_fin_reserva").value
    select_mesa = document.getElementById("select_mesa");
    var formdata = new FormData();
    formdata.append("sala",sala);
    formdata.append("fecha_hora",fecha_hora);
    formdata.append("hora_fin",hora_fin);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/recoger_valores.php');
    ajax.onload=function (){
        if(ajax.status==200){
            cadena = "<select onchange='change_img_mesa()' id='select_mesa_campos' class='form-select' aria-label='.form-select-lg example'>";
           if(ajax.responseText!="error"){
            try {
                resul = JSON.parse(ajax.responseText)
                resul1 = Object.values(resul);
                resul1.forEach(element => {
                    if(!set_img_1){
                        mesa = element.id_mesa
                        set_img_1 = true
                    }
                    imagen_mesa[element.id_mesa]=element.foto_mesa
                    cadena += "<option value="+element.id_mesa+">Mesa "+element.numero_mesa+"</option>";
                });
              } catch (error) {
                console.error(error);
              }
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

function reserva(){
    fecha_hora = document.getElementById("dia_hora_reserva").value
    hora_fin = document.getElementById("hora_fin_reserva").value
    var formdata = new FormData();
    formdata.append("sala",sala);
    formdata.append("mesa",mesa);
    formdata.append("fecha_hora",fecha_hora);
    formdata.append("hora_fin",hora_fin);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/reserva.php');
    ajax.onload=function (){
        if(ajax.status==200){
            console.log(ajax.responseText);
            if(ajax.responseText=="RESERVADO"){
                Swal.fire({
                    icon: 'success',
                    title: 'Hecho!',
                    text: 'Reserva realizada',
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Fallo al reservar',
                  })
            }
        }
    }
    ajax.send(formdata);
}