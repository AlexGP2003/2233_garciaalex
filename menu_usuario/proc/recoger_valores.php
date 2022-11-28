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
$sql = "SELECT * FROM `tbl_mesa` as m INNER JOIN tbl_sala as s on s.id_sala=m.id_sala where m.id_sala=?";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(1,$_POST['sala']);
$stmt->execute();
$array = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($array);