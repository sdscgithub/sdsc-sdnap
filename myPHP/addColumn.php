<?php
/*
File: addColumn.php
Purpose: add a new column to the sql database
Description: adds a new column to the sql database
             * "Datatype" and "col" are expected to be passed with the request
               - "Datatype" is the type of data the new column will hold
               - "col" is the name of the new column
               - "options" is only passed when the new column should have a dropbox menu
                  in order to  select values for this column
*/

  /* Connect to the server */
  include_once("db.php");

  /* varchar(50) means that this column should have a dropbox menu to select its value.
     Therefore, $_POST[options] should be stored to the '$secondaryTable' datbase along
     with the column name of this new column. $_POST[options] is a comma delimited list
     of options for the dropdown menu associated with this column
  */

  /* Add a column to "$primaryTable" and a row to '$secondaryTable' */
  if($_POST["DataType"] == "varchar(50)"){
    $mysqli->query("ALTER TABLE `$primaryTable` ADD `$_POST[col]` $_POST[DataType]");
    $mysqli->query("INSERT INTO `$secondaryTable` (column_name, options) VALUES('$_POST[col]', '$_POST[options]')");
  /* Just add a column to "$primaryTable" */
  }else{
    $mysqli->query("ALTER TABLE `$primaryTable` ADD `$_POST[col]` $_POST[DataType]");
  }

  /*  Display the updated webpage */
  header( $redirectPage ) ;

  ?>
