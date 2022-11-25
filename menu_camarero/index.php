<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <!-- Link BootStrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <!-- Link CSS -->
    <link rel="stylesheet" href="./css/styles.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <!-- Link JS -->
    <script src="./js/validate.js"></script>
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/54cbb11825.js" crossorigin="anonymous"></script>
    <!-- SweetAlert -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <!-- Login -->
    <div class="container" id="contenido_global">
	<div class="screen">
		<div class="screen__content">
			<form action="./proc/login.php" method="POST" id="login" class="login">
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" id="email" name="email" placeholder="Email">
                    <br>
                    <br>
                    <h6 class="error_base" id="login_email"><i class="fa-solid fa-circle-exclamation"></i> Tienes que poner bien el correo</h6>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" id="pass" name="pass" placeholder="Contraseña">
                    <br>
                    <br>
                    <h6 class="error_base" id="login_pass"><i class="fa-solid fa-circle-exclamation"></i> Tienes que poner la contraseña</h6>
				</div>
				<button class="button login__submit" type="submit">
					<span class="button__text">Iniciar Sesión</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">
				<div class="social-icons">
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
</body>
</html>