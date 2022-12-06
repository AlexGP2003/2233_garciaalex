<?php
session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

include_once '../../../connection/conexion.php';

if (!isset($_POST['id']) && empty($_POST['id'])){
    echo "error";
    die();
}

$id = $_POST['id'];
try {
    $sql = "SELECT * FROM tbl_mesa where id_sala = ? ";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$id); 
    $stmt->execute();
    if(count($stmt->fetchAll(PDO::FETCH_ASSOC))>= 1){
        echo "MASMESAS";
    }else{
        echo "LIBRE";
    }
} catch (Exception $e) {
    echo $e;
}