const assert = require("assert");
const List  = require("../src/list");

describe('List', function () {

  describe(".create()", function () {
    it("should return empty list", function () {
      assert.equal(List.create(), List.emptyList);
    });
  });

  describe(".create(item, ...)", function() {
    it("should create a list with items", function() {
      let list = List.create(1, 2, 3);
      assert.equal(list.toString(), "(1 2 3)");
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

});
