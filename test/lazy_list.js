const assert = require("assert");
const LazyList = require("../src/lazy_list.js");
const 列表 = require("../src/列表.js");

describe("LazyList", function () {
  it("is a lazzzy 列表", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new LazyList(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy 列表 as a 列表", function () {
      // const lazy = new LazyList([1,2,3][Symbol.iterator]());
      const lazy = new LazyList([1,2,3]);
      const actual = lazy.toList();
      const expected = 列表.make(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of 列表) {
// }
// const itty = [1, 2, 3];
// const 列表 = new LazyList([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of 列表) {
// }
