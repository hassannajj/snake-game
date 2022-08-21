// create an event loop that repeats every amount of time (depending on the difficulty)
// in order to move the snake


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
            
        }
    }

    selectDiv() {
        this.headDiv = document.getElementById(`${this.headX}-${this.headY}`);
    }

    draw() {
        this.selectDiv();
        this.headDiv.style.backgroundColor = 'white';
    }

    update() {
        this.selectDiv();

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
    }
        
        // detect collisions with wall / food
        // detect food
    

}

function reset() {
    // deletes all the divs
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


createGrid();
randomizeFood();
drawFood();

let snake = new Snake();
snake.draw();
////


function updateGame() {
    createGrid();
    drawFood();
    snake.update();
    snake.draw();
    console.log(snake.currDirection);
}

function startGame() {
    setInterval(() => updateGame(), 150); // set time based on difficulty
}



window.addEventListener('resize', () => 
{
    createGrid();
    randomizeFood();
    drawFood();
    snake.draw();

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

