<?php
session_start();
if(!isset($_SESSION['camarero'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
include_once '../../connection/conexion.php';
if(isset($_POST['id'])){
    $id=$_POST['id'];
}else{
    echo "error";
    die();
}
    if(isset($_POST['estado'])){
        $valor_estado = $_POST['estado'];
        if($valor_estado==1){
            $estadonuevo="Ocupado";
        }elseif($valor_estado==2){
            $estadonuevo="Mantenimiento";
        }else{
            $estadonuevo="Disponible";
        }
    }
    if($estadonuevo=="Disponible" || $estadonuevo=="Mantenimiento" || !empty($_POST['num_personas'])){
        $fecha_actual=date('d/m/y h:i:s A');
        $camarero = $_SESSION['id_camarero'];
        try{
        $sql="SELECT * FROM tbl_mesa where id_mesa=$id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $mesas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $num_mesas=count($mesas);
        if($num_mesas==0){
            throw new Exception("No mesas");
        }else{
            $sala = $mesas[0]['id_sala'];
            $estadoactual = $mesas[0]['estado_mesa'];
        }
        }catch(Exception $e){
            echo "error";        
        }
        if(isset($_POST['num_personas'])){
            $num_personas=$_POST['num_personas'];
            if($num_personas>6 || $num_personas<0){
                echo "error";   
                die();     
            }   
        }
        if($estadonuevo=="Mantenimiento"){
            if(!empty($_POST['desc'])){
                $descripcion=$_POST['desc'];
                $email=$_SESSION['camarero_email']; 
                if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
                    echo "error";  
                    die();
                }
            }else{
                echo "error";   
            }
        }
        
        try{
            $valor="";
            $pdo->beginTransaction();
            if($estadoactual=="Disponible"){
                $sql1="UPDATE `tbl_mesa` SET`estado_mesa`=? WHERE id_mesa=?;";
                $stmt=$pdo->prepare($sql1);
                $stmt->bindParam(1,$estadonuevo);
                $stmt->bindParam(2,$id);
                $stmt->execute();
                if($estadonuevo=="Ocupado"){
                    $sql2="INSERT INTO `tbl_registro`(`fecha_inicio_registro`, `num_personas_registro`, `id_camarero`, `id_sala`, `id_mesa`) VALUES (?,?,?,?,?);";
                    $stmt2 = $pdo->prepare($sql2);
                    $stmt2->bindParam(1,$fecha_actual);
                    $stmt2->bindParam(2,$num_personas);
                    $stmt2->bindParam(3,$camarero);
                    $stmt2->bindParam(4,$sala);
                    $stmt2->bindParam(5,$id);
                    $stmt2->execute();
                    $valor="Disponible-Ocupado";
                }
                elseif ($estadonuevo=="Mantenimiento"){
                    $sql2="INSERT INTO `tbl_mantenimiento`(`hora_incidencia`, `correo_mantenimiento`, `id_sala`, `id_mesa`, `descripcion`) VALUES (?,?,?,?,?)";
                    $stmt2 = $pdo->prepare($sql2);
                    $stmt2->bindParam(1,$fecha_actual);
                    $stmt2->bindParam(2,$email);
                    $stmt2->bindParam(3,$sala);
                    $stmt2->bindParam(4,$id);
                    $stmt2->bindParam(5,$descripcion);
                    $stmt2->execute();
                    $valor="Mantenimiento";
                }
            }elseif ($estadoactual=="Ocupado"){
                $sql1="UPDATE `tbl_mesa` SET`estado_mesa`=? WHERE id_mesa=?;";
                $stmt=$pdo->prepare($sql1);
                $stmt->bindParam(1,$estadonuevo);
                $stmt->bindParam(2,$id);
                $stmt->execute();
                if($estadonuevo=="Disponible"){
                    $sql2="UPDATE `tbl_registro` SET `fecha_final_registro`=? WHERE `id_mesa`=? and `fecha_final_registro` = ''";
                    $stmt2 = $pdo->prepare($sql2);
                    $stmt2->bindParam(1,$fecha_actual);
                    $stmt2->bindParam(2,$id);
                    $stmt2->execute();
                    $valor="Ocupado-Disponible";
                }
            }else{
                $sql1="UPDATE `tbl_mesa` SET`estado_mesa`=? WHERE id_mesa=?;";
                $stmt=$pdo->prepare($sql1);
                $stmt->bindParam(1,$estadonuevo);
                $stmt->bindParam(2,$id);
                $stmt->execute();
                $valor="Mantenimiento-Disponible";
            }
            $pdo->commit();
        }catch(Exception $e){
            echo "error, $e";
            $pdo->rollBack();
        }
        if($valor=="Disponible-Ocupado"){
            echo "disponible_ocupado";
        }elseif($valor=="Ocupado-Disponible"){
            echo "ocupado_disponible";
        }elseif($valor=="Mantenimiento"){
            echo "mantenimiento";          
        }elseif($valor=="Mantenimiento-Disponible"){
            echo "mantenimiento_disponible";          
        }
    }else{
        echo "error";
    }

