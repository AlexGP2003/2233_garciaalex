<?php
session_start();
if(!isset($_SESSION['admin'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}
if (!isset($_POST['pagina'])){
    echo "err1";
    die();
}
try{
    $registros = 6;
    include_once '../../connection/conexion.php';
    $inicioPagina = ($_POST['pagina']-1)*$registros;
    if(!isset($_POST['filtro'])){
        $sql_prepare = "SELECT * from tbl_mantenimiento";
        $sql = "SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa LIMIT $inicioPagina, $registros;";
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

