export declare class BufQueue {
    _que: Uint8Array[];
    constructor();
    add(buf: Uint8Array): BufQueue;
    readonly byteLength: number;
    /**
     *
     * @param byteSize how many bytes to consume
     * null returned if size is too large
     */
    consume(byteSize: number): Uint8Array;
}
