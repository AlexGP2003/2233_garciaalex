<?php
session_start();
if(!isset($_SESSION['usuario'])){
    echo "<script>window.location.href='../index.php'</script>";
    die();
}

try {
    include_once '../../connection/conexion.php';
    $id = $_SESSION['usuario_id'];
    $sql = "SELECT * FROM `tbl_reserva` as r inner join tbl_mesa as m on m.id_mesa = r.mesa inner join tbl_sala as s on s.id_sala = m.id_sala where r.usuario = ?";
    $stmt = $pdo -> prepare($sql);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception) {
    echo "ERROR";
}