<?php
/*
File: updateTheme.php
Purpose: changes the theme
POST parameters: userID - the user's id (String)
                 isNight - whether the night theme is activated (Boolean)
Description: changes the theme
Return value: 1 for success of -1 for failure
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
  $isNight = $_POST['isNight'];

  $tasktrackerDB = connectToDB();
  $stmt = $tasktrackerDB->prepare("UPDATE $USERS_TABLE SET isNight = (?) WHERE userID = (?)");
  $stmt->bind_param('ii', $isNight, $userID);
  $success = $stmt->execute();

  if($success){
    echo(getJSON(1, true));
  }else{
    echo(getJSON(-1, true));
  }

  $tasktrackerDB->close();
}
?>
