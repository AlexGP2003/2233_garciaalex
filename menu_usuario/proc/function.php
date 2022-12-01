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

function checkSalaMesaExists($sala,$mesa,$pdo){
    $sql = "SELECT * from tbl_mesa where id_mesa=? and id_sala=?;";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1,$mesa);
    $stmt->bindParam(2,$sala);
    $stmt->execute();
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)==1){
        return true; 
    }else{
        return false;
    }
}

function checkMenos2Horas($hora_ini,$hora_fin){
    $error = false;
    $horaInicio = new DateTime($hora_ini);
    $horaTermino = new DateTime($hora_fin);
    $interval = $horaInicio->diff($horaTermino);
    if($interval->format('%R')=="-"){
        $error = true;
    }
    $horas = $interval->format("%h");
    $min = $interval->format("%i");
    $tiempo = ($horas*60)+$min;
    if($tiempo>120){
        $error = true;
    }
    return $error;
}

function checkDiaAntes($fecha){
    $fechaActual = date('Y-m-d');
    $date1 = new DateTime($fechaActual);
    $date2 = new DateTime($fecha);
    $diff = $date1->diff($date2);
    // will output 2 days
    $interval = $diff->format('%R');
    if($interval=="-"){
        return true;
    }else{
        return false;
    }
    
}





