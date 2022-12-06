<?php

session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

if(!isset($_POST['id'])){
    echo "error";
    die();
}

$id = $_POST['id'];
include_once '../../../connection/conexion.php';
try {
    $sqlfoto = "SELECT * FROM tbl_sala where id_sala=?";
    $stmtfoto = $pdo->prepare($sqlfoto);
    $stmtfoto->bindParam(1,$id);
    $stmtfoto->execute();
    $datos_foto = $stmtfoto->fetchAll(PDO::FETCH_ASSOC);
    $foto = $datos_foto[0]['foto'];
    $sql = "DELETE FROM tbl_sala where id_sala=?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    echo "BORRADO";
    unlink("../../../menu_usuario/img/".$foto);
} catch (Exception $e) {
    echo $e;
}