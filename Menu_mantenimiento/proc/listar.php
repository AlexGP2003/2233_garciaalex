<?php
session_start();
if(!isset($_SESSION['mantenimiento'])){
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
    if(!isset($_POST['val1']) && !isset($_POST['val2'])){
        $sql_prepare = "SELECT * from tbl_mantenimiento";
        $sql = "SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa LIMIT $inicioPagina, $registros;";
    }else{
        $val1=$_POST['val1'];
        $val2 = $_POST['val2'];
        $sql_prepare = "SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa where m.hora_incidencia LIKE ('%$val1%' or  '%$val2%') and  m.correo_mantenimiento LIKE ('%$val1%' or  '%$val2%') and s.nombre_sala LIKE ('%$val1%' or  '%$val2%') or me.numero_mesa LIKE ('%$val1%' or  '%$val2%') or m.descripcion LIKE ('%$val1%' or  '%$val2%')";
        //SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa where (m.hora_incidencia LIKE ('%a%') and m.correo_mantenimiento LIKE ('%a%') and s.nombre_sala LIKE ('%a%' ) or me.numero_mesa LIKE ('%a%' ) or m.descripcion LIKE ('%a%' ) ) or (m.hora_incidencia LIKE ('%5%') and m.correo_mantenimiento LIKE ('%5%') and s.nombre_sala LIKE ('%5%' ) or me.numero_mesa LIKE ('%5%' ) or m.descripcion LIKE ('%5%' ) );
        $sql = "SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa where m.hora_incidencia LIKE ('%$val1%' or  '%$val2%') and  m.correo_mantenimiento LIKE ('%$val1%' or  '%$val2%') and s.nombre_sala LIKE ('%$val1%' or  '%$val2%') or me.numero_mesa LIKE ('%$val1%' or  '%$val2%') or m.descripcion LIKE ('%$val1%' or  '%$val2%') LIMIT $inicioPagina, $registros;";
    }
        $stmt_prepare = $pdo -> prepare($sql_prepare);
        $stmt_prepare->execute();
        $array_prepare = $stmt_prepare->fetchAll(PDO::FETCH_ASSOC);
        $cant_total = ceil(count($array_prepare)/$registros);
        $inicioPagina = ($_POST["pagina"]-1)*$registros;
        $stmt = $pdo -> prepare($sql);
        $stmt->execute();
        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        array_push($array,$cant_total);
        echo json_encode($array);
}catch(Exception $e){
    echo $e;
}

