<?php

session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

if(empty($_POST['sala']) || empty($_POST['num_mesa']) || empty($_POST['sillas']) || empty($_FILES['foto'])){
    echo "error";
    die();
}
$sala = $_POST['sala'] ;
$num_mesa = $_POST['num_mesa'];
$sillas = $_POST['sillas'];
$foto = $_FILES['foto'];
$path="/www/2233_garciaalex/menu_usuario/img/";
$destino=$_SERVER['DOCUMENT_ROOT'].$path.$foto['name'];
$estado = "Disponible";
include_once '../function.php';
include_once '../../../connection/conexion.php';

if(!checkSillasMesa($sillas)){
    echo "errorSillas";
    die();
}
if($foto['size']<500000 and ($foto['type']=="image/jpeg" or $foto['type']=="image/jpg" or $foto['type']=="image/webp")){
    $exito=move_uploaded_file($foto['tmp_name'],$destino);
    if ($exito){
        try {
            $sql = "INSERT INTO `tbl_mesa`(`numero_mesa`, `estado_mesa`, `sillas_mesa`, `id_sala`, `foto_mesa`) VALUES (?,?,?,?,?)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(1,$num_mesa);
            $stmt->bindParam(2,$estado);
            $stmt->bindParam(3,$sillas);
            $stmt->bindParam(4,$sala);
            $stmt->bindParam(5,$foto['name']);
            $stmt->execute();
            echo "CREADO";
        } catch (Exception $e) {
            unlink("../../../menu_usuario/img/"+$foto['name']);
            echo $e;
        } 
    }
}else{
    echo "ERROREXTENSION";
}






