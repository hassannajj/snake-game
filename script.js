function changeMode(difficulty) {
    switch (difficulty.value) {
        case 'easy':
            difficultyTime = 75;
            break;
        case 'medium': 
            difficultyTime = 60;
            break;
        case 'hard':
            difficultyTime = 35;
            break;
        case 'insane':
            difficultyTime = 30;
            break;
    }
    loseScreen();
    resetGame();

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
    foodDiv.style.cssText = "box-shadow:0px 0px 0px 1px black;"
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

let difficultyTime = 75;


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
    console.log(difficultyTime);
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
    intervalId = setInterval(updateGame, difficultyTime); // set time based on difficult
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
