<?php
    date_default_timezone_set('America/Guayaquil');
    include_once("Conexion.php");
    include_once("config.inc.php");

    $conn = new Conexion(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE);
    $link = $conn->connect();

    $date       = date("Y-m-d H:i:s");
    $ip_address = $_SERVER['REMOTE_ADDR'];
    $browser    = $_SERVER['HTTP_USER_AGENT'];

    $sql = "INSERT INTO log_generar (fecha, ip_address, browser)
    VALUES ('{$date}',  '{$ip_address}', '{$browser}')";

    if ($link->query($sql) === TRUE) {
        echo 1;
    } else {
        echo "Error: " . $sql . "<br>" . $link->error;
    }

    $link->close();
?>