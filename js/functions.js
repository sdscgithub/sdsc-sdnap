var date = new Date();
var lastClickTime = date.getTime();
var lastId = "";
var columns = new Array(0);
var atIntersection = false;

/**********
   Name: highlight
   Purpose: Highlight rows as they are clicked and unhighlight any rows that were previously clicked
   Params: id - the id of the clicked on row (should be a table row)
   Return value: none
**********/
function highlight(id){
  var date2 = new Date();
  var clickTime = date2.getTime();
  if(clickTime - lastClickTime < 500 && id == lastId){
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
   Name: confirmColumnCreateion
   Purpose: Check for underscores in new column names
   Params: none
   Return value: false if column name contains a '_', otherwise true
**********/
function confirmColumnCreateion(){
  if(document.getElementById("New Column Name").value.includes("_")){
    alert("Column names cannot contain '_'");
    return false;
  }else{
    return true;
  }
}

/**********
   Name: confirmDeletion
   Purpose: Alert user of what row or column is about to be deleted
   Params: none
   Return value: true if user confirms deletion, false if canceled or if there is an error
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

function dragStartHandler(ev){
  this.style.opacity = "0.4";
  ev.dataTransfer.setData('text/html', this.innerHTML);
  this.classList.add("beingDragged");
}

function dragEndHandler(ev){
  this.style.opacity = "1.0";
  this.style.border = "";
  this.classList.remove("beingDragged");
}

function dragEnterHandler(ev){
}

function dragLeaveHandler(){
  this.style.opacity = "1.0";
  this.style.border = "";
  this.classList.remove("swap");
}

function dragOverHandler(ev,objectUnder){
  if(ev.preventDefault){
    ev.preventDefault();
  }

  if(!atIntersection){
    objectUnder.style.opacity = "0.4";
    objectUnder.style.border = "thin dashed red";
    objectUnder.classList.add("swap");
  }else{
    objectUnder.style.opacity = "1.0";
    var hasLeftBorderColor = objectUnder.style.borderLeft == "thin dashed red" && objectUnder.style.borderTop != "thin dashed red";
    var hasRightBorderColor = objectUnder.style.borderRight == "thin dashed red" && objectUnder.style.borderTop != "thin dashed red";
    objectUnder.style.border = "";
    if(hasLeftBorderColor){
      objectUnder.style.borderLeft = "thin dashed red";
    }
    if(hasRightBorderColor){
      objectUnder.style.borderRight = "thin dashed red";
    }
    objectUnder.classList.remove("swap");
  }
}

function dropHandler(ev){
    var obj = new Object();
    obj.name = ev.dataTransfer.getData('text/html');

    if($(".between").length != 0){
      obj.name2 = $(".between")[0].innerHTML;
      obj.type = "between";
    }else if($(".swap").length != 0){
      obj.name2 = $(".swap")[0].innerHTML;
      obj.type = "swap";
    }else{
      obj.type = "last";
    }

    if(obj.name2 == obj.name){
      return;
    }
  $.post("myPHP/moveColumn.php", obj,function(data){
    window.location = "index.php";
  });
  obj.name = $(".swap").removeClass("swap");
}

function dragHandler(ev, columns){
  document.getElementsByClassName("beingDragged")[0].style.border = "thin dashed #428bca";
  var counter = 0;
  for(i = 0; i < columns.length; i++){
    if(inRangeLeft(ev, columns, i)){
     columns[i].style.borderLeft = "thin dashed red";
     columns[i].classList.add("between");
     atIntersection = true;
   }else if(inRangeRightLast(ev, columns)){
     columns[columns.length - 1].style.borderRight = "thin dashed red";
     columns[columns.length - 1].classList.add("last");
     atIntersection = true;
   }else{
     counter++;
     columns[i].style.borderLeft = "";
     columns[i].classList.remove("between");
   }
  }
  if(counter == columns.length){
    atIntersection = false;
  }
}

function inRangeLeft(ev, columns, i){
    return Math.abs(getLeftX(columns[i]) - ev.clientX) < 40 && Math.abs(getTopY(columns[i]) - ev.clientY) < 30;
}

function inRangeRightLast(ev, columns){
    return Math.abs(getRightX(columns[columns.length -1]) - ev.clientX) < 40 && Math.abs(getTopY(columns[i]) - ev.clientY) < 30;
}

function getLeftX(element){
  return element.getBoundingClientRect().left;
}

function getRightX(element){
  return element.getBoundingClientRect().right;
}

function getTopY(element){
  return element.getBoundingClientRect().top;
}

function getBottomY(element){
  return element.getBoundingClientRect().bottom;
}
