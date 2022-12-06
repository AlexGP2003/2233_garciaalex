sala = 1;
inicio = true
filtro_valor="";

window.addEventListener("load", function(){
    crearSelectSala()
    var filtro = this.document.getElementById("filtro")
    filtro.addEventListener("keyup", function(){
        filtro_valor = filtro.value
        listar();
    })
})

function change_estado_sala(){
    select_sala.option
    sala = select_sala.options[select_sala.selectedIndex].value
    listar();
}
function listar(){
    var tabla = document.getElementById("contenido_tabla")
    var formdata = new FormData();
    formdata.append("sala",sala)
    formdata.append("filtro",filtro_valor)
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/listar.php');
    ajax.onload=function (){
        if(ajax.status==200){
            if (ajax.responseText!="err1"){
                var resul = JSON.parse(ajax.responseText);
                mycadena="";
                resul.forEach(element => {
                    mycadena+="<div class='column-4 Fondo_Mesa_Static flex'>"
                    if (element.estado_mesa=="Disponible"){
                        mycadena += "<div class='Fondo_Mesa_imagen_disponible flex' onclick=consulta("+element.id_mesa+",'"+element.estado_mesa+"')>"
                    }else if (element.estado_mesa=="Ocupado"){
                        mycadena += "<div class='Fondo_Mesa_imagen_ocupado flex' onclick=consulta("+element.id_mesa+",'"+element.estado_mesa+"')>"
                    }else if (element.estado_mesa=="Mantenimiento"){
                        mycadena += "<div class='Fondo_Mesa_imagen_mantenimiento flex'>"
                    }else{
                        mycadena += "<div class='Fondo_Mesa_imagen_reservado flex' onclick=consulta("+element.id_mesa+",'"+element.estado_mesa+"')>"
                    }
                    mycadena+="<div class='column-2 foto_final_espacio'>";
                    if(element.sillas_mesa==2){
                        mycadena+="<img class='ajuste_imagen' alt='mesa 2' src='../img/mesa2.png'>"                       
                    }
                    else if(element.sillas_mesa==4){
                        mycadena+="<img class='ajuste_imagen' alt='mesa 4' src='../img/mesa4.png'>"                       
                    }
                    if(element.sillas_mesa==6){
                        mycadena+="<img class='ajuste_imagen' alt='mesa 6' src='../img/mesa6.png'>"                       
                    }
                    mycadena+="</div>&nbsp;<div class='column-2 flex'><h4>Mesa "+element.numero_mesa+"</h4></div></div></div>";
                });
                tabla.innerHTML = mycadena
            }else{
                tabla.innerHTML="Error"
            }                

                }else{
                    tabla.innerText = 'Error';
                }
            }
    ajax.send(formdata);
}
function validar_form_envio(){
    event.preventDefault()
    var valor = document.getElementById("select_form_ocupar_mant").options[document.getElementById("select_form_ocupar_mant").selectedIndex].value;
    var input = document.getElementById("input_form_ocupar_mantener")
    var desc = document.getElementById("desc_form_ocupar_mantener")
    lleno = true;
    if(valor == 1){
        valor_campo = input.value
        if( valor_campo == null || valor_campo <= 0 || valor_campo >= 6 || /^\s+$/.test(valor_campo) ) {
            lleno = false;
        }
    }else{
        valor_campo = desc.value
        if( valor_campo == null || valor_campo.length == 0 || /^\s+$/.test(valor_campo) ) {
            lleno = false;
        }
    }
    if(!lleno){
        Swal.fire({
            title: 'Tienes que rellenar los campos del formulario correctamente',
            icon: 'warning',
        })
    }else{
        var formdata = new FormData(event.srcElement);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '../proc/estado.php');
        ajax.onload=function (){
            if(ajax.status==200){
                if(ajax.responseText=="disponible_ocupado"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Mesa ocupada',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      listar()
                }else if (ajax.responseText=="mantenimiento"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Mesa en mantenimiento',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      listar()
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Sucedió un error',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            }
        }
        ajax.send(formdata);
    }
}

function consulta(id,estado){
    if (estado == "Reservado"){
        Swal.fire({
            title: 'Estas seguro?',
            text: "Quieres deshacer la reserva?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deshazla!'
          }).then((result) => {
            if (result.isConfirmed) {
                romper_reserva(id);
            }
          })
    }else if(estado == "Ocupado"){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Quieres liberar la mesa?',
            text: "No podras cambiar el resultado una vez escogido",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, libérala',
            cancelButtonText: 'No, olvídalo',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
            //   swalWithBootstrapButtons.fire(
            //     'Liberado',
            //     'Mesa disponible para su uso',
            //     'success'
            //   )
                var formdata = new FormData();
                formdata.append("id",id);
                formdata.append("estado",0);
                var ajax = new XMLHttpRequest();
                ajax.open('POST', '../proc/estado.php');
                ajax.onload=function (){
                    if(ajax.status==200){
                        if(ajax.responseText=="ocupado_disponible"){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Mesa desocupada',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            listar()
                        }else if (ajax.responseText=="mantenimiento"){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Mesa en mantenimiento',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            listar()
                        }else{
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Sucedió un error',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }
                }
                ajax.send(formdata);
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'El estado actual de la mesa se mantiene',
                'error'
              )
            }
          })
    }else{
        Swal.fire({
            html:'<h3 id="titulo_form">Ocupar</h3><form method="POST" onsubmit="validar_form_envio()"><input type="hidden" name="id" value='+id+'><br><select name="estado" onchange=cambiar_form() id="select_form_ocupar_mant" class="form-select"><option selected value="1">Ocupar</option><option value="2">Mantener</option></select><br>  <div class="mb-3"><label id="label_form" class="form-label">Nº Personas</label><input type="number" class="form-control" name="num_personas" id="input_form_ocupar_mantener"><textarea class="form-control not_show" id="desc_form_ocupar_mantener" name="desc" rows="3"></textarea> <br><br> <div class="column-1"><input class="btn btn-primary" type="submit" name="btn_enviar" value="Enviar"></div></form></div>',            
            showConfirmButton:false,
        })    
    }
}
function cambiar_form(){
    var valor = document.getElementById("select_form_ocupar_mant").options[document.getElementById("select_form_ocupar_mant").selectedIndex].value;
    var label = document.getElementById("label_form")
    var input = document.getElementById("input_form_ocupar_mantener")
    var titulo = document.getElementById("titulo_form")
    var desc = document.getElementById("desc_form_ocupar_mantener")
    if(valor == 1){
        label.innerText="Nº Personas"
        titulo.innerText="Ocupar"
        desc.classList.add("not_show")
        input.classList.remove("not_show")
    }else{
        titulo.innerText="Mantenimiento"
        label.innerText="Descripción"
        input.classList.add("not_show")
        desc.classList.remove("not_show")
    }
}


function romper_reserva(id){
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/reserva_break.php');
    var formdata = new FormData();
    formdata.append("mesa",id)
    ajax.onload=function (){
        if(ajax.status==200){
            if(ajax.responseText="BORRADO"){
                listar()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Reserva cancelada',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio algo inesperado',
                  })
            }
        }
    }
    ajax.send(formdata);
}

function crearSelectSala(){
var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/getSalas.php');
    ajax.onload=function (){
        if (ajax.status == 200){
            resul = JSON.parse(ajax.responseText)
            selectSalas = "<select class='form-select' onchange='change_estado_sala()' id='select_sala' aria-label='Default select example'>"
            resul.forEach(element => {
                selectSalas += `<option value=${element.id_sala}>${element.nombre_sala}</option>`;
            });
            selectSalas += "</select>"
            document.getElementById("crearSalasDiv").innerHTML= selectSalas
        }
    }
    ajax.send()
}


window.onload= listar,setInterval(listar,600000);
