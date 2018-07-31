<?php
/*
File: addFileToDataBase.php
Purpose: add the name of the file to the "files" column of the row with matching id
POST parameters: id - the id of the row that will be worked with
                 fileName - the name of the file
Description: adds " [fileName]" to the end of "files" where the row has a matching id
Return value: true if "files" is updated.Otherwise, it returns false.
*/
  /* Connect to the server */
  include_once("db.php");

  /* POST arguments */
  $id = $_POST['id'];
  $name = $_POST['fileName'];

  /* Get the existing list of files (a space seperated list of file names) */
  $data = $mysqli->query("SELECT files FROM $primaryTable WHERE id=$id");
  $data = $data->fetch_row();
  $data = $data[0];

  /* Add "fileName" to the end of the string of names */
  $updatedFiles = "";
  if($data == ""){
    $updatedFiles = $name;
  }else{
    $updatedFiles = $data . ":" . $name;
  }

  /* Update the "files" column and return */
  if($mysqli->query("UPDATE $primaryTable SET files='$updatedFiles' WHERE id=$id")){
    echo true;
    return;
  }else{
    echo false;
    return;
  }
?>
