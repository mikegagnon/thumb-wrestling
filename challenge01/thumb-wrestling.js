var numRows = 10;
var numCols = 10;

var gameState = {
    "red": {
        row: numRows / 2 - 1,
        col: numCols / 2 - 1,
        dir: "right"
    },
    "green": {
        row: numRows / 2 - 1 ,
        col: numCols / 2,
        dir: "left"
    }
};

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

    var playerMovement = getPlayerMovment(event.keyCode);

    // If the user pressed a key we're uninterested in
    if (playerMovement == undefined) {
        return;
    }

    var [color, direction] = playerMovement;

    // disable browser scrolling on arrow keys
    if (color == "red") {
        event.preventDefault();
    }

    move(color, direction);
}

// returns a 2-tuple [dr, dc], where:
//      dr == difference in row
//      dc == difference in column
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

    gameState[color].dir = direction;

    var [dr, dc] = drdc(direction);

    gameState[color].row += dr;
    gameState[color].col += dc;

    drawArrow(color);
}

document.onkeydown = keydown;

function getCellId(row, col) {
    return "cell-" + row + "-" + col;
}

function drawArrow(color) {
    var row = gameState[color].row;
    var col = gameState[color].col;
    var dir = gameState[color].dir;

    var cellId = "#" + getCellId(row, col);
    var arrowId = color + "-arrow";

    var src = color + "-arrow.png";
    var imgTag = "<img id='" + arrowId + "' src='" + src + "' class='" + dir + "'>";

    $("#" + arrowId).remove();
    $(cellId).append(imgTag);
}

function createThumbWrestling(boardId) {

    for (var row = 0; row < numRows; row++) {
        var rowId = "row-" + row;
        var rowTag = "<div id='" + rowId + "' class='row'></div>"

        $(boardId).append(rowTag);

        for (var col = 0; col < numCols; col++) {
            var cellId = getCellId(row, col);
            var cellTag = "<div id='" + cellId + "' class='cell'></div>";
            $("#" + rowId).append(cellTag);
        }
    }

    drawArrow("red");
    drawArrow("green");
}
