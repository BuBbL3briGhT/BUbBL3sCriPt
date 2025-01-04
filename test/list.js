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
    var list;

    list = List.emptyList;
    list = list.reverse();
    assert.equal(list, List.emptyList);

    list = new List(1);
    list = list.reverse();
    assert.equal(list.head, 1);

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

    let add = (a, b) => { return b + a };

    list = List.emptyList;

    result = list.reduce(add);
    assert.equal(result, undefined);

    result = list.reduce(add, 0);
    assert.equal(result, 0);

    list = new List(1);
    result = list.reduce(add);
    assert.equal(result, 1);

    list = new List(2, list);
    result = list.reduce(add);
    assert.equal(result, 3);

    list = new List(3, list);
    result = list.reduce(add);
    assert.equal(result, 6)

    list = new List("a");
    result = list.reduce(add);
    assert.equal(result, "a");

    list = new List("b", list);
    result = list.reduce(add);
    assert.equal(result, "ab");

    list = new List("c", list);
    result = list.reduce(add);
    assert.equal(result, "abc");
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
    // assert.equal(list.map(), list);
  });
});

describe("#map(fn)", () => {
  it.only("maps the list through fn", ()=>{
    var list;

    let add7 = (item) => { return item+7 };

    list = List.emptyList;
    result = list.map(add7);
    assert.equal(result, List.emptyList);

    list = new List(1);
    result = list.map(add7);
    assert.equal(result.head, 8);
  });
});

describe("#toString", () => {
  it("formats the list as a string.", () => {
    var list, result;

    list = List.emptyList;
    result = list.toString();
    assert.equal(result, "()");

    list = new List(1);
    result = list.toString();
    assert.equal(result, "(1)");

    list = new List(2, list);
    result = list.toString();
    assert.equal(result, "(1 2)");

    list = new List(3, list);
    result = list.toString();
    assert.equal(result, "(1 2 3)");


    list = new List("string", list);
    result = list.toString();
    assert.equal(result, "(1 2 3 \"string\")");

    list = new List(Symbol.for("symbol"), list);
    result = list.toString();
    assert.equal(result, "(1 2 3 \"string\" symbol)");
  });
});

});
