<?php
/*
TODO
File: moveColumn.php
Purpose: move columns around in the database
Description: Either swaps two columns or moves a single column
$_POST[type] will be either "swap" or "between"
* Swapping
- Two column names are passed into the function as name and name2
  - Two new columns are created called nameCopy and name2Copy
  - nameCopy is added after name2 and name2Copy is added after name
  - name's data is copied into nameCopy
  - name2's data is copied into name2Copy
  - name and name2 are dropped from the table
  - nameCopy is renamed to name's name
  - name2Copy is renamed to name2's name

* Between
- name is the name of the column to be moved and name2 is the column that name
should be placed after
  - nameCopy is added to the table after name2Copy
  - name's data is copied into nameCopy
  - name is dropped from the table
  - nameCopy is renamed name's name

* Note: This function assumes that column names are all unique in the database
*/

  /* Connect to the server */
  include_once("db.php");

  /* In order rename the columne, we must know what type of data it holds
     Loop thorugh all column names until we find the match and store its
     datatype*/
    $nameType = "";
    $name2Type = "";
    $prev = "none";
    $beforeName2 = "";

    /* Get all columns */
    $columns = $mysqli->query("SHOW COLUMNS FROM $primaryTable");

    /* Loop through columns */
    while($one = $columns->fetch_array()){

      /* store name's type */
      if($one['Field'] == $_POST["name"]){
        $nameType = $one['Type'];
      }

      /* store name2's type
      Also, store the name of the column preceeding name2. It is needed
      for correct placement in "between" */

      if($one['Field'] == $_POST["name2"]){
        $name2Type = $one['Type'];
        $beforeName2 = $prev;
      }
      $prev = $one['Field'];
    }

  /* Swap the rows */
  if($_POST['type'] == "swap"){

    $mysqli->query("ALTER TABLE $primaryTable ADD nameCopy $nameType AFTER `$_POST[name2]`");
    $mysqli->query("UPDATE $primaryTable SET nameCopy=`$_POST[name]`");
    $mysqli->query("ALTER TABLE $primaryTable ADD name2Copy $name2Type  AFTER `$_POST[name]`");
    $mysqli->query("UPDATE $primaryTable SET name2Copy=`$_POST[name2]`");

    $mysqli->query("ALTER TABLE $primaryTable DROP COLUMN `$_POST[name]`");
    $mysqli->query("ALTER TABLE $primaryTable DROP COLUMN `$_POST[name2]`");

    $mysqli->query("ALTER TABLE $primaryTable CHANGE nameCopy `$_POST[name]` $nameType");
    $mysqli->query("ALTER TABLE $primaryTable CHANGE name2Copy `$_POST[name2]` $name2Type");

  /* Add a column between some rows */
  }else if($_POST['type'] == "between"){

    $mysqli->query("ALTER TABLE $primaryTable ADD nameCopy $nameType AFTER `$beforeName2`");
    $mysqli->query("UPDATE $primaryTable SET nameCopy=`$_POST[name]`");
    $mysqli->query("ALTER TABLE $primaryTable DROP COLUMN `$_POST[name]`");
    $mysqli->query("ALTER TABLE $primaryTable CHANGE nameCopy `$_POST[name]` $nameType");
  }

  /* Move the row to the last position */
  else if($_POST['type'] == "last"){
    $mysqli->query("ALTER TABLE $primaryTable ADD nameCopy $nameType");
    $mysqli->query("UPDATE $primaryTable SET nameCopy=`$_POST[name]`");
    $mysqli->query("ALTER TABLE $primaryTable DROP COLUMN `$_POST[name]`");
    $mysqli->query("ALTER TABLE $primaryTable CHANGE nameCopy `$_POST[name]` $nameType");

  }

  ?>
