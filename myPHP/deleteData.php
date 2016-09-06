<?php
/*
File: deleteData.php
Purpose: remove either a column or a row from sql database and then update the webpage
Description: deleteId and itemToDelete are both expected to be passed in the POST.
             * deleteId is expected to be a number corresponding to the unique id of
             a row in the sql database OR the unique name of a column in the sql database.
             * itemToDelete is expected to be "row", "column" or "none"
*/
//TODO Remove information from files when column is dropped
  /* Connect to the database */
  include_once("db.php");
  /* Post arguments */
  $id = $_POST["deleteId"];
  $item = $_POST["itemToDelete"];

/* Delete a row */
  if($item == "row"){
    $stmt = $mysqli->prepare("DELETE FROM `$primaryTable` WHERE id=?");
    $stmt->bind_param('s', $id);
    $stmt->execute();

    $stmt = $mysqli->prepare("DELETE FROM `$fileTable` WHERE id=?");
    $stmt->bind_param('s', $id);
    $stmt->execute();
 /* Delete a column */
 }else if($item == "column"){

   $keyMod = str_replace('_', ' ', $id);

   $mysqli->query("ALTER TABLE `$primaryTable` DROP COLUMN `$keyMod`");

   $stmt2 = $mysqli->prepare("DELETE FROM `$secondaryTable` WHERE column_name=?");
   $stmt2->bind_param('s', $keyMod);
   $stmt2->execute();

   $stmt2 = $mysqli->prepare("DELETE FROM `$fileTable` WHERE column_name=?");
   $stmt2->bind_param('s', $keyMod);
   $stmt2->execute();
 }
 /* Display updated page */
  header( $redirectPage ) ;
  ?>
