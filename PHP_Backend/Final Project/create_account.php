<?php
include "functions.php";
session_start();
extract($_POST);
$does_match = true;
$valid = true;
if (isset($user) && isset($email) && isset($password1) && isset($password2)) {
    if ($password1 === $password2) {
		
		// Use built in function to hash password
		$hashed = password_hash($password1, PASSWORD_DEFAULT);
		
        $inserted = insertUserRecord($user, $email, $hashed);
        if ($inserted) {
            header("Location: sign_in.php");
            exit();
        }
        else {
            $valid = false;
        }

    }
    else {
        $does_match = false;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Create Account</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="header">
  <h2>Welcome! Feel Free to Explore the Site</h2>
  <img src="images/titlePic.jpg" alt="Contact Book" style="width:285px;height:120px;">
  </div>
<div class="nav">
  <a href="index.php">Home</a>
  <a href="sign_in.php">Sign In</a>
</div>

<h1>Create an Account</h1>

<script>
function validateForm() {
	var e = document.forms["account"]["email"].value;
	if (e == "") {
		alert("Your email must be filled out");
		return false;
	}
	var f = document.forms["account"]["password1"].value;
	if (f == "") {
		alert("Your password must be filled out");
		return false;
	}
	var g = document.forms["account"]["password2"].value;
	if (g == "") {
		alert("Your password must be filled out");
		return false;
	}
}
</script>

<form name="account" action="create_account.php" onsubmit="return validateForm()" method="post">
  <label>User Name <input type="text" name="user" required autofocus> </label>
  <label>Email <input type="email" name="email"></label>
  <div><br></div>
  <label>Password <input type="password" name="password1"></label>
  <label>Retype Password <input type="password" name="password2"></label>
  <div><br></div>
  <input type="submit" class="button3" value="Create Account">
</form>

<?php
    if (!$does_match) {
        print("<p>The password fields do not match</p>");
    }
?>

</body>
</html>
