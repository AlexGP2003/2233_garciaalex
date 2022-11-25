<?php

function registroMailIncorrecto($email){
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        $error=true;
    }else{
        $error=false;
    }
    return $error;   
}

