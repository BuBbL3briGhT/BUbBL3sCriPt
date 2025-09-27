const assert = require("assert");
const LazyList = require("../src/lazy_list.js");
const Bubble = require("../src/bubble.js");

describe("LazyList", function () {
  it("is a lazzzy bubble", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new LazyList(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy bubble as a bubble", function () {
      // const lazy = new LazyList([1,2,3][Symbol.iterator]());
      const lazy = new LazyList([1,2,3]);
      const actual = lazy.toList();
      const expected = Bubble.make(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of bubble) {
// }
// const itty = [1, 2, 3];
// const bubble = new LazyList([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of bubble) {
// }
