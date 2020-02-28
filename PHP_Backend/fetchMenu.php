<?php

 $json = file_get_contents('php://input');
	
// Parse JSON format to PHP object
   $obj = json_decode($json,true);
	
// Set first name variable from input
   $category = $obj['category'];
   
$db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM menu WHERE category='$category'";
        $stmt = $db->query($sql);
        // return menu as an associative array
	$menu = $stmt->fetchall(PDO::FETCH_ASSOC);

echo json_encode($menu);  // Display messages in JSON format

$db = NULL;
?>