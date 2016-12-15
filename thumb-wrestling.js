
var numRows = 10;
var numCols = 10;

var arrows = {
    red: {
        row: numRows / 2,
        col: numCols / 2,
        dir: "right"
    },
    green: {
        row: numRows / 2,
        col: numCols / 2 + 1,
        dir: "left"
    }
};

var colors = ["red", "green"];

document.onkeydown = keydown;

function getCellId(row, col) {
    return "#cell-" + row + "-" + col;   
}

function getArrowId(color) {
    return color + "-arrow";
}

function getImgTag(color, dir) {
    var src = color + "-arrow.png"
    return "<img id='" + getArrowId(color) + "' src='" + src + "' class='" + dir + "'>"
}

function createThumbWrestling(boardId) {

    for (var row = 0; row < numRows; row++) {
        var rowId = "row-" + row;
        $(boardId).append("<div id='" + rowId + "' class='row'></div>")
        for (var col = 0; col < numCols; col++) {
            var cellId = "cell-" + row + "-" + col;
            $("#" + rowId).append("<div id='" + cellId + "' class='cell'></div>");
        }
    }

    for (var i = 0; i < colors.length; i++) {
        var color = colors[i];
        var row = arrows[color].row;
        var col = arrows[color].col;
        var dir = arrows[color].dir;

        var cellId = getCellId(row, col);
        var arrowId = getArrowId(color);
        var imgTag = getImgTag(color, dir);

        $(cellId).append(imgTag);
    }

}

function drdc(direction) {

    if (direction == "up") {
        return [-1, 0];
    } else if (direction == "down") {
        return [1, 0];
    } else if (direction == "left") {
        return [0, -1];
    } else if (direction == "right") {
        return [0, 1];
    } else {
        console.error("Bad direction: " + direction)
    }

}

function move(color, direction) {
    //$(arrowId).removeClass("up down left right");
    //$(arrowId).addClass(direction);

    var [dr, dc] = drdc(direction);

    var arrowId = getArrowId(color);
    $("#" + arrowId).remove();

    arrows[color].row += dr;
    arrows[color].col += dc;

    var row = arrows[color].row;
    var col = arrows[color].col;

    var cellId = getCellId(row, col);
    var imgTag = getImgTag(color, direction);

    $(cellId).append(imgTag);

}

function keydown(event) {

    // diable browser scrolling on arrow keys
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    var direction;
    var color;

    var char = String.fromCharCode(event.which)

    console.log(char)

    if (event.keyCode == '38') {
        direction = "up";
        color = "red";
    } else if (event.keyCode == '40') {
        direction = "down";
        color = "red";
    } else if (event.keyCode == '37') {
        direction = "left";
        color = "red";
    } else if (event.keyCode == '39') {
        direction = "right";
        color = "red";
    } else if (char == "W") {
        direction = "up";
        color = "green";
    } else if (char == "S") {
        direction = "down";
        color = "green";
    } else if (char == "A") {
        direction = "left";
        color = "green";
    } else if (char == "D") {
        direction = "right";
        color = "green";
    } else {
        return;
    }


    move(color, direction);
}

