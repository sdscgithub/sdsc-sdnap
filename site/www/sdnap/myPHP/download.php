<?php

/* Connect to the database */
include_once("db.php");

/* The width (in cahracters) of the cells in excel */
$columnWidth = 25;
/* The name of the download file */
$fileName = "sdnapData.slk";

/* Number to add to the end of $fileName */
$endNum = 1;

/* Edit the $fileName so that $fileName is a a new file (not opening an existing file)
Example: sdnapData.slk, sdnapData(1).slk, sdnapData(2).slk, etc */
while(file_exists($fileName)){
  $fileName = "sdnapData" . "($endNum)" . ".slk";
  $endNum = $endNum + 1;
}


/* Open the file */
$myFile = fopen($fileName, "w");
/* Header */
fwrite($myFile, "ID;P\n");
/* Set the first row to be bold */
fwrite($myFile, "F;SDM4;R1\n");

/* Get all the column names */
$data = $mysqli->query("SELECT * FROM `$primaryTable`");
$counter = 1;
/* Traverse columns */
while($obj = $data->fetch_field()){
  /* Do not display the "id" column */
  if($obj->name != "id"){
    $formattedString = str_replace(";", ";;", $obj->name);
    /* Add the column names as the first row */
    /* Add "" around the value if is not numberic, otherewise leave them out */
    if(is_numeric($formattedString)){
      fwrite($myFile, "C;Y1;X$counter;K$formattedString\n");
    }else{
        fwrite($myFile, "C;Y1;X$counter;K\"$formattedString\"\n");
    }
    /* Set each cell's width in this row to $columnWidth */
    fwrite($myFile, "F;W$counter $counter $columnWidth\n");
    $counter = $counter + 1;
  }
}

/* Go through the rows */
$data = $mysqli->query("SELECT * FROM `$primaryTable`");

/* Keep track of row's X,Y coord */
$counterY = 2;
$counterX = 1;
while($stuff = $data->fetch_assoc()){
  $counterX = 1;
  foreach($stuff as $value){
    /* Do not display the "id" row */
    if($value != $stuff["id"]){
      $formattedString = str_replace(";", ";;", $value);
      /* Add "" around the value if is not numberic, otherewise leave them out */
      if(is_numeric($formattedString)){
        fwrite($myFile, "C;Y$counterY;X$counterX;K$formattedString\n");
      }else{
        fwrite($myFile, "C;Y$counterY;X$counterX;K\"$formattedString\"\n");
      }
      $counterX = $counterX + 1;
    }
  }
  $counterY = $counterY + 1;
}


/* Add ending to file */
fwrite($myFile, "E\n");
/*Close file */
fclose($myFile);

/* Download the file for the user */
if (file_exists($fileName)) {

    //Get file type and set it as Content Type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    header('Content-Type: ' . finfo_file($finfo, $fileName));
    finfo_close($finfo);

    //Use Content-Disposition: attachment to specify the fileName
    header('Content-Disposition: attachment; filename='.basename($fileName));

    //No cache
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');

    //Define file size
    header('Content-Length: ' . filesize($fileName));

    ob_clean();
    flush();
    readfile($fileName);
    exit;


}else{
echo "uh oh";
}


?>
