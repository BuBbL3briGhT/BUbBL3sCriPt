const assert = require("assert");
const Glider  = require("../src/glider");

describe("Glider", () => {

describe("new Glider(head, tail) ", () => {
  it("creates a new glider link for your great and terrible success.", () => {
    var glider;
    glider = new Glider();
    assert.equal(glider.head, undefined);
    assert.equal(glider.tail, Glider.emptyGlider);
    glider = new Glider(1);
    assert.equal(glider.head, 1);
    glider = new Glider(2, glider);
    assert.equal(glider.head, 2);
    assert.equal(glider.tail.head, 1);
  });
});


});
