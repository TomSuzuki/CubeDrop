export default class Key {
    constructor() {
        document.body.addEventListener('keydown',
            e => {
                if (e.key === ' ') this.keySpace = 2;
            });
    }

    keyStatusCheck() {
        if (this.keySpace > 0) this.keySpace--;
    }

    pushSpace() {
        let bool = this.keySpace > 0;
        this.keySpace = 0;
        return bool;
    }
}