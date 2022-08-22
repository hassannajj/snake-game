// create an event loop that repeats every amount of time (depending on the difficulty)
// in order to move the snake


/// MOVE SNAKE TO ANOTHER FILE !!!!!

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

function resetGrid() {
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
        increaseScore();
        placeFood();
    }
}

function increaseScore() {
    let intScore = parseInt(score.innerText);
    intScore += 1;
    score.innerText = `${intScore}`;
}

function updateHighScore() {
    let intScore = parseInt(score.innerText);
    if (! localStorage['high-score']) {
        localStorage['high-score'] = intScore;
    } else if (intScore > localStorage['high-score']) {
        localStorage['high-score'] = intScore;
    }
    highScore.innerText = `${localStorage['high-score']}`;
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
    run = false;
    end = true;
    clearInterval(intervalId);
    let endScreen = document.createElement('div');
    endScreen.id = 'end-screen';
    content.appendChild(endScreen);
    endScreen.innerText = "You lost!"

    let retryButton = document.createElement('button');
    retryButton.id = 'retry';
    endScreen.appendChild(retryButton);
    retryButton.innerText = 'Retry';
    retryButton.onclick = resetGame;

    updateHighScore();
    
}


function createGrid() {
    resetGrid();  // change the name of this function maybe

    // Put this 12 on the advanced settings js / json / txtfile
    columns = Math.floor(content.offsetWidth/25);
    rows = Math.floor(content.offsetHeight/25);

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
let end = false;
let foodX = 0;
let foodY = 0;
let intervalId = 0;
let score = document.getElementById('current-score');
let highScore = document.getElementById('high-score');
updateHighScore();


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

function resetGame() {
    let endScreen = document.getElementById('end-screen');
    endScreen.remove();
    end = false;

    createGrid();
    placeFood();

    snake.reset();
    snake.update();

    score.innerText = '1';
}


function startGame() {
    intervalId = setInterval(updateGame, 75); // set time based on difficult
}

window.addEventListener('resize', () => 
{
    if (run) {
        createGrid();
        placeFood();
        snake.selectAndDrawDivs();
    }

});

document.addEventListener('keydown', (e) => {
    if (!run && !end) {
        startGame();
        run = true;
    }
    if ((e.key == "w" || e.key == 'ArrowUp') && (snake.currDirection != 'down' || snake.body.length == 1)) {
        snake.currDirection = 'up';
    }
    else if ((e.key == "s" || e.key == 'ArrowDown') && (snake.currDirection != 'up' || snake.body.length == 1)) {
        snake.currDirection = 'down';
    }
    else if ((e.key == "a" || e.key == 'ArrowLeft') && (snake.currDirection != 'right' || snake.body.length == 1)) {
        snake.currDirection = 'left';
    }
    else if ((e.key == "d" || e.key == 'ArrowRight') && (snake.currDirection != 'left' || snake.body.length == 1)) {
        snake.currDirection = 'right';
    }
})

