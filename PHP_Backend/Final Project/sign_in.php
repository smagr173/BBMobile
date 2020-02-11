<?php
session_start();
include "functions.php";

$valid = true;
extract($_POST);
if (isset($email) && isset($password)) {
    $record = getUserRecord($email);
    $hashed = $record['password'];
	// Use built in function to compare entered password to hashed password in database
    if ($record && password_verify($password, $hashed)) {
        $_SESSION['record'] = $record;
        header("Location: index.php");
        exit();
    }
    else {
        $valid = false;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Sign In</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="header">
  <h2>Welcome! Feel Free to Explore the Site</h2>
  <img src="images/titlePic.jpg" alt="Contact Book" style="width:285px;height:120px;">
  </div>
<div class="nav">
  <a href="index.php">Home</a>
  <a href="create_account.php">Create Account</a>
</div>

<h1>Sign In</h1>

<form action="sign_in.php" method="post">
    <label>User <input type="email" name="email" required autofocus></label>
    <div><br></div>
    <label>Password <input type="password" name="password" required></label>
    <div><br></div>
    <input type="submit" class="button" value="Sign In">
</form>

<?php
    if (!$valid) {
        print("<p>Invalid email / password combintation</p>");
    }
?>

</body>
</html>