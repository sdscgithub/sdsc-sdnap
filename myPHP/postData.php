<?php
/*
File: postData.php
Purpose: add a new row to the sql database
Description: a new row is added to the database. The new row may contain values
             for none, some or all of the columns
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

  $fileNames = [];
  $columnFileNames = [];
  foreach($_FILES as $file){
    array_push( $fileNames, $file['name'] );
  }

  foreach(array_keys($_FILES) as $val){
    array_push( $columnFileNames, $val);
  }

  foreach($columnFileNames as $columnName){
    if($_FILES[$columnName]['name'] != ""){

      $fileName = $_FILES[$columnName]['name'];
      $tmpName  = $_FILES[$columnName]['tmp_name'];
      $fileSize = $_FILES[$columnName]['size'];
      $fileType = $_FILES[$columnName]['type'];

      $columnName = str_replace("_", " ", $columnName);

      $mysqli->query("UPDATE `$primaryTable` SET `$columnName`='$fileName' WHERE id=$id");

      $fp      = fopen($tmpName, 'r');
      $content = fread($fp, filesize($tmpName));
      $content = addslashes($content);
      fclose($fp);

      if(!get_magic_quotes_gpc())
      {
          $fileName = addslashes($fileName);
      }
      //include 'library/config.php';
      //include 'library/opendb.php';

      $columnName = str_replace("_", " ", $columnName);
      $mysqli->query("INSERT INTO `$fileTable` ( name, size, type, content, id, column_name ) VALUES ('$fileName', '$fileSize', '$fileType', '$content', '$id', '$columnName')");

      //include 'library/closedb.php';

    }
  }


/* Display the updated webpage */
  header( $redirectPage ) ;
  ?>
