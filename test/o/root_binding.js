const assert = require("assert");
const { rootBinding, List} = require("../../src/BubbleScript");

describe("rootBinding", function () {
   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get(List.make(obj, "name", "first")),
         "Kermit");
       assert.deepEqual(rootBinding
         .get(List.make(obj, "name")),
         { first: "Kermit" });
     });
   });
});
