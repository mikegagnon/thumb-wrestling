# Thumb Wrestling
A JavaScript project walk-through for novice programmers.

In this project you will make a game called Thumb Wrestling. [Check it out](https://mikegagnon.github.io/thumb-wrestling/).

## Prerequisites

This project assumes you have completed [Becoming dangerous in JS + HTML + CSS](https://github.com/mikegagnon/lights-out/blob/master/README.md).

# Contents

- [PART 1. JAVASCRIPT](#part1)
  - [Lecture 1. Initial setup](#lec1)
  - [Lecture 2. Detecting key presses](#lec2)
  - [Lecture 3. Creating the board](#lec3)
  - [Lecture 4. Arrows](#lec4)
- [PART 2. CHALLENGES](#part2)
  - [Challenge 1. Movement](#c1)

# <a name="part1">PART 1. JAVASCRIPT</a>

You will need to learn some new JavaScript to make this game.
This part of the project teaches you this new JS.

## <a name="lec1">Lecture 1. Initial Setup</a>

In the same directory, create four files `index.html`, `style.css`, `jquery.js`, `thumb-wrestling.js`, as so:

### `index.html`

```html
<!DOCTYPE html>
<html>
<head>
  <title>Thumb Wrestling</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="jquery.js"></script>
  <script src="thumb-wrestling.js"></script>
</head>
  <body>
  </body>
</html>
```

### `style.css`

Just create and save a blank file for now.

### `jquery.js`

Download jQuery from [here](https://code.jquery.com/jquery-3.1.1.js),
rename the file to jquery.js, and put it in the same folder with `index.html`, `style.css`, etc.

### `thumb-wrestling.js`

Just create and save a blank file for now.

### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture01/index.html)

It's just a blank page.

## <a name="lec2">Lecture 2. Detecting key presses</a>

In this game, players move their arrows by pressing keys on the keyboard.
Therefore, you need to write JavaScript that detects whenever a key is pressed.

### Step 1. Detecting a keypress

In `thumb-wrestling.js`, write a function called `keydown(event)`:

```js
function keydown(event) {
  alert("A key was pressed");
}
```

The function doesn't need to be named `keydown`; you can name it whatever you want.

Then you "register" the `keydown(...)` function with `document.onkeydown`, as so:

```js
document.onkeydown = keydown;
```

Now, whenever someone presses a key, the `keydown (...)` function will be called,
and an alert will pop up.

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture02/step01/index.html)

Press some keys.

### Step 2. Figuring out which key was pressed

When the browser calls the `keydown` function, it passes it an `event` object.

`event.keyCode` indicates which key was pressed. For example:

- If `event.keyCode == 38`, then that means the up key was pressed
- If `event.keyCode == 87`, then that means the W key was pressed

We are only interested in detecting (1) keypresses for the arrow keys (for the red player),
and (2) keypresses for W, A, S, D (for the green player).

Here's a table that shows the keyCode values associated with every key we're interesetd in.

| `keyCode` | Key     |
| --------- | ------- |
| 87        | W       |
| 83        | S       |
| 65        | A       |
| 68        | D       |
| 38        | `up`    |
| 40        | `down`  |
| 37        | `left`  |
| 39        | `right` |

Using the above table, we create a new function `getPlayerMovment(keyCode)`:

```js
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
```

Here's what the function does:

- If the keyCode is for a key we're uninterested in, it returns `undefined`
- Otherwise (if the keyCode is associated with a player), return the color of the keyCode's player and the direction associated with that keyCode

Then, modify the `keydown(...)` function:

```js
function keydown(event) {

    var playerMovement = getPlayerMovment(event.keyCode);

    // If the user pressed a key we're uninterested in
    if (playerMovement == undefined) {
        return;
    }

    var [color, direction] = playerMovement;

    alert(color + " " + direction);
}
```

The code is straightforward: if the user presses one of the player's keys it pops up an alert saying the player color and the direction.

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture02/step02/index.html)

Press some keys, including the arrow keys and w, a, s, d. 

### Step 3. Disable browser scrolling

By default, the browser scrolls when an arrow key is pressed.

We want to disable this default behavior, since we don't want the web page to
scroll when the red player presses an arrow key.

To accomplish this feat we modify the `keydown(...)` function, by adding the
following code:

```js
// disable browser scrolling on arrow keys
if (color == "red") {
    event.preventDefault();
}
```

The new `keydown(...)` function looks like this:

```js
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
```

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture02/step03/index.html)

Press some keys, including the arrow keys and w, a, s, d. 

## <a name="lec3">Lecture 3. Creating the board</a>

Recall, in the [Lights Out](https://github.com/mikegagnon/lights-out)
game there was a 4 &times; 4 grid of lights. The HTML to produce this grid
was tedious and repetitive:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Lights Out</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="lights-out.js"></script>
    <script src="jquery.js"></script>
  </head>
  <body>
  <div class="row">
    <div class="light" id="light-0-0" onclick="lightClick(0, 0)"></div>
    <div class="light" id="light-0-1" onclick="lightClick(0, 1)"></div>
    <div class="light" id="light-0-2" onclick="lightClick(0, 2)"></div>
    <div class="light" id="light-0-3" onclick="lightClick(0, 3)"></div>
  </div>
  <div class="row">
    <div class="light" id="light-1-0" onclick="lightClick(1, 0)"></div>
    <div class="light" id="light-1-1" onclick="lightClick(1, 1)"></div>
    <div class="light" id="light-1-2" onclick="lightClick(1, 2)"></div>
    <div class="light" id="light-1-3" onclick="lightClick(1, 3)"></div>
  </div>
  <div class="row">
    <div class="light" id="light-2-0" onclick="lightClick(2, 0)"></div>
    <div class="light" id="light-2-1" onclick="lightClick(2, 1)"></div>
    <div class="light" id="light-2-2" onclick="lightClick(2, 2)"></div>
    <div class="light" id="light-2-3" onclick="lightClick(2, 3)"></div>
  </div>
  <div class="row">
    <div class="light" id="light-3-0" onclick="lightClick(3, 0)"></div>
    <div class="light" id="light-3-1" onclick="lightClick(3, 1)"></div>
    <div class="light" id="light-3-2" onclick="lightClick(3, 2)"></div>
    <div class="light" id="light-3-3" onclick="lightClick(3, 3)"></div>
  </div>
  </body>
</html>
```

In this game, there is a 10 &times; 10 grid of cells.
It would be even more tedious and repetitive to hand write the HTML
for 100 cells.

To avoid such tedium, and to be more elegant,
we will write a short bit of code that
will produce the HTML for the grid of cells.

### Step 1. CSS

But first, let's write the CSS for the cell elements:

#### `style.css`

```
.row {
    clear: left;
}

.cell {
    height: 50px;
    width: 50px;
    margin-left: 1px;
    margin-top: 1px;
    float: left; 
    background-color: lightgray;
    line-height: 50px;
}
```

Notice, it is very similar to the Lights Out CSS.

### Step 2. `createThumbWrestling(...)`

Add `<div id="board"></div>` inside the `<body>` tag.

Then add the following `<script>` element after the `<body>` tag.

```html
<script type="text/javascript">
  createThumbWrestling("#board");
</script>
```

Finally, add the following function to `thumb-wrestling.js`:

```js
function createThumbWrestling(boardId) {
    $(boardId).text("Hello.");
}
```

Your `index.html` file should look like this:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Thumb Wrestling</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="jquery.js"></script>
  <script src="thumb-wrestling.js"></script>
</head>
  <body>
    <div id="board"></div>
  </body>
  <script type="text/javascript">
    createThumbWrestling("#board");
  </script>
</html>
```

Here's what's going on.

The `<div id="board"></div>` will contain the grid of cells (inside the `<div>`).

When the browser calls `createThumbWrestling("#board")` it executes `$(boardId).text("Hello.")`.
It first executes `$("#board")` which is a jQuery function that selects the `<div>` with `id`
equal to `board`. Then the `.text("Hello")` function call appends `Hello` inside the 
`<div>` tag.

Therefore, the resultant HTML looks like this:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Thumb Wrestling</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="jquery.js"></script>
  <script src="thumb-wrestling.js"></script>
</head>
  <body>
    <div id="board">Hello.</div>
  </body>
  <script type="text/javascript">
    createThumbWrestling("#board");
  </script>
</html>
```

### Step 3. Adding a single cell

Now, we're going to modify the `createThumbWrestling(...)` function to add a single cell to the board (instead of saying Hello).

Modify `createThumbWrestling(...)` as so:

```js
function createThumbWrestling(boardId) {
    var cellTag = "<div class='cell'></div>"
    $(boardId).append(cellTag);
}
```

Now, the dynamically generated HTML will look like this:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Thumb Wrestling</title>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="jquery.js"></script>
  <script src="thumb-wrestling.js"></script>
</head>
  <body>
    <div id="board">
      <div class='cell'></div>
    </div>
  </body>
  <script type="tesxt/javascript">
    createThumbWrestling("#board");
  </script>
</html>
```

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture03/step03/index.html)

### Step 4. Adding a row of cells

In this step, we create a single row of cells.

But first, we need to define `numRows` and `numCols` at the top of `thumb-wrestling.js`:

```js
var numRows = 10;
var numCols = 10;
```

Now we can modify `createThumbWrestling(...)` as so:

```js
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
```

First we add a row `<div>` with `$(boardId).append(rowTag);`

Next we have for-loop that adds each of the cells with `$("#" + rowId).append(cellTag);`.

Observe that we select the board `<div>` by using `$(boardId)`,
yet we select the row `<div>` by using `$("#" + rowId)` (with a pound sign prefixing `rowId`).
You may wonder why we need to prefix `rowId` with a pound sign, but not `boardId`.
Here's what's up: every time we select an element using jQuery (i.e. `$(elementId)`), we must
prefix the `elementId` with a pound sign. Recall from `index.html` that we invoke
`createThumbWrestling(boardId)` with `boardId` equal to `"#board"` -- therefore we select
the board element simply with `$(boardId)` since the pound sign is already included in `boardId`.
On the other hand, the `rowId` variable is not prefixed with a pound sign -- therefore
we must select the row element with `$("#" + rowId)`.

Now, the dynamically generated HTML will look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Thumb Wrestling</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="jquery.js"></script>
    <script src="thumb-wrestling.js"></script>
  </head>
  <body>
    <div id="board">
      <div id="row-0" class="row">
        <div id="cell-0-0" class="cell"></div>
        <div id="cell-0-1" class="cell"></div>
        <div id="cell-0-2" class="cell"></div>
        <div id="cell-0-3" class="cell"></div>
        <div id="cell-0-4" class="cell"></div>
        <div id="cell-0-5" class="cell"></div>
        <div id="cell-0-6" class="cell"></div>
        <div id="cell-0-7" class="cell"></div>
        <div id="cell-0-8" class="cell"></div>
        <div id="cell-0-9" class="cell"></div>
      </div>
    </div>
  </body>
  <script type="text/javascript">
    createThumbWrestling("#board");
  </script>
</html>
```

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture03/step04/index.html)

### Step 5. Build the full grid

Simply add a another for loop to iterate over the rows:

```js
function createThumbWrestling(boardId) {

    for (var row = 0; row < numRows; row++) {
        var rowId = "row-" + row;
        var rowTag = "<div id='" + rowId + "' class='row'></div>"

        $(boardId).append(rowTag);

        for (var col = 0; col < numCols; col++) {
            var cellId = "cell-" + row + "-" + col;
            var cellTag = "<div id='" + cellId + "' class='cell'></div>";
            $("#" + rowId).append(cellTag);
        }
    }
}
```

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture03/step05/index.html)

## <a name="lec4">Lecture 4. Arrows</a>

In this lecture, we add arrows to the game board.

### Step 1. Game state

Recall in the Lights Out game, we [stored the game state in a matrix](https://github.com/mikegagnon/lights-out#c1h2).

A matrix isn't suitable for storing the game state in Thumb Wrestling, since we only need to keep track of
two items: a red arrow, and a green arrow.

We'll use the following data structure to keep track of the red and green arrows:

```js
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
```

Type in that code at the top of `thumb-wrestling.js`, just below the definitions for `numRows` and `numCols`.

Now, we can access the `gameState` like so:

```js
gameState["red"].row
gameState["green"].dir

// etc.
```

This data structure is convenient, as we'll see later.

### Step 2. Drawing arrows

First download these image files into your Thumb Wrestling directory:

- [red-arrow.png](https://raw.githubusercontent.com/mikegagnon/thumb-wrestling/master/red-arrow.png)
- [green-arrow.png](https://raw.githubusercontent.com/mikegagnon/thumb-wrestling/master/green-arrow.png)

Then define the following function:

```js
function drawArrow(color) {
    var row = gameState[color].row;
    var col = gameState[color].col;

    var cellId = "#cell-" + row + "-" + col;
    var arrowId = color + "-arrow";

    var src = color + "-arrow.png";
    var imgTag = "<img id='" + arrowId + "' src='" + src + "''>";

    $(cellId).append(imgTag);
}
```

This may be the first time you have seen the HTML `<img>` tag. If so, look it up on Google.

Assuming you are familiar with `<img>`, the functionality and operation of `drawArrow(...)` should be clear to you.

Invoke the `drawArrow(...)` function inside the `createThumbWrestling(...)` function:

```js
function createThumbWrestling(boardId) {

    for (var row = 0; row < numRows; row++) {
        var rowId = "row-" + row;
        var rowTag = "<div id='" + rowId + "' class='row'></div>"

        $(boardId).append(rowTag);

        for (var col = 0; col < numCols; col++) {
            var cellId = "cell-" + row + "-" + col;
            var cellTag = "<div id='" + cellId + "' class='cell'></div>";
            $("#" + rowId).append(cellTag);
        }
    }

    drawArrow("red");   // <----------------------------
    drawArrow("green"); // <----------------------------
}
```

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture04/step02/index.html)

Notice that both arrows point to the right, even though the green arrow points to the left (according to `gameState`).
It should be clear to you why both arrows point to the right.

Soon, we will make the arrows point in the directions according to `gameState`. 

### Step 3. A dash of refactoring

Notice we have code that computes `cellId` twice: once in `drawArrow(...)` and once in `createThumbWrestling(...)`:

```js
function drawArrow(color) {
    var row = gameState[color].row;
    var col = gameState[color].col;

    var cellId = "#cell-" + row + "-" + col; // <----------------------------------------------
    var arrowId = color + "-arrow";

    var src = color + "-arrow.png";
    var imgTag = "<img id='" + arrowId + "' src='" + src + "''>";

    $(cellId).append(imgTag);
}

function createThumbWrestling(boardId) {

    for (var row = 0; row < numRows; row++) {
        var rowId = "row-" + row;
        var rowTag = "<div id='" + rowId + "' class='row'></div>"

        $(boardId).append(rowTag);

        for (var col = 0; col < numCols; col++) {
            var cellId = "cell-" + row + "-" + col; // <----------------------------------------------
            var cellTag = "<div id='" + cellId + "' class='cell'></div>";
            $("#" + rowId).append(cellTag);
        }
    }

    drawArrow("red");
    drawArrow("green");
}
```

We want to avoid code duplication, so we hoist out these computations for `cellId` into a new function:

```js
function getCellId(row, col) {
    return "cell-" + row + "-" + col;
}
```

Then we modify `drawArrow(...)` and `createThumbWrestling(...)` to invoke our new function:

```js
function drawArrow(color) {
    var row = gameState[color].row;
    var col = gameState[color].col;

    var cellId = "#" + getCellId(row, col); // <----------------------------------------------
    var arrowId = color + "-arrow";

    var src = color + "-arrow.png";
    var imgTag = "<img id='" + arrowId + "' src='" + src + "''>";

    $(cellId).append(imgTag);
}

function createThumbWrestling(boardId) {

    for (var row = 0; row < numRows; row++) {
        var rowId = "row-" + row;
        var rowTag = "<div id='" + rowId + "' class='row'></div>"

        $(boardId).append(rowTag);

        for (var col = 0; col < numCols; col++) {
            var cellId = getCellId(row, col); // <----------------------------------------------
            var cellTag = "<div id='" + cellId + "' class='cell'></div>";
            $("#" + rowId).append(cellTag);
        }
    }

    drawArrow("red");
    drawArrow("green");
}
```

### Step 4. Arrows point the correct direction

We want each arrow to point in the correct direction (i.e. the graphical representation of each arrow should match
`gameState[color].dir`).

First, we need to add the following CSS into `style.css`:

```css
.right {
    transform: rotate(0deg);
}

.down {
    transform: rotate(90deg);
}

.left {
    transform: rotate(180deg);
}

.up {
    transform: rotate(270deg);
}
```

Here's how it works: if an `<img>` tag has `class="down"`, then it's image will be rotated clockwise 90 degrees.
Since `red-arrow.png` and `green-arrow.png` point to the right, rotating 90 degrees causes the arrow to point down.

And so on for `0deg`, `180deg`, and `270deg`.

Then, we update `drawArrow(...)` to rotate arrows:

```js
function drawArrow(color) {
    var row = gameState[color].row;
    var col = gameState[color].col;
    var dir = gameState[color].dir; // <-------------------------------------------------------------------

    var cellId = "#" + getCellId(row, col);
    var arrowId = color + "-arrow";

    var src = color + "-arrow.png";
    var imgTag = "<img id='" + arrowId + "' src='" + src + "' class='" + dir + "'>"; // <-------------------

    $(cellId).append(imgTag);
}
```

#### See result

View [`index.html`](https://mikegagnon.github.io/thumb-wrestling/lecture04/step04/index.html)

# <a name="part2">PART 2. CHALLENGES</a>

## <a name="c1">Challenge 1. Movement</a>

Modify `thumb-wrestling.js` so that the appropriate arrows move across the board whenever a player presses a movement key (instead of popping up an `alert`).

You do not need to worry about the following cases:

- Going out of bounds
- Bumping into an opponent

But first, you need to learn a new jQuery method: `$("#" + elementId).remove();` removes the element with `id` equal to `elementId` from the HTML document. This will allow you to remove an arrow before redrawing it (otherwise, there would
be many duplicate arrows left on the board).
