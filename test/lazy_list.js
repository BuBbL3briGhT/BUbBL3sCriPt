const assert = require("assert");
const LazyList = require("../src/lazy_list.js");

describe("LazyList", function () {
  it("a lazzzy list", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new LazyList(itty);
    assert.deepEqual(expects, [...lazy]);
  });
});

// for(const o of list) {
// }
// const itty = [1, 2, 3];
// const list = new LazyList([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of list) {
// }
