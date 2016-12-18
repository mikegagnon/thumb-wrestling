var numRows = 10;
var numCols = 10;

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

    alert(color + " " + direction);
}

document.onkeydown = keydown;

function createThumbWrestling(boardId) {

    var row = 0;
    var rowId = "row-" + row;
    var rowTag = "<div id='" + rowId + "' class='row'></div>"

    $(boardId).append(rowTag);

    for (var col = 0; col < numCols; col++) {
        var cellId = "cell-" + row + "-" + col;
        var cellTag = "<div id='" + cellId + "' class='cell'></div>";
        $("#" + rowId).append(cellTag);
    }
}
