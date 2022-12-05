<?php
session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

if(empty($_POST['sala']) || empty($_POST['num_mesa']) || empty($_POST['sillas']) || empty($_POST['id'])){
    echo "error";
    die();
}
$id = $_POST['id'];
$sala = $_POST['sala'] ;
$num_mesa = $_POST['num_mesa'];
$sillas = $_POST['sillas'];

include_once '../function.php';
include_once '../../../connection/conexion.php';

if(!checkSillasMesa($sillas)){
    echo "errorSillas";
    die();
}
$foto = $_FILES['foto'];
if($foto['tmp_name']!=""){
    $path="/www/2233_garciaalex/menu_usuario/img/";
    $destino=$_SERVER['DOCUMENT_ROOT'].$path.$foto['name'];
    if($foto['size']<500000 and ($foto['type']=="image/jpeg" or $foto['type']=="image/jpg" or $foto['type']=="image/webp")){
        $exito=move_uploaded_file($foto['tmp_name'],$destino);
        $sqlfoto = "SELECT * FROM tbl_mesa where id_mesa=?";
        $stmtfoto = $pdo->prepare($sqlfoto);
        $stmtfoto->bindParam(1,$id);
        $stmtfoto->execute();
        $datos_foto = $stmtfoto->fetchAll(PDO::FETCH_ASSOC);
        $fotoantigua = $datos_foto[0]['foto_mesa'];
        unlink("../../../menu_usuario/img/".$fotoantigua);
        if ($exito){
            try {
                $sql = "UPDATE `tbl_mesa` SET `numero_mesa`=?, `sillas_mesa`=?,`id_sala`=?,`foto_mesa`=? WHERE id_mesa = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(1,$num_mesa);
                $stmt->bindParam(2,$sillas);
                $stmt->bindParam(3,$sala);
                $stmt->bindParam(4,$foto['name']);
                $stmt->bindParam(5,$id);
                $stmt->execute();
                echo "MODIFICADO";
            } catch (Exception $e) {
                unlink("../../../menu_usuario/img/"+$foto['name']);
                echo $e;
            } 
        }
    }else{
        echo "ERROREXTENSION";
    }
}else{
    try {
        $sql = "UPDATE `tbl_mesa` SET `numero_mesa`=?, `sillas_mesa`=?,`id_sala`=? WHERE id_mesa = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1,$num_mesa);
        $stmt->bindParam(2,$sillas);
        $stmt->bindParam(3,$sala);
        $stmt->bindParam(4,$id);
        $stmt->execute();
        echo "MODIFICADO";
    } catch (Exception $e) {
        echo $e;
    } 
}
