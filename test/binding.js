import assert from "node:assert";
import { it, describe } from "node:test";
import Keyword from "../src/keyword.js";
import { rootBinding } from "../src/binding.js";
import { List } from "../src/list.js";

describe("rootBinding", function () {

   describe("get", function () {
     it("gets from object", function () {
       let obj = { name: { first: "Kermit" }};
       assert.equal(rootBinding
         .get.call(rootBinding,
           (List.make(obj, "name", "first"))),
         "Kermit");
       assert.deepEqual(rootBinding.get
          .call(rootBinding,
                List.make(obj, "name")),
           { first: "Kermit" });
     });
   });

  describe("send", function () {
    it("sends messages to objects", function () {
      const list = List.make(1, Keyword.for("toString"))
      assert.equal(rootBinding.send(...list), "1");
    });

    it("sends messages to objects", function () {
      let meatballsCalled = false;

      const list = List.make(
        {
          meatballs: function () {
            meatballsCalled = true;
          }
        },
        Keyword.for("meatballs")
      );

      assert(!meatballsCalled);
      rootBinding.send(...list);
      assert(meatballsCalled);
    });
  });
});
