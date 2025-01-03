const assert = require("assert");
const List  = require("../src/list");

describe("List", () => {

describe("new List(head, ...tail) ", () => {
  it("creates a new linked list link for your enjoyment.", () => {
    var list;
    list = new List(1);
    assert.equal(list.head, 1);
    list = new List(2, list);
    assert.equal(list.head, 2);
    assert.equal(list.tail.head, 1);
  });
});

describe(".create()", () => {
  it("should return an empty list.", () => {
    assert.equal(
      List.create(), // actual
      List.emptyList // expected
    );
  });
});

describe(".create(item, ...)", () => {
  it("should create a list with items.", () => {
    let list = List.create(1, 2, 3);
    assert.equal(list.toString(), "(1 2 3)");
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
