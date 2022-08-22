class Snake {
    constructor() {
        this.headX = 1;
        this.headY = 1;
        this.currDirection = '';
        this.body = [[this.headX, this.headY]];
    }

    reset() {
        this.headX = 1;
        this.headY = 1;
        this.currDirection = '';
        this.body = [[this.headX, this.headY]];


    }

    moveUp() {
        this.headY -= 1;
    }
    moveDown() {
        this.headY += 1;
    }
    moveLeft() {
        this.headX -= 1;
    }
    moveRight() {
        this.headX += 1;
    }  

    grow(amount) {
        for (let i=0; i<amount; i++) {
            // this pushes the current location of the food to the tail of the snake
            this.body.push([this.headX, this.headY]);
        }
    }

    moveTail() {
        for (let i=(this.body.length - 1); i>0; i--) {
            this.body[i] = this.body[i-1];
        }
    };
    
    moveHead() {
        this.body[0] = [this.headX, this.headY];
    }

    coordinatesInGrid(x, y) {
        return (x >= 0 && x < columns && y >= 0 && y < rows);
    }

    selectAndDrawDivs() {
        for (let i=0; i<this.body.length; i++) {
            if (this.coordinatesInGrid(this.body[i][0], this.body[i][1])) {
                let snakeBlock = document.getElementById(`${this.body[i][0]}-${this.body[i][1]}`)
                snakeBlock.style.cssText = "box-shadow:0px 0px 0px 1px black;"
                snakeBlock.style.backgroundColor = 'grey';

            }

        }
    }

    update() {
        this.selectAndDrawDivs();

        if (this.currDirection == 'up') {
            this.moveUp();
        } 
        else if (this.currDirection == 'down') {
            this.moveDown();
        }
        else if (this.currDirection == 'left') {
            this.moveLeft();
        }
        else if (this.currDirection == 'right') {
            this.moveRight();
        }
        this.moveTail();
        this.moveHead();
    }    

}