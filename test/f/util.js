const assert = require("assert");
const Util = require("../../src/f/util.js");

describe("Util", function () {
  describe("getStaticMethods", function () {
    it("returns static methods from class", function () {
      class MyClass {
        static myStaticMethod1() {}
        static myStaticMethod2() {}
        instanceMethod() {}
      }

      const staticMethods = Util.getStaticMethods(MyClass);

      assert.deepEqual(staticMethods,
        ['myStaticMethod1',
         'myStaticMethod2']);
    });
  });
});
