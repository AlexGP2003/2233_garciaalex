window.addEventListener("load",function(){
    document.getElementById("mail_registrar").addEventListener("blur", function(){
        email_campo = document.getElementById("mail_registrar")
        email = document.getElementById("mail_registrar").value
        if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
            email_campo.classList.add('error_mostrar_login')
          }else{
            email_campo.classList.remove('error_mostrar_login')
        }
    })
    document.getElementById("mail_login").addEventListener("blur", function(){
        email_campo = document.getElementById("mail_login")
        email = document.getElementById("mail_login").value
        if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
            email_campo.classList.add('error_mostrar_login')
          }else{
            email_campo.classList.remove('error_mostrar_login')
        }
    })
    document.getElementById("pass_registrar").addEventListener("blur", function(){
        pass_campo = document.getElementById("pass_registrar")
        pass = document.getElementById("pass_registrar").value
        if(pass == null || pass.length == 0){
            pass_campo.classList.add('error_mostrar_login')
          }else{
            pass_campo.classList.remove('error_mostrar_login')
          }
    })
    document.getElementById("user_registrar").addEventListener("blur", function(){
        user_campo = document.getElementById("user_registrar")
        user = document.getElementById("user_registrar").value
        if(user == null || user.length == 0){
            user_campo.classList.add('error_mostrar_login')
          }else{
            user_campo.classList.remove('error_mostrar_login')
          }
    })
    document.getElementById("pass_login").addEventListener("blur", function(){
        pass_campo = document.getElementById("pass_login")
        pass = document.getElementById("pass_login").value
        if(pass == null || pass.length == 0){
            pass_campo.classList.add('error_mostrar_login')
          }else{
            pass_campo.classList.remove('error_mostrar_login')
          }
    })
    document.getElementById("mail_registrar").addEventListener("blur", function(){
        email_campo = document.getElementById("mail_registrar")
        email = document.getElementById("user_registrar").value
        if(email == null || email.length == 0 || !(/\S+@\S+\.\S+/.test(email))){
            email_campo.classList.add('error_mostrar_login')
          }else{
            email_campo.classList.remove('error_mostrar_login')
        }
    })
    document.getElementById("form_registro").addEventListener("submit",function(){
        event.preventDefault();
        var formdata = new FormData(document.getElementById("form_registro"));
        var ajax = new XMLHttpRequest();
        ajax.open('POST', './proc/registro.php');
        ajax.onload=function (){
            if(ajax.status==200){
                alerta_registro(ajax.responseText)
            }else{
            }
        }
        ajax.send(formdata);
        document.getElementById("form_registro").reset();
    })
    document.getElementById("form_login").addEventListener("submit",function(){
        event.preventDefault();
        var formdata = new FormData(document.getElementById("form_login"));
        var ajax = new XMLHttpRequest();
        ajax.open('POST', './proc/login.php');
        ajax.onload=function (){
            if(ajax.status==200){
                alerta_login(ajax.responseText)
            }else{
            }
        }
        ajax.send(formdata);
        document.getElementById("form_login").reset();
    })
})

function alerta_registro(valor){
    if (valor=="REGISTRO"){
      var contenido =document.getElementById("contenido_global")
      contenido.style.display="none"
        Swal.fire({
            icon: 'success',
            title: 'Usuario registrado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function(){ window.location.href = './view/home.php' }, 1500);

    }
    else if (valor=="errorUser"){
      Swal.fire({
        icon: 'error',
        title: 'Nombre de usuario ya registrado',
      })
    }else if (valor=="errorMail"){
      Swal.fire({
        icon: 'error',
        title: 'Email ya registrado',
      })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Algo ha ocurrido y no se ha podido registrar tu usuario',
        })
    }
}

function alerta_login(valor){
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
          title: 'Bienvenido '+array.nombre_usuario,
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(function(){ window.location.href = './view/home.php' }, 1500);
    }else{

      Swal.fire({
        icon: 'error',
        title: 'No hay ningun usuario que coincida',
      })
    }
  }
}