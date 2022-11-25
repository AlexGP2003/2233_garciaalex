<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://kit.fontawesome.com/e115106343.js" crossorigin="anonymous"></script>
    <!-- BootStrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <!-- FancyTable -->
    <script src="https://code.jquery.com/jquery-3.6.1.js" integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery.fancytable/dist/fancyTable.min.js"></script>
    <script type="text/javascript">
	    $(document).ready(function() {
	    	$("#tabla").fancyTable({
	    		sortColumn:0,
	    		pagination:true,
	    		perPage:10,
	    		globalSearch:false,
                sortable: true,
                inputPlaceholder:'Buscar...',
	    	});		
	    });
    </script>
</head>
<body>
    <?php
    session_start();
    if(!isset($_SESSION['camarero'])){
        echo "<script>window.location.href='../index.php'</script>";
    }
    ?>
    <div class="botones">
        <button type="button" class="btn btn-dark" name="volver" id="volver" onclick="window.location.href='./tabla.php';"><i class="fa-solid fa-arrow-left"></i></button>
        <button type="button" class="btn btn-dark" name="logout" id="logout" onclick="window.location.href='../proc/logout.php';">Cerrar sessión</button>
    </div>

    <div class="tabla_datos">
    <div class="table-responsive">
        <table class="table w-auto table-hover table-bordered border border-3 border-dark tabla_datos_fondo" id="tabla">
            <thead>
            <tr>
                <th>Sala</th>
                <th>Mesa</th>
                <th>Hora entrada</th>
                <th>Hora salida</th>
                <th>Nº Personas</th>
                <th>Camarero</th>
            <tr>
            </thead>
            <tbody>
                <?php
                    require_once '../../connection/conexion.php';
                    $sentencia = $pdo->prepare("SELECT tbl_sala.nombre_sala, tbl_mesa.numero_mesa, tbl_registro.fecha_inicio_registro, tbl_registro.fecha_final_registro, tbl_registro.num_personas_registro, tbl_camarero.nombre_camarero FROM `tbl_registro` INNER JOIN tbl_camarero ON tbl_registro.id_camarero=tbl_camarero.id_camarero INNER JOIN tbl_sala ON tbl_registro.id_sala=tbl_sala.id_sala INNER JOIN tbl_mesa ON tbl_registro.id_mesa=tbl_mesa.id_mesa");
                    $sentencia->execute();
                    $listaDatos = $sentencia->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($listaDatos as $datos) {
                        echo "<tr>";
                            echo "<td>{$datos['nombre_sala']}</td>";
                            echo "<td>{$datos['numero_mesa']}</td>";
                            echo "<td>{$datos['fecha_inicio_registro']}</td>";
                            echo "<td>{$datos['fecha_final_registro']}</td>";
                            echo "<td>{$datos['num_personas_registro']}</td>";
                            echo "<td>{$datos['nombre_camarero']}</td>";
                        echo "</tr>";
                    }
                ?>
            </tbody>
        </table>
    </div>
    </div>
</body>
</html>