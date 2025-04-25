const assert = require("assert");
const Balloon  = require("../src/balloon.copy");

describe("Balloon", () => {

describe("new Balloon(head, tail) ", () => {
  it("creates a new balloon link for your great and terrible success.", () => {
    var balloon;
    balloon = new Balloon();
    assert.equal(balloon.head, undefined);
    assert.equal(balloon.tail, Balloon.emptyBalloon);
    balloon = new Balloon(1);
    assert.equal(balloon.head, 1);
    balloon = new Balloon(2, balloon);
    assert.equal(balloon.head, 2);
    assert.equal(balloon.tail.head, 1);
  });
});


});
