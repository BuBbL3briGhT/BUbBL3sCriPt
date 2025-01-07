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

describe("invert", () => {
  it("inverts bubbles", () => {
    var o;

    o = Bubble.air;
    o = invert(o);
    assert.equal(o, Bubble.air);

    o = blow(1);
    o = invert(o);
    assert.equal(peek(o), 1);

    o = push(o, 2);
    o = push(o, 3);

    assert.equal(peek(o), 3);
    o = invert(o);
    assert.equal(peek(o), 1)
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

describe(".blow()", () => {
  it("blows it", () => {
    assert.equal(Bubble.blow(), undefined);
  });
});

describe(".blow(o...)", () => {
  it("blows bubbles", () => {
    let o = Bubble.blow(1, 2, 3);
    assert.equal(get(o), 1);
    assert.equal(get(o, 1), 2);
    assert.equal(get(o, 2), 3);
  });
});

// describe(".air", () => {
//   it("should be empty bubble.", () => {
//     let bubble = Bubble.air;
//     assert.equal(bubble.isAir, true);
//     assert.equal(bubble.toString(), "()");
//     assert.equal(bubble.reverse(), bubble);
//     assert.equal(bubble.map(), bubble);
//   });
//   it("can not be assigned to", () => {
//     let air = Bubble.air;
//     assert.throws(() => {
//       Bubble.air = null;
//     });
//     assert.equal(Bubble.air, air);
//   });
// });

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

describe("toString(o)", () => {
  it.only("formats bubble as a string.", () => {
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
    o = push(pop(pop(o)), blow(3,2,1));
    assert.equal(ts(o), "(1 2 3 (3 2 1))");

  });
});

describe("#get(index)", () => {
  it("gets o at index", () => {
    let bubble = Bubble.blow(6,7,8);
    assert.equal(bubble.get(0), 6);
    assert.equal(bubble.get(1), 7);
    assert.equal(bubble.get(2), 8);
  });
});

describe(".get(bubble, index)", () => {
  it("gets o at index", () => {
    let {get} = Bubble;
    let bubble = Bubble.blow(6,7,8);
    assert.equal(get(bubble, 0), 6);
    assert.equal(get(bubble, 1), 7);
    assert.equal(get(bubble, 2), 8);
  });
});

describe(".skip(bubble, count)", () => {
  it("skips count of bubbles", () => {
    let {skip} = Bubble;
    let bubble = Bubble.blow(6,7,8);
    assert.equal(skip(bubble, 0).o, 6);
    assert.equal(skip(bubble, 1).o, 7);
    assert.equal(skip(bubble, 2).o, 8);
  });
});

});
