var num_pag = 1

function cambiar_estado(number,mesa){
    Swal.fire({
        title: 'Estas seguro de que se ha reparado?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
            var formdata = new FormData();
            formdata.append('id',number)
            formdata.append('mesa',mesa)
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../proc/mantenimiento.php');
            ajax.onload=function (){
                if(ajax.status==200){
                    if(ajax.responseText=="BORRADO"){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Mantenimiento realizado',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        filtro();
                    }else if(ajax.responseText=="err1"){
                        Swal.fire({
                            icon: 'error',
                            title: 'Error con los datos',
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Ha sucedido un error',
                          })
                    }
                }
            }
            ajax.send(formdata);
        }
      })
}
function filtro(){
    num_pag=1
    var tabla = document.getElementById("contenido_tabla")
    var val1 = document.getElementById("val1").value;
    var val2 = document.getElementById("val2").value;
    var formdata = new FormData();
    formdata.append("filtro",1);
    formdata.append("val1",val1);
    formdata.append("val2",val2);
    formdata.append("pagina",num_pag)
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/listar.php');
    ajax.onload=function (){
        if(ajax.status==200){
            if (ajax.responseText!="err1"){
                var resul = JSON.parse(ajax.responseText);
                cant_pags= resul.pop()
                mycadena="<div><table class='table table-dark table-hover table_con_botones'><thead class='table-dark'><th>Hora Incidencia</th><th>Correo camarero</th><th>Sala</th><th>Mesa</th><th>Descripcion</th></thead>";
                resul.forEach( function(mant) {
                   mycadena += "<tbody id="+mant.id_mantenimiento+" onclick=cambiar_estado("+mant.id_mantenimiento+","+mant.numero_mesa+")><td>"+mant.hora_incidencia+"</td><td>"+mant.correo_mantenimiento+"</td><td>"+mant.nombre_sala+"</td><td>"+mant.numero_mesa+"</td><td>"+mant.descripcion+"</td></tbody>"
                })  
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
    listar()
}

function cambiar_pag_der(){
    num_pag=num_pag+1
    listar()
}

function listar(){
    var tabla = document.getElementById("contenido_tabla")
    var formdata = new FormData();
    formdata.append("pagina",num_pag)
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/listar.php');
    ajax.onload=function (){
        if(ajax.status==200){
            if (ajax.responseText!="err1"){
                var resul = JSON.parse(ajax.responseText);
                cant_pags= resul.pop()
                mycadena="<div><table class='table table-dark table-hover table_con_botones'><thead class='table-dark'><th>Hora Incidencia</th><th>Correo camarero</th><th>Sala</th><th>Mesa</th><th>Descripcion</th></thead>";
                resul.forEach( function(mant) {
                   mycadena += "<tbody id="+mant.id_mantenimiento+" onclick=cambiar_estado("+mant.id_mantenimiento+","+mant.numero_mesa+")><td>"+mant.hora_incidencia+"</td><td>"+mant.correo_mantenimiento+"</td><td>"+mant.nombre_sala+"</td><td>"+mant.numero_mesa+"</td><td>"+mant.descripcion+"</td></tbody>"
                })  
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

window.onload=listar
