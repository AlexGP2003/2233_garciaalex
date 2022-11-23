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
    include_once '../../connection/conexion.php';
    $sql = "SELECT m.id_mantenimiento, m.hora_incidencia, m.correo_mantenimiento, s.nombre_sala, me.numero_mesa, m.descripcion from tbl_mesa as me INNER join (tbl_mantenimiento as m inner join tbl_sala as s on s.id_sala = m.id_sala) on me.id_mesa = m.id_mesa;";
    $stmt = $pdo -> prepare($sql);
    $stmt->execute();
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $cant_total = count($array)/2;
    echo json_encode($array);
}catch(Exception $e){
    echo "err1";
}

