<?php
session_start();
if(!isset($_SESSION['usuario'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

try {
    include_once '../../connection/conexion.php';
    $id = $_POST['id'];
    $sql = "SELECT * FROM tbl_mesa as m where m.id_mesa = ? ";
    $stmt = $pdo -> prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception) {
    echo "ERROR";
}