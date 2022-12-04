<?php
session_start();
if(!isset($_SESSION['usuario'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

try {
    include_once '../../connection/conexion.php';
    $id = $_POST['id'];
    $sql = "DELETE FROM tbl_reserva where Id = ?";
    $stmt = $pdo -> prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    echo "BORRADO";
} catch (Exception $e) {
    echo $e;
}