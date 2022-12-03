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
    $sql = "DELETE FROM tbl_personal_man where Id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    echo "BORRADO";
} catch (Exception $e) {
    echo $e;
}