<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>View Contacts</title>
	<link rel="stylesheet" href="style.css">
	 </head>
	 <body>
	 <div class="header">
     <h2>Welcome! Feel Free to Explore the Site</h2>
     <img src="images/titlePic.jpg" alt="Contact Book" style="width:285px;height:120px;">
     </div>
	 
<div class="nav">
<?php
if (isset($_SESSION['record'])) {
?>
	<a href="index.php">Home</a>
    <a href="add.php">Create Contact</a>
    <a href="delete.php">Delete Contact</a>
	<a href="update.php">Update Contact</a>
	<a href="log_out.php">Log Out</a>
<?php
}
else{
?>
  <a href="index.php">Home</a>
  <a href="sign_in.php">Sign In</a>
  <a href="create_account.php">Create Account</a>
<?php
}
?>
</div>

    <h1>Contact List</h1>
	
<?php
include "functions.php";
if (isset($_SESSION['record'])) {
$record = $_SESSION['record'];
$user_name = $record['name'];
printTable($user_name);
}
else {
    print("<p>Sign in or create an account to view contacts.</p>");
}
?>
  </body>
</html>