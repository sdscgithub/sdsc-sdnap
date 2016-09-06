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
    rowDblClick();
    lastClickTime = clickTime;
    lastId = id;
    checkHighlight();
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
    checkHighlight();
    return;
  }

  /* Remove any preiously highlighed elements from the "highlight" class */
  var previous = $(".highlight").removeClass("highlight").css("background-color", "");

  /* Add to highlight class and color it's background blue */
  ele.addClass("highlight");
  ele.css("background-color", blueTheme);

  /* Update the "delete" and "edit" forms elements so that they know what is higlihgted */
  document.getElementById("deleteId").setAttribute("value", id);
  document.getElementById("itemToDelete").setAttribute("value", "row");
  document.getElementById("alterId").setAttribute("value",id);
  /* Make the "delete" and "edit" buttons clickable */
  checkHighlight();
  lastClickTime = clickTime;
  lastId = id;
  document.getElementById("editButton").setAttribute("data-target", "#edit");
}

/**********
   Name: highlightCol
   Purpose: Highlight columns as they are clicked and unhighlight any columns that were previously clicked
   Params: id - the id of the clicked on column ( should be a table header )
   Return value: none
**********/
function highlightCol(id){

  var date2 = new Date();
  var clickTime = date2.getTime();
  if(clickTime - lastClickTime < doubleClickTime && id == lastId){
    rowDblClick();
    lastClickTime = clickTime;
    lastId = id;
    checkHighlight();
    return;
  }

  var ele = $("#" + id);
  document.getElementById("editButton").disabled = true;
  if(ele.hasClass("highlight")){
    lastClickTime = clickTime;
    lastId = id;
    var previous = $(".highlight").removeClass("highlight").css("background-color", "");
    document.getElementById("itemToDelete").setAttribute("value", "none");
    document.getElementById("editButton").setAttribute("data-target", "#edit");
    checkHighlight();
    return;
  }

  /* Remove any preiously highlighed elements from the "highlight" class */
  var previous = $(".highlight").removeClass("highlight").css("background-color", "");

  ele.addClass("highlight");
  ele.css("background-color", blueTheme);

  document.getElementById("deleteId").setAttribute("value", id);
  document.getElementById("itemToDelete").setAttribute("value", "column");
  document.getElementById("editButton").setAttribute("data-target", "#editColumn");
  lastClickTime = clickTime;
  lastId = id;
  checkHighlight();

  var nameInDatabase = id;
  while(nameInDatabase.includes("_")){
    nameInDatabase = nameInDatabase.replace("_", " ");
  }
  document.getElementById("oldName").setAttribute("value", nameInDatabase);
}

