<?php
require 'config.php';
try {
    $servidor = "mysql:host=".SERVER.";dbname=".BD;
    $pdo = new PDO($servidor, USER, PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo $e->getMessage();
    echo "<script>alert('Error en la conexión')</script>";

}
