<?php
/*
File: updateData.php
Purpose: update database with new information for existing row
Description: a row has none, some or all of its data changed
*/

  /* Connect to the database */
  include_once("db.php");
  /* the row's id that is to be updated */
  $id = $_POST["alterId"];
  $fileNames = [];
  $columnFileNames = [];
  foreach($_FILES as $file){
    array_push( $fileNames, $file['name'] );
  }

  foreach(array_keys($_FILES) as $val){
    array_push( $columnFileNames, $val);
  }
    /* Update any fields that were passed with the POST request */
    foreach($_POST as $key=>$value){
      if($key != 'alterId' && !in_array($key, $fileNames)){
        $keyMod = str_replace('_', ' ', $key);
        $mysqli->query("UPDATE `$primaryTable` SET `$keyMod`='$value' WHERE id=$id");
      }
    }


  foreach($columnFileNames as $columnName){
    if($_FILES[$columnName]['name'] != ""){

      $fileName = $_FILES[$columnName]['name'];
      $tmpName  = $_FILES[$columnName]['tmp_name'];
      $fileSize = $_FILES[$columnName]['size'];
      $fileType = $_FILES[$columnName]['type'];

      $columnName = str_replace("_", " ", $columnName);
      echo "Column name: $columnName";
      $mysqli->query("UPDATE `$primaryTable` SET `$columnName`='$fileName' WHERE id=$id");

      $fp      = fopen($tmpName, 'r');
      $content = fread($fp, filesize($tmpName));
      $content = addslashes($content);
      fclose($fp);

      if(!get_magic_quotes_gpc()){
          $fileName = addslashes($fileName);
      }

      $queryResult = $mysqli->query("SELECT * FROM `$fileTable` WHERE id=$id AND column_name='$columnName'");

      if($queryResult->num_rows == 1){
        $mysqli->query("UPDATE `$fileTable` SET name='$fileName', size='$fileSize' , type='$fileType', content='$content' WHERE id=$id AND column_name='$columnName'");
      }else if($queryResult->num_rows == 0){
        $mysqli->query("INSERT INTO `$fileTable` ( name, size, type, content, id, column_name ) VALUES ('$fileName', '$fileSize', '$fileType', '$content', '$id', '$columnName')");
      }

    }
  }

  /* Display updated webpage */
  header($redirectPage ) ;
  ?>
