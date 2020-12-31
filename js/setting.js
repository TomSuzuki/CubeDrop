// drop color
export default class DropColor {
    // color setting
    colorSet = [new Color(226, 228, 217), new Color(196, 240, 142), new Color(244, 226, 66), new Color(50, 219, 238), new Color(255, 163, 50), new Color(255, 120, 136)];

    // constructor
    constructor() {
    }

    // get color
    getColorR(i = 0) { return this.colorSet[i].getR(); }
    getColorG(i = 0) { return this.colorSet[i].getG(); }
    getColorB(i = 0) { return this.colorSet[i].getB(); }
}

class Color {
    r = 0;
    g = 0;
    b = 0;

    // constructor
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    // geter
    getR() { return this.r; }
    getG() { return this.g; }
    getB() { return this.b; }
}