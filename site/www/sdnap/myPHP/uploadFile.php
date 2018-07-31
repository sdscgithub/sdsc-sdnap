<?php
/*
File: uploadFile.php
Purpose: add file to the server (to the "files" folder)
POST Parameters: file - the file to be uploaded
Description: Uploads file to the "files" folder. If a file of the same name
             already exists, the new file is renamed
Return Value: The name of the file as it is on the server (may be different than
              the name of the file passed. For example file.txt may become file(1).txt)
*/

/* Connect to the database */
include_once("db.php");

// uploads file to a folder
$ds = DIRECTORY_SEPARATOR;

$storeFolder = 'files'; // folder for uploaded files
$path = $_SERVER['DOCUMENT_ROOT'];
$path = $path . "/sdnap";

if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];

    $targetPath = $path . $ds. $storeFolder . $ds;


    $targetFile =  $targetPath. $_FILES['file']['name']; // destination of where file will be uploaded to

    /* Add an ending to the file if the file exists on the server : file.txt -> file(1).txt */
    $path_parts = pathinfo($targetFile);
    $counter = 1;
    while(file_exists($targetFile)){
      $targetFile = $path_parts['dirname'] . $ds . $path_parts['filename'] . "(" . $counter . ")" . "." . $path_parts['extension'];
      $counter = $counter + 1;
    }

    if(move_uploaded_file($tempFile,$targetFile)){
      /* This echoed string is used in a call to addFileToDatabase.php to update the "files" column */
      echo basename($targetFile);
    }
}
?>
