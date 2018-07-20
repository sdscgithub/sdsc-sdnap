$(document).ready(function() {
	$(".children").hide();
});
	
/* Function name: showChildren
 * Parameters: number - the master ticket number
 * Description: Toggles the visibility of children tickets
 */
function showChildren(number) {
	$("#p" + number).toggle();
	if($("#p" + number).is(':visible')) {
		$("#expand" + number).text("-");
	} else {
		$("#expand" + number).text("+");
	}
}

function expandAll() {
	if ($("#toggleButton").text() == "Expand All") {
		$(".children").show();
		$("#toggleButton").text("Collapse All");
		$(".expand").text('-');
	} else {
		$(".children").hide();
		$("#toggleButton").text("Expand All");
		$(".expand").text('+');
	}
}

function scrollTop() {
	$('body').scrollTop(0);
}

function getSortedOptions() {
	var options;
	var costLength = $('input[name="sortCost"]:checked').length;
	var costSort;
	if (costLength > 0) {
		costSort = "sortBy[]=" + $('input[name="sortCost"]:checked').val();
	} else {
		costSort = "";
	}

	var newTicketLength = $('input[name="onlyNew"]:checked').length;
	var onlyNewSort;
	if (newTicketLength > 0) {
		onlyNewSort = "&sortBy[]=" + $('input[name="onlyNew"]:checked').val();
	} else {
		onlyNewSort = "";
	}

	var reasons = "";
	$('input[name="sortReason"]:checked').map(function() {
		reasons += "&reasons[]=" + this.value;
	});
	console.log(costSort);
	console.log(onlyNewSort);
	console.log(reasons);
	window.location.href = "../pages/bounce-reports.php?" + costSort + onlyNewSort + reasons;
}

$('input[data-column="closeDate"]').tooltip({ /*or use any other selector, class, ID*/
    placement: "top",
    trigger: "focus"
});

    json = {};
	$(".editable").map(function(i, e) {
		$(e).css('border', 'none');
	});

	$(".colHeader").change(function() {
		$('input[data-column="' + this.dataset.column + '"][data-master="' + this.dataset.master + '"]').val(this.value);
		$('input[data-column="' + this.dataset.column + '"][data-master="' + this.dataset.master + '"]').attr("data-edited", "true");
		$('input[data-column="' + this.dataset.column + '"][data-row="' + this.dataset.row + '"]').val(this.dataset.original);
		$('input[data-column="' + this.dataset.column + '"][data-master="' + this.dataset.master + '"][data-ticket]').each(function(i, e) {
			setChanges(this.dataset.ticket, this.dataset.column, this.dataset.index, this.value);
		});
		console.log(JSON.stringify(json));
	});
	$(".cell").change(function() {
		$('input[data-column="' + this.dataset.column +'"][data-row="' + this.dataset.row + '"]').val(this.value);
		$('input[data-column="' + this.dataset.column +'"][data-row="' + this.dataset.row + '"]').attr("data-edited", "true");
		setChanges(this.dataset.ticket, this.dataset.column, this.dataset.index, this.value);
		console.log(JSON.stringify(json));
	});

	$(".multicell").change(function() {
		$('input[data-column="' + this.dataset.column +'"][data-row="' + this.dataset.row + '"][data-index="' + this.dataset.index + '"]').val(this.value);
		$('input[data-column="' + this.dataset.column +'"][data-row="' + this.dataset.row + '"][data-index="' + this.dataset.index + '"]').attr("data-edited", "true");
		setChanges(this.dataset.ticket, this.dataset.column, this.dataset.index, this.value);
		console.log(JSON.stringify(json));
	});

	$(".applyChanges").click(function() {
		console.log(JSON.stringify(json));
		$.ajax({
			method: "POST",
			data: json,
			url: "../editSoap.php",
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		}).success(function(data) {
			alert(data);
			
		});
	});

	function setChanges(ticket, column, index, value) {
		var tix = ticket;
		var prop = getPropName(column, index);
		var val = value;
		var tempJson;

		if (prop == "Name") {
			var nameString = splitBuyerName(val).split(" ");
			if (json[tix] == null) {
				tempJson = {};
				tempJson["First__bName"] = nameString[0];
				tempJson["Last__bName"] = nameString[1];
			} else {
				var tempJson2 = {};
				tempJson2["First__bName"] = nameString[0];
				tempJson2["Last__bName"] = nameString[1];
				tempJson = $.extend(json[tix], tempJson2);
			}
			json[tix] = tempJson;
		} else {
			if (json[tix] == null) {
				tempJson = {};
				tempJson[prop] = val;
			} else {
				var tempJson2 = {};
				tempJson2[prop] = val;
				tempJson = $.extend(json[tix], tempJson2);
			}
			json[tix] = tempJson;
		}
	}

	function getPropName(colName, indexNum) 
	{
		returnString = "";
		switch(colName) {
			case "seller": 
				returnString = "Item__b" + indexNum + "__bSeller";
				break;
			case "closeDate":
				returnString = "Close__bDate";
				break;
			case "pid":
				returnString = "PID";
				break;
			case "buyer":
				returnString = "Name";
				break;
			case "index":
				returnString = "Index__b" + indexNum;
				break;
			case "billable":
				returnString = "Billable";
				break;
			case "status":
				returnString = "status";
				break;
		}
		return returnString;
	}

	
	function splitBuyerName(name) {
		if (name.indexOf(",") > -1) {
			var array  = name.split(", ");
			return array[1] + " " + array[0];
		}
		return name;
	}