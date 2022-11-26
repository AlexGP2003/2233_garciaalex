sala = 1;
inicio = true


window.addEventListener("load", function(){
    var select_sala = document.getElementById("select_sala")
    select_sala.addEventListener("change",function(){
        select_sala.option
        sala = select_sala.options[select_sala.selectedIndex].value
        listar();
    })
})
function listar(){
    var tabla = document.getElementById("contenido_tabla")
    var formdata = new FormData();
    formdata.append("sala",sala)
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
                        mycadena += "<div class='Fondo_Mesa_imagen_disponible flex'>"
                    }else if (element.estado_mesa=="Ocupado"){
                        mycadena += "<div class='Fondo_Mesa_imagen_ocupado flex'>"
                    }else if (element.estado_mesa=="Mantenimiento"){
                        mycadena += "<div class='Fondo_Mesa_imagen_mantenimiento flex'>"
                    }else{
                        mycadena += "<div class='Fondo_Mesa_imagen_reservado flex'>"
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
                    mycadena+="</div>&nbsp;<div class='column-2 flex'><h4>Mesa "+element.id_mesa+"</h4></div></div></div>";
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


window.onload= listar,setInterval(listar,600000);
