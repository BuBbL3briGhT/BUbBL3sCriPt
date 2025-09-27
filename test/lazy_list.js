const assert = require("assert");
const LazyList = require("../src/lazy_list.js");
const BubbleButt = require("../src/bubble_butt.js");

describe("LazyList", function () {
  it("is a lazzzy bubbleButt", function () {
    const expects = [1, 2, 3];
    const itty = expects[Symbol.iterator]();
    const lazy = new LazyList(itty);
    assert.deepEqual(expects, [...lazy]);
  });


  describe("#toList", function () {
    it("renders the lazy bubbleButt as a bubbleButt", function () {
      // const lazy = new LazyList([1,2,3][Symbol.iterator]());
      const lazy = new LazyList([1,2,3]);
      const actual = lazy.toList();
      const expected = BubbleButt.make(1, 2, 3);
      assert.deepEqual(actual, expected);
    });
  });
});

// for(const o of bubbleButt) {
// }
// const itty = [1, 2, 3];
// const bubbleButt = new LazyList([1, 2, 3]);
// assert.deepEqual([...lazy
// for(const o of bubbleButt) {
// }
