const assert = require("assert");
const Bubbles  = require("../../src/o/bubbles");

const { blow, make, get, invert, map, peek, pop,
  push, reduce, skip, toString} = Bubbles;

describe("Bubbles", () => {

describe("new Bubbles(o, oo) ", () => {
  it("makes bubbles for your fun and profit.", () => {
    var o;
    o = new Bubbles();
    assert.equal(get(o), undefined);
    assert.equal(skip(o, 1), Bubbles.emptyBubbles);

    o = new Bubbles(1);
    assert.equal(get(o), 1);
    o = new Bubbles(2, o);
    assert.equal(get(o), 2);
    assert.equal(get(o,1), 1);
  });
});

describe("make(o...)", () => {
  it("makes bubbles", () => {
    assert.equal(make(), Bubbles.emptyBubbles);
    let o = make(1, 2, 3);
    assert.equal(get(o,0), 1);
    assert.equal(get(o,1), 2);
    assert.equal(get(o,2), 3);
  });
});

describe("get(o, index)", () => {
  it("gets value of o at index", () => {
    let o = Bubbles.make(6,7,8);
    assert.equal(get(o, 0), 6);
    assert.equal(get(o, 1), 7);
    assert.equal(get(o, 2), 8);
  });
});

describe("invert", () => {
  it("inverts bubbles", () => {
    var o = Bubbles.make();
    o = invert(o);
    assert.equal(o, Bubbles.emptyBubbles);

    o = make(1);
    o = invert(o);
    assert.equal(peek(o),1);
    assert.equal(skip(o,1), Bubbles.emptyBubbles);

    o = push(push(o,2),3);
    assert.equal(peek(o),3);

    o = invert(o);
    assert.equal(peek(o),1);

    let oo = make(1,2,3);
    // assert.equal(toString(oo), "(1 2 3)");
    assert.equal(peek(oo), 1);
    assert.equal(Bubbles.toString(oo), "(1 2 3)");
    let xo = invert(oo);
    // assert.equal(toString(xo), "(3 2 1)");
    assert.equal(Bubbles.toString(xo), "(3 2 1)");
  });
});

describe("map(o, fn)", () => {
  it("maps o through fn", ()=>{
    var o = Bubbles.make();

    let add7 = (o) => { return o + 7 };

    result = map(o, add7);
    assert.equal(result, undefined);

    o = make(1);
    o = map(o, add7);
    assert.equal(get(o), 8);

    o = push(o, 2);
    o = map(o, add7);
    assert.equal(get(o), 9);
    assert.equal(get(o, 1), 15);

    o = push(o, 3);
    o = map(o, add7);
    assert.equal(get(o), 10);
    assert.equal(get(o, 1), 16);
    assert.equal(get(o, 2), 22);
  });
});

describe("push(o)", () => {
  it("pushes o onto the bubbles.", () => {
    var o = Bubbles.make();

    o = push(o, 1);
    assert.equal(get(o), 1)
    assert.equal(skip(o, 1), Bubbles.emptyBubbles);
    console.log(typeof o);

    o = push(o, 2);
    assert.equal(get(o), 2)
    assert.equal(get(o, 1), 1)
    assert.equal(skip(o, 2), Bubbles.emptyBubbles);
  });
});

describe("reduce", () => {
  it("reduces the bubbles", () => {
    var o = Bubbles.make(),
      result;

    let add = (a,b) => { return b + a };

    result = reduce(o, add);
    assert.equal(result, undefined);

    result = reduce(o, add, 0);
    assert.equal(result, 0);

    o = push(o, 1);
    result = reduce(o, add);
    assert.equal(result, 1);

    o = push(o, 2);
    result = reduce(o, add);
    assert.equal(result, 3);

    o = push(o, 3),
    result = reduce(o, add)
    assert.equal(result, 6)

    o = make("a");
    result = reduce(o, add);
    assert.equal(result, "a");

    o = push(o, "b");
    result = reduce(o, add);
    assert.equal(result, "ab");

    o = push(o, "c");
    result = reduce(o, add);
    assert.equal(result, "abc");
  });
});

describe("skip(bubbles, count)", () => {
  it("skips count of bubbles", () => {
    let o = Bubbles.make(6,7,8);
    assert.equal(peek(skip(o)), 6);
    assert.equal(peek(skip(o,0)), 6);
    assert.equal(peek(skip(o,1)), 7);
    assert.equal(peek(skip(o,2)), 8);
  });
});

describe("toString(o)", () => {
  it("formats bubbles as a string.", () => {
    var o, result;

    result = toString(o);
    assert.equal(result, "()");

    o = make(1);
    result = toString(o);
    assert.equal(result, "(1)");

    o = push(o,2);
    result = toString(o);
    assert.equal(result, "(2 1)");

    o = push(o, 3);
    result = toString(o);
    assert.equal(result, "(3 2 1)");

    o = push(o, "string");
    result = toString(o);
    assert.equal(result, "(\"string\" 3 2 1)");

    o = push(o, Symbol.for("symbol"));
    result = toString(o);
    assert.equal(result, "(symbol \"string\" 3 2 1)");

    let ts = toString;
    let oo = make(3,2,1);
    assert.equal(ts(oo), "(3 2 1)");
    o = push(pop(pop(o)), oo);
    assert.equal(ts(o), "((3 2 1) 3 2 1)");
  });
});

});
