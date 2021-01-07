let screen;
let screenWidth;
let screenHeight;
let playerOne;
let playerTwo;
let ball;
let isPlaying;
let isFinished;
let winningScore;
let startBtn;
let resetBtn;

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
    winningScore = 1;

    startBtn = new Button(screenWidth / 2, screenHeight - 100, 200, 50, "Start");
    resetBtn = new Button(screenWidth / 2, screenHeight / 2 + 100, 150, 40, "Rematch");
}

function draw() {

    background(0);

    switch (screen) {
        case 0:
            fill(255);
            textSize(80);
            textAlign(CENTER, CENTER);
            text("PONG", screenWidth / 2, 100);

            textSize(25);
            textAlign(LEFT, TOP);
            text("Player 1 controls: ", 240, 200);
            textSize(20);
            text("- Move up: W key", 240, 250);
            text("- Move down: S key", 240, 300);

            textSize(25);
            textAlign(LEFT, TOP);
            text("Player 2 controls: ", screenWidth - 440, 200);
            textSize(20);
            text("- Move up: Up arrow", screenWidth - 440, 250);
            text("- Move down: Down arrow", screenWidth - 440, 300);

            textSize(25);
            textAlign(CENTER, CENTER);
            text("Press spacebar to continue/resume game", screenWidth / 2, screenHeight - 200);
            startBtn.paint();

            if (mouseX > startBtn.posX - startBtn.width / 2 && mouseX < startBtn.posX + startBtn.width / 2 &&
                mouseY > startBtn.posY - startBtn.height / 2 && mouseY < startBtn.posY + startBtn.height / 2) {
                cursor(HAND);
            } else {
                cursor(ARROW);
            }
            break;

        case 1:
            cursor(ARROW);
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
                text("Player " + winner + " wins!", screenWidth / 2, height / 2);
                noStroke()
                resetBtn.paint();

                if (mouseX > resetBtn.posX - resetBtn.width / 2 && mouseX < resetBtn.posX + resetBtn.width / 2 &&
                    mouseY > resetBtn.posY - resetBtn.height / 2 && mouseY < resetBtn.posY + resetBtn.height / 2) {
                    cursor(HAND);
                } else {
                    cursor(ARROW);
                }
            }

            console.log(ball.posX);
            break;
    }
}

function keyPressed() {
    switch (screen) {
        case 1:
            if (keyCode === 32) {
                isPlaying = true;
            }
            break;
    }
}

function mousePressed() {
    switch (screen) {
        case 0:
            startGame();
            break;

        case 1:
            resetGame();
            break;
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

function startGame() {
    if (mouseX > startBtn.posX - startBtn.width / 2 && mouseX < startBtn.posX + startBtn.width / 2 &&
        mouseY > startBtn.posY - startBtn.height / 2 && mouseY < startBtn.posY + startBtn.height / 2) {
        screen = 1;
    }
}

function resetGame() {
    if (mouseX > resetBtn.posX - resetBtn.width / 2 && mouseX < resetBtn.posX + resetBtn.width / 2 &&
        mouseY > resetBtn.posY - resetBtn.height / 2 && mouseY < resetBtn.posY + resetBtn.height / 2) {
        resetAll(5);
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

function resetAll(ballSpeed) {
    playerOne.score = 0;
    playerTwo.score = 0;
    ball = new Ball(screenWidth / 2, screenHeight / 2, 10, 5, 5, 12);
    resetBallPos(playerOne.posX + playerOne.width + 50);
    resetPlayerPos();
    ball.speedX = ballSpeed;
    isFinished = false;
    isPlaying = false;
}
