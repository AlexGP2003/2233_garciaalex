<?php

function registroMailIncorrecto($email){
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        $error=true;
    }else{
        $error=false;
    }
    return $error;   
}

function checkMailExistsMant($mail,$pdo){
    $sql = "SELECT * from tbl_personal_man where Correo = ?";
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

function checkMailExistsMantMod($mail,$id,$pdo){
    $sql = "SELECT * from tbl_personal_man where Correo = ? and Id!=?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$mail);
    $stmt->bindParam(2,$id);
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)==0){
        return false;
    }else{
        return true;
    }
}

function checkUserExistsMant($id,$pdo){
    $sql = "SELECT * from tbl_personal_man where Id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)==0){
        return false;
    }else{
        return true;
    }
}


function checkMailExistsCam($mail,$pdo){
    $sql = "SELECT * from tbl_camarero where correo_camarero = ?";
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

function checkMailExistsCamMod($mail,$id,$pdo){
    $sql = "SELECT * from tbl_camarero where correo_camarero = ? and id_camarero!=?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$mail);
    $stmt->bindParam(2,$id);
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)==0){
        return false;
    }else{
        return true;
    }
}

function checkUserExistsCam($id,$pdo){
    $sql = "SELECT * from tbl_camarero where id_camarero = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    $array=$stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)==0){
        return false;
    }else{
        return true;
    }
}