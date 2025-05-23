const assert = require("assert");
const Stack  = require("../src/o/stack");

const { make, get, invert, map, peek, pop,
  push, reduce, skip, toString} = Stack;

describe("Stack", () => {

describe("new Stack(o, oo) ", () => {
  it("makes a new stack for your fun and profit.", () => {
    var o;
    o = new Stack();
    assert.equal(get(o), undefined);
    assert.equal(skip(o, 1), undefined);

    o = new Stack(1);
    assert.equal(get(o), 1);
    o = new Stack(2, o);
    assert.equal(get(o), 2);
    assert.equal(get(o,1), 1);
  });
});

});
