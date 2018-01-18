"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BufQueue {
    constructor() {
        this._que = [];
    }
    add(buf) {
        this._que.push(buf);
        return this;
    }
    get byteLength() {
        return this._que.reduce((p, c) => p + c.byteLength, 0);
    }
    /**
     *
     * @param byteSize how many bytes to consume
     * null returned if size is too large
     */
    consume(byteSize) {
        // a bit long to ensure that buffer new and copy is minimized for effeciency
        let c = 0;
        let i = 0;
        for (const b of this._que) {
            c += b.byteLength;
            i++;
            if (c >= byteSize)
                break;
        }
        if (c < byteSize)
            return null; // not enough to consume, return null
        let consumed = this._que.slice(0, i);
        let keep = this._que.slice(i);
        if (c > byteSize) {
            let buf = consumed[consumed.length - 1];
            let cutat = buf.byteLength - (c - byteSize);
            consumed[consumed.length - 1] = buf.slice(0, cutat);
            keep.unshift(buf.slice(cutat));
        }
        this._que = keep;
        if (consumed.length == 1)
            return consumed[0];
        else {
            let sz = consumed.reduce((p, c) => p + c.byteLength, 0);
            let ret = new Uint8Array(sz);
            let offset = 0;
            for (const b of consumed) {
                ret.set(b, offset);
                offset += b.byteLength;
            }
            return ret;
        }
    }
}
exports.BufQueue = BufQueue;
//# sourceMappingURL=BufQueue.js.map