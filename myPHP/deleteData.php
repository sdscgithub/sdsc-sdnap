<?php
/*
File: deleteData.php
Purpose: remove either a column or a row from sql database and then update the webpage
Description: deleteId and itemToDelete are both expected to be passed in the POST.
             * deleteId is expected to be a number corresponding to the unique id of
             a row in the sql database OR the unique name of a column in the sql database.
             * itemToDelete is expected to be "row", "column" or "none"
*/
  /* Connect to the server */
  include_once("db.php");
  $id = $_POST["deleteId"];
  $item = $_POST["itemToDelete"];

/* Delete a row */
  if($item == "row"){
    $mysqli->query("DELETE FROM `test2` WHERE id=$id");
/* Delete a column */
 }else if($item == "column"){
   $keyMod = str_replace('_', ' ', $id);
   $mysqli->query("ALTER TABLE `test2` DROP COLUMN `$keyMod`");
   $mysqli->query("DELETE FROM `select_options` WHERE column_name='$keyMod'");

 }
 /* Display updated page */
 header( 'Location: http://localhost' );

  ?>
