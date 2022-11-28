<?php
session_start();
if(!isset($_SESSION['usuario'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

include '../../connection/conexion.php';
$sql = "SELECT * FROM `tbl_sala`";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$array = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($array);