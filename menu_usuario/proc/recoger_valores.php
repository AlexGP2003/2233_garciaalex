<?php
session_start();
if(!isset($_SESSION['usuario'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

include '../../connection/conexion.php';
if(!isset($_POST['sala'])){
    echo "error";
    die();
}
// SELECT * FROM `tbl_reserva` as r where r.mesa=16 and r.fecha='2022-12-12' and ('12:00:00' BETWEEN r.hora_inicio and r.hora_fin or '13:00:00' BETWEEN r.hora_inicio and r.hora_fin);
$sql = "SELECT * FROM `tbl_mesa` as m  where m.id_sala=? and m.estado_mesa!='Mantenimiento';";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(1,$_POST['sala']);
$stmt->execute();
$array = $stmt->fetchAll(PDO::FETCH_ASSOC);
// $pos = 0;
// foreach ($array as $mesa) {
//     if($mesa['id_mesa']==3){
//         unset($array[$pos]);
//     }
//     echo "<br>";
//     $pos++;
// }
echo json_encode($array);