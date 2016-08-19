var date = new Date();
var lastClickTime = date.getTime();
var lastId = "";
var atIntersection = false;
var atLast = false;

/********** Constants **********/
// Bootstrap colors
var redTheme = "#d9534f";
var blueTheme = "#428bca";

// Highlight colors for drag and drop
var dragPrimary = blueTheme;
var dragSecondary = redTheme;

// Pixel range for drag and drop
var leftRightBuffer = 40;
var upDownBuffer = 30;

// Time in miliseconds between clicks to be considered a double click
var doubleClickTime = 500;
/********** End Constants **********/


/**********
   Name: highlight
   Purpose: Highlight rows as they are clicked and unhighlight any rows that were previously clicked
   Params: id - the id of the clicked on row (should be a table row)
   Return value: none
**********/
function highlight(id){
  var date2 = new Date();
  var clickTime = date2.getTime();
  if(clickTime - lastClickTime < doubleClickTime && id == lastId){
    document.getElementById("editButton").disabled = false;
    rowDblClick();
    document.getElementById("editButton").disabled = true;
    lastClickTime = clickTime;
    lastId = id;
    return;
  }
  /* Get element by id */
  var ele = $("#" + id);

  /* Check if this element has the class "highlight". If it does, this means that a
  highlighted row was clicked on. Therfore, unhighlight it and return */
  if(ele.hasClass("highlight")){
    lastClickTime = clickTime;
    lastId = id;
    var previous = $(".highlight").removeClass("highlight").css("background-color", "");
    //document.getElementById("itemToDelete").setAttribute("value", "none");
    document.getElementById("deleteButton").disabled = true;
    document.getElementById("editButton").disabled = true;
    return;
  }

  /* Remove any preiously highlighed elements from the "highlight" class */
  var previous = $(".highlight").removeClass("highlight").css("background-color", "");

  /* Add to highlight class and color it's background blue */
  ele.addClass("highlight");
  ele.css("background-color", "#428bca");

  /* Update the "delete" and "edit" forms elements so that they know what is higlihgted */
  document.getElementById("deleteId").setAttribute("value", id);
  document.getElementById("itemToDelete").setAttribute("value", "row");
  document.getElementById("alterId").setAttribute("value",id);
  /* Make the "delete" and "edit" buttons clickable */
  document.getElementById("deleteButton").disabled = false;
  document.getElementById("editButton").disabled = false;
  lastClickTime = clickTime;
  lastId = id;
}

/**********
   Name: highlightCol
   Purpose: Highlight columns as they are clicked and unhighlight any columns that were previously clicked
   Params: id - the id of the clicked on column ( should be a table header )
   Return value: none
**********/
function highlightCol(id){

  var ele = $("#" + id);
  document.getElementById("editButton").disabled = true;
  if(ele.hasClass("highlight")){
    var previous = $(".highlight").removeClass("highlight").css("background-color", "");
    document.getElementById("itemToDelete").setAttribute("value", "none");
    document.getElementById("deleteButton").disabled = true;
    return;
  }

  /* Remove any preiously highlighed elements from the "highlight" class */
  var previous = $(".highlight").removeClass("highlight").css("background-color", "");

  ele.addClass("highlight");
  ele.css("background-color", "#428bca");

  document.getElementById("deleteId").setAttribute("value", id);
  document.getElementById("itemToDelete").setAttribute("value", "column");
  document.getElementById("deleteButton").disabled = false;
}

/**********
   Name: checkOption
   Purpose: Update form for adding columns to include additional sections to enter in info for dropdown menus
            Also, remove these sections when the dropdown menu is deselected
  Params: id - the id of the clicked on selection box
  Return value: none
**********/
function checkOption(id){
  /* Get the element that was clicked on */
  var ele = $("#" + id);

  /* varchar(50) means that the "Dropdown" option was chosen */
  if(ele.val() == "varchar(50)"){
    /* Reveal the label and input filed */
    $("#dropdownLabel").attr("hidden", false);
    document.getElementById("dropdownText").setAttribute("type", "text");
  }else{
    /* Conceal the label and input filed */
    document.getElementById("dropdownLabel").setAttribute("hidden", "true");
    document.getElementById("dropdownText").setAttribute("type", "hidden");
  }
}

/**********
   Name: confirmDeletion
   Purpose: Alert user of what row or column is about to be deleted
   Params: none
   Return value: true if user confirms deletion, false if caneled or if there is an error
**********/
function confirmDeletion(){
  /* Do nothing if there is no item selected */
  if( document.getElementById("itemToDelete").getAttribute("value") == "none" ){
    return false;
  }

  /* The value of itemId is expected to be a number (therefore representing the id of a row *id should be unique* ) or
     a string (therefore representing the name of a column *column names should be unique*) */
  var itemId = document.getElementById("deleteId");
  var itemType = document.getElementById("itemToDelete");
  var itemName = "";

  /* Check if it is a column */
  if( isNaN(itemId.getAttribute("value")) ){

    /* Do not delete the last column */
    if($("th").length == 2){
      alert("You cannot delete the last column.");
      return false;
    }

    itemName = itemId.getAttribute("value");
    /* Replace all underscores with spaces */
    itemName = itemName.replace( /_/g , " ");
    /* Ask for user confirmation */
    return confirm("Are you sure that you want to remove the column titled \"" + itemName + "\"?");


  /* Must be a row if not a column*/
  }else{
    /* Children should be the all the data of the row */
    var children = document.getElementById(itemId.getAttribute("value")).childNodes;
    /* Counter to help with print format */
    var printCounter = 0;
    /* Format data of the row to print */
    for(i = 0; i < children.length; i++){
      if(children[i].innerHTML == ""){
        continue;
      }
      if(printCounter == 0){
        /* Print the name of the item if it is the first item */
        itemName =  itemName + children[i].innerHTML;
        printCounter++;
      }else{
        /* Print a comma followed by the name of the item */
        itemName =  itemName + ", " + children[i].innerHTML ;
      }
    }
    /* Ask for user confirmation */
    return confirm("Are you sure that you want to remove the row with data: " + itemName + "?");
  }

  /* Precautionary: this is not expected to run under any normal circumstances */
  alert("Something went wrong with the deletion");
  return false;
}

/**********
   Name: addValues
   Purpose: Fills in the edit form with the data that the row has
   Params: none
   Return value: none
**********/
function addValues(){
  /* Find the row that has the id that is the same as "alterId's" value */
  var id = document.getElementById("alterId").getAttribute("value");
  /* Find the children */
  var children = document.getElementById(id).childNodes;
  /* Change the "value" of the input filds to the innerHTML of the respective children */
  for(var i = 0; i < children.length; i++){
    document.getElementsByClassName("inputField")[i].value = children[i].innerHTML;
  }
}

/**********
   Name: rowDblClick
   Purpose: Brings op the edit window for whichever row that is currently highlihgted
   Params: none
   Return value: none
**********/
function rowDblClick(){
 document.getElementById("editButton").click();
}



/**********
   Name: exportExcel
   Purpose: Creates and downloads an excel file of the table.
   Params: none
   Return value: none
**********/
function exportExcel() {
  var d =$('#example').tableExport({type:'excel',escape:'false',tableName:'yourTableName'
  });
  var a = document.createElement('a');
  a.href = d;
  a.download = "SDNAP " + new Date().toLocaleString() + ".xls"
  a.click();
}
