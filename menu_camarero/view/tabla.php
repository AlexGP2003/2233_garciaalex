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
    <link rel="stylesheet" href="../css/styles.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <!-- Link JS -->
    <script src="../js/table.js"></script>
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/54cbb11825.js" crossorigin="anonymous"></script>
    <!-- SweetAlert -->
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <?php
    session_start();
    if(!isset($_SESSION['camarero'])){
        echo "<script>window.location.href='../index.php'</script>";
        die();
    }
    $user = $_SESSION['camarero'];
    ?>
    <div class="nav_menu_nav">
    <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
        <?php
        echo "<a class='navbar-brand'> $user</a>";
        ?>
        <button type="button" onclick="window.location.href='../proc/logout.php'" class="btn btn-secondary">Log Out</button>
        </form>
    </div>
    </nav>
    </div>
    <div class="flex tabla_menu_nav">
        <div class="div_content_global">
            <br>
            <br>
            <div class="flex leyenda">
                <h2>Leyenda</h2>
            </div>
            <br>
            <br>
            <div class="flex leyenda">
                <div class="column-4 centrado">Disponible <i class="fa-solid fa-square" style="color: green;"></i></div>
                <div class="column-4 centrado">Reservado <i class="fa-solid fa-square" style="color: blue;"></i></div>
                <div class="column-4 centrado">Ocupado <i class="fa-solid fa-square" style="color: red;"></i></div>
                <div class="column-4 centrado">Mantenimiento <i class="fa-solid fa-square" style="color: yellow;"></i></div>
            </div>        
            <div class='flex funcionalidades_menu'>
                <div class="column-3 div_botones" id="crearSalasDiv"></div>
                <div class="column-3 div_botones"><button type="button" class="btn btn-light" onclick="window.location.href='./datos.php'">Registros</button></div> 
                <div class="column-3 div_botones"><input type="number" id="filtro" placeholder="Personas" class="form-control"></div>
            </div>
            <div id="contenido_tabla"></div>
        </div>
    </div>
</body>
</html>
