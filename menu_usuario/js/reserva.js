window.addEventListener("load",function (){
    // var botonsala = document.getElementsByName("ver_fotos_sala")
    // botonsala.forEach(element => {
    //     element.addEventListener("click", function(){
    //         console.log()
    //         Swal.fire({
    //             title: 'Sala '+event.srcElement.id,
    //             imageUrl: '../img/mesa1.jpg',
    //             imageWidth: 400,
    //             imageHeight: 200,
    //             imageAlt: 'Custom image',
    //           })
    //     })
    // });
    // botonmesa.addEventListener("click", function(){
    //     Swal.fire({
    //         title: 'Mesa 1',
    //         imageUrl: '../img/mesa2.webp',
    //         imageWidth: 400,
    //         imageHeight: 200,
    //         imageAlt: 'Custom image',
    //       })
    // })
    listar();
})

function listar(){
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/getDatos.php');
    ajax.onload=function (){
        if(ajax.status==200){
            if(ajax.responseText!="ERROR"){
                cadena = "";
                resul = JSON.parse(ajax.responseText);
                resul.forEach(element => {
                    cadena += "<div class='flex'><h4 class='sala_mesa'>Sala "+element.id_sala+" Mesa "+element.mesa+"</h4></div><div class='div_junto_reservas flex'><div class='column-5 centrado'>";
                    cadena += "<h5>DIA RESERVA: "+element.fecha+"</h5></div><div class='column-5 centrado'> "
                    cadena += "<h5>HORA RESERVA: "+element.hora_inicio+" a "+element.hora_fin+"</h5></div>";
                    cadena += "<div class='column-5 centrado notshow'><button class='btn btn-dark' onclick='mostrar_foto_sala("+element.id_sala+")'>FOTO SALA</button></div>"
                    cadena += "<div class='column-5 centrado notshow'><button class='btn btn-dark' onclick='mostrar_foto_mesa("+element.id_mesa+")'>FOTO MESA</button></div>"
                    cadena += "<div class='column-5 centrado'><button class='btn btn-danger new_boton_height' onclick='eliminar_reserva("+element.Id+")'> CANCELAR </button></div></div>"
                });
                document.getElementById("contenido_reservas").innerHTML = cadena
            }
        }else{
        }
    }
    ajax.send()
}

function mostrar_foto_sala(id){
    formdata = new FormData();
    formdata.append("id",id);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/getFotoSala.php');
    ajax.onload=function (){
        if(ajax.status==200){
            if(ajax.responseText!="ERROR"){
                resul = JSON.parse(ajax.responseText);
                Swal.fire({
                    title: 'Sala '+id,
                    imageUrl: '../img/'+resul[0].foto,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                  })
            }
        }
    }
    ajax.send(formdata)
}

function mostrar_foto_mesa(id){
    formdata = new FormData();
    formdata.append("id",id);
    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../proc/getFotoMesa.php');
    ajax.onload=function (){
        if(ajax.status==200){
            if(ajax.responseText!="ERROR"){
                resul = JSON.parse(ajax.responseText);
                Swal.fire({
                    title: 'Mesa '+id,
                    imageUrl: '../img/'+resul[0].foto_mesa,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                  })
            }
        }
    }
    ajax.send(formdata)
}

function eliminar_reserva(id){
    Swal.fire({
        title: 'Estas seguro?',
        text: "Quieres cancelar la reserva?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cancelala'
      }).then((result) => {
        if (result.isConfirmed) {
            formdata = new FormData();
            formdata.append("id",id);
            var ajax = new XMLHttpRequest();
            ajax.open('POST', '../proc/delete.php');
            ajax.onload=function (){
                if(ajax.status==200){
                    if(ajax.responseText=="BORRADO"){
                        listar();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Reserva cancelada',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'No se pudo cancelar la reserva',
                            showConfirmButton: false,
                          })
                    }
                }
            }
            ajax.send(formdata)
        }
      })
}