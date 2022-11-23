<?php
session_start();
if(!isset($_SESSION['mantenimiento'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
try{
    include_once '../../connection/conexion.php';
    $sql = "SELECT * from tbl_mantenimiento";
    $stmt = $pdo -> prepare($sql);
    $stmt->execute();
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($array);
}catch(Exception $e){
    echo "err1";
}

