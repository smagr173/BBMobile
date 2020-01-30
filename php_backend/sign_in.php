<?php
include "functions.php";
session_start();

	// Get JSON inputs, store in variable
	$json = file_get_contents('php://input');
	
	// Parse JSON format to PHP object
	$obj = json_decode($json,true);
	
	// Set user email variable from input
	$email = $obj['email'];
	
	// Set password from input value
	$password = $obj['password'];
	
	$validEmail = false;
	$validPassword = false;
	if ($email != NULL) {		// Check if input is empty for email
		$validEmail = true;
	}
	else {
		$msgs[] = "Please enter your email";
	}
	if ($password != NULL) {   // Check if input is empty for password
	$validPassword = true;
	}
	else {
		$msgs[] = "Please enter your password";
	}
	if ($validEmail && $validPassword) {
		$record = getUserRecord($email);  // Calls function to return user record
		$hashed = $record['password'];	// Set the password retrieved from DB as variable
		
		// Use built in function to compare entered password to hashed password in database
		if ($record && password_verify($password, $hashed)) {	
		$_SESSION['record'] = $record;		
		$msgs[] = "Success";
		}
		else {
			$msgs[] = "Incorrect Email/Password Combo";
		}
	}
	echo json_encode($msgs);  // Output messages in JSON format
?>