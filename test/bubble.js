const assert = require("assert");
const Bubble  = require("../src/bubble");

describe("Bubble", () => {

describe("new Bubble(o, bubble) ", () => {
  it("blows a new linked bubble link for your fun and profit.", () => {
    var bubble;
    bubble = new Bubble();
    assert.equal(bubble.o, undefined);
    assert.equal(bubble.bubble, Bubble.air);
    bubble = new Bubble(1);
    assert.equal(bubble.o, 1);
    bubble = new Bubble(2, bubble);
    assert.equal(bubble.o, 2);
    assert.equal(bubble.bubble.o, 1);
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
    assert.equal(bubble.o, 1);

    bubble = new Bubble(2, bubble);
    bubble = new Bubble(3, bubble);

    assert.equal(bubble.o, 3);
    bubble = bubble.reverse();
    assert.equal(bubble.o, 1)
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

describe(".blow()", () => {
  it("should return an empty bubble.", () => {
    assert.equal(Bubble.blow(), Bubble.air);
  });
});

describe(".blow(o, ...)", () => {
  it("blows a bubble with os.", () => {
    let bubble = Bubble.blow(1, 2, 3);
    assert.equal(bubble.o, 1);
    assert.equal(bubble.bubble.o, 2);
    assert.equal(bubble.bubble.bubble.o, 3);
  });
});

describe(".air", () => {
  it("should be empty bubble.", () => {
    let bubble = Bubble.air;
    assert.equal(bubble.isAir, true);
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

    let add7 = (o) => { return o+7 };

    bubble = Bubble.air;
    result = bubble.map(add7);
    assert.equal(result, Bubble.air);

    bubble = new Bubble(1);
    result = bubble.map(add7);
    assert.equal(result.o, 8);

    bubble = new Bubble(2, bubble);
    result = bubble.map(add7);
    assert.equal(result.o, 9);
    assert.equal(result.bubble.o, 8);

    bubble = new Bubble(3, bubble);
    result = bubble.map(add7);
    assert.equal(result.o, 10);
    assert.equal(result.bubble.o, 9);
    assert.equal(result.bubble.bubble.o, 8);
  });
});

describe("#push(o)", () => {
  it("pushes an o onto the bubble.", () => {
    var bubble = Bubble.air;
    assert(bubble.isAir);

    bubble = bubble.push(1);
    assert.equal(bubble.o, 1)
    assert(bubble.bubble.isAir);

    bubble = bubble.push(2);
    assert.equal(bubble.o, 2)
    assert.equal(bubble.bubble.o, 1)
    assert(bubble.bubble.bubble.isAir);
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
