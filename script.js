// Advanced Settings




document.addEventListener('keydown', (e) => {
    if (e.key == "w" || e.key == 'ArrowUp') {
        console.log("up");
    }
    if (e.key == "s" || e.key == 'ArrowDown') {
        console.log("down");
    }
    if (e.key == "a" || e.key == 'ArrowLeft') {
        console.log("left");
    }
    if (e.key == "d" || e.key == 'ArrowRight') {
        console.log("right");
    }
})

function reset() {
    // deletes all the divs
    let squares = content.querySelectorAll('div');
    squares.forEach((div) => div.remove());
}

function placeFood() {
    // Creates and places food in a random square on the grid
    let foodX = Math.floor(Math.random() * columns);
    let foodY = Math.floor(Math.random() * rows);

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

let rows = 0;
let columns = 0;
let content = document.getElementById('content');

createGrid();
placeFood();

window.addEventListener('resize', () => 
{
    createGrid();
    placeFood();


});
