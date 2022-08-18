
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


function createGrid() {
    var content = document.getElementById('content');
    rows = Math.floor(screen.width / 20);
    columns = Math.floor(screen.height / 20);
}

let rows = 0;
let columns = 0;
createGrid();

window.addEventListener('resize', () => 
{
    createGrid();
    console.log("rows -> ", rows);
    console.log("columns -> ", columns);

});
