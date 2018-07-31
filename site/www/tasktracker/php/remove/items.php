<?php

include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');

  $userID = $_POST['userID'];
  $itemArray = json_decode($_POST['data'], true);

  $resultCode = deleteItems($userID, $itemArray);
  echo(getJSON(null, $resultCode == 1));
}

function deleteItems($userID, $itemArray){
  global $ITEMS_TABLE;

  $success = true;
  for($i = 0; $i < sizeOf($itemArray); $i++){
    $resultCode =  genericDelete($userID, $ITEMS_TABLE, $itemArray[$i]['itemID']);
    $success = $success && $resultCode == 1;
  }

  if($success){
    return 1;
  }else{
    return -1;
  }
}

?>
