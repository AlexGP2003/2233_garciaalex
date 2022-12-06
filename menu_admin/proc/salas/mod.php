<?php
session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

if(empty($_POST['name']) || empty($_POST['tipo']) || empty($_POST['desc']) || empty($_POST['id'])){
    echo "error";
    die();
}
$id = $_POST['id'];
$nombre = $_POST['name'] ;
$tipo = $_POST['tipo'];
$desc = $_POST['desc'];
$foto = $_FILES['foto'];

include_once '../../../connection/conexion.php';

if($foto['tmp_name']!=""){
    $path="/www/2233_garciaalex/menu_usuario/img/";
    $destino=$_SERVER['DOCUMENT_ROOT'].$path.$foto['name'];
    if($foto['size']<500000 and ($foto['type']=="image/jpeg" or $foto['type']=="image/jpg" or $foto['type']=="image/webp")){
        $exito=move_uploaded_file($foto['tmp_name'],$destino);
        $sqlfoto = "SELECT * FROM tbl_sala where id_sala=?";
        $stmtfoto = $pdo->prepare($sqlfoto);
        $stmtfoto->bindParam(1,$id);
        $stmtfoto->execute();
        $datos_foto = $stmtfoto->fetchAll(PDO::FETCH_ASSOC);
        $fotoantigua = $datos_foto[0]['foto'];
        unlink("../../../menu_usuario/img/".$fotoantigua);
        if ($exito){
            try {
                $sql = "UPDATE `tbl_sala` SET `nombre_sala`=?,`tipo_sala`=?,`desc_sala`=?,`foto`=? WHERE id_sala = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(1,$nombre);
                $stmt->bindParam(2,$tipo);
                $stmt->bindParam(3,$desc);
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
        $sql = "UPDATE `tbl_sala` SET `nombre_sala`=?,`tipo_sala`=?,`desc_sala`=?  WHERE id_sala = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1,$nombre);
        $stmt->bindParam(2,$tipo);
        $stmt->bindParam(3,$desc);
        $stmt->bindParam(4,$id);
        $stmt->execute();
        echo "MODIFICADO";
    } catch (Exception $e) {
        echo $e;
    } 
}
