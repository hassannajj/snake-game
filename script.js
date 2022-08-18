window.addEventListener('resize', () => console.log("resized!"));

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