const assert = require("assert");
const LazyList = require("../src/lazy_list.js");
const 气泡 = require("../src/气泡.js");

describe("LazyList", function () {
  it("is a lazzzy 气泡", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new LazyList(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy 气泡 as a 气泡", function () {
      // const lazy = new LazyList([1,2,3][Symbol.iterator]());
      const lazy = new LazyList([1,2,3]);
      const actual = lazy.toList();
      const expected = 气泡.make(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of 气泡) {
// }
// const itty = [1, 2, 3];
// const 气泡 = new LazyList([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of 气泡) {
// }
