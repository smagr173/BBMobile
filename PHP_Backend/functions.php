<?php
/*
 * Author: Stephen Magrowski
 * Created: January 25, 2020
 * Course: CSC 355-20
 * Professor: Dr. Tan
 * Filename: functions.php
 * Description: This file contains the functions for the PHP back-end
 * code. It includes functions for inserting user data into a SQL
 * database. There are also queries for selecting user data.
 *
*/

function addBag($email, $name, $price, $quantity, $item_id, $notes, $options) {
    $db = new PDO("sqlite:content.db");
	
	// Insert into the specific user's table
    $sql = "INSERT INTO cart (email, name, price, quantity, item_id, notes, option) VALUES (?,?,?,?,?,?,?)";
	
    $stmt= $db->prepare($sql);
    $stmt->execute([$email, $name, $price, $quantity, $item_id, $notes, $options]);
	
    $db = NULL;
}

function checkCart($email) {
    $db = new PDO("sqlite:content.db");
        $sql = "SELECT * FROM cart WHERE email='$email' ORDER BY item_id DESC LIMIT 1";
        $stmt = $db->query($sql);
        // return cart as an associative array
        return $stmt->fetch(PDO::FETCH_ASSOC);
   $db = NULL;
}

function deleteItem($email, $item_id) {
    $db = new PDO("sqlite:content.db");
	
    $sql = "DELETE FROM cart WHERE email=? AND item_id=?";
	
    $stmt = $db->prepare($sql);
    $bool=$stmt->execute([$email,$item_id]);
    $db = NULL;
}

function changeQuantity($quantity, $email, $item_id) {
    $db = new PDO("sqlite:content.db");
    $sql = "UPDATE cart SET quantity=? WHERE item_id=? AND email=?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($quantity, $item_id, $email));
    
    $db=NULL;	
}

/* Function Name: insertUserRecord
 * Description: insert user information into the database
 * Parameters: (string) $fname: the user's first name
 *	       (string) $lname: the user's last name
 *             (string) $email: the user's email
 *             (string) $password: the user's password
 * Return Value: (boolean) TRUE if the information was successfully inserted,
 *               otherwise FALSE
 */
function insertUserRecord($fname, $lname, $email, $password) {

    // try to insert into the database
    // if an error occurs return FALSE
    try {
	$db = new PDO("sqlite:content.db");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "INSERT INTO users VALUES ('$fname', '$lname', '$email', '$password')";
        $db->exec($sql);
	return TRUE;
    }
    catch (Exception $e) {
        return FALSE;
    }
	$db = NULL;
}

/* Function Name: getUserRecord
 * Description: get user information from the database
 * Parameters: (string) $email: the user's email
 * Return Value: (array) The user's record if it exists, otherwise an empty
 *               array
 */
function getUserRecord($email) {
    // try to query the database
    // if an error occurs return FALSE
    try {
	$db = new PDO("sqlite:content.db");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "SELECT * FROM users WHERE email='$email'";
        $stmt = $db->query($sql);
        // return user record as an associative array
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    catch (Exception $e) {
	return false;
    }
	$db = NULL;
}

/* Function Name: deleteRecord
 * Description: deletes the desired contact record from the database
 * Preconditions: the values of the parameters are valid
 * Parameters: (string) $user_name - the user's name
 *             (string) $name - the contact name
 * Return Value: None
 */
function deleteRecord($user_name, $name) {
    $db = new PDO("sqlite:content.db");
	
    $sql = "DELETE FROM '$user_name' WHERE contact_name = ?";
	
    $stmt = $db->prepare($sql);
    $stmt->execute([$name]);
	
    $db = NULL;
}

/* Function Name: updateRecord
 * Description: write an updated contact record to the database
 * Preconditions: the values of the parameters are valid
 * Parameters: (string) $user_name - the user's name
 *             (string) $name - the contact name
 *             (string) $category - the category
 *             (string) $value - the value
 * Return Value: None
 */
function updatePassRecord($value, $email) {
    $db = new PDO("sqlite:content.db");
    try {
    $sql = "UPDATE users SET password = ? WHERE email = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($value, $email));
    return true;
    }
    catch (Exception $e) {
	return false;
    }
	$db = NULL;
}

/* Function Name: updateRecord
 * Description: write an updated contact record to the database
 * Preconditions: the values of the parameters are valid
 * Parameters: (string) $user_name - the user's name
 *             (string) $name - the contact name
 *             (string) $category - the category
 *             (string) $value - the value
 * Return Value: None
 */
function updateFname($value, $email) {
    $db = new PDO("sqlite:content.db");
    try {
    $sql = "UPDATE users SET fname = ? WHERE email = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($value, $email));
    return true;
    }
    catch (Exception $e) {
	return false;
    }
	$db = NULL;
}

/* Function Name: updateRecord
 * Description: write an updated contact record to the database
 * Preconditions: the values of the parameters are valid
 * Parameters: (string) $user_name - the user's name
 *             (string) $name - the contact name
 *             (string) $category - the category
 *             (string) $value - the value
 * Return Value: None
 */
function updateLname($value, $email) {
    $db = new PDO("sqlite:content.db");
    try {
    $sql = "UPDATE users SET lname = ? WHERE email = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($value, $email));
    return true;
    }
    catch (Exception $e) {
	return false;
    }
	$db = NULL;
}
function updateEmail($value, $pass) {
    $db = new PDO("sqlite:content.db");
    try {
    $sql = "UPDATE users SET email = ? WHERE password = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($value, $pass));
    return true;
    }
    catch (Exception $e) {
	return false;
    }
	$db = NULL;
}

/* Function Name: doesEmailExist
 * Description: determine whether an email in the database already exists
 * Parameters: (string) $email - the user's name
 * Return Value: (bool) true if the name exists in the database, otherwise
 * false.
 */
function doesEmailExist($email) {
    $result = false;
    $db = new PDO("sqlite:content.db");
    $sql = "SELECT email FROM users";
    $stmt = $db->query($sql);
    $records = $stmt->fetchall(PDO::FETCH_ASSOC);
	
    foreach ($records as $record) {
        if ($record['email'] == $email) {
            $result = true;
            break;
        }
    }
    return $result;
    $db = NULL;
}

/* Function Name: doesEmailExist
 * Description: determine whether an email in the database already exists
 * Parameters: (string) $email - the user's name
 * Return Value: (bool) true if the name exists in the database, otherwise
 * false.
 */
function updateEmailExist($email,$hashed) {
    $result = false;
    $db = new PDO("sqlite:content.db");
    $sql = "SELECT email,password FROM users";
    $stmt = $db->query($sql);
    $records = $stmt->fetchall(PDO::FETCH_ASSOC);
	
    foreach ($records as $record) {
        if ($record['email'] == $email && $record['password'] != $hashed) {
            $result = true;
            break;
        }
    }
    return $result;
    $db = NULL;
}


?>