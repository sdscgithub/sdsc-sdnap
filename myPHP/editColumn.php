<?php
/*
File: editColumn.php
Purpose: edit the data of a column in the database
Description: edit the column's name and select options (if applicable)
             * "newName", "oldName" and "newOptions" are expected to be passed with the request
               - "newName" is the name that the column will be changed to
               - "oldName" is the name that that is currently in the database and will be changed
               - "newOptions" are the newOptions for the select element (not all columns will have this)
*/

  /* Connect to database */
  include_once("db.php");

  $new = $_POST["newName"];
  $old = $_POST["oldName"];
  $options = $_POST["newOptions"];
  /* The type of data in the column is need to cahnge its name */
  $nameType = "none";
  /* Get all the columns */
  $columns = $mysqli->query("SHOW COLUMNS FROM $primaryTable");

  /* Traverse columns and fine the type of the column whose name will be changed */
  while($one = $columns->fetch_array()){

    /* store column's type */
    if($one['Field'] == $old){
      $nameType = $one['Type'];
    }
  }

  /* Make sure that the column type was found */
  if($nameType != "none"){
    /* Change the table name */
    $mysqli->query("ALTER TABLE $primaryTable CHANGE `$old` `$new` $nameType");
    /* Update the options if this column has them (columns with type varchar(50) have select elements)*/
    if($nameType == "varchar(50)"){
      $stmt2 = $mysqli->prepare("UPDATE $secondaryTable SET column_name=? WHERE column_name=?");
      $stmt2->bind_param('ss', $new, $old);
      $stmt2->execute();

      /* Update the select options */
      $stmt2 = $mysqli->prepare("UPDATE `$secondaryTable` SET options=? WHERE column_name=?");
      $stmt2->bind_param('ss', $options, $new);
      $stmt2->execute();
    }

  }

  /* Display the updated webpage */
    header( $redirectPage ) ;
 ?>
