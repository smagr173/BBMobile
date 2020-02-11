<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Create Contact</title>
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
    <a href="delete.php">Delete Contact</a>
	<a href="update.php">Update Contact</a>
	<a href="view.php">View Contacts</a>
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

<?php
include "functions.php";

$stickyName = null;
$stickyNum = null;
$stickyEmail = null;
$stickyAddr = null;
$msgs = array();

if (isset($_POST['name']) 
    && isset($_POST['con_num'])
    && isset($_POST['con_email'])
    && isset($_POST['con_addr']))
{
    $validName = false;
    $validNum = false;
    $validEmail = false;
    $validAddr = false;

    // validate the name
    extract($_POST);
	$record = $_SESSION['record'];
    $user_name = $record['name'];
    if (!doesNameExist($user_name, $name) && $name != "") {
        $stickyName = $name;
        $validName = true;
	}
    else {
        if ($name == "") {
            $msgs[] = "<p>&quot;$name&quot; is not a valid name.</p>";
        }
        else {
            $msgs[] = "<p>&quot;$name&quot; already exists.</p>";
        }
    }

    // validate the number
    if (is_numeric($con_num) && $con_num != NULL) {
        $stickyNum = $con_num;
        $validNum = true;
    }
    else {
        $msgs[] = "<p>&quot;$con_num&quot; is not a valid phone number. Do not inlcude dashes (-).</p>";
    }

    // validate the email
		if ($con_email != NULL) {
        $stickyEmail = $con_email;
        $validEmail = true;
    }
    else {
        $msgs[] = "<p>&quot;$con_email&quot; is not a valid email address.</p>";
    }

    // validate the address
    if ($con_addr != NULL) {
        $stickyAddr = $con_addr;
        $validAddr = true;
    }
    else {
        $msgs[] = "<p>&quot;$con_addr&quot; is not a valid address.</p>";
    }

    // create contact if all are sticky
    if ($validName && $validNum && $validEmail 
        && $validAddr) {
        createRecord($user_name, $name, $con_num, $con_email, $con_addr);
        $msgs[] = "<p>&quot;$name's&quot; contact created</p>";
        $stickyName = null;
        $stickyNum = null;
        $stickyEmail = null;
        $stickyAddr = null;
    }
}

if (isset($_SESSION['record'])) {
?>
<h1>Create Contact</h1>

<script>
function validate() {
	var e = document.forms["create"]["name"].value;
	if (e == "") {
		alert("The name must be filled out");
		return false;
	}
	var f = document.forms["create"]["con_num"].value;
	if (f == "") {
		alert("The number must be filled out");
		return false;
	}
	var d = document.forms["create"]["con_email"].value;
	if (d == "") {
		alert("The email must be filled out");
		return false;
	}
	var g = document.forms["create"]["con_addr"].value;
	if (g == "") {
		alert("The address must be filled out");
		return false;
	}
}
</script>

    <form name="create" action="add.php" onsubmit="return validate()" method="post">
    <label>Contact Name <input type="text" name="name" value="<?php print $stickyName; ?>"></label>
    <label>Phone Number <input type="text" name="con_num" value="<?php print $stickyNum; ?>"></label>
	<div><br></div>
    <label>Email Address <input type="email" name="con_email" value="<?php print $stickyEmail; ?>"></label>
    <label>Home Address <input type="text" name="con_addr" value="<?php print $stickyAddr; ?>"></label>
	<div><br></div>
       <input type="submit" class="button1" value="Create Contact">
    </form>
<?php
}
else{
	print("<p>Sign in or create an account to create contacts.</p>");
}

foreach($msgs as $msg) {
    print($msg);
}
?>
  </body>
</html>
