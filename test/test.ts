import * as nodeunit from "nodeunit";
import { BufQueue } from "../index";

module.exports = {
  'test': (test: nodeunit.Test)=>{(async()=>{
    let b = new BufQueue();
    b.add(Buffer.alloc(4));
    b.add(Buffer.alloc(4));
    b.add(Buffer.alloc(8));
    test.equal(b.byteLength, 16);
    b.consume(2);
    test.equal(b.byteLength, 14);
    b.consume(2);
    test.equal(b.byteLength, 12);
    b.consume(5);
    test.equal(b.byteLength, 7);
    b.consume(7);
    test.equal(b.byteLength, 0);
  })().catch(test.ifError).then(test.done)},
}