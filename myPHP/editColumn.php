<?php
  /* Connect to database */
  include_once("db.php");

  $new = $_POST["newName"];
  $old = $_POST["oldName"];
  $nameType = "none";

  $columns = $mysqli->query("SHOW COLUMNS FROM $primaryTable");

  while($one = $columns->fetch_array()){

    /* store name's type */
    if($one['Field'] == $old){
      $nameType = $one['Type'];
    }
  }

  if($nameType != "none"){
    $mysqli->query("ALTER TABLE $primaryTable CHANGE `$old` `$new` $nameType");
    if($nameType == "varchar(50)"){
      $stmt2 = $mysqli->prepare("UPDATE $secondaryTable SET column_name=? WHERE column_name=?");
      $stmt2->bind_param('ss', $new, $old);
      $stmt2->execute();
    }

  }

  /* Display the updated webpage */
    header( $redirectPage ) ;
 ?>
