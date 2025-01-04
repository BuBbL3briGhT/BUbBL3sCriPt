const assert = require("assert");
const Bubble  = require("../src/bubble");

describe("Bubble", () => {

describe("new Bubble(breath, bubble) ", () => {
  it("creates a new linked bubble link for your fun and profit.", () => {
    var bubble;
    bubble = new Bubble();
    assert.equal(bubble.breath, undefined);
    assert.equal(bubble.bubble, Bubble.air);
    bubble = new Bubble(1);
    assert.equal(bubble.breath, 1);
    bubble = new Bubble(2, bubble);
    assert.equal(bubble.breath, 2);
    assert.equal(bubble.bubble.breath, 1);
  });
});

describe("#reverse", () => {
  it("reverses the bubble", () => {
    var bubble;

    bubble = Bubble.air;
    bubble = bubble.reverse();
    assert.equal(bubble, Bubble.air);

    bubble = new Bubble(1);
    bubble = bubble.reverse();
    assert.equal(bubble.breath, 1);

    bubble = new Bubble(2, bubble);
    bubble = new Bubble(3, bubble);

    assert.equal(bubble.breath, 3);
    bubble = bubble.reverse();
    assert.equal(bubble.breath, 1)
  });
});

describe("#reduce", () => {
  it("reduces the bubble", () => {
    var bubble, result;

    let add = (a, b) => { return b + a };

    bubble = Bubble.air;

    result = bubble.reduce(add);
    assert.equal(result, undefined);

    result = bubble.reduce(add, 0);
    assert.equal(result, 0);

    bubble = new Bubble(1);
    result = bubble.reduce(add);
    assert.equal(result, 1);

    bubble = new Bubble(2, bubble);
    result = bubble.reduce(add);
    assert.equal(result, 3);

    bubble = new Bubble(3, bubble);
    result = bubble.reduce(add);
    assert.equal(result, 6)

    bubble = new Bubble("a");
    result = bubble.reduce(add);
    assert.equal(result, "a");

    bubble = new Bubble("b", bubble);
    result = bubble.reduce(add);
    assert.equal(result, "ab");

    bubble = new Bubble("c", bubble);
    result = bubble.reduce(add);
    assert.equal(result, "abc");
  });
});

describe(".create()", () => {
  it("should return an empty bubble.", () => {
    assert.equal(Bubble.create(), Bubble.air);
  });
});

describe(".create(item, ...)", () => {
  it("should create a bubble with items.", () => {
    let bubble = Bubble.create(1, 2, 3);
    assert.equal(bubble.breath, 1);
    assert.equal(bubble.bubble.breath, 2);
    assert.equal(bubble.bubble.bubble.breath, 3);
  });
});

describe(".air", () => {
  it("should be empty bubble.", () => {
    let bubble = Bubble.air;
    assert.equal(bubble.isEmpty, true);
    assert.equal(bubble.toString(), "()");
    assert.equal(bubble.reverse(), bubble);
    assert.equal(bubble.map(), bubble);
  });
  it("can not be assigned to", () => {
    let air = Bubble.air;
    assert.throws(() => {
      Bubble.air = null;
    });
    assert.equal(Bubble.air, air);
  });
});

describe("#map(fn)", () => {
  it("maps the bubble through fn", ()=>{
    var bubble;

    let add7 = (item) => { return item+7 };

    bubble = Bubble.air;
    result = bubble.map(add7);
    assert.equal(result, Bubble.air);

    bubble = new Bubble(1);
    result = bubble.map(add7);
    assert.equal(result.breath, 8);

    bubble = new Bubble(2, bubble);
    result = bubble.map(add7);
    assert.equal(result.breath, 9);
    assert.equal(result.bubble.breath, 8);

    bubble = new Bubble(3, bubble);
    result = bubble.map(add7);
    assert.equal(result.breath, 10);
    assert.equal(result.bubble.breath, 9);
    assert.equal(result.bubble.bubble.breath, 8);
  });
});

describe("#push(item)", () => {
  it("pushes an item onto the bubble.", () => {
    var bubble = Bubble.air;
    assert(bubble.isEmpty);

    bubble = bubble.push(1);
    assert.equal(bubble.breath, 1)
    assert(bubble.bubble.isEmpty);

    bubble = bubble.push(2);
    assert.equal(bubble.breath, 2)
    assert.equal(bubble.bubble.breath, 1)
    assert(bubble.bubble.bubble.isEmpty);
  });
});


describe("#toString", () => {
  it("formats the bubble as a string.", () => {
    var bubble, result;

    bubble = Bubble.air;
    result = bubble.toString();
    assert.equal(result, "()");

    bubble = new Bubble(1);
    result = bubble.toString();
    assert.equal(result, "(1)");

    bubble = new Bubble(2, bubble);
    result = bubble.toString();
    assert.equal(result, "(1 2)");

    bubble = new Bubble(3, bubble);
    result = bubble.toString();
    assert.equal(result, "(1 2 3)");


    bubble = new Bubble("string", bubble);
    result = bubble.toString();
    assert.equal(result, "(1 2 3 \"string\")");

    bubble = new Bubble(Symbol.for("symbol"), bubble);
    result = bubble.toString();
    assert.equal(result, "(1 2 3 \"string\" symbol)");
  });
});

});
