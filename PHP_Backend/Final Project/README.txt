
 Author: Stephen Magrowski
 Due: December 12, 2018
 Class: CSC 242-010
 Fall 2018
 Assignment: Final Project

 Description: This web page allows users to log in and create a contact list containing a name,
 email, phone number, and address. The information stored on the database can be viewed, updated, and deleted
 using the different pages. PHP sessions are used in order to maintain the users state and for retrieval of
 the correct information from the database. Each time a new account is created a unique table is made in the
 database for that specific user's contact list. Otherwise each user would see the same contact list and it
 would not be very private.
 
 As bonus work the user's password is stored securely in the database using the PHP built-in function, password_hash().
 It is then verified in the sign-in page with the PHP function password_verify(). Once signed in you can see in the home
 page that the user's current password is a series of hashed characters instead of the actual password.
 
 This work was completed using the following links:
 http://php.net/manual/en/function.password-verify.php
 http://php.net/manual/en/function.password-hash.php