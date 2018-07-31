<?php
/*
File: removeFile.php
Purpose: remove a file from the files server and also from the sql table
POST parameters: name - the name of the file
                 id (optional) - the id of the row that will be worked with
Description:
             With id :
             Get the "files" string from the row with the matching id and remove
             from it the name of the file that is to be deleted ("files" is a
             space seperated list of file names). Then remove the file from the
             files directory

             Without id :
             Remove the file from the server. Do not update the slq database

Return value: true if a file with 'name' exists in the files directory and is
              removed. Otherwise false.
*/

/* Connect to the database */
include_once("db.php");

/* POST arguments */
$id = $_POST['ID'];
$name = $_POST['name'];

/* create the path to the file */
$path =  ".." . DIRECTORY_SEPARATOR . "files" . DIRECTORY_SEPARATOR . $name;

/*Remove the file from "files" if the file exists on the server */
if(file_exists($path)){
  /* Get the files associated with this id */

  if($id != -1){
    $data = $mysqli->query("SELECT files FROM $primaryTable WHERE id=$id");
    $data = $data->fetch_row();
    $data = $data[0];
    /* Seperate the strings that are the file names */
    $files = explode(":", $data);

    $updatedFiles = "";
    /* Combine them back into a single string, seperate by spaces
     (without the file that is to be removed) */
    foreach($files as $val){
      if($val != $name){
        if($updatedFiles == ""){
          $updatedFiles = $val;
        }else{
          $updatedFiles = $updatedFiles . ":" . $val;
        }
      }
    }

    /* Update "files" for the row coresponding with the id passed as an argument */
    $mysqli->query("UPDATE $primaryTable SET files='$updatedFiles' WHERE id=$id");
  }

  unlink($path);
  echo true;
  return;
}else{
  echo false;
  return;
}
?>
