var num_pag = 1
var select_global = 1

function filtro(){
    var tabla = document.getElementById("contenido_tabla")
    var val1 = document.getElementById("val1").value;
    var val2 = document.getElementById("val2").value;
    var select = document.getElementById("select_formulario").options[document.getElementById("select_formulario").selectedIndex].value
    select_global = select
    var boton = document.getElementById("Boton_Crear");
    if(select == 1){
        boton.disabled=true;
    }else{
        boton.disabled=false
        boton.onclick = add_all
    }
    
    var formdata = new FormData();
    formdata.append("val1",val1);
    formdata.append("val2",val2);
    formdata.append("pagina",num_pag)
    formdata.append("lista",select)
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/listar.php');
    ajax.onload=function (){
        if(ajax.status==200){
            if (ajax.responseText!="err1"){
                var resul = JSON.parse(ajax.responseText);
                cant_pags= resul.pop()
                mycadena="<div><table class='table table-dark table-hover table_con_botones'><thead class='table-dark'>"
                if(select==1){
                    mycadena += "<thead><th>Nombre User</th><th>Correo User</th><th>Acciones</th></thead>";
                    resul.forEach( function(val) {
                        mycadena += "<tbody><td>"+val.nombre_usuario+"</td><td>"+val.correo+"</td><td><button class='btn btn-danger' onclick='del_user("+val.Id+")'>Eliminar</button></td></tbody>"
                     })  
                }else if(select==2){
                    mycadena += "<thead><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Acciones</th></thead>";
                    resul.forEach( function(val) {
                        mycadena += "<tbody><td>"+val.Nombre+"</td><td>"+val.Apellido+"</td><td>"+val.Correo+"</td><td><button class='btn btn-warning'  onclick='mod_mant("+val.Id+")'>Modificar</button>&nbsp;<button  onclick='del_mant("+val.Id+")' class='btn btn-danger'>Eliminar</button></td></tbody>"
                     }) 
                }else if(select==3){
                    mycadena += "<thead><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Acciones</th></thead>";
                    resul.forEach( function(val) {
                        mycadena += "<tbody><td>"+val.nombre_camarero+"</td><td>"+val.Apellido+"</td><td>"+val.correo_camarero+"</td><td><button class='btn btn-warning'  onclick='mod_cama("+val.id_camarero+")'>Modificar</button>&nbsp;<button class='btn btn-danger'  onclick='del_cama("+val.id_camarero+")'>Eliminar</button></td></tbody>"
                     }) 
                }else if(select==4){
                    mycadena += "<thead><th>Numero Mesa</th><th>Estado</th><th>Sillas</th><th>Sala</th><th>Foto</th><th>Acciones</th></thead>";
                    resul.forEach( function(val) {
                        mycadena += "<tbody><td>"+val.numero_mesa+"</td><td>"+val.estado_mesa+"</td><td>"+val.sillas_mesa+"</td><td>"+val.nombre_sala+"</td><td>"+val.foto_mesa+"</td><td><button class='btn btn-warning'  onclick='mod_mesa("+val.id_mesa+")'>Modificar</button>&nbsp;<button  onclick='del_mesa("+val.id_mesa+")' class='btn btn-danger'>Eliminar</button></td></tbody>"
                     }) 
                }else if(select==5){
                    mycadena += "<thead><th>Nombre</th><th>Tipo Sala</th><th>Descripción</th><th>Foto</th><th>Acciones</th></thead>";
                    resul.forEach( function(val) {
                        mycadena += "<tbody><td>"+val.nombre_sala+"</td><td>"+val.tipo_sala+"</td><td>"+val.desc_sala+"</td><td>"+val.foto+"</td><td><button  onclick='mod_sala("+val.id_sala+")' class='btn btn-warning'>Modificar</button>&nbsp;<button  onclick='del_sala("+val.id_sala+")' class='btn btn-danger'>Eliminar</button></td></tbody>"
                     }) 
                }else{
                    mycadena = "ERROR";
                }
                

                mycadena += "</table><div class='div_botones'>"
                if (num_pag<=1){
                    mycadena+="<button type='button' class='btn btn-secondary disabled'><i class='fa-solid fa-circle-arrow-left'></i></button>"
                }else{
                    mycadena+="<button type='button' onclick=cambiar_pag_izq() class='btn btn-secondary'><i class='fa-solid fa-circle-arrow-left'></i></button>"               
                }
                mycadena += "&nbsp;<button type='button' class='btn btn-outline-secondary boton_muestra_pagina disabled'>"+num_pag+"</button>&nbsp;"
                if (num_pag>=cant_pags){
                    mycadena+="<button type='button' class='btn btn-secondary disabled'><i class='fa-solid fa-circle-arrow-right'></i></button>"
                }else{
                    mycadena+="<button type='button' onclick=cambiar_pag_der() class='btn btn-secondary'><i class='fa-solid fa-circle-arrow-right'></i></button>"               
                }
                
                mycadena+="</div><div>";
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

function cambiar_pag_izq(){
    num_pag=num_pag-1
    filtro()
}

function cambiar_pag_der(){
    num_pag=num_pag+1
    filtro()
}


// Add

function add_all(){
    if(select_global==2){
        add_mant()
    }else if(select_global==3){
        add_cama();
    }else if(select_global==4){
        add_mesa();
    }else if(select_global==5){
        add_sala();
    }
}
// User

function del_user(id){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás volver atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            var formdata = new FormData();
            formdata.append("id",id);
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../proc/users/delete.php');
            ajax.onload=function (){
                if(ajax.status==200){
                    num_pag=1
                    filtro();
                    if(ajax.responseText=="BORRADO"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario eliminado!',
                    })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo eliminar!',
                    })
                    }
                }
            }
            ajax.send(formdata)
        }
      })
}