/**********
   Name: checkHighlight
   Purpose: Make the edit and delete button clickable/disabled depending on
            whether there is a highlighted element
  Params: none
  Return value: none
**********/
function checkHighlight(){
  if(document.getElementsByClassName("highlight").length == 1){
    document.getElementById("editButton").disabled = false;
    document.getElementById("deleteButton").disabled = false;
  }else{
    document.getElementById("editButton").disabled = true;
    document.getElementById("deleteButton").disabled = true;
  }
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
   Name: confirmColumnCreation
   Purpose: Check for underscores in new column names
   Params: none
   Return value: false if column name contains a '_', otherwise true
**********/
function confirmColumnCreation(){
  if(document.getElementById("New Column Name Input").value.includes("_")){
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
   Purpose: Fills in the edit form with the data that the row/column has
   Params: none
   Return value: none
**********/
function addValues(){
  /* There are fields on the edit column form that should only appear if the
  column has a dropdown for input. Make the hidden now; show them later
  if needed */
  if($("#newOptionsLabel") != null){
    $("#newOptionsLabel").attr("hidden", true);
  }
  if(document.getElementById("newOptions") != null){
    document.getElementById("newOptions").setAttribute("type", "hidden");
  }

  /* This means that a row was selected */
  if(document.getElementById("editButton").getAttribute("data-target") == "#edit"){
    /* Find the row that has the id that is the same as "alterId's" value */
    var id = document.getElementById("alterId").getAttribute("value");
    /* Find the children */
    var children = document.getElementById(id).childNodes;
    /* Change the "value" of the input filds to the innerHTML of the respective children */
    for(var i = 0; i < children.length; i++){
      /* Variable for current child */
      var child = document.getElementsByClassName("inputField")[i];
      /* Change file inputs differently than other inputs */
      if(child.className.includes("editFileButton")){
        if(children[i].innerHTML != ""){
          child.innerHTML = children[i].innerHTML;
        }else{
          child.innerHTML = "No file selected";
        }
      }else{
        child.value = children[i].innerHTML;
      }
    }
  /* This means that a column was selected */
  }else{
    /* The element with id "oldName" is set to have the name of the column that was
    selected. This happens in highlight/highlightCol */
    var oldName = document.getElementById("oldName").getAttribute("value");
    /* Set the input for the columns name. Users may edit this input to change the column name */
    document.getElementById("newName").setAttribute("value", oldName);

    /* Find the select element that has all the options for this column (if it exists) */
    var selectOptions = document.getElementById(oldName + " Select");
    if(selectOptions != null){
      /* Fill this string with the select options for this column (seperated by commas) */
      var optionsString = "";
      var options = selectOptions.childNodes;
      /* Get each of the options (they are the children of the select element) */
      for(i = 0; i < options.length;i++){
        /* Format the string */
        if(i == 0){
          optionsString = optionsString + options[i].innerHTML;
          continue;
        }
        optionsString = optionsString + "," + options[i].innerHTML;
      }
      /* The input field for the column's select options */
      var optionsInput = document.getElementById("newOptions");
      /* Make it visible */
      optionsInput.setAttribute("type", "text");
      /* Set the inputs text value */
      $("#newOptions").val( optionsString);
      /* Make it visible */
      $("#newOptionsLabel").attr("hidden", false);
    }
  }
}

/**********
   Name: fileChanged
   Purpose: Change name on button for file slection when file is selected
   Params: input - the html input element that has changed
           event - the change event
   Return value: none
**********/
function fileChanged(input, event){
  console.log(event);
  var button = document.getElementById(input.name + " button edit");
  var file = event.srcElement.files[0];
  if(file){
    button.innerHTML = file.name;
  }else{
    button.innerHTML = "No file selected";
  }
}

/**********
   Name: rowDblClick
   Purpose: Brings op the edit window for whichever item that is currently highlihgted
   Params: none
   Return value: none
**********/
function rowDblClick(){
 var editBttn = document.getElementById("editButton");
 editBttn.click();
 checkHighlight();
}

/********** Drag handling methods **********/
/* These methods are used to handle the dragging and dropping of
the columns. They add visual effects and POST data */

/**********
   Name: dragStartHandler
   Purpose: Identify the element being dragged and stylize it
   Params: ev - the drag start event
   Return value: none
**********/
function dragStartHandler(ev){
  this.style.opacity = "0.4";
  /* This data will be acccessed when dropped and used in POST request */
  ev.dataTransfer.setData('text/html', this.innerHTML);
  /* Used to identify element that is being dragged */
  /* (only one element is expected to be part of class "beingDragged" at any time) */
  this.classList.add("beingDragged");
}

/**********
   Name: dragEndHandler
   Purpose: Return the element back to its original, pre-drag state
   Params: ev - the drag end event
   Return value: none
**********/
function dragEndHandler(ev){
  this.style.opacity = "1.0";
  this.style.border = "";
  this.classList.remove("beingDragged");
}

/**********
   Name: dragLeaveHandler
   Purpose: Return the element back to its original, pre-drag state
   Params: ev - the drag end event
   Return value: none
**********/
function dragLeaveHandler(){
  this.style.opacity = "1.0";
  this.style.border = "";
  /* Remove any classes that may have been added to this element */
  this.classList.remove("swap");
  this.classList.remove("left");
  this.classList.remove("right");
}

/**********
   Name: dragOverHandler
   Purpose: Identify what part of the element the cursor is over
   Params: ev - the drag over event
   Return value: none
**********/
function dragOverHandler(ev){
  /* Must prevent default to allow dropping on other dragable objects */
  if(ev.preventDefault){
    ev.preventDefault();
  }

  /* Cursor is on the left edge of the element */
  if(inRangeLeft(ev, this)){
    this.style.opacity = "1.0";
    this.style.border = "";
    this.style.borderLeft = "thin dashed " + dragSecondary;
    /* These classes are used to identify elements on drop */
    this.classList.add("left");
    this.classList.remove("swap");
    this.classList.remove("right");
  /* Cursor is on the right edge of the element */
  }else if(inRangeRight(ev, this)){
    this.style.opacity = "1.0";
    this.style.border = "";
    this.style.borderRight = "thin dashed " + dragSecondary;
    /* These classes are used to identify elements on drop */
    this.classList.add("right");
    this.classList.remove("left");
    this.classList.remove("swap");
  /* Cursor is just over an element but not near it left/right edge */
  }else{
    this.style.opacity = "0.4";
    this.style.border = "thin dashed " + dragSecondary;
    /* These classes are used to identify elements on drop */
    this.classList.add("swap");
    this.classList.remove("left");
    this.classList.remove("right");
  }
}

/**********
   Name: dropHandler
   Purpose: Make the post request to move the columns around
   Params: ev - the drop event
   Return value: none
**********/
function dropHandler(ev){
    /* This object will be sent with the POST request */
    var obj = new Object();
    obj.name = ev.dataTransfer.getData('text/html');

    /* Precautionary. There should only be one element total in "left", "swap",
    or "right" */
    if( ($(".left").length + $(".swap").length + $(".right").length) > 1){
      alert ("There was a problem moving the column");
      return;
    }

    /* There should be a single element with the class "left", "right" or "swap"
    Find which class the element belongs to and update obj accordingly */
    if($(".left").length != 0){
      obj.name2 = $(".left")[0].innerHTML;
      obj.type = "left";
    }else if($(".swap").length != 0){
      obj.name2 = $(".swap")[0].innerHTML;
      obj.type = "swap";
    }else{
      obj.name2 = $(".right")[0].innerHTML;
      obj.type = "right";
    }

   /* Do not move any columns if the element was dropped on itself */
   if(obj.name2 == obj.name){
     return;
   }
  /* Make the POST request */
  $.post("myPHP/moveColumn.php", obj,function(data){
    /* Update the window once the database is updated */
    window.location = "index.php";
  });
}

/**********
   Name: dragHandler
   Purpose: Stylize the element that is being dragged
   Params: ev - the drag start event
   Return value: none
**********/
function dragHandler(ev){
  document.getElementsByClassName("beingDragged")[0].style.border = "thin dashed " + dragPrimary;
}

/**********
   Name: setupHandlers
   Purpose: Get columns ready for drag and drop
   Params: none
   Return value: none
**********/
function setupHandlers(){
  /* Get an array of all draaggable colums */
  var columns = document.getElementsByClassName("draggableColumn");
  for(i = 0; i < columns.length; i++){
    /* Add handlers */
    columns[i].addEventListener('dragstart', dragStartHandler, false);
    columns[i].addEventListener('dragend', dragEndHandler, false);
    columns[i].addEventListener('dragleave', dragLeaveHandler, false);
    columns[i].addEventListener('dragover', dragOverHandler, false);
    columns[i].addEventListener('drag', dragHandler, false);
    columns[i].addEventListener('drop', dropHandler, false);
  }
}


/********** End of drag handlers **********/


/**********
   Name: inRangeLeft
   Purpose: Checks whether the x,y coord of ev is near element's BoundingBox left wall
   Params: ev - the event which the x coordinate will be compared to
           element - the element to compare with
   Return value: true if within the range, false if not
**********/
function inRangeLeft(ev, element){
    return Math.abs(getLeftX(element) - ev.clientX) < leftRightBuffer;
}

/**********
   Name: inRangeRight
   Purpose: Checks whether the x,y coord of ev is near element's BoundingBox right wall
   Params: ev - the event which the x coordinate will be compared to
           element - the element to compare with
   Return value: true if within the range, false if not
**********/
function inRangeRight(ev, element){
  return Math.abs(getRightX(element) - ev.clientX) < leftRightBuffer;
}

/**********
   Name: getLeftX
   Purpose: Returns the x coordinate of element's bounding box's left side
   Params: element - the event which the x coordinate will be compared to
   Return value: the x coordinate of the left side of element's bounding box
**********/
function getLeftX(element){
  return element.getBoundingClientRect().left;
}

/**********
   Name: getLeftX
   Purpose: Returns the x coordinate of element's bounding box's right side
   Params: element - the event which the x coordinate will be compared to
   Return value: the x coordinate of the right side of element's bounding box
**********/
function getRightX(element){
  return element.getBoundingClientRect().right;
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
