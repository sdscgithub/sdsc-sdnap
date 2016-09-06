<?php

/* Connect to the database */
include_once("db.php");

// uploads file to a folder
$ds = DIRECTORY_SEPARATOR;

$storeFolder = 'files'; // folder for uploaded files
$path = $_SERVER['DOCUMENT_ROOT'];

if (!empty($_FILES)) {

    $tempFile = $_FILES['file']['tmp_name'];

    $targetPath = $path . $ds. $storeFolder . $ds;

    $targetFile =  $targetPath. $_FILES['file']['name']; // destination of where file will be uploaded to 

    move_uploaded_file($tempFile,$targetFile);

}

// Store filename and file path to sql table to be used a download link.

// $filename = $_FILES['file']['name'];
// $fileSize = $_FILES['file']['size'];
//
// include 'library/config.php';
// include 'library/opendb.php';
//
//
// $mysqli->query("INSERT INTO `$fileTable` (id) VALUES(DEFAULT)");
// $id = $mysqli->insert_id;
//
//
// $mysqli->query("INSERT INTO `$fileTable` (name,location) VALUES('$filename','$targetPath')");
//
// include 'library/closedb.php';




if(isset($_POST['upload']) && $_FILES['userfile']['size'] > 0)
{
$fileName = $_FILES['userfile']['name'];
$tmpName  = $_FILES['userfile']['tmp_name'];
$fileSize = $_FILES['userfile']['size'];
$fileType = $_FILES['userfile']['type'];

$fp      = fopen($tmpName, 'r');
$content = fread($fp, filesize($tmpName));
$content = addslashes($content);
fclose($fp);

if(!get_magic_quotes_gpc())
{
    $fileName = addslashes($fileName);
}
include 'library/config.php';
include 'library/opendb.php';

$query = "INSERT INTO $fileTable (name, size, type, content ) ".
"VALUES ('$fileName', '$fileSize', '$fileType', '$content')";

mysql_query($query) or die('Error, query failed');
include 'library/closedb.php';

echo "<br>File $fileName uploaded<br>";
}
?>
