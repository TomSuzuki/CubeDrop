import DropColor from "./setting.js";
import Key from "./key.js";
import { random } from "./function.js";

export default class Game {
    canvas = null;
    interval = null;
    score = 0;
    isDropping = false;
    dropping = [];
    droppingTime = 0;
    stage = [[]];

    // constructor
    constructor(ctx) {
        this.ctx = ctx;
        this.dropColor = new DropColor();
        this.key = new Key();

        // init stage
        for (let x = 0; x < 4; x++) {
            this.stage[x] = new Array(8);
            for (let y = 0; y < 8; y++) this.stage[x][y] = -1;
        }

        this.loop();
    }

    // main
    loop(time = 0) {
        // key
        this.key.keyStatusCheck();

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
        for (let i in this.dropping) {
            this.fill(this.dropColor.getColorR(this.dropping[i]["color"]), this.dropColor.getColorG(this.dropping[i]["color"]), this.dropColor.getColorB(this.dropping[i]["color"]));
            let x = 80 * this.dropping[i]["x"];
            let y = 80 * this.dropping[i]["y"] + this.droppingTime;
            this.rect(x, y, 80, 80);
        }

        // background grid
        this.stroke(200, 200, 200);
        for (let x = 1; x < 4; x++) this.line(x * 80, 0, x * 80, 640);
        for (let y = 1; y < 8; y++) this.line(0, y * 80, 320, y * 80);
    }

    // newBlock
    newBlock() {
        // new color
        let c = [];
        do {
            c[0] = Number(random(6));
            c[1] = Number(random(6));
        } while ((c[0] == c[1]));

        // position
        for (let i = 0; i < 2; i++) {
            this.dropping.push({
                x: 1,
                y: -3 + i,
                color: c[i]
            });
        }
        this.isPlayer = true;
        this.droppingTime = 0;
        this.isDropping = true;
    }

    // run dropping block
    runBlock() {
        // move
        this.droppingTime += 10;
        if (this.droppingTime == 80) {
            this.droppingTime = 0;
            this.dropping.sort((a, b) => { return a["y"] - b["y"]; });
            for (let i = this.dropping.length - 1; i >= 0; i--) {
                this.dropping[i]["y"]++;
                let b = this.dropCheck(this.dropping[i]);
                if (b) {
                    this.dropLanding(this.dropping[i]);
                    this.dropping.splice(i, 1);
                }
            }
            if (this.dropping.length == 0) this.isDropping = false;
            //if(! this.isDropping ) //check
        }

        // player
        if (this.key.pushSpace()) {
            if (this.isPlayer) {
                let y = this.dropping[0]["y"];
                this.dropping[0]["y"] = this.dropping[1]["y"];
                this.dropping[1]["y"] = y;
            }
        }
    }

    // drop stop check
    dropCheck(block) {
        let x = block["x"];
        let y = block["y"];
        let c = block["color"];
        if (y < -1) return false;
        if (y == 7) return true;
        if (this.stage[x][y + 1] != -1) return true;
        return false;
    }

    // set block
    dropLanding(block) {
        this.isPlayer = false;
        let x = block["x"];
        let y = block["y"];
        this.stage[x][y] = block["color"];
    }

    // remove block
    removeBlock() {

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
