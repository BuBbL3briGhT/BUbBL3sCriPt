'use strict'

import assert from "node:assert";
import { describe, it } from "node:test";
import Ṣymbol from "../src/symbol.js";

describe("Ṣymbol", function () {
   describe(".for(key)", function () {
     it("return symbol for key", function () {
       const symbol = Ṣymbol.for("symbol");
       assert(symbol instanceof Ṣymbol);
       assert.equal(symbol.value, "symbol");
     });

     it("return symbol for key (toString, special case)", function () {
       const symbol = Ṣymbol.for("toString");
       assert(symbol instanceof Ṣymbol);
       assert.equal(symbol.value, "toString");
     });
   });
});
