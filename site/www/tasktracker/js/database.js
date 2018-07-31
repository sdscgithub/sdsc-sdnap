const PHP_DIRECTORY_PATH = './php';

// Token operations
const PHP_CHECK_TOKEN = PHP_DIRECTORY_PATH + '/checkToken.php';

// User operations
const PHP_ADD_USER = PHP_DIRECTORY_PATH + '/set/user.php';
const PHP_GET_USER = PHP_DIRECTORY_PATH + '/get/user.php';

// Group operations
const PHP_SET_GROUPS = PHP_DIRECTORY_PATH + '/set/groups.php';
const PHP_GET_GROUPS_OF_USER = PHP_DIRECTORY_PATH + '/get/groups.php';
const PHP_DELETE_GROUP = PHP_DIRECTORY_PATH + '/remove/group.php';

// Item operations
const PHP_SET_ITEMS = PHP_DIRECTORY_PATH + '/set/items.php';
const PHP_GET_ITEMS_IN_GROUP = PHP_DIRECTORY_PATH + '/get/items.php'
const PHP_DELETE_ITEMS = PHP_DIRECTORY_PATH + '/remove/items.php';

// Theme operations
const PHP_GET_THEME = PHP_DIRECTORY_PATH + '/get/theme.php';
const PHP_UPDATE_THEME = PHP_DIRECTORY_PATH + '/set/theme.php';


const USERS_TABLE  = "users";
const GROUPS_TABLE = "user_groups";
const ITEMS_TABLE  = "group_items";

const AUTH_ERROR = "Authorization Error";

function getUser(username){
  let params = getBasePOSTParameters();
  params.username = username;
  return ajaxToPromise($.post(PHP_GET_USER, params))
  .then(function(res){
    return appropriatePromise(res);
  })
}

function getUserID(username) {
  return getUser(username)
  .then(function(jsonUser){
    if(jsonUser != null){
      return Promise.resolve(jsonUser.userID);
    }else{
      return Promise.resolve(-1);
    }
  })
}

function updateDB(){
  return new Promise(function(resolve, reject){
    var userName = user.trello.email;
    addUserToDB(userName)
    .then(function(newlyInsertedUserID){
      if(newlyInsertedUserID == -1){
        reject('Failed to add user to database');
        return;
      }
      return getUserID(userName);
    })
    .then(function(id){
      user.databaseID = id;
      //Add Groups to the DB
      var tables = user.tables;

      return setGroups(tables)
      .then(function(){
        return Promise.resolve(id);
      });
    })
    .then(function(userID){
      let itemPromises = new Array();
      let tables = user.tables;
      for(let i in tables){
        for(let j in tables[i].rows){
          let item = tables[i].rows[j];
          item.position = j;
        }
        itemPromises.push(setItems(tables[i].rows, tables[i].id));
      }


      Promise.all(itemPromises).then(function(){
        resolve();
      })

      .catch(function(err){
        reject(err);
      })

    })
    .catch(function(err) {
      reject(err);
    });
  })
}

function addUserToDB(username) {
  let params = getBasePOSTParameters();
  params.username = username;

  return ajaxToPromise($.post(PHP_ADD_USER, params))
  .then(function(response){
    return appropriatePromise(response);
  })
}

function genericSet(array, endpoint){
  let params = getBasePOSTParameters();
  params.data = JSON.stringify(array);

  return ajaxToPromise($.post(endpoint, params))
  .then(function(res){
    return appropriatePromise(res);
  })
}

function setGroup(groupObj){
  return setGroups([groupObj]);
}

function setGroups(groupsArray){
  return genericSet(groupsArray, PHP_SET_GROUPS)
  .then(function(databaseIDS){
    for(let i = 0; i < groupsArray.length; i ++){
      if(groupsArray[i].id == -1){
        groupsArray[i].id = databaseIDS[i];
      }
    }
  });
}

function updateAllItems(userID, group){
  setItems(group.rows, group.id);
}

function setItems(itemsArray, groupID){
  for(let i = 0; i < itemsArray.length; i++){
    itemsArray[i].groupID = groupID;
  }
  return genericSet(itemsArray, PHP_SET_ITEMS);
}

function setItem(item, groupID){
  return setItems([item], groupID);
}

function addGroupToDB(tableObj) {
  return setGroups([tableObj]);
}

