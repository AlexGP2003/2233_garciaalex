function listar(){
    var tabla = document.getElementById("contenido_tabla")
    var ajax = new XMLHttpRequest();
    console.log(tabla);
    ajax.open('POST', '../proc/listar.php');
    ajax.onload=function (){
        if(ajax.status==200){
                var resul = JSON.parse(ajax.responseText);
                    mycadena="<table class='table table-dark table-hover'><thead class='table-dark'><th>Hora Incidencia</th><th>Correo camarero</th><th>Sala</th><th>Mesa</th><th>Descripcion</th></thead>";
                    resul.forEach( function(mant) {
                       mycadena += "<tbody><td>"+mant.hora_incidencia+"</td><td>"+mant.correo_mantenimiento+"</td><td>"+mant.id_sala+"</td><td>"+mant.id_mesa+"</td><td>"+mant.descripcion+"</td></tbody>"
                    })  
                    mycadena += "</table>"; 
                    console.log(mycadena)
                    tabla.innerHTML = mycadena
                }else{
                    tabla.innerText = 'Error';
                }
            }
    ajax.send();
}

window.onload=listar