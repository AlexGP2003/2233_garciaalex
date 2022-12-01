<?php
session_start();
if(!isset($_SESSION['camarero'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
include_once '../../connection/conexion.php';
if(isset($_POST['mesa'])){
    $id=$_POST['mesa'];
}else{
    echo "error";
    die();
}
try {
    $pdo->beginTransaction();
    $sql1 = "DELETE FROM `tbl_reserva` WHERE mesa=?";
    $stmt1 = $pdo->prepare($sql1);
    $stmt1->bindParam(1, $id);
    $stmt1->execute();
    $sql2 = "UPDATE `tbl_mesa` SET `estado_mesa`='Disponible' WHERE id_mesa=?";
    $stmt2 = $pdo->prepare($sql2);
    $stmt2->bindParam(1, $id);
    $stmt2->execute();
    $pdo->commit();
    echo "BORRADO";
} catch (Exception $e) {
    $pdo->rollBack();
    echo $e;
}
