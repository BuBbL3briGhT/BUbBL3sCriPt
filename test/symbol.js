const assert = require("assert");
const Symbol = require("../src/symbol");

describe("Symbol", function () {
   describe(".for(key)", function () {
     it("return symbol for key", function () {
       const symbol = Symbol.for("symbol");
       assert(symbol instanceof Symbol);
       assert.equal(symbol.key, "symbol");
     });
   });
});
