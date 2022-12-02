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

}
// Mantenimiento

function add_mant(){
}

function mod_mant(id){
}

function del_mant(id){
}

// Camarero

function add_cama(){

}

function mod_cama(id){
}

function del_cama(id){
}

// Mesa

function add_mesa(){

}

function mod_mesa(id){
}

function del_mesa(id){
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