function getTheme(userID){
  let params = getBasePOSTParameters();

  return ajaxToPromise($.post(PHP_GET_THEME, params))
  .then(function(jsonObj){
    return appropriatePromise(jsonObj)
  })
}

function updateTheme(userID, isNight){
  let params = getBasePOSTParameters();
  params.isNight = isNight;

  return ajaxToPromise($.post(PHP_UPDATE_THEME, params))
  .then(function(jsonObj){
    return appropriatePromise(jsonObj)
  })
  .then(function(data) {
    return Promise.resolve(data == 1);
  })
}

function updateAllItemsInGroup(userDBID, group){
  let groupID = group.id.slice(6);
  let html = $("#" + group.id)[0].children[1].getElementsByTagName("tr");
  let tableObj;
  for(let i in user.tables){
    if(user.tables[i].id == groupID){
      tableObj = user.tables[i];
      break;
    }
  }

  for(let i in tableObj.rows){ //Reorder table object
    if(html[i].id !== tableObj.rows[i].id){

      let tempRow = tableObj.rows[i];

      for(let j in tableObj.rows){ //Update the positions
        if(tableObj.rows[j].id === html[i].id){
          tableObj.rows[i] = tableObj.rows[j];
          tableObj.rows[j] = tempRow;
        }
      }
    }
  }


  for(let i in tableObj.rows){ //Assign new positions.
    if(tableObj.rows[i].position !== i)
      tableObj.rows[i].position = i;
  }

  return setItems(tableObj.rows, tableObj.id);
}




function getHTMLTableFromItemID(itemID){
  let rows = document.getElementsByTagName("TR");
  for(let j = 0; j < rows.length; j++){
    if(rows[j].id == itemID)
      return rows[j].parentNode;
  }
}

function getAllGroupsOfUser(userID){
  let params = getBasePOSTParameters();

  return ajaxToPromise($.post(PHP_GET_GROUPS_OF_USER, params))
  .then(function(res){
    return appropriatePromise(res);
  })

  .then(function(data){
    return Promise.resolve(data.rows);
  })
}

function getAllItemsInGroup(userID, groupID) {
  let params = getBasePOSTParameters();
  params.groupID = groupID;

  return ajaxToPromise($.post(PHP_GET_ITEMS_IN_GROUP, params))
  .then(function(res){
    return appropriatePromise(res);
  })

  .then(function(data){
    return Promise.resolve(data.rows);
  });
}

// function getTableFromHTML(htmlTable){
//   htmlTableItems = htmlTable.getElementsByTagName("tr");
//   if(htmlTableItems <= 1)
//     return;
//   return getUserTableFromItemID(htmlTableItems[1].id);
// }

/*
function deleteItemsFromUserGroup(userID, tableObj) {
  return deleteItems(tableObj.rows);
}
*/

function deleteItems(itemsArray){
  let params = getBasePOSTParameters();
  params.data = JSON.stringify(itemsArray);
  return ajaxToPromise($.post(PHP_DELETE_ITEMS, params))
  .then(function(res){
    return appropriatePromise(res);
  })
}

function deleteUserGroup(userID, tableObj) {
  let params = getBasePOSTParameters();
  params.groupID = tableObj.id;

  return ajaxToPromise($.post(PHP_DELETE_GROUP, params))
  .then(function(res){
    return appropriatePromise(res);
  })
}

function deleteUnsortedIfEmpty(){
  let unsortedTable = user.getUnsortedTable();

  if(unsortedTable != null && unsortedTable.isEmpty()){
    return deleteUserGroup(user.databaseID, unsortedTable)
    .then(function(){
      user.deleteTable(unsortedTable);
      return Promise.resolve();
    })
  }else{
    return Promise.resolve();
  }
}

function getBasePOSTParameters(){
  return {userID: user.databaseID, trelloToken: user.trello.token};
}

function ajaxToPromise(ajaxCall){
  return new Promise(function(resolve, reject){
    ajaxCall
    .done(function(data){
      resolve(data);
    })

    .fail(function(data){
      if(data.status == 401){
        reject(AUTH_ERROR);
      }else{
        reject(data);
      }
    })
  })
}

function appropriatePromise(res){
  if(res.success == true){
    return Promise.resolve(res.data)
  }else{
    return Promise.reject(res.data)
  }
}
