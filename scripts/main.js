let screen;
let screenWidth;
let screenHeight;
let playerOne;
let playerTwo;
let ball;
let isPlaying;
let isFinished;
let winningScore;

function setup() {
    screen = 0;
    screenWidth = 1000;
    screenHeight = 600;
    createCanvas(screenWidth, screenHeight);

    playerOne = new Player(0, 0, 30, 150, 5, 0);
    playerOne.setPosX(50)
    playerOne.setPosY((screenHeight / 2) - (playerOne.height / 2));

    playerTwo = new Player(0, 0, 30, 150, 5, 0);
    playerTwo.setPosX(screenWidth - 50 - playerTwo.width)
    playerTwo.setPosY((screenHeight / 2) - (playerOne.height / 2));

    ball = new Ball(screenWidth / 2, screenHeight / 2, 10, 5, 5, 12);

    resetBallPos(playerOne.posX + playerOne.width + 50);
    isPlaying = false;
    isFinished = false;
    winningScore = 7;
}

function draw() {
    background(0);
    stroke(255);
    line(screenWidth / 2, 0, screenWidth / 2, screenHeight);

    playerOne.paint();
    playerOne.paintScore(screenWidth / 2 - 30, 10, 50);

    playerTwo.paint();
    playerTwo.paintScore(screenWidth / 2 + 30, 10, 50);

    if (!isFinished) {
        playerOne.move(87, 83, 0, screenHeight);
        playerTwo.move(UP_ARROW, DOWN_ARROW, 0, screenHeight);
    }

    ball.paint();

    if (isPlaying && !isFinished) {
        ball.move(ball.radius, screenHeight - ball.radius, playerOne, playerTwo);
    }

    setScore();

    // Game over
    if (playerOne.score == winningScore || playerTwo.score == winningScore) {
        isFinished = true;

        let winner = 0;

        if (playerOne.score == winningScore) {
            winner = 1;
        }

        if (playerTwo.score == winningScore) {
            winner = 2;
        }

        fill(0);
        stroke(0);
        rectMode(CENTER);
        rect(screenWidth / 2, screenHeight / 2, 200, 50)

        fill(255);
        textAlign(CENTER, CENTER)
        textSize(30);
        text("¡Jugador " + winner + " gana!", screenWidth / 2, height / 2);

    }
}

function keyPressed() {
    if (keyCode === 32) {
        isPlaying = true;
    }
}

function setScore() {
    if (ball.posX < 0 && isPlaying) {
        playerTwo.score++;
        setDifficulty();
        resetPlayerPos();
        resetBallPos(playerOne.posX + playerOne.width + 50);
        isPlaying = false;
        ball.directionX *= -1;
    }

    if (ball.posX > screenWidth && isPlaying) {
        playerOne.score++;
        setDifficulty();
        resetPlayerPos();
        resetBallPos(playerTwo.posX - 50);
        isPlaying = false;
        ball.directionX *= -1;
    }
}

function resetBallPos(posX) {
    ball.posX = posX
    ball.posY = screenHeight / 2;
}

function resetPlayerPos() {
    playerOne.setPosY((screenHeight / 2) - (playerOne.height / 2));
    playerTwo.setPosY((screenHeight / 2) - (playerOne.height / 2));
}

function setDifficulty() {
    if (ball.speedX < ball.maxSpeed) {
        ball.speedX++;
    }
}
