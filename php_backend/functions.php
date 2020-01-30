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

/* Function Name: createRecord
 * Description: write a new contact record to the database
 * Preconditions: the values of the parameters are valid
 * Parameters: (string) $user_name - the user's name
 *             (string) $name - the contact name
 *             (string) $con_num - the contact number
 *             (string) $con_email - the contact email
 *             (string) $con_addr - the contact address
 * Return Value: None
 */
function createRecord($user_name, $name, $con_num, $con_email, $con_addr) {
    $db = new PDO("sqlite:content.db");
	
	// Insert into the specific user's table
    $sql2 = "INSERT INTO '$user_name' (contact_name, contact_num, contact_email, contact_addr) VALUES (?,?,?,?)";
	
    $stmt= $db->prepare($sql2);
    $stmt->execute([$name, $con_num, $con_email, $con_addr]);
	
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
function updateRecord($user_name, $name, $category, $value) {
    $db = new PDO("sqlite:content.db");
	
    $sql = "UPDATE '$user_name' SET '$category' = ? WHERE contact_name = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute(array($value, $name));
	
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

/* Function Name: printTable
 * Description: prints an HTML table containing a row for each contact record
 * sorted by name.
 * Return Value: None
 */
function printTable($user_name) {
    $db = new PDO("sqlite:content.db");
	
    $sql = "SELECT * FROM '$user_name' ORDER BY contact_name";
	
    $stmt = $db->query($sql);
    $records = $stmt->fetchall(PDO::FETCH_ASSOC);
    
    print "<table>\n";
    print "<tr>";
    print "<th>Name</th>";
    print "<th>Number</th>";
    print "<th>Email</th>";
    print "<th>Address</th>";
    print "</tr>\n";
    foreach ($records as $record) {
        $name = $record['contact_name'];
		$email = $record['contact_email'];
		$address = $record['contact_addr'];
		$number = $record['contact_num'];
        print "<tr>";
        print "<td class=\"name\">$name</td>";
		print "<td class=\"number\">$number</td>";
        print "<td class=\"email\">$email</td>";
		print "<td class=\"address\">$address</td>";
        print "</tr>\n";
    }
    print "</table>";
    $db = NULL;
}

/* Function Name: printUserInfo
 * Description: prints an HTML table containing the user's information
 * Parameters: (array) $record - the user's info
 * Return Value: None
 */
function printUserInfo($record) {
    print "<table>\n";
    print "<tr>";
    print "<th>Your Name</th>";
    print "<th>Your Email</th>";
    print "<th>Current Password</th>";
    print "</tr>\n";
    $email = $record['email'];
	$name = $record['name'];
	$password = $record['password'];
		  
    print "<tr>";
    print "<td class=\"name\">$name</td>";
    print "<td class=\"number\">$email</td>";
    print "<td class=\"email\">$password</td>";
    print "</tr>\n";
    print "</table>";
}

/* Function Name: isValidCategory
 * Description: determine whether a category is valid, where a valid category
 * is in the set {'contact_num', 'contact_email', 'contact_addr'}.
 * Parameters: (string) $category - the category
 * Return Value: (bool) true if the category is valid, otherwise false
 */
function isValidCategory($category) {
    $result = false;
    foreach(array('contact_num', 'contact_email', 'contact_addr') as $c) {
        if ($category === $c) {
            $result = true;
            break;
        }
    }
    return $result;
}

?>