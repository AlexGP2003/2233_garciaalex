<?php
session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
    if (!isset($_POST['pagina']) || !isset($_POST['val1']) || !isset($_POST['val2']) || !isset($_POST['lista'])) {
    echo "err1";
    die();
}
try{
    $lista = $_POST['lista'];
    $registros = 3;
    include_once '../../connection/conexion.php';
    $inicioPagina = ($_POST['pagina']-1)*$registros;
    if(empty($_POST['val1']) && empty($_POST['val2'])){
        if($lista==1){
            $sql_prepare = "SELECT Id, nombre_usuario, correo from tbl_user";
            $sql = "SELECT Id, nombre_usuario, correo from tbl_user LIMIT $inicioPagina, $registros;";
        }elseif ($lista==2) {
            $sql_prepare = "SELECT Id, Nombre, Apellido, Correo from tbl_personal_man";
            $sql = "SELECT Id, Nombre, Apellido, Correo from tbl_personal_man LIMIT $inicioPagina, $registros;";
   
        }elseif($lista==3){
            $sql_prepare = "SELECT id_camarero, nombre_camarero, Apellido, correo_camarero from tbl_camarero";
            $sql = "SELECT id_camarero, nombre_camarero, Apellido, correo_camarero from tbl_camarero LIMIT $inicioPagina, $registros;";
        }elseif($lista==4){
            $sql_prepare = "SELECT * FROM `tbl_mesa` inner join tbl_sala where tbl_mesa.id_sala = tbl_sala.id_sala;";
            $sql = "SELECT * FROM `tbl_mesa` inner join tbl_sala where tbl_mesa.id_sala = tbl_sala.id_sala LIMIT $inicioPagina, $registros;";            
        }elseif($lista==5){
            $sql_prepare = "SELECT * FROM `tbl_sala`";
            $sql = "SELECT * FROM tbl_sala LIMIT $inicioPagina, $registros;";            
        }else{
            echo "error";
            die();
        }
        $stmt_prepare = $pdo -> prepare($sql_prepare);
        $stmt_prepare->execute();
        $array_prepare = $stmt_prepare->fetchAll(PDO::FETCH_ASSOC);
        $cant_total = ceil(count($array_prepare)/$registros);
        $stmt = $pdo -> prepare($sql);
        $stmt->execute();
    }else{
        $val1=$_POST['val1'];
        $val2 = $_POST['val2'];
        if($lista==1){
            $num_reg = 5;
            $sql_prepare = "SELECT Id, nombre_usuario, correo from tbl_user where (nombre_usuario LIKE CONCAT('%',?,'%') or nombre_usuario LIKE CONCAT('%',?,'%')) or (correo LIKE CONCAT('%',?,'%') or correo LIKE CONCAT('%',?,'%'))";
            $sql = "SELECT Id, nombre_usuario, correo from tbl_user where (nombre_usuario LIKE CONCAT('%',?,'%') or nombre_usuario LIKE CONCAT('%',?,'%')) or (correo LIKE CONCAT('%',?,'%') or correo LIKE CONCAT('%',?,'%')) LIMIT $inicioPagina, $registros;";
        }elseif ($lista==2) {
            $num_reg = 7;
            $sql_prepare = "SELECT Id, Nombre, Apellido, Correo from tbl_personal_man where (Nombre LIKE CONCAT('%',?,'%') or Nombre LIKE CONCAT('%',?,'%')) or (Apellido LIKE CONCAT('%',?,'%') or Apellido LIKE CONCAT('%',?,'%')) or (Correo LIKE CONCAT('%',?,'%') or Correo LIKE CONCAT('%',?,'%'))";
            $sql = "SELECT Id, Nombre, Apellido, Correo from tbl_personal_man where (Nombre LIKE CONCAT('%',?,'%') or Nombre LIKE CONCAT('%',?,'%')) or (Apellido LIKE CONCAT('%',?,'%') or Apellido LIKE CONCAT('%',?,'%')) or (Correo LIKE CONCAT('%',?,'%') or Correo LIKE CONCAT('%',?,'%')) LIMIT $inicioPagina, $registros;";
   
        }elseif($lista==3){
            $num_reg = 7;
            $sql_prepare = "SELECT id_camarero, nombre_camarero, Apellido, correo_camarero from tbl_camarero where (nombre_camarero LIKE CONCAT('%',?,'%') or nombre_camarero LIKE CONCAT('%',?,'%')) or (Apellido LIKE CONCAT('%',?,'%') or Apellido LIKE CONCAT('%',?,'%')) or (correo_camarero LIKE CONCAT('%',?,'%') or correo_camarero LIKE CONCAT('%',?,'%'))";
            $sql = "SELECT id_camarero, nombre_camarero, Apellido, correo_camarero from tbl_camarero where (nombre_camarero LIKE CONCAT('%',?,'%') or nombre_camarero LIKE CONCAT('%',?,'%')) or (Apellido LIKE CONCAT('%',?,'%') or Apellido LIKE CONCAT('%',?,'%')) or (correo_camarero LIKE CONCAT('%',?,'%') or correo_camarero LIKE CONCAT('%',?,'%')) LIMIT $inicioPagina, $registros;";
        }elseif($lista==4){
            $num_reg = 11;
            $sql_prepare = "SELECT * FROM `tbl_mesa` inner join tbl_sala on tbl_mesa.id_sala = tbl_sala.id_sala where (numero_mesa LIKE CONCAT('%',?,'%') or numero_mesa LIKE CONCAT('%',?,'%')) or (estado_mesa LIKE CONCAT('%',?,'%') or estado_mesa LIKE CONCAT('%',?,'%')) or (sillas_mesa LIKE CONCAT('%',?,'%') or sillas_mesa LIKE CONCAT('%',?,'%')) or (nombre_sala LIKE CONCAT('%',?,'%') or nombre_sala LIKE CONCAT('%',?,'%')) or (foto_mesa LIKE CONCAT('%',?,'%') or foto_mesa LIKE CONCAT('%',?,'%'));";
            $sql = "SELECT * FROM `tbl_mesa` inner join tbl_sala on tbl_mesa.id_sala = tbl_sala.id_sala where (numero_mesa LIKE CONCAT('%',?,'%') or numero_mesa LIKE CONCAT('%',?,'%')) or (estado_mesa LIKE CONCAT('%',?,'%') or estado_mesa LIKE CONCAT('%',?,'%')) or (sillas_mesa LIKE CONCAT('%',?,'%') or sillas_mesa LIKE CONCAT('%',?,'%')) or (nombre_sala LIKE CONCAT('%',?,'%') or nombre_sala LIKE CONCAT('%',?,'%')) or (foto_mesa LIKE CONCAT('%',?,'%') or foto_mesa LIKE CONCAT('%',?,'%')) LIMIT $inicioPagina, $registros;";            
        }elseif($lista==5){
            $num_reg = 9;
            $sql_prepare = "SELECT * FROM `tbl_sala` where (nombre_sala LIKE CONCAT('%',?,'%') or nombre_sala LIKE CONCAT('%',?,'%')) or (tipo_sala LIKE CONCAT('%',?,'%') or tipo_sala LIKE CONCAT('%',?,'%')) or (desc_sala LIKE CONCAT('%',?,'%') or desc_sala LIKE CONCAT('%',?,'%')) or (foto LIKE CONCAT('%',?,'%') or foto LIKE CONCAT('%',?,'%'))";
            $sql = "SELECT * FROM tbl_sala where (nombre_sala LIKE CONCAT('%',?,'%') or nombre_sala LIKE CONCAT('%',?,'%')) or (tipo_sala LIKE CONCAT('%',?,'%') or tipo_sala LIKE CONCAT('%',?,'%')) or (desc_sala LIKE CONCAT('%',?,'%') or desc_sala LIKE CONCAT('%',?,'%')) or (foto LIKE CONCAT('%',?,'%') or foto LIKE CONCAT('%',?,'%')) LIMIT $inicioPagina, $registros;";            
        }else{
            echo "error";
            die();
        }
        $stmt_prepare = $pdo -> prepare($sql_prepare);
        for ($i=1; $i < $num_reg; $i++) { 
            $stmt_prepare->bindParam($i,$val1);
            $i++;
            $stmt_prepare->bindParam($i,$val2);
        }
        $stmt_prepare->execute();
        $array_prepare = $stmt_prepare->fetchAll(PDO::FETCH_ASSOC);
        $cant_total = ceil(count($array_prepare)/$registros);
        $inicioPagina = ($_POST["pagina"]-1)*$registros;
        $stmt = $pdo -> prepare($sql);
        for ($i=1; $i < $num_reg; $i++) { 
            $stmt->bindParam($i,$val1);
            $i++;
            $stmt->bindParam($i,$val2);
        }
        $stmt->execute();
    }
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
    array_push($array,$cant_total);
    echo json_encode($array);
}catch(Exception $e){
    echo $e;
}

