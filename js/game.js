import DropColor from "./setting.js";
import { random } from "./function.js";

export default class Game {
    canvas = null;
    interval = null;
    score = 0;
    isDropping = false;
    droppingColor = [0, 0];
    droppingX = 0;
    droppingY = 0;
    droppingTime = 0;
    stage = [[]];

    // constructor
    constructor(ctx) {
        this.ctx = ctx;
        this.dropColor = new DropColor();

        // init stage
        for (let x = 0; x < 4; x++) {
            this.stage[x] = new Array(8);
            for (let y = 0; y < 8; y++) this.stage[x][y] = -1;
        }

        this.loop();
    }

    // main
    loop(time = 0) {
        // new block
        if (!this.isDropping) this.newBlock();
        this.runBlock();

        // display
        this.display();

        // loop -> setInterval?
        setTimeout(() => { this.loop(time++); }, 1000 / 30);
    }

    // display
    display() {
        // display background
        this.fill(255, 255, 255);
        this.rect();

        // block
        for (let x = 0; x < 4; x++) for (let y = 0; y < 8; y++) {
            if (this.stage[x][y] == -1) continue;
            this.fill(this.dropColor.getColorR(this.stage[x][y]), this.dropColor.getColorG(this.stage[x][y]), this.dropColor.getColorB(this.stage[x][y]));
            this.rect(x * 80, y * 80, 80, 80);
        }

        // drop block
        if (this.isDropping) {
            for (let i = 0; i < 2; i++) {
                this.fill(this.dropColor.getColorR(this.droppingColor[i]), this.dropColor.getColorG(this.droppingColor[i]), this.dropColor.getColorB(this.droppingColor[i]));
                let y = this.droppingY * 80 + this.droppingTime + (i * 80);
                this.rect(this.droppingX * 80, y, 80, 80);
            }
        }

        // background grid
        this.stroke(200, 200, 200);
        for (let x = 1; x < 4; x++) this.line(x * 80, 0, x * 80, 640);
        for (let y = 1; y < 8; y++) this.line(0, y * 80, 320, y * 80);
    }

    // newBlock
    newBlock() {
        // new color
        do {
            this.droppingColor[0] = Number(random(6));
            this.droppingColor[1] = Number(random(6));
        } while ((this.droppingColor[0] == this.droppingColor[1]));

        // position
        this.droppingY = -3;
        this.droppingX = 1;
        this.droppingTime = 0;
        this.isDropping = true;
    }

    // run dropping block
    runBlock() {
        this.droppingTime += 4;
        if (this.droppingTime == 80) {
            this.droppingTime = 0;
            this.droppingY += 1;
            if (this.dropCheck()) {
                this.dropLanding();
                this.isDropping = false;
            }
        }
    }

    // drop stop check
    dropCheck() {
        let x = this.droppingX;
        let y = this.droppingY;
        if (y == 6) return true;
        if (this.stage[x][y + 2] != -1) return true;
        return false;
    }

    // set block
    dropLanding() {
        for (let i = 0; i < 2; i++) {
            let x = this.droppingX;
            let y = this.droppingY + i;
            this.stage[x][y] = this.droppingColor[i];
        }
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
