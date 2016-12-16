
var numRows = 10;
var numCols = 10;
var gameOver = false;

var arrows = {
    red: {
        row: numRows / 2 - 1,
        col: numCols / 2 - 1,
        dir: "right"
    },
    green: {
        row: numRows / 2 - 1 ,
        col: numCols / 2,
        dir: "left"
    }
};

var colors = ["red", "green"];

document.onkeydown = keydown;

function getOppositeDirection(dir) {
    if (dir == "up") {
        return "down";
    } else if (dir == "down") {
        return "up";
    } else if (dir == "left") {
        return "right";
    } else if (dir == "right") {
        return "left";
    } 
}

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

    arrows[color].dir = direction;

    var [dr, dc] = drdc(direction);

    newRow = arrows[color].row + dr;
    newCol = arrows[color].col + dc;

    if (newRow < 0 ||
        newRow >= numRows ||
        newCol < 0 ||
        newCol >= numCols) {
        return;
    }

    var oppositeColor = getOppositeColor(color);

    var opponentRow = arrows[oppositeColor].row;
    var opponentCol = arrows[oppositeColor].col;
    var opponentDirection = arrows[oppositeColor].dir;

    var oppositeDirection = getOppositeDirection(direction);

    var collision = newRow == opponentRow && newCol == opponentCol;

    if (collision && opponentDirection != oppositeDirection) {

        gameOver = true;
        newRow = arrows[color].row;
        newCol = arrows[color].col;

        var cellColor = getLightColor(color);
        $(".cell").css("background-color", cellColor);
    } else if (collision) {
        return;
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

function getPlayerMovment(keyCode) {

    var keyCodeMap = {
        87: ["green", "up"],
        83: ["green", "down"],
        65: ["green", "left"],
        68: ["green", "right"],
        38: ["red", "up"],
        40: ["red", "down"],
        37: ["red", "left"],
        39: ["red", "right"]
    };

    return keyCodeMap[keyCode];
}

function keydown(event) {

    if (gameOver) {
        return;
    }

    var playerMovement = getPlayerMovment(event.keyCode);

    if (playerMovement == undefined) {
        return;
    }

    var [color, direction] = playerMovement;

    // diable browser scrolling on arrow keys
    if (color == "red") {
        event.preventDefault();
    }

    move(color, direction);
}

