<?php
session_start();
if(!isset($_SESSION['usuario'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
if (isset($_POST['sala']) && isset($_POST['mesa']) && isset($_POST['fecha_hora']) && isset($_POST['hora_fin'])){
    if (!empty($_POST['sala']) && !empty($_POST['mesa']) && !empty($_POST['fecha_hora']) && !empty($_POST['hora_fin'])){
        include_once '../proc/function.php';
        include_once '../../connection/conexion.php';
        $sala=$_POST['sala'];
        $mesa = $_POST['mesa'];
        $fecha_hora = $_POST['fecha_hora'];
        $fecha_hora_separa = explode("T",$fecha_hora);
        $fecha = $fecha_hora_separa[0];
        $hora_ini = $fecha_hora_separa[1];
        $hora_fin = $_POST['hora_fin'];
        if(!checkSalaMesaExists($sala,$mesa,$pdo)){
            echo "error";
            die();
        }
        if(checkMenos2Horas($hora_ini,$hora_fin)){
            echo "error";
            die();
        }
        if(checkDiaAntes($fecha)){
            echo "error";
            die();
        }
        try{
            $sql = "INSERT INTO `tbl_reserva`(`hora_inicio`, `mesa`, `usuario`, `fecha`, `hora_fin`) VALUES (?,?,?,?,?)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(1,$hora_ini);
            $stmt->bindParam(2,$mesa);
            $stmt->bindParam(3,$_SESSION['usuario_id']);
            $stmt->bindParam(4,$fecha);
            $stmt->bindParam(5,$hora_fin);
            $stmt->execute();
            echo "RESERVADO";
        }catch(Exception $e){
            echo $e;
        }
    } 
}
