var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,2,1,1,1,1,1,1,1,2,1,1,1,2],
    [2,1,1,2,1,2,2,2,1,1,1,2,1,2,1,2],
    [2,1,1,2,1,2,1,2,3,1,1,2,1,2,1,2],
    [2,1,1,2,2,2,1,2,1,1,1,2,3,2,1,2],
    [2,1,1,3,1,1,1,2,1,1,1,2,1,2,1,2],
    [2,1,1,1,3,1,1,2,1,1,1,2,1,2,1,2],
    [2,2,2,2,1,1,1,1,1,1,1,2,2,2,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,2,1,2,1,1,1,1,2,1,1,1,1,2],
    [2,1,3,2,1,2,1,1,1,1,2,3,1,1,1,2],
    [2,1,1,2,2,2,1,1,2,2,2,2,2,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,2,1,3,1,1,2],
    [2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

var pacman = {
    x: 1,
    y: 1,
    direction: "right",
}

var ghost = {
    x: 8,
    y: 8,
}

var score = 0;
var isEnd = false;

function displayWorld() {
    var output = "";
    for (var i = 0; i < world.length; i++) {
        output += "\n<div class='row'>\n"
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 2){
                output += "<div class='brick'></div>";
            } else if (world[i][j] == 1) {
                output += "<div class='coin'></div>";
            } else if (world[i][j] == 0) {
                output += "<div class='empty'></div>";
            } else if (world[i][j] == 3) {
                output += "<div class='cherry'></div>";
            } else if (world[i][j] == 4) {
                output += "<div class='ghost'></div>";
            }
        }
        output += "\n</div>";
    }
    document.getElementById("world").innerHTML = output;
}
displayWorld();
displayPacman();
displayScore();
displayGhost();

function displayPacman() {
    var rotateDeg = "";
    var pacmanElem = document.getElementById("pacman");
    pacmanElem.style.top = pacman.y * 20 + "px";
    pacmanElem.style.left = pacman.x * 20 + "px";
    if (pacman.direction === "left") {
        rotateDeg = "rotate(180deg)";
    } else if (pacman.direction === "up") {
        rotateDeg = "rotate(270deg)";
    } else if (pacman.direction === "down") {
        rotateDeg = "rotate(90deg)";
    } else {
        rotateDeg = "rotate(0deg)";
    }
    // console.log("pacman.direction =", pacman.direction);
    // console.log("rotateDeg = ", rotateDeg);
    pacmanElem.style.transform = rotateDeg;
}

function displayScore() {
    document.getElementById("score").innerHTML = score;
}

function displayGhost() {
    var ghostElem = document.getElementById("ghost");
    ghostElem.style.top = ghost.y * 20 + "px";
    ghostElem.style.left = ghost.x * 20 + "px";
}

function moveGhost() {
    // set random direction for ghost
    var direction = Math.floor(Math.random * 4);
    console.log("ghost-direction = ", direction);
    if (direction == 0) { // left

    }
}

function canMove(currentX, currentY, direction) {
    if (direction === "left") {
        return (currentX - 1 >= 0 && world[currentY][currentX] != 2);
    } else if (direction === "right") {
        return (currentX + 1 < world[0].length && world[currentY][currentX + 1] != 2);
    } else if (direction === "up") {
        return (currentY + 1 < world.length && world[currentY + 1][currentX] != 2);
    } else if (direction === "down") {
        return (currentY + 1 < world.length && world[currentY + 1][currentX] != 2);
    } else {
        return false;
    }
}

document.onkeydown = function(e) {
    console.log("isEnd = ", isEnd);
    if (isEnd == true) return;
    console.log(e.keyCode);
    if (e.keyCode == 37) { // Left key
        if (canMove(pacman.x, pacman.y, "left")) {
            pacman.x--;
        }
        pacman.direction = "left";
    } else if (e.keyCode == 39) { // Right key
        if (canMove(pacman.x, pacman.y, "right")) {
            pacman.x++;
        }
        pacman.direction = "right";
    } else if (e.keyCode == 38) { // Up key
        if (canMove(pacman.x, pacman.y, "up")) {
            pacman.y--;
        }
        pacman.direction = "up";
    } else if (e.keyCode == 40) { // Down key
        if (canMove(pacman.x, pacman.y, "down")) {
            pacman.y++;
        }
        pacman.direction = "down";
    }
    if (pacman.x == ghost.x && pacman.y == ghost.y) {
        // End the game
        document.getElementById("theend").style.display = "block";
        isEnd = true;
        score = 0;
    } else if (world[pacman.y][pacman.x] == 1 || world[pacman.y][pacman.x] == 3) {
        if (world[pacman.y][pacman.x] == 1) {
            score += 10;
        } else {
            score += 50;
        }
        world[pacman.y][pacman.x] = 0;
    }
    displayWorld();
    displayScore();
    displayPacman();
}