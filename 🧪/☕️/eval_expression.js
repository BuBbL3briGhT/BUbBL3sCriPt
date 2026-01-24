import assert from "node:assert";
import { it, describe } from "mocha";
import { evalExpression } from "../../☕️/eval.js";
import Ṣymbol from "../../☕️/symbol.js";
import Bubble from "../../☕️/bubble.js";
import { List } from "../../☕️/list.js";
import { rootBinding } from "../../☕️/binding.js";

describe("evalExpression", function () {
  it("evaluates an expression", function () {
    const result = evalExpression(null, 1);
    assert.equal(result, 1);
  });

  it("evaluates a Ṣymbol", function () {
    const binding = { a: "Apple" };
    const symbol = Ṣymbol.for("a");
    const result = evalExpression(binding, symbol);
    assert.equal(result, "Apple");
  });

  it("evaluates a Bubble", function () {
    const bubble = new Bubble(2);
    const result = evalExpression(null, bubble);
    assert.equal(result, 2);
  });

  it("evaluates a List", function () {
    const list = List.make(Ṣymbol.for("+"), 1, 2);
    const result = evalExpression(rootBinding, list);
    assert.equal(result, 3);
  });
});
