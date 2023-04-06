<?php
session_start();

	
		$record['email'] = rand(0,10000);
		$record['fname'] = "guest";
		$record['lname'] = null;
		$_SESSION['record'] = $record;		
		$msgs['succ'] = "Success";
		echo json_encode($msgs);  // Display messages in JSON format 
	  
?>