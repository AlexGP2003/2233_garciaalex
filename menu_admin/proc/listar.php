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
    $registros = 6;
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
            $sql = "SELECT * FROM `tbl_mesa` inner join tbl_sala where tbl_mesa.id_sala = tbl_sala.id_sala; LIMIT $inicioPagina, $registros;";            
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
        $inicioPagina = ($_POST["pagina"]-1)*$registros;
        $stmt = $pdo -> prepare($sql);
        $stmt->execute();
    }else{
        $val1=$_POST['val1'];
        $val2 = $_POST['val2'];
        $sql_prepare = "SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa where (s.nombre_sala LIKE CONCAT('%',?,'%') or s.nombre_sala LIKE CONCAT('%',?,'%')) or (m.correo_mantenimiento LIKE CONCAT('%',?,'%') or m.correo_mantenimiento LIKE CONCAT('%',?,'%')) or (me.numero_mesa LIKE CONCAT('%',?,'%') or me.numero_mesa LIKE CONCAT('%',?,'%')) or (m.descripcion LIKE CONCAT('%',?,'%') or m.descripcion LIKE CONCAT('%',?,'%')) or (m.hora_incidencia LIKE CONCAT('%',?,'%') or m.hora_incidencia LIKE CONCAT('%',?,'%'));";
        $sql = "SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa where (s.nombre_sala LIKE CONCAT('%',?,'%') or s.nombre_sala LIKE CONCAT('%',?,'%')) or (m.correo_mantenimiento LIKE CONCAT('%',?,'%') or m.correo_mantenimiento LIKE CONCAT('%',?,'%')) or (me.numero_mesa LIKE CONCAT('%',?,'%') or me.numero_mesa LIKE CONCAT('%',?,'%')) or (m.descripcion LIKE CONCAT('%',?,'%') or m.descripcion LIKE CONCAT('%',?,'%')) or (m.hora_incidencia LIKE CONCAT('%',?,'%') or m.hora_incidencia LIKE CONCAT('%',?,'%')) LIMIT $inicioPagina, $registros;";
        $stmt_prepare = $pdo -> prepare($sql_prepare);
        for ($i=1; $i < 11; $i++) { 
            $stmt_prepare->bindParam($i,$val1);
            $i++;
            $stmt_prepare->bindParam($i,$val2);
        }
        $stmt_prepare->execute();
        $array_prepare = $stmt_prepare->fetchAll(PDO::FETCH_ASSOC);
        $cant_total = ceil(count($array_prepare)/$registros);
        $inicioPagina = ($_POST["pagina"]-1)*$registros;
        $stmt = $pdo -> prepare($sql);
        for ($i=1; $i < 11; $i++) { 
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

