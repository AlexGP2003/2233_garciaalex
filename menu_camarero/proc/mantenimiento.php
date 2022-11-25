<?php
session_start();
if(!isset($_SESSION['mantenimiento'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
if (!isset($_POST['id']) || !isset($_POST['mesa'])){
    echo "err1";
    die();
}
$id = $_POST['id'];
$mesa = $_POST['mesa'];
include '../../connection/conexion.php';
try{
    $pdo->beginTransaction();
    $sql = "DELETE FROM `tbl_mantenimiento` WHERE id_mantenimiento = ?";
    $stmt = $pdo -> prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    $sql2="UPDATE `tbl_mesa` SET `estado_mesa`='Disponible' WHERE id_mesa=?";
    $stmt2=$pdo->prepare($sql2);
    $stmt2->bindParam(1,$mesa);
    $stmt2->execute();
    $pdo->commit();
    echo "BORRADO";
}catch(Exception $e){
    $pdo->rollBack();
    echo $e;
}
