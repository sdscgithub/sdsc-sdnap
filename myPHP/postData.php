<?php
/*
File: postData.php
Purpose: add a new row to the sql database
Description: a new row is added to the database. The new row may contain values
             for none, some or all of the columns
*/
  include_once("db.php");

  /* Make a new row and only fill in its id value */
  $mysqli->query("INSERT INTO `$primaryTable` (id) VALUES(DEFAULT)");


  /* Get the id of the row that was just added */
  $id = $mysqli->insert_id;

/* Update the newly create row with any value that were passed with the POST request */
  foreach($_POST as $key=>$value){
    $keyMod = str_replace('_', ' ', $key);
    $mysqli->query("UPDATE `$primaryTable` SET `$keyMod`='$value' WHERE id=$id");
  }

/* Display the updated webpage */
  header( 'Location: http://localhost' ) ;

  ?>