// Mantenimiento

function add_mant(){
     var form = '<h3 id="titulo_form">Añadir Mantenimiento</h3><form method="POST" onsubmit="validar_form_add_mant()">'
     form += '<br><div class="mb-3"><label id="label_form" class="form-label">Nombre</label>'
     form +=  '<input type="text" class="form-control" name="name" id="name_add_mant"></div>'
     form += '<br><div class="mb-3"><label id="label_form" class="form-label">Apellido</label>'
     form +=  '<input type="text" class="form-control" name="surname" id="surname_add_mant"></div>'
     form += '<br><div class="mb-3"><label id="label_form" class="form-label">Correo</label>'
     form +=  '<input type="mail" class="form-control" name="mail" id="mail_add_mant"></div>'
     form += '<br><div class="mb-3"><label id="label_form" class="form-label">Contraseña</label>'
     form +=  '<input type="password" class="form-control" name="pass" id="pass_add_mant"></div>'
    form += '<br><br><div class="column-1"><input class="btn btn-primary" type="submit" name="btn_enviar" value="Enviar"></div></form></div>'
    Swal.fire({
        html: form,           
        showConfirmButton:false,
    })  
}

function validar_form_add_mant(){
    event.preventDefault()
    var nombre = document.getElementById("name_add_mant").value
    var Apellido = document.getElementById("surname_add_mant").value
    var email = document.getElementById("mail_add_mant").value
    var pass = document.getElementById("pass_add_mant").value
    lleno = true;
    if(nombre == null || nombre.length == 0){
        lleno = false;
    }
    if(Apellido == null || Apellido.length == 0){
        lleno = false;
    }
    if(pass == null || pass.length == 0){
        lleno = false;
    }
    if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
        lleno = false
    }
    if(!lleno){
        Swal.fire({
            title: 'Tienes que rellenar los campos del formulario correctamente',
            icon: 'warning',
        })
    }else{
        var formdata = new FormData(event.srcElement);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '../proc/mantenimiento/add.php');
        ajax.onload=function (){
            if(ajax.status==200){
                if(ajax.responseText=="CREADO"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario Creado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      filtro()
                }else if(ajax.responseText=="MailUsado"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Mail ya usado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                else{
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

function validar_form_mod_mant(){
    event.preventDefault()
    var id = document.getElementById("id_mod_mant").value
    var nombre = document.getElementById("name_mod_mant").value
    var Apellido = document.getElementById("surname_mod_mant").value
    var email = document.getElementById("mail_mod_mant").value
    lleno = true;
    if(nombre == null || nombre.length == 0){
        lleno = false;
    }
    if(id == null || id.length == 0){
        lleno = false;
    }
    if(Apellido == null || Apellido.length == 0){
        lleno = false;
    }
    if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
        lleno = false
    }
    if(!lleno){
        Swal.fire({
            title: 'Tienes que rellenar los campos del formulario correctamente',
            icon: 'warning',
        })
    }else{
        var formdata = new FormData(event.srcElement);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '../proc/mantenimiento/mod.php');
        ajax.onload=function (){
            if(ajax.status==200){
                if(ajax.responseText=="MODIFICADO"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Usuario Modificado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      filtro()
                }else if(ajax.responseText=="MailUsado"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Mail ya usado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                else{
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


function mod_mant(id){
    var formdata = new FormData();
    formdata.append("id",id);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/mantenimiento/getDatos.php');
    ajax.onload=function (){
    if(ajax.status==200){
        if(ajax.responseText=="error"){
            Swal.fire({
                icon: 'error',
                title: 'No se pudo recoger los datos',
            })
        }else{
            var datos = JSON.parse(ajax.responseText)
            var form = '<h3 id="titulo_form">Modificar Mantenimiento</h3><form method="POST" onsubmit="validar_form_mod_mant()">'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label" >Nombre</label>'
            form +=  '<input type="hidden" class="form-control" name="id" value="'+datos[0].Id+'" id="id_mod_mant">'
            form +=  '<input type="text" class="form-control" name="name" value="'+datos[0].Nombre+'" id="name_mod_mant"></div>'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label" >Apellido</label>'
            form +=  '<input type="text" class="form-control" name="surname" id="surname_mod_mant" value="'+datos[0].Apellido+'"></div>'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label" >Correo</label>'
            form +=  '<input type="mail" class="form-control" name="mail" id="mail_mod_mant" value="'+datos[0].Correo+'"></div>'
            form += '<br><br><div class="column-1"><input class="btn btn-primary" type="submit" name="btn_enviar" value="Enviar"></div></form></div>'
            Swal.fire({
                html: form,           
                showConfirmButton:false,
            }) 
        }
    }
    }
    ajax.send(formdata)
}

function del_mant(id){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás volver atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            var formdata = new FormData();
            formdata.append("id",id);
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../proc/mantenimiento/delete.php');
            ajax.onload=function (){
                if(ajax.status==200){
                    num_pag=1
                    filtro();
                    if(ajax.responseText=="BORRADO"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Empleado de mantenimiento eliminado!',
                    })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo eliminar!',
                    })
                    }
                }
            }
            ajax.send(formdata)
        }
      })
}

// Camarero

function validar_form_add_cam(){
    event.preventDefault()
    var nombre = document.getElementById("name_add_cam").value
    var Apellido = document.getElementById("surname_add_cam").value
    var email = document.getElementById("mail_add_cam").value
    var pass = document.getElementById("pass_add_cam").value
    lleno = true;
    if(nombre == null || nombre.length == 0){
        lleno = false;
    }
    if(Apellido == null || Apellido.length == 0){
        lleno = false;
    }
    if(pass == null || pass.length == 0){
        lleno = false;
    }
    if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
        lleno = false
    }
    if(!lleno){
        Swal.fire({
            title: 'Tienes que rellenar los campos del formulario correctamente',
            icon: 'warning',
        })
    }else{
        var formdata = new FormData(event.srcElement);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '../proc/camareros/add.php');
        ajax.onload=function (){
            if(ajax.status==200){
                if(ajax.responseText=="CREADO"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Camarero Creado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      filtro()
                }else if(ajax.responseText=="MailUsado"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Mail ya usado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                else{
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

function add_cama(){
    var form = '<h3 id="titulo_form">Añadir Camarero</h3><form method="POST" onsubmit="validar_form_add_cam()">'
    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Nombre</label>'
    form +=  '<input type="text" class="form-control" name="name" id="name_add_cam"></div>'
    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Apellido</label>'
    form +=  '<input type="text" class="form-control" name="surname" id="surname_add_cam"></div>'
    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Correo</label>'
    form +=  '<input type="mail" class="form-control" name="mail" id="mail_add_cam"></div>'
    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Contraseña</label>'
    form +=  '<input type="password" class="form-control" name="pass" id="pass_add_cam"></div>'
   form += '<br><br><div class="column-1"><input class="btn btn-primary" type="submit" name="btn_enviar" value="Enviar"></div></form></div>'
   Swal.fire({
       html: form,           
       showConfirmButton:false,
   })  
}

function validar_form_mod_cam(){
    event.preventDefault()
    var id = document.getElementById("id_mod_cam").value
    var nombre = document.getElementById("name_mod_cam").value
    var Apellido = document.getElementById("surname_mod_cam").value
    var email = document.getElementById("mail_mod_cam").value
    lleno = true;
    if(nombre == null || nombre.length == 0){
        lleno = false;
    }
    if(id == null || id.length == 0){
        lleno = false;
    }
    if(Apellido == null || Apellido.length == 0){
        lleno = false;
    }
    if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
        lleno = false
    }
    if(!lleno){
        Swal.fire({
            title: 'Tienes que rellenar los campos del formulario correctamente',
            icon: 'warning',
        })
    }else{
        var formdata = new FormData(event.srcElement);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '../proc/camareros/mod.php');
        ajax.onload=function (){
            if(ajax.status==200){
                if(ajax.responseText=="MODIFICADO"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Camarero Modificado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      filtro()
                }else if(ajax.responseText=="MailUsado"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Mail ya usado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                else{
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

function mod_cama(id){
    var formdata = new FormData();
    formdata.append("id",id);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/camareros/getDatos.php');
    ajax.onload=function (){
    if(ajax.status==200){
        if(ajax.responseText=="error"){
            Swal.fire({
                icon: 'error',
                title: 'No se pudo recoger los datos',
            })
        }else{
            var datos = JSON.parse(ajax.responseText)
            var form = '<h3 id="titulo_form">Modificar Camarero</h3><form method="POST" onsubmit="validar_form_mod_cam()">'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label" >Nombre</label>'
            form +=  '<input type="hidden" class="form-control" name="id" value="'+datos[0].id_camarero+'" id="id_mod_cam">'
            form +=  '<input type="text" class="form-control" name="name" value="'+datos[0].nombre_camarero+'" id="name_mod_cam"></div>'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label" >Apellido</label>'
            form +=  '<input type="text" class="form-control" name="surname" id="surname_mod_cam" value="'+datos[0].Apellido+'"></div>'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label" >Correo</label>'
            form +=  '<input type="mail" class="form-control" name="mail" id="mail_mod_cam" value="'+datos[0].correo_camarero+'"></div>'
            form += '<br><br><div class="column-1"><input class="btn btn-primary" type="submit" name="btn_enviar" value="Enviar"></div></form></div>'
            Swal.fire({
                html: form,           
                showConfirmButton:false,
            }) 
        }
    }
    }
    ajax.send(formdata)
}

function del_cama(id){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás volver atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            var formdata = new FormData();
            formdata.append("id",id);
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../proc/camareros/delete.php');
            ajax.onload=function (){
                if(ajax.status==200){
                    filtro();
                    if(ajax.responseText=="BORRADO"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Camarero eliminado!',
                    })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo eliminar!',
                    })
                    }
                }
            }
            ajax.send(formdata)
        }
      })
}

// Mesa

function add_mesa(){
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/salas/getDatosAll.php');
    ajax.onload=function (){
        if (ajax.status == 200){
            resul = JSON.parse(ajax.responseText)
            selectSalas = "<select class='form-select' id='sala_add_mesa' name='sala'>"
            resul.forEach(element => {
                selectSalas += `<option value=${element.id_sala}>${element.nombre_sala}</option>`;
            });
            selectSalas += "</select>"
            var form = '<h3 id="titulo_form">Añadir Mesa</h3><form method="POST"  enctype="multipart/form-data" onsubmit="validar_form_add_mesa()">'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label">Numero Mesa</label>'
            form +=  '<input type="number" class="form-control" name="num_mesa" id="num_mesa_add_mesa"></div>'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label">Sillas</label>'
            form +=  '<input type="number" class="form-control" name="sillas" id="sillas_add_mesa"></div>'
            form += '<br><div class="mb-3"><label id="label_form" class="form-label">Sala</label>'
            form +=  selectSalas
            form += '<br><div class="mb-3"><label id="label_form" class="form-label">Foto</label>'
            form +=  '<input type="file" class="form-control" name="foto" id="foto_add_mesa"></div>'
            form += '<br><br><div class="column-1"><input class="btn btn-primary" type="submit" name="btn_enviar" value="Enviar"></div></form></div>'
            Swal.fire({
                html: form,           
                showConfirmButton:false,
            })  
        }
    }
    ajax.send()
}

function validar_form_add_mesa(){
    event.preventDefault()
    var numMesas = document.getElementById("num_mesa_add_mesa").value
    var sillas = document.getElementById("sillas_add_mesa").value
    var sala = document.getElementById("sala_add_mesa").options[document.getElementById("sala_add_mesa").selectedIndex].value
    var foto = document.getElementById("foto_add_mesa").value
    lleno = true;
    if(numMesas == null || numMesas.length == 0){
        lleno = false;
    }
    if(sillas == null || sillas.length == 0){
        lleno = false;
    }
    if(sala == null || sala.length == 0){
        lleno = false;
    }
    if(foto == null || foto.length == 0 ){
        lleno = false
    }
    if(!lleno){
        Swal.fire({
            title: 'Tienes que rellenar los campos del formulario correctamente',
            icon: 'warning',
        })
    }else{
        var formdata = new FormData(event.srcElement);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '../proc/mesas/add.php');
        ajax.onload=function (){
            if(ajax.status==200){
                if(ajax.responseText=="CREADO"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Mesa Creada',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      filtro()
                }else if(ajax.responseText=="ERROREXTENSION"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'La imagen debe ser jpg, jpeg o webp',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else if (ajax.responseText =="errorSillas"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Las mesas solo pueden ser de 2,4 o 6 sillas',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                else{
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

function validar_form_mod_mesa(){
    event.preventDefault()
    var numMesas = document.getElementById("num_mesa_mod_mesa").value
    var sillas = document.getElementById("sillas_mod_mesa").value
    var sala = document.getElementById("sala_mod_mesa").options[document.getElementById("sala_mod_mesa").selectedIndex].value
    lleno = true;
    if(numMesas == null || numMesas.length == 0){
        lleno = false;
    }
    if(sillas == null || sillas.length == 0){
        lleno = false;
    }
    if(sala == null || sala.length == 0){
        lleno = false;
    }
    if(!lleno){
        Swal.fire({
            title: 'Tienes que rellenar los campos del formulario correctamente',
            icon: 'warning',
        })
    }else{
        var formdata = new FormData(event.srcElement);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', '../proc/mesas/mod.php');
        ajax.onload=function (){
            if(ajax.status==200){
                if(ajax.responseText=="MODIFICADO"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Mesa modificada',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      filtro()
                }else if(ajax.responseText=="ERROREXTENSION"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'La imagen debe ser jpg, jpeg o webp',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else if (ajax.responseText =="errorSillas"){
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Las mesas solo pueden ser de 2,4 o 6 sillas',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                else{
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

function mod_mesa(id){
    var formdata = new FormData();
    formdata.append("id",id);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/mesas/getDatos.php');
    ajax.onload=function (){
    if(ajax.status==200){
        if(ajax.responseText=="error"){
            Swal.fire({
                icon: 'error',
                title: 'No se pudo recoger los datos',
            })
        }else{
            var datos = JSON.parse(ajax.responseText)
            var ajax2 = new XMLHttpRequest();
            ajax2.open('POST', '../proc/salas/getDatosAll.php');
            ajax2.onload=function (){
                if (ajax2.status == 200){
                    resul = JSON.parse(ajax2.responseText)
                    selectSalas = "<select class='form-select' id='sala_mod_mesa' name='sala'>"
                    resul.forEach(element => {
                        if(element.id_sala == datos[0].id_sala){
                            selectSalas += `<option value=${element.id_sala} selected>${element.nombre_sala}</option>`;
                        }else{
                            selectSalas += `<option value=${element.id_sala}>${element.nombre_sala}</option>`;
                        }
                    });
                    selectSalas += "</select>"
                    var form = '<h3 id="titulo_form">Modificar Mesa</h3><form method="POST"  enctype="multipart/form-data" onsubmit="validar_form_mod_mesa()">'
                    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Numero Mesa</label><input type="hidden" name="id" value='+datos[0].id_mesa+'>'
                    form +=  '<input type="number" class="form-control" name="num_mesa" id="num_mesa_mod_mesa" value='+datos[0].numero_mesa+'></div>'
                    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Sillas</label>'
                    form +=  '<input type="number" class="form-control" name="sillas" id="sillas_mod_mesa" value='+datos[0].sillas_mesa+'></div>'
                    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Sala</label>'
                    form +=  selectSalas
                    form += '<br><div class="mb-3"><label id="label_form" class="form-label">Foto</label>'
                    form +=  '<input type="file" class="form-control" name="foto" id="foto_mod_mesa"></div>'
                    form += '<br><br><div class="column-1"><input class="btn btn-primary" type="submit" name="btn_enviar" value="Enviar"></div></form></div>'
                    Swal.fire({
                        html: form,           
                        showConfirmButton:false,
                    })  
                }
            }
            ajax2.send()
        }
    }
    }
    ajax.send(formdata)
}

function del_mesa(id){
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás volver atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
            var formdata = new FormData();
            formdata.append("id",id);
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../proc/mesas/delete.php');
            ajax.onload=function (){
                if(ajax.status==200){
                    filtro();
                    if(ajax.responseText=="BORRADO"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Mesa eliminada!',
                    })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo eliminar!',
                    })
                    }
                }
            }
            ajax.send(formdata)
        }
      })
}

// Sala

function add_sala(){

}

function mod_sala(id){
}

function del_sala(id){
}

window.addEventListener("load",function(){
    filtro();
    document.getElementById("select_formulario").addEventListener("change",function(){
        num_pag = 1
        filtro();
    })
    this.document.getElementById("val1").addEventListener("keyup",function(){
        num_pag = 1
        filtro();
    })
    this.document.getElementById("val2").addEventListener("keyup",function(){
        num_pag = 1
        filtro();
    })
})