/**********
   Name: highlight
   Purpose: Highlight rows as they are clicked and unhighlight any rows that were previously clicked
   Params: id - the id of the clicked on row (should be a table row)
   Return value: none
**********/
function highlight(id){

  var ele = $("#" + id);
  if(ele.hasClass("highlight")){
    var previous = $(".highlight").removeClass("highlight").css("background-color", "");
    document.getElementById("itemToDelete").setAttribute("value", "none");
    document.getElementById("deleteButton").disabled = true;
    document.getElementById("editButton").disabled = true;
    return;
  }
  /* Remove any preiously highlighed elements from the "highlight" class */
  var previous = $(".highlight").removeClass("highlight").css("background-color", "");

  ele.addClass("highlight");
  ele.css("background-color", "#428bca");

  document.getElementById("deleteId").setAttribute("value", id);
  document.getElementById("itemToDelete").setAttribute("value", "row");
  document.getElementById("alterId").setAttribute("value",id);
  document.getElementById("deleteButton").disabled = false;
  document.getElementById("editButton").disabled = false;
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
  //document.getElementById("editButton").disabled = false;
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
    itemName = itemName.replace( /_/g , " ");
    /* Ask for user confirmation */
    return confirm("Are you sure that you want to remove the column titled \"" + itemName + "\"?");
  /* Must be a row if not a column*/
  }else{
    /* Children should be the all the data of the row */
    var children = document.getElementById(itemId.getAttribute("value")).childNodes;
    var printCounter = 0;
    /* Format data of the row to print */
    for(i = 0; i < children.length; i++){
      if(children[i].innerHTML == ""){
        continue;
      }
      if(printCounter == 0){
        itemName =  itemName + children[i].innerHTML;
        printCounter++;
      }else{
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

function addValues(){
  //var editForm = document.getElementById("alterId");
  //var editChildren = document.getElementById("myEdit").children;

  var id = document.getElementById("alterId").getAttribute("value");
  var children = document.getElementById(id).childNodes;
  for(var i = 0; i < children.length; i++){
    console.log('input' + (i + 1));
    document.getElementsByClassName("inputField")[i].value = children[i].innerHTML;
  }
}
