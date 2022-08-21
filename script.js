// create an event loop that repeats every amount of time (depending on the difficulty)
// in order to move the snake


/// MOVE SNAKE TO ANOTHER FILE !!!!!

class Snake {
    constructor() {
        this.headX = 1;
        this.headY = 1;
        this.headDiv = document.getElementById('1-1');
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
        console.log(this.body);
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
                snakeBlock.style.backgroundColor = 'white';
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

function reset() {
    // deletes all the grid divs
    let squares = content.querySelectorAll('div');
    squares.forEach((div) => div.remove());
}

function randomizeFood() {
    // Selects a location on the grid for the food
    foodX = Math.floor(Math.random() * columns);
    foodY = Math.floor(Math.random() * rows);
}

function drawFood() {
    let foodDiv = document.getElementById(`${foodX}-${foodY}`);
    foodDiv.style.backgroundColor = 'red';

}

function placeFood() {
    randomizeFood();
    drawFood();
}

function foodCollide() {
    if (snake.headX == foodX && snake.headY == foodY) {
        snake.grow(1);
        placeFood();
    }
}

function wallCollide() {
    // Once the snake hits a wall, it teleports to the other side
    if (snake.headX < 0 ) {
        snake.headX = (columns - 1);
    }
    else if (snake.headX > (columns - 1)) {
        snake.headX = 0;
    }
    else if (snake.headY < 0 ) {
        snake.headY = (rows - 1);
    }
    else if (snake.headY > (rows - 1)) {
        snake.headY = 0;
    }
}



function selfCollide() {
    for (let i=1; i<snake.body.length - 1; i++) {
        if (snake.body[i][0] == snake.headX && snake.body[i][1] == snake.headY) {
            loseScreen();
        }
    }

}

function checkCollisions() {
    wallCollide();
    foodCollide();
    selfCollide();
}

function loseScreen() {
    clearInterval(intervalId);
}


function createGrid() {
    reset();  // change the name of this function maybe

    // Put this 12 on the advanced settings js / json / txtfile
    columns = Math.floor(content.offsetWidth/12);
    rows = Math.floor(content.offsetHeight/12);

    content.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    content.style.gridTemplateRows = `repeat(${rows}, 1fr)`;;

    for (let i=0; i<rows; i++) {
        for (let j=0; j<columns; j++) {
            let square = document.createElement('div');
            square.className = 'square';
            square.id = `${j}-${i}`;
            content.appendChild(square);
        }
    }
}

////
let rows = 0;
let columns = 0;
let content = document.getElementById('content');
let run = false;
let foodX = 0;
let foodY = 0;
let intervalId = 0;


createGrid();
placeFood();

let snake = new Snake();
snake.selectAndDrawDivs();
////


function updateGame() {
    createGrid();
    drawFood();
    checkCollisions();
    snake.selectAndDrawDivs();
    snake.update();
}

function startGame() {
    //setInterval(() => updateGame(), 50); // set time based on difficulty
    intervalId = setInterval(updateGame, 50); // set time based on difficult
}

window.addEventListener('resize', () => 
{
    createGrid();
    placeFood();
    snake.selectAndDrawDivs();

});

document.addEventListener('keydown', (e) => {
    if (!run) {
        startGame();
        run = true;
    }
    if (e.key == "w" || e.key == 'ArrowUp') {
        snake.currDirection = 'up';
    }
    else if (e.key == "s" || e.key == 'ArrowDown') {
        snake.currDirection = 'down';
    }
    else if (e.key == "a" || e.key == 'ArrowLeft') {
        snake.currDirection = 'left';
    }
    else if (e.key == "d" || e.key == 'ArrowRight') {
        snake.currDirection = 'right';
    }
})

