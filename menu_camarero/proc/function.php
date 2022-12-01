<?php

function registroMailIncorrecto($email){
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        $error=true;
    }else{
        $error=false;
    }
    return $error;   
}

function changeEstadoReservado($pdo){
    $fechaActual = date('y-m-d');
    $horaActual = date('H:i');
    $horaNueva = new DateTime($horaActual); 
    $horaNueva->modify('+1 hours'); 
    $horaCheck = $horaNueva->format("H:i");
    $sql = "SELECT * from tbl_reserva as r where r.fecha=? and ? BETWEEN r.hora_inicio and r.hora_fin;";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $fechaActual);
    $stmt->bindParam(2, $horaCheck);
    $stmt->execute();
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(count($array)>0){
        foreach ($array as $reserva) {
            $sql = "UPDATE `tbl_mesa` SET `estado_mesa`='Reservado' WHERE id_mesa=?";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(1, $reserva['mesa']);
            $stmt->execute();
        }
    }
}

