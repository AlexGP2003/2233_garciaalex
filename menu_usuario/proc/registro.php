<?php
if(isset($_POST['usuario']) && isset($_POST['email']) && isset($_POST['pswd'])){
    $user = $_POST['usuario'];
    $pass = sha1($_POST['pswd']);
    $mail = $_POST['email'];
    include_once './function.php';
    include_once '../../connection/conexion.php';
    try{
        if(registroMailIncorrecto($mail)){
            echo "error";
            die();
        }
        if(checkUserExists($user,$pdo)){
            echo "errorUser";
            die();
        }
        if(checkMailExists($mail,$pdo)){
            echo "errorMail";
            die();
        }
        $sql = "INSERT INTO `tbl_user`(`nombre_usuario`, `correo`, `password`) VALUES (?,?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1,$user);
        $stmt->bindParam(2,$mail);
        $stmt->bindParam(3,$pass);
        $stmt->execute();
        echo "REGISTRO";
        session_start();
        $_SESSION['usuario']=$user;
    }catch(Exception $e){
        echo $e;
    }
}else{
    echo "error";
}