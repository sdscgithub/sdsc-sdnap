<?php

include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');


  $userID = $_POST['userID'];
  $groupID = $_POST['groupID'];

  $resultCode = deleteGroup($userID, $groupID);
  echo(getJSON(null, $resultCode == 1));
}

function deleteGroup($userID, $groupID){
  global $GROUPS_TABLE;
  return genericDelete($userID, $GROUPS_TABLE, $groupID);
}
?>
