const assert = require("assert");
const sinon = require("sinon");
const bubls = require("../src/bubls");

const { ėval } = bubls;

describe("send", function () {
  before(function () {
    sinon.replace(console, "log",
      sinon.fake());
  });
  after(function () {
    sinon.restore();
  });
  it("send message to object", function () {
    assertEvalTo(
      "(send console :log \"Holà Marcai!o\")");
    assert(console.log.
      calledWith("Holà Marcai!o"));
    assertEvalTo(
      "(send console \"log\" \"Holà Beeba!\")");
    assert(console.log.
      calledWith("Holà Beeba!"));
  });
});

describe("push", function () {
  it("pushes", function () {
    ėval("(push [1 2] 3)");
  });
});

describe("puts", function () {

  before(function () {
    sinon.replace(console, "log", sinon.fake());
  });
  after(function () { sinon.restore(); });

  it("logs to console", function () {
    ėval('(puts "hi")');
    assert(console.log.calledWith("hi"));
  });

  it.only("Acepta múltiples parámetros", () => {
    ėval("(puts 1 2 3)");
    assert(console.log.calledWith(1, 2, 3));
  });

});


describe("loop", function () {
  before(function () {
    sinon.replace(console, "log",
      sinon.fake());
  });
  after(function () {
    sinon.restore();
  });
  it("loops", function () {
    ėval('(loop [a 0] ' +
            '(puts a) ' +
            '(unless (> a 5) ' +
              '(recur [a (+ a 1)])))');
    assert(console.log.calledWith(0));
    assert(console.log.calledWith(1));
    assert(console.log.calledWith(2));
    assert(console.log.calledWith(3));
    assert(console.log.calledWith(4));
    assert(console.log.calledWith(5));
    assert(console.log.calledWith(6));
  });
});

describe("let", function () {
   it("🌊", function() {
     assertEvalTo("(let [a 5] a)", 5);
     assertEvalTo("(let [a 5] 3 a)", 5);
     assertEvalTo("(let [a 5 b 4] (+ a b))", 9);
     assertEvalTo("(let [a 5 b (* a 3)] (+ a b))", 20);
   });
});

describe("if", function () {
   it("🫠", function() {
     assertEvalTo("(if true 1 2)", 1);
     assertEvalTo("(if false 1 2)", 2);
     // assertEvalTo("(if true)", undefined);
     // assertEvalTo("(if false)", undefined);
     assertEvalTo("(if true 3)", 3);
     assertEvalTo("(if false 3)", undefined);
   });
});

describe("unless", function () {
   it("😊", function() {
     assertEvalTo("(unless true 1 2)", 2);
     assertEvalTo("(unless false 1 2)", 1);
     // assertEvalTo("(unless true)", undefined);
     // assertEvalTo("(unless false)", undefined);
     assertEvalTo("(unless true 3)", undefined);
     assertEvalTo("(unless false 3)", 3);
   });
});

describe("and", function () {
  it("😝", function () {
    assertEvalTo("(and 1)", 1);
    assertEvalTo("(and 1 2)", 2);
    assertEvalTo("(and 1 2 3)", 3);
    assertEvalTo("(and false 2)", false);
    assertEvalTo("(and 2 false)", false);
  });
});

describe("or", function () {
  it("😁", function () {
    assertEvalTo("(or 1)", 1);
    assertEvalTo("(or 1 2)", 1);
    assertEvalTo("(or 1 2 3)", 1);
    assertEvalTo("(or false 2)", 2);
    assertEvalTo("(or 2 false)", 2);
    assertEvalTo("(or 0 0)", false);
    assertEvalTo("(or 0 0 0)", false);
    assertEvalTo("(or 0 0 1)", 1);
  });
});

describe(">", function () {
  it("👽", function () {
    assertEvalTo("(> 2 1)", true);
    assertEvalTo("(> 1 2)", false);
  });
});

describe("<", function () {
  it("👽", function () {
    assertEvalTo("(< 1 2)", true);
    assertEvalTo("(< 2 1)", false);
  });
});


describe("true", function () {
   it("true", function() {
     assertEvalTo("true", true);
   });
});

describe("false", function () {
   it("false", function() {
     assertEvalTo("false", false);
   });
});

describe("not", function () {
  it("negates", function () {
    assertEvalTo("(not 1)", false);
    assertEvalTo("(not 0)", true);
    assertEvalTo("(not true)", false);
    assertEvalTo("(not false)", true);
  });
});

describe("fn", function () {
  it("makes a function", function () {
    assertEvalTo("((fn [a] a) 1)", 1);
    assertEvalTo("((fn [[a]] a) [1])", 1);
  });
});

describe("muf", function () {
   it("defines", function () {
     assertEvalTo("a", undefined);
     ėval("(muf a 1)");
     assertEvalTo("a", 1);
   });
});

describe("bubls", function () {
  it("runs tests", function () {
    assertEval("(- 3 2)", 1)
  });
});

describe("+", function () {
  it("sums", function () {
    assertEval("(+ 1)", 1);
    assertEval("(+ 1 1)", 2);
    assertEval("(+ 1 1 1)", 3);
  });
});

describe("-", function () {
  it("subtracts", function () {
    assertEval("(- 1 1)", 0);
    assertEval("(- 2 1)", 1);
    assertEval("(- 3 1)", 2);
    assertEval("(- 1)", 1);
    assertEval("(- 1 1 1)", -1);
  });
});

describe("*", function () {
  it("multiplies", function () {
    assertEval("(* 1 1)", 1);
    assertEval("(* 1 1 1)", 1);
    assertEval("(* 1 1 2)", 2);
    assertEval("(* 1 2 2)", 4);
    assertEval("(* 2 2 2)", 8);
    assertEval("(* 2 2)", 4);
    assertEval("(* 1 2)", 2);
  });
});

describe("/", function () {
  it("divides", function () {
    assertEval("(/ 1 1)", 1);
    assertEval("(/ 1 2)", .5);
    assertEval("(/ 1 2 3)", 0.16666666666666666);
  });
});

describe("=", function () {
  it("tests equality", function () {
    assertEval("(= 0 0)");
    assertEval("(= 0 1)", false);
  });
});

function assertEval(expression, expected=true) {
  assert.equal(ėval(expression), expected,
    expression + " => " + expected);
}

function assertEvalTo(expression, expected) {
  assert.equal(ėval(expression), expected,
    expression + " => " + expected);
}
