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
    let squares = content.querySelectorAll('div');
    squares.forEach((div) => div.remove());
}


function createGrid() {
    // Have to reset back to the origin using resetGame()
    reset();

    columns = Math.floor(content.offsetWidth/12);
    rows = Math.floor(content.offsetHeight/12);
    console.log(rows, columns);

    content.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    content.style.gridTemplateRows = `repeat(${rows}, 1fr)`;;

    let amount = columns * rows;
    for (let i=0; i<amount; i++) {
        let square = document.createElement('div');
        square.className = 'square';
        content.appendChild(square);
    }
    
}

function setContentSize() {
    //content.style.width = '500px';
    //content.style.height = '500px';
}

let rows = 0;
let columns = 0;
let content = document.getElementById('content');

setContentSize();
createGrid();

window.addEventListener('resize', () => 
{
    createGrid();
    console.log("rows -> ", rows);
    console.log("columns -> ", columns);

});
