const assert = require("assert");
const Range = require("../src/range");

describe("Range", function () {

  it("creates a range that counts to 10", function () {
    const range = new Range(10);
    assert.deepEqual(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [...range]);
  });

});
