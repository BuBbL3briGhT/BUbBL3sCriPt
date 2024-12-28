const assert = require("assert");
const List  = require("../src/list");

// Describe List
describe('List', function () {

//// Describe .create()
describe(".create()", function () {
// It should return empty list.
it("should return empty list", function () {
assert.equal(List.create(),
  List.emptyList);
});
});

describe(".create(item, ...)", function() {
it("should create a list with items", function() {
let list = List.create(1, 2, 3);
assert.equal(list.toString(),
  "(1 2 3)");
});
});

describe(".emptyList", function() {
it("should return empty list", function() {
let list = List.emptyList;
assert.equal(list.isEmpty, true);
assert.equal(list.toString(), "()");
assert.equal(list.reverse(), list);
assert.equal(list.map(), list);
});
});

describe("#toString", function() {
it("should return the list formatted " +
"as a string.", function() {
let list = List.create(1,2,3);
assert.equal(list.toString(), "(1 2 3)");
// list = list.push(Symbol.for("a"));
// assert.equal(list.toString(), "(1 2 3 a)");
});
});

});
