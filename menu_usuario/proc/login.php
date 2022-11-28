<?php
if (!empty($_POST['email']) && !empty($_POST['pswd'])){
    include_once '../../connection/conexion.php';
    include_once './function.php';
    try{
        $correo = $_POST['email'];
        if(registroMailIncorrecto($correo)){
            echo "err3";
            die();
        }
        $pass = sha1($_POST['pswd']);
        $sql = "SELECT * from tbl_user where correo=? and password=?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1,$correo);
        $stmt->bindParam(2,$pass);
        $stmt -> execute();
        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $num = count($array);
        if($num == 1){
            session_start();
            $_SESSION['usuario']=$array[0]['nombre_usuario'];
        }
        echo json_encode($array);
    }catch(Exception $e){
        echo "err2";
    }
}else{
    echo "err1";
}