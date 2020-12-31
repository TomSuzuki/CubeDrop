import Game from "./game.js";

window.addEventListener('load', function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let game = new Game(ctx);
})
