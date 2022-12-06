<?php

session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

if(empty($_POST['name']) || empty($_POST['tipo']) || empty($_POST['desc']) || empty($_FILES['foto'])){
    echo "error";
    die();
}
$nombre = $_POST['name'] ;
$tipo = $_POST['tipo'];
$desc = $_POST['desc'];
$foto = $_FILES['foto'];
$path="/www/2233_garciaalex/menu_usuario/img/";
$destino=$_SERVER['DOCUMENT_ROOT'].$path.$foto['name'];
include_once '../../../connection/conexion.php';


if($foto['size']<500000 and ($foto['type']=="image/jpeg" or $foto['type']=="image/jpg" or $foto['type']=="image/webp")){
    $exito=move_uploaded_file($foto['tmp_name'],$destino);
    if ($exito){
        try {
            $sql = "INSERT INTO `tbl_sala`(`nombre_sala`, `tipo_sala`, `desc_sala`, `foto`) VALUES (?,?,?,?)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(1,$nombre);
            $stmt->bindParam(2,$tipo);
            $stmt->bindParam(3,$desc);
            $stmt->bindParam(4,$foto['name']);
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
