<?php
session_start();
if(!isset($_SESSION['usuario'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
$sentencia = "SALA";
include '../../connection/conexion.php';
if(!isset($_POST['sala'])){
    echo "error";
    die();
}
if(!empty($_POST['fecha_hora']) && !empty($_POST['hora_fin'])){
    $sentencia = "RESERVA";
    $hora_fin = $_POST['hora_fin'];
    $fecha_hora = $_POST['fecha_hora'];
    $fecha_hora_separa = explode("T",$fecha_hora);
    $fecha = $fecha_hora_separa[0];
    $hora_ini = $fecha_hora_separa[1];
}
$sql = "SELECT * FROM `tbl_mesa` as m  where m.id_sala=? and m.estado_mesa!='Mantenimiento';";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(1,$_POST['sala']);
$stmt->execute();
$array = $stmt->fetchAll(PDO::FETCH_ASSOC);
if($sentencia=="RESERVA"){
    $cont = 0;
    foreach ($array as $mesa) {
        $sql2="SELECT * FROM `tbl_reserva` as r where r.mesa=? and r.fecha=? and (? BETWEEN r.hora_inicio and r.hora_fin or ? BETWEEN r.hora_inicio and r.hora_fin);";
        $stmt2 = $pdo->prepare($sql2);
        $stmt2->bindParam(1,$mesa['id_mesa']);
        $stmt2->bindParam(2,$fecha);
        $stmt2->bindParam(3,$hora_ini);
        $stmt2->bindParam(4,$hora_fin);
        $stmt2->execute();
        $array2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);
        if(count($array2)==1){
            unset($array[$cont]);
        }
        $cont++;
    }
    
}
echo json_encode($array);