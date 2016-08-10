<?php
/*
File: updateData.php
Purpose: update database with new information for existing row
Description: a row has none, some or all of its data changed
*/
  include_once("db.php");
  /* the row's id that is to be updated */
  $id = $_POST["alterId"];
    /* Update any fileds that were passed with the POST request */
    foreach($_POST as $key=>$value){
      if($key != 'alterId'){
        $keyMod = str_replace('_', ' ', $key);
        $mysqli->query("UPDATE `$primaryTable` SET `$keyMod`='$value' WHERE id=$id");
      }
    }
  /* Display updated webpage */
  header($redirectPage ) ;
  ?>
