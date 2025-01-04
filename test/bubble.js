const assert = require("assert");
const Bubble  = require("../src/bubble");

describe("Bubble", () => {

describe("new Bubble(head, tail) ", () => {
  it("creates a new linked bubble link for your fun and profit.", () => {
    var bubble;
    bubble = new Bubble();
    assert.equal(bubble.head, undefined);
    assert.equal(bubble.tail, Bubble.emptyBubble);
    bubble = new Bubble(1);
    assert.equal(bubble.head, 1);
    bubble = new Bubble(2, bubble);
    assert.equal(bubble.head, 2);
    assert.equal(bubble.tail.head, 1);
  });
});

describe("#reverse", () => {
  it("reverses the bubble", () => {
    var bubble;

    bubble = Bubble.emptyBubble;
    bubble = bubble.reverse();
    assert.equal(bubble, Bubble.emptyBubble);

    bubble = new Bubble(1);
    bubble = bubble.reverse();
    assert.equal(bubble.head, 1);

    bubble = new Bubble(2, bubble);
    bubble = new Bubble(3, bubble);

    assert.equal(bubble.head, 3);
    bubble = bubble.reverse();
    assert.equal(bubble.head, 1)
  });
});

describe("#reduce", () => {
  it("reduces the bubble", () => {
    var bubble, result;

    let add = (a, b) => { return b + a };

    bubble = Bubble.emptyBubble;

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
    assert.equal(Bubble.create(), Bubble.emptyBubble);
  });
});

describe(".create(item, ...)", () => {
  it("should create a bubble with items.", () => {
    let bubble = Bubble.create(1, 2, 3);
    assert.equal(bubble.head, 1);
    assert.equal(bubble.tail.head, 2);
    assert.equal(bubble.tail.tail.head, 3);
  });
});

describe(".emptyBubble", () => {
  it("should be empty bubble.", () => {
    let bubble = Bubble.emptyBubble;
    assert.equal(bubble.isEmpty, true);
    assert.equal(bubble.toString(), "()");
    assert.equal(bubble.reverse(), bubble);
    assert.equal(bubble.map(), bubble);
  });
  it("can not be assigned to", () => {
    let emptyBubble = Bubble.emptyBubble;
    assert.throws(() => {
      Bubble.emptyBubble = null;
    });
    assert.equal(Bubble.emptyBubble, emptyBubble);
  });
});

describe("#map(fn)", () => {
  it("maps the bubble through fn", ()=>{
    var bubble;

    let add7 = (item) => { return item+7 };

    bubble = Bubble.emptyBubble;
    result = bubble.map(add7);
    assert.equal(result, Bubble.emptyBubble);

    bubble = new Bubble(1);
    result = bubble.map(add7);
    assert.equal(result.head, 8);

    bubble = new Bubble(2, bubble);
    result = bubble.map(add7);
    assert.equal(result.head, 9);
    assert.equal(result.tail.head, 8);

    bubble = new Bubble(3, bubble);
    result = bubble.map(add7);
    assert.equal(result.head, 10);
    assert.equal(result.tail.head, 9);
    assert.equal(result.tail.tail.head, 8);
  });
});

describe("#push(item)", () => {
  it("pushes an item onto the bubble.", () => {
    var bubble = Bubble.emptyBubble;
    assert(bubble.isEmpty);

    bubble = bubble.push(1);
    assert.equal(bubble.head, 1)
    assert(bubble.tail.isEmpty);

    bubble = bubble.push(2);
    assert.equal(bubble.head, 2)
    assert.equal(bubble.tail.head, 1)
    assert(bubble.tail.tail.isEmpty);
  });
});


describe("#toString", () => {
  it("formats the bubble as a string.", () => {
    var bubble, result;

    bubble = Bubble.emptyBubble;
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
