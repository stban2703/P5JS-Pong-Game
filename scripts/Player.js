class Player {
    constructor(posX, posY, width, height, speed, score) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.score = score;
    }

    paint() {
        fill(255)
        rectMode(CORNER);
        rect(this.posX, this.posY, this.width, this.height);
    }

    paintScore(posX, posY, size) {
        textAlign(CENTER, TOP);
        textSize(size);
        text(this.score, posX, posY);
    }

    move(moveUp, moveDown, upLimit, downLimit) {
        if(keyIsDown(moveUp) && (this.posY > upLimit)) {
            this.posY -= this.speed;
        }
        
        if(keyIsDown(moveDown) && ((this.posY + this.height) < downLimit)) {
            this.posY += this.speed;
        }
    }

    setPosX(posX) {
        this.posX = posX;
    }

    setPosY(posY) {
        this.posY = posY;
    }
    
}