const assert = require("assert");
       const BigBootyScript =
          require("../src/bigbootyscript");

 describe ("BigBootyScript") {
   describe ("expandImports") {
     it ("expands single imports") {
       let source = "inta Bubble;"
       let path = "../src"
       let result = BigBootyScript
         .expandImports(source, path);
       assert.equal(result, "inta Bubble = require(\"./bubble.js\");")

     }
     it ("expands gang imports");
   }
 }
