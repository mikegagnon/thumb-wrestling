
var numRows = 10;
var numCols = 10;

document.onkeydown = keydown;

function createThumbWrestling(boardId) {

    for (var row = 0; row < numRows; row++) {
        var rowId = "row-" + row;
        $(boardId).append("<div id='" + rowId + "' class='row'></div>")
        for (var col = 0; col < numCols; col++) {
            var cellId = "cell-" + row + "-" + col;
            $("#" + rowId).append("<div id='" + cellId + "' class='cell'></div>");
        }
    }

    $("#cell-2-2").append("<img id='red-arrow' src='red-arrow.png' class='up'>")
}

function keydown(event) {

    // diable browser scrolling on arrow keys
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    var direction;

    if (event.keyCode == '38') {
        direction = "up";
    } else if (event.keyCode == '40') {
        direction = "down";
    } else if (event.keyCode == '37') {
        direction = "left";
    } else if (event.keyCode == '39') {
        direction = "right";
    } else {
        return;
    }

    $("#red-arrow").removeClass("up down left right");
    $("#red-arrow").addClass(direction);
}

