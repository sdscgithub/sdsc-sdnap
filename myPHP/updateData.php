<?php
/*
File: updateData.php
Purpose: update database with new information for existing row
POST Parameters: alterId - the id of the row to be updated
                 There are no more set parameters. In the key->value pair in the POST,
                 the key should be the column name and the value should be the
                 desired value for that column (aside from alterId, whcih is used
                 to update the correct row).
Description: a row has none, some or all of its data changed
Return value: none
*/

  /* Connect to the database */
  include_once("db.php");
  /* the row's id that is to be updated */
  $id = $_POST["alterId"];

    /* Update any fields that were passed with the POST request */
    foreach($_POST as $key=>$value){
      if($key != 'alterId'){
        $keyMod = str_replace('_', ' ', $key);
        $mysqli->query("UPDATE `$primaryTable` SET `$keyMod`='$value' WHERE id=$id");
      }
    }

  /* Display updated webpage */
  header($redirectPage ) ;
  ?>
