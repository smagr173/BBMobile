<?php
include "functions.php";

	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$fname = $obj['fname'];
	
	$lname = $obj['lname'];
	
	$email = $obj['email'];
	
	$password1 = $obj['password1'];
	
	$password2 = $obj['password2'];
	
	$validFname = false;
	$validLname = false;
	$validEmail = false;
	$validEmail2 = false;
	$validPassword1 = false;
	$validPassword2 = false;
	$inserted = true;
	if ($fname != NULL) {
	$validFname = true; 
	}
	else {
	     $msgs[] = "Please fill out the first name field";
	}
	if ($lname != NULL) {
	$validLname = true; 
	}
	else {
	     $msgs[] = "Please fill out the last name field";
	}
	if ($email != NULL) {
        $validEmail = true;
	}
	else {
	     $msgs[] = "Please fill out the email field";
	}
	if (!doesEmailExist($email)) {
        $validEmail2 = true;
	}
	else {
	     $msgs[] = "The email you have entered is already in use";
	}
	if ($password1 != NULL) {
	$validPassword1 = true; 
	}
	else {
	     $msgs[] = "Please fill out the first password field";
	}
	if ($password2 != NULL) {
	$validPassword2 = true; 
	}
	else {
	     $msgs[] = "Please fill out the second password field";
	}
	if ($validFname && $validLname && $validEmail && $validEmail2 && $validPassword1 && $validPassword2) {
		//$hashed = password_hash($password1, PASSWORD_DEFAULT);
		$inserted = insertUserRecord($fname, $lname, $email, $password1);
		if ($inserted) {
		$msgs[] = "User registered Successfully";
		}
		else {
			$msgs[] = "Register failed";
		}
		//echo json_encode($obj);
	}
	echo json_encode($msgs);
	//foreach($msgs as $msg) {
	 //echo json_encode($msg);
	//}
	
    //if ($password1 === $password2) {
		
		// Use built in function to hash password
		//$hashed = password_hash($password1, PASSWORD_DEFAULT);
		
 
?>
