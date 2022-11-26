<?php
session_start();
if(!isset($_SESSION['camarero'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
if (!isset($_POST['sala']) || !isset($_POST['filtro'])){
    echo "err1";
    die();
}
try{
    $sala = $_POST['sala'];
    $filtro = $_POST['filtro'];
    include_once '../../connection/conexion.php';
    if(empty($filtro)){
        $sql = "SELECT * from tbl_mesa where id_sala=?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1,$sala);
    }else{
        $sql = "SELECT * from tbl_mesa where id_sala=? and sillas_mesa LIKE CONCAT('%',?,'%')";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1,$sala);
        $stmt->bindParam(2,$filtro);
    }
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($array);
}catch(Exception $e){
    echo $e;
}

