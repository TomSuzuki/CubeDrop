export default class Key {
    constructor() {
        document.body.addEventListener('keydown',
            e => {
                if (e.key === ' ') this.keySpace = 2;
                if (e.keyCode == 37) this.keyLeft = 2;
                if (e.keyCode == 39) this.keyRight = 2;
            });
    }

    keyStatusCheck() {
        if (this.keySpace > 0) this.keySpace--;
        if (this.keyLeft > 0) this.keyLeft--;
        if (this.keyRight > 0) this.keyRight--;
    }

    pushSpace() {
        let bool = this.keySpace > 0;
        this.keySpace = 0;
        return bool;
    }

    pushLeft() {
        let bool = this.keyLeft > 0;
        this.keyLeft = 0;
        return bool;
    }

    pushRight() {
        let bool = this.keyRight > 0;
        this.keyRight = 0;
        return bool;
    }
}