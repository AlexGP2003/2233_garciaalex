<?php

function registroMailIncorrecto($email){
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        $error=true;
    }else{
        $error=false;
    }
    return $error;   
}

function checkUserExists($user,$pdo){
    $sql = "SELECT * from tbl_user where nombre_usuario = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$user);
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)==0){
        return false;
    }else{
        return true;
    }
}

function checkMailExists($mail,$pdo){
    $sql = "SELECT * from tbl_user where correo = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$mail);
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)==0){
        return false;
    }else{
        return true;
    }
}

