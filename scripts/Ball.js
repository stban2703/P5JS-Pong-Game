class Ball {
    constructor(posX, posY, radius, speedX, speedY, maxSpeed) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.maxSpeed = maxSpeed;
        this.directionX = 1;
        this.directionY = 1;
    }

    paint() {
        fill(255);
        ellipse(this.posX, this.posY, this.radius * 2, this.radius * 2)
    }

    move(upLimit, downLimit, pOne, pTwo) {
        this.posX += this.speedX * this.directionX;
        this.posY += this.speedY * this.directionY;

        if (this.posY < upLimit) {
            this.posY = upLimit;
            this.directionY *= -1;
        }

        if (this.posY > downLimit) {
            this.posY = downLimit
            this.directionY *= -1;
        }

        // Bounce player 1
        if (this.posX < pOne.posX + pOne.width &&
            this.posX > pOne.posX &&
            this.posY > pOne.posY &&
            this.posY < pOne.posY + pOne.height) {

            this.posX = pOne.posX + pOne.width + this.radius;
            this.directionX *= -1;
        }

        // Bounce player 2
        if (this.posX > pTwo.posX &&
            this.posX < pTwo.posX + pTwo.width &&
            this.posY > pTwo.posY &&
            this.posY < pTwo.posY + pTwo.height) {

            this.posX = pTwo.posX - this.radius;
            this.directionX *= -1;
        }
    }
}