
var numRows = 10;
var numCols = 10;
var gameOver = false;

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

function getOppositeColor(color) {
    if (color == "red") {
        return "green";
    } else if (color == "green") {
        return "red";
    } else {
        console.error("Bad color: " + color);
    }
}

function getLightColor(color) {
    if (color == "red") {
        return "pink";
    } else if (color == "green") {
        return "lightgreen";
    } else {
        console.error("Bad color: " + color);
    }
}

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

    var [dr, dc] = drdc(direction);

    newRow = arrows[color].row + dr;
    newCol = arrows[color].col + dc;

    var oppositeColor = getOppositeColor(color);

    var opponentRow = arrows[oppositeColor].row;
    var opponentCol = arrows[oppositeColor].col;

    if (newRow == opponentRow && newCol == opponentCol) {
        gameOver = true;
        newRow = arrows[color].row;
        newCol = arrows[color].col;

        var cellColor = getLightColor(color);
        $(".cell").css("background-color", cellColor);
    } else {
        arrows[color].row = newRow;
        arrows[color].col = newCol;
    }

    var arrowId = getArrowId(color);
    $("#" + arrowId).remove();

    var cellId = getCellId(newRow, newCol);
    var imgTag = getImgTag(color, direction);

    $(cellId).append(imgTag);

}

function keydown(event) {

    if (gameOver) {
        return;
    }

    // diable browser scrolling on arrow keys
    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    var direction;
    var color;

    var char = String.fromCharCode(event.which)

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

