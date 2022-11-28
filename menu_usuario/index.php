<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Inicio</title>
	<link rel="stylesheet" href="./css/styles.css">
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script src="./js/index.js"></script>
</head>
<body>
	<div class="main" id="contenido_global">  	
		<input type="checkbox" id="chk" aria-hidden="true">

			<div class="signup">
				<form action="./proc/registro.php" id="form_registro" method="POST">
					<label for="chk" aria-hidden="true">Registrarse</label>
					<input type="text" name="usuario" placeholder="Usuario" id="user_registrar" required>
					<input type="email" name="email" placeholder="Email" id="mail_registrar" required>
					<input type="password" name="pswd" placeholder="Password" id="pass_registrar" required>
					<button>Registrarse</button>
				</form>
			</div>

			<div class="login">
				<form action="./proc/login.php" method="POST" id="form_login">
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" id="mail_login" required>
					<input type="password" name="pswd" placeholder="Password" id="pass_login" required>
					<button>Login</button>
				</form>
			</div>
	</div>
</body>
</html>
