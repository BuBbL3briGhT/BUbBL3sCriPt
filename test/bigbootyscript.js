const assert = require("assert");
       const BigBootyScript =
          require("../src/bigbootyscript");

// const buja = require("../src/buja");
const {list} = require("../src/bigbootyscript");

 describe ("BigBootyScript", function () {
   describe ("expandImports", function () {
     it ("expands single imports", function () {
       let source = "inta Bubble;"
       let path = "../src"
       let result = BigBootyScript
         .expandImports(source, path);
       assert.equal(result, "inta Bubble = require(\"./bubble.js\");")
     });
     it ("expands gang imports");
   });

   describe ("list", function () {
     it.only("list all unique emoji symbols", function () {
       list("");
     });
   });
 });
