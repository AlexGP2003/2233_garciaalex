<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla</title>
    <!-- Link BootStrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <!-- Link CSS -->
    <link rel="stylesheet" href="../css/home.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <!-- Link JS -->
    <script src="../js/home.js"></script>
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/54cbb11825.js" crossorigin="anonymous"></script>
    <!-- SweetAlert -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
<?php

    session_start();
    if(!isset($_SESSION['usuario'])){
        echo "<script>window.location.href='../index.php'</script>";
        die();
    }
    $user = $_SESSION['usuario'];
    ?>
    <div class="nav_menu_nav">
    <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <?php
        echo "<a class='navbar-brand'> $user</a>";
        ?>
        <button type="button" onclick="window.location.href='../proc/logout.php'">Log Out</button>
    </div>
    </nav>
    </div>
    <div class="contenido_total flex">
        <!-- <div class="flex">
        </div> -->
<div class="container" id="container">
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Reserva</h1>
			<div class="social-container">
            <button type="button" onclick="window.location.href='./reservas.php'">Gestiona tus reservas</button>
			</div>
			<input type="datetime-local" name="fecha_hora" />
            <br>
            <div id="select_sala"></div>
            <br>
            <div id="select_mesa"></div>
            <br>
			<button>Reserva</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-right">
				<div class="imagen_form"></div>
                <div class="imagen_form"></div>
			</div>
		</div>
	</div>
</div>

        </div>
    </div>
</body>
</html>
