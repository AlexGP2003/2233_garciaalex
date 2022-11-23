window.onload = function(){
    var email_campo = document.getElementById("email")
    var div_login = document.getElementById("login_email")
    var div_pass = document.getElementById("login_pass")
    var pass_campo = document.getElementById("pass")
    var form = document.getElementById("login")
    email.onblur = check_mail;
    pass.onblur = check_pass;
    function check_mail(){
        var email =email_campo.value
        if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
          div_login.classList.add('error_mostrar_login')
        }else{
          div_login.classList.remove('error_mostrar_login')
        }
    }
    function check_pass(){
        var pass =pass_campo.value
        if(pass == null || pass.length == 0){
          div_pass.classList.add('error_mostrar_login')
        }else{
          div_pass.classList.remove('error_mostrar_login')
        }
    }
    form.onsubmit= e => {
        e.preventDefault();
        var formdata = new FormData(form);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', './proc/login.php');
        ajax.onload=function (){
            if(ajax.status==200){
                alerta(ajax.responseText)
            }else{
            }
        }
        ajax.send(formdata);
        form.reset();
    }
    function alerta(valor){
        if (valor=="err1"){
            Swal.fire({
                icon: 'error',
                title: 'Tienes que rellenar los campos',
              })
        }
        else if (valor=="err2"){
          Swal.fire({
            icon: 'error',
            title: 'Error en la consulta',
          })
        }else if (valor=="err3"){
          Swal.fire({
            icon: 'error',
            title: 'Error en el email',
          })
        }else{
          var array = JSON.parse(valor)
          array = array[0]
          var num_user = JSON.parse(valor).length
          if (num_user == 1){
            var contenido =document.getElementById("contenido_global")
            contenido.style.display="none"
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Bienvenido '+array.Nombre,
                showConfirmButton: false,
                timer: 1500
              })
              setTimeout(function(){ window.location.href = './view/tabla.php' }, 1500);
          }else{

            Swal.fire({
              icon: 'error',
              title: 'No hay ningun usuario que coincida',
            })
          }
        }
    }
}
