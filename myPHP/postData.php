<?php
/*
File: postData.php
Purpose: add a new row to the sql database
POST Parameters: There are no set parameters. In the key->value pair in the POST,
                 the key should be the column name and the value should be the
                 desired value for that column. No id is passed since a new row
                 is creted and a new id is created with the row
Description: a new row is added to the database. The new row may contain values
             for none, some or all of the columns
Return value: none
*/
  /* Connect to the database */
  include_once("db.php");

  /* Make a new row and only fill in its id value */

  $mysqli->query("INSERT INTO `$primaryTable` (id) VALUES(DEFAULT)");


  /* Get the id of the row that was just added */
  $id = $mysqli->insert_id;

/* Update the newly created row with any value(s) that were passed with the POST request */
  foreach($_POST as $key=>$value){
      $keyMod = str_replace('_', ' ', $key);
      $mysqli->query("UPDATE `$primaryTable` SET `$keyMod`='$value' WHERE id=$id");
  }

/* Display the updated webpage */
  header( $redirectPage ) ;
  ?>
