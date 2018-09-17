<?php
/*
File: getTheme.php
Purpose: gets the theme
POST parameters: userID - the user's userID (int)
Description: gets the theme from the db
Return value: the theme in the database or -1 if fail
*/
include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  global $USERS_TABLE;
  
  header('Content-Type: application/json');

  /* POST arguments */
  $userID = $_POST['userID'];


  $tasktrackerDB = connectToDB();
  $stmt = $tasktrackerDB->prepare("SELECT isNight FROM $USERS_TABLE WHERE userID = (?) LIMIT 1;");
  $stmt->bind_param('i', $userID);
  $success = $stmt->execute();
  $result = $stmt->bind_result($col1);
  $row = $stmt->fetch();
  if($row == null){
    echo(getJSON(-1, true));
  }else{
    echo(getJSON($col1, true));
  }

  $tasktrackerDB->close();
}
?>
