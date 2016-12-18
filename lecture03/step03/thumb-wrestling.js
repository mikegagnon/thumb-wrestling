
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
    var cellTag = "<div class='cell'></div>"
    $(boardId).append(cellTag);
}