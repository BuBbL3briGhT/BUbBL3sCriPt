const assert = require("assert");
const List  = require("../src/list");

describe("List", () => {

describe("new List(head, tail) ", () => {
  it("creates a new linked list link for your fun and profit.", () => {
    var list;
    list = new List();
    assert.equal(list.head, undefined);
    assert.equal(list.tail, List.emptyList);
    list = new List(1);
    assert.equal(list.head, 1);
    list = new List(2, list);
    assert.equal(list.head, 2);
    assert.equal(list.tail.head, 1);
  });
});

describe("#reverse", () => {
  it("reverses the list", () => {
    var list = new List(1);
        list = new List(2, list);
        list = new List(3, list);

    assert.equal(list.head, 3);
    list = list.reverse();
    assert.equal(list.head, 1)
  });
});

describe("#reduce", () => {
  it("reduces the list", () => {
    var list, result;

    let add = (a, b) => { return a + b };

    list = List.emptyList;

    result = list.reduce(add);
    assert.equal(result, undefined);

    list = new List(1);
    result = list.reduce(add);
    assert.equal(result, 1);

    list = new List(2, list);
    result = list.reduce(add);
    assert.equal(result, 3);

    list = new List(3, list);
    result = list.reduce(add);
    assert.equal(result, 6)
  });
});

describe(".create()", () => {
  it("should return an empty list.", () => {
    assert.equal(List.create(), List.emptyList);
  });
});

describe(".create(item, ...)", () => {
  it("should create a list with items.", () => {
    let list = List.create(1, 2, 3);
    assert.equal(list.head, 1);
    assert.equal(list.tail.head, 2);
    assert.equal(list.tail.tail.head, 3);
  });
});

describe(".emptyList", () => {
  it("should be empty list.", () => {
    let list = List.emptyList;
    assert.equal(list.isEmpty, true);
    assert.equal(list.toString(), "()");
    assert.equal(list.reverse(), list);
    assert.equal(list.map(), list);
  });
});

describe("#toString", () => {
  it("should return the list formatted as" +
     "a string.", () => {
    let list = List.create(1,2,3);
    assert.equal(list.toString(), "(1 2 3)");
    // list = list.push(Symbol.for("a"));
    // assert.equal(list.toString(), "(1 2 3 a)");
  });
});

});
