# Thumb Wrestling
A JavaScript project walk-through for novice programmers.

In this project you will make a game called Thumb Wrestling. [Check it out](https://mikegagnon.github.io/thumb-wrestling/).

## Prerequisites

This project assumes you have completed [Becoming dangerous in JS + HTML + CSS](https://github.com/mikegagnon/lights-out/blob/master/README.md).

# Contents

- [PART 1. JAVASCRIPT](#part1)
  - [Lecture 1. Initial setup](#lec1)
  - [Lecture 2. Detecting key presses](#lec2)


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
