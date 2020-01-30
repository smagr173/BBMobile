<?php
include "functions.php";
session_start();

 try {
        $db =  new PDO("sqlite:content.db");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "SELECT * FROM users";
        $stmt = $db->query($sql);
        // there should only be a single record
        $record = $stmt->fetchall(PDO::FETCH_ASSOC);
    }
    catch (Exception $e) {
       // print "<p>$e</p>";
        //return array();
    }
	$db = NULL;
echo json_encode($record);  // Output messages in JSON format
?>