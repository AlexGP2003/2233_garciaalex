<?php
session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

if(empty($_POST['name']) || empty($_POST['surname']) || empty($_POST['mail']) || empty($_POST['id'])){
    echo "error";
    die();
}
$id = $_POST['id'];
$name = $_POST['name'] ;
$surname = $_POST['surname'];
$mail = $_POST['mail'];

include_once '../function.php';
include_once '../../../connection/conexion.php';

if(registroMailIncorrecto($mail)){
    echo "error";
    die();
}
if(checkMailExistsMantMod($mail,$id,$pdo)){
    echo "MailUsado";
    die();
}

if(!checkUserExistsMant($id,$pdo)){
    echo "error";
    die();
}


try {
    $sql = "UPDATE `tbl_personal_man` SET `Nombre`=?,`Apellido`=?,`Correo`=? WHERE Id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$name);
    $stmt->bindParam(2,$surname);
    $stmt->bindParam(3,$mail);
    $stmt->bindParam(4,$id);
    $stmt->execute();
    echo "MODIFICADO";
} catch (Exception $e) {
    echo $e;
}