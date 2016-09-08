<?php
/*
File: getFiles.php
Purpose: return the contents of the "files" column from the primaryTable
POST variables: id - the id of the row that you will get "files" values for
Description: simply returns the data contained "files" where the id matches the
             id passed in the POST request
*/
  /* Connect to the database */
  include_once("db.php");
  /* Query for the data */
  $data = $mysqli->query("SELECT files FROM $primaryTable WHERE id=$_POST[id]");
  $data = $data->fetch_row();
  /* Return the data */
  echo $data[0];
?>
