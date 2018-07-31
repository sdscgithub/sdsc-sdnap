<?php

include_once("../utility.php");
include_once("../checkToken.php");

main();

/***** Functions *****/

function main(){
  header('Content-Type: application/json');

  $username = $_POST['username'];

  $userID = insertUser($username);
  echo(getJSON($userID, $userID != -1));
}

function insertUser($username){
  global $USERS_TABLE;

  $user = getUser($username);
  if($user != null){
    return $user['userID'];
  }else{
    $tasktrackerDB = connectToDB();

    $stmt = $tasktrackerDB->prepare("INSERT INTO $USERS_TABLE (username) VALUES (?)");
    $stmt->bind_param('s', $username);
    $success = $stmt->execute();
    if($success == 1){
      $insertID = $tasktrackerDB->insert_id;
      $tasktrackerDB->close();

      return $insertID;
    }else{
      $tasktrackerDB->close();
      return -1;
    }
  }
}

?>
