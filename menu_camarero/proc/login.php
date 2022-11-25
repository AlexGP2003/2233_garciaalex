<?php
if(!isset($_POST['email']) || !isset($_POST['pass'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
if (!empty($_POST['email']) && !empty($_POST['pass'])){
    include_once '../../connection/conexion.php';
    include_once './function.php';
    try{
        $correo = $_POST['email'];
        if(registroMailIncorrecto($correo)){
            echo "err3";
            die();
        }
        $pass = sha1($_POST['pass']);
        $sql = "SELECT * from tbl_camarero where correo_camarero=? and contra_camarero=?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1,$correo);
        $stmt->bindParam(2,$pass);
        $stmt -> execute();
        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $num = count($array);
        if($num == 1){
            session_start();
            $_SESSION['camarero']=$array[0]['nombre_camarero'];
        }
        echo json_encode($array);
    }catch(Exception $e){
        echo "err2";
    }
}else{
    echo "err1";
}
