<?php
include "functions.php";

$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$email = $obj['email'];
	
	$password = $obj['password'];
	
	$validEmail = false;
	$validPassword = false;

if ($email != NULL && $password != NULL) {
    $record = getUserRecord($email);
    $hashed = $record['password'];
	// Use built in function to compare entered password to hashed password in database
    if ($record && password_verify($password, $hashed)) {
        $_SESSION['record'] = $record;
       // header("Location: index.php");
        exit();
    }
    else {
        $valid = false;
    }
}

    if (!$valid) {
       // print("<p>Invalid email / password combintation</p>");
    }
?>