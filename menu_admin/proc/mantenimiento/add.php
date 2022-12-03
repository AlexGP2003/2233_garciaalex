<?php

session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

if(empty($_POST['name']) || empty($_POST['surname']) || empty($_POST['mail']) || empty($_POST['pass'])){
    echo "error";
    die();
}
$name = $_POST['name'] ;
$surname = $_POST['surname'];
$mail = $_POST['mail'];
$pass = sha1($_POST['pass']);

include_once '../function.php';
include_once '../../../connection/conexion.php';
if(registroMailIncorrecto($mail)){
    echo "error";
    die();
}
if(checkMailExistsMant($mail,$pdo)){
    echo "MailUsado";
    die();
}

try {
    $sql = "INSERT INTO `tbl_personal_man`(`Nombre`, `Apellido`, `Correo`, `pass`) VALUES (?,?,?,?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$name);
    $stmt->bindParam(2,$surname);
    $stmt->bindParam(3,$mail);
    $stmt->bindParam(4,$pass);
    $stmt->execute();
    echo "CREADO";
} catch (Exception $e) {
    echo $e;
}