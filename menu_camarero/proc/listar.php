<?php
session_start();
if(!isset($_SESSION['camarero'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
if (!isset($_POST['sala'])){
    echo "err1";
    die();
}
try{
    $sala = $_POST['sala'];
    include_once '../../connection/conexion.php';
    $sql = "SELECT * from tbl_mesa where id_sala=?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$sala);
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($array);
}catch(Exception $e){
    echo $e;
}

