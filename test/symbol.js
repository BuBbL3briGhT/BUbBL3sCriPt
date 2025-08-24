'use strict'

// Mocha test suite for Symbol class/module.
//
// To run individually:
//
//   npx mocha test/symbol.js
//
// To run as part of project tests:
//
//   npm test
//

const assert = require("assert");
const Ṣymbol = require("../src/symbol");

describe("Ṣymbol", function () {
   describe(".for(key)", function () {
     it("return symbol for key", function () {
       const symbol = Ṣymbol.for("symbol");
       assert(symbol instanceof Ṣymbol);
       assert.equal(symbol.value, "symbol");
     });
   });
});
