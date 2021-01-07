class Button {
    constructor(posX, posY, width, height, text) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.text = text;
    }

    paint() {
        fill(255);
        rectMode(CENTER);
        rect(this.posX, this.posY, this.width, this.height);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(this.height - 15);
        text(this.text, this.posX, this.posY + 1);
    }
}