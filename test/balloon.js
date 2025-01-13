const assert = require("assert");
const Balloon = require("../src/balloon");
// import Balloon from "../src/balloon";

 describe("Balloon", function() {
    it("makes balloons", function() {
       let balloon = new Balloon();
       assert(balloon);
    });
 });
