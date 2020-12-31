
export default class Game {
    canvas = null;
    interval = null;
    score = 0;

    // constructor
    constructor(ctx) {
        this.ctx = ctx;

        this.loop();
    }

    // main
    loop(time = 0) {

        // display
        this.display();

        // loop -> setInterval?
        setTimeout(() => { this.loop(time++); }, 1000 / 30);
    }

    // display
    display() {
        // display background grid
        this.fill(255, 255, 255);
        this.rect();
        this.stroke(200, 200, 200);
        for (let x = 1; x < 4; x++) this.line(x * 80, 0, x * 80, 640);
        for (let y = 1; y < 8; y++) this.line(0, y * 80, 320, y * 80);
    }

    // rect
    rect(x = 0, y = 0, w = 320, h = 640) {
        this.ctx.fillRect(x, y, w, h);
    }

    // line
    line(x1 = 320, y1 = 640, x2 = 0, y2 = 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    // color
    fill(r = 0, g = 0, b = 0, a = 1) {
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    // color
    stroke(r = 0, g = 0, b = 0, a = 1) {
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}
