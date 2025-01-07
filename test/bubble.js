const assert = require("assert");
const Bubble  = require("../src/bubble");

const { blow, get, invert, map, peek, pop,
  push, reduce, skip, toString} = Bubble;

describe("Bubble", () => {

describe("new Bubble(o, oo) ", () => {
  it("blows a new bubble for your fun and profit.", () => {
    var o;
    o = new Bubble();
    assert.equal(get(o), undefined);
    assert.equal(skip(o, 1), undefined);

    o = new Bubble(1);
    assert.equal(get(o), 1);
    o = new Bubble(2, o);
    assert.equal(get(o), 2);
    assert.equal(get(o,1), 1);
  });
});

describe("blow(o...)", () => {
  it("blows bubbles", () => {
    assert.equal(blow(), undefined);
    let o = blow(1, 2, 3);
    assert.equal(get(o,0), 3);
    assert.equal(get(o,1), 2);
    assert.equal(get(o,2), 1);
  });
});

describe("get(o, index)", () => {
  it("gets value of o at index", () => {
    let o = Bubble.blow(6,7,8);
    assert.equal(get(o, 0), 8);
    assert.equal(get(o, 1), 7);
    assert.equal(get(o, 2), 6);
  });
});

describe("invert", () => {
  it.only("inverts bubbles", () => {
    var o;
    o = invert(o);
    assert.equal(o, undefined);

    o = blow(1);
    o = invert(o);
    assert.equal(peek(o),1);
    assert.equal(skip(o,1), undefined);

    o = push(o,2);
    o = push(o,3);

    assert.equal(peek(o),3);
    o = invert(o);
    assert.equal(peek(o),1);
  });
});

describe("map(o, fn)", () => {
  it("maps o through fn", ()=>{
    var o;

    let add7 = (o) => { return o + 7 };

    result = map(o, add7);
    assert.equal(result, undefined);

    o = blow(1);
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
  it("pushes o onto the bubble stack.", () => {
    var o;

    o = push(o, 1);
    assert.equal(get(o), 1)
    assert.equal(skip(o, 1), undefined);

    o = push(o, 2);
    assert.equal(get(o), 2)
    assert.equal(get(o, 1), 1)
    assert.equal(skip(o, 2), undefined);
  });
});

describe("reduce", () => {
  it("reduces the bubble", () => {
    var o, result;

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

    o = blow("a");
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

describe("skip(bubble, count)", () => {
  it("skips count of bubbles", () => {
    let o = Bubble.blow(6,7,8);
    assert.equal(peek(skip(o)), 8);
    assert.equal(peek(skip(o,0)), 8);
    assert.equal(peek(skip(o,1)), 7);
    assert.equal(peek(skip(o,2)), 6);
  });
});

describe("toString(o)", () => {
  it("formats bubble as a string.", () => {
    var o, result;

    result = toString(o);
    assert.equal(result, "()");

    o = blow(1);
    result = toString(o);
    assert.equal(result, "(1)");

    o = push(o,2);
    result = toString(o);
    assert.equal(result, "(1 2)");

    o = push(o, 3);
    result = toString(o);
    assert.equal(result, "(1 2 3)");

    o = push(o, "string");
    result = toString(o);
    assert.equal(result, "(1 2 3 \"string\")");

    o = push(o, Symbol.for("symbol"));
    result = toString(o);
    assert.equal(result, "(1 2 3 \"string\" symbol)");

    let ts = toString;
    let oo = blow(3,2,1);
    assert.equal(ts(oo), "(3 2 1)");
    o = push(pop(pop(o)), oo);
    assert.equal(ts(o), "(1 2 3 (3 2 1))");
  });
});

});
