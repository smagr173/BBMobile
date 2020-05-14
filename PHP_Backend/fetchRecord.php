<?php
session_start();

          if (isset($_SESSION['record'])) {
	   $record = $_SESSION['record'];
	    if ($record['lname'] != null) {
	    // Fetch user record
	    $email = $record['email'];
	    $fName = $record['fname'];
	    $lName = $record['lname'];

	    $msg['fname'] = $fName;
	    $msg['lname'] = $lName;
	    $msg['email'] = $email;
	    }
	    else {
	    $msg['empty'] = 0;
	    $fName = $record['fname'];
	    $msg['fname'] = $fName;
	    }
	  }
	  else {
		$msg['empty'] = 0;  
	  }
	  echo json_encode($msg);  // Display messages in JSON format 
?>