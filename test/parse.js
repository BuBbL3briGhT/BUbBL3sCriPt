const assert = require("assert"); const   fs   = require("fs");
const  Yaml  = require("yaml");

const { parse } = require("../src/parse");
const List = require("../src/list");
const Vector = require("../src/vector");
const Keyword = require("../src/keyword");
const Ṣymbol = require("../src/symbol");
const Bubble = require("../src/bubble");

const { type } = require("../src/z/fns"); // Assuming fns is a valid module

const symbol = Ṣymbol.for("symbol"),
      a = Ṣymbol.for("a"),
      b = Ṣymbol.for("b"),
      c = Ṣymbol.for("c");

const keyword = Keyword.for("keyword");

let data = fs.readFileSync("test/fixtures/parser.yml", 'utf8');
let fixtures = Yaml.parse(data);

describe("parse(string)", () => {

  it("parses (1 2 3) into the correct AST structure", () => {
    const ast = parse("(1 2 3)");
    const expectedAst = List.make(1, 2, 3);
    assert.deepEqual(ast.peek(), expectedAst, "AST for (1 2 3) should be a list of 1, 2, 3");
  });

  it("parses (not true) into the correct AST structure", () => {
    let not = Ṣymbol.for("not");
    const ast = parse("(not true)");
    const expectedAst = List.make(not, true);
    assert.deepEqual(ast.peek(), expectedAst, "AST for (not true) should be a list of not, true");
  });

  it("parses a bubble of list", function () {
    let m = parse("°(a b c)")
    assert(m.peek() instanceof Bubble);
  });

  itParses("symbol", {expects: symbol});
  itParses(":keyword",
    {expects: keyword});
  itParses("(1 2 3)",
    {expects: List.make(1, 2, 3)});
  itParses("(a b c)",
    {expects: List.make(a, b, c)});
  itParses("(a 3 b 2 c 1)",
    {expects: List.make(a, 3, b, 2, c, 1)});

  itParses2("a nested bubble", "(1 (2))",
     List.from([1, List.from([2])]));


  // (define (abs x)
  //   (if (< x 0)
  //       (- x)
  //       x))
  itParsesFixture("abs",
    { expects:
        List.from([Ṣymbol.for("define"),
          List.from([Ṣymbol.for("abs"),
                     Ṣymbol.for("x")]),
          List.from([Ṣymbol.for("if"),
            List.from([Ṣymbol.for("<"),
              Ṣymbol.for("x"), 0]),
            List.from([Ṣymbol.for("-"),
              Ṣymbol.for("x")]),
            Ṣymbol.for("x")])])}); // Changed Bubble.from to List.from

  // it('should match a single keyword as a bubble', function() {
  //   assertParse(":keyword",
  //     Bubble.blow(Keyword.for("keyword")));
  //   // assertParse(":kEyWoRd",
  //     // Bubble.blow(Keyword.for("kEyWoRd")));
  //   // assertParse(":maRbLes",
  //     // Bubble.blow(Keyword.for("maRbLes")));
  //   // assertParse(":good :bAD\n:ULgY",
  //     // Bubble.blow(Keyword.for("good"),
  //     //   Keyword.for("bAD")),
  //     // Bubble.blow(Keyword.for("ULgY")));
  // });

});

function itParsesFixture(key, {expects}) {
  it(`parses fixture "${key}"`, function() {
    let s = fixtures[key];
    let p = parse(s);
    assert.deepEqual(p.peek(), expects);
  });
}

function itParses(s, {expects}) {
  it(`parses "${s}"`, function() {
    let p = parse(s);
    assert.deepEqual(p.peek(), expects);
  });
}

function itParses2(desc, s, expects) {
  it(`correctly parses ${desc}`, function() {
    let p = parse(s);
    assert.deepEqual(p.peek(), expects);
  });
}

assertParse = function(inputString, expectedAst) { // stRinG -> inputString, eXpEct3d -> expectedAst
  let resultAst = parse(inputString); // icKy -> resultAst
  assert.deepEqual(resultAst.peek(), expectedAst); // assert.equal -> assert.deepEqual
};

assertBubble = function(bubble) {
  assert(type(bubble) === 'Bubble');
};

assertListEqual = function(actual, expected) {
  assert.deepEqual(actual, expected);
};

describe("Parser Error Handling", () => {
  it.skip("throws NoMatchError for mismatched closing delimiter in bubble", () => {
    const input = "(1 2]";
    assert.throws(() => parse(input), (error) => {
      // console.log(error);

      assert.equal(error.name, "NoMatchError");
      // assert(error.message.includes("Token type ] did not match expected token type )"));
      assert(error.message.includes("No match found for token type ("));
      // assert(error.message.includes("line 1, column 5")); // Assuming ']' is at 1,5
      assert(error.message.includes("(at line 1, column 1, value: '(')"));
      return true;
    });
  });

  it.skip("throws NoMatchError for mismatched closing delimiter in balloon", () => {
    const input = "[1 2)";
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Token type ) did not match expected token type ]"));
      assert(error.message.includes("line 1, column 5"));
      return true;
    });
  });

  it.skip("throws NoMatchError for incomplete bubble vector (EOF)", () => {
    const input = "(1 2"; // Parsed as ) 2 1 ( by pArSe logic
                       // Error occurs when matching final '(', context is ')'
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Unexpected end of input. Expected token type '('."));
      assert(error.message.includes("Context: part of structure starting near"));
      assert(error.message.includes("line 1, column 1")); // Refers to the initial ')' token
      assert(error.message.includes("value: '('")); // The value of the context token is '(' because tokenizer produces value=type for simple tokens
      return true;
    });
  });

  it.skip("throws NoMatchError for incomplete balloon vector (EOF)", () => {
    const input = "[1 2"; // Parsed as ] 2 1 [
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Unexpected end of input. Expected token type '['."));
      assert(error.message.includes("Context: part of structure starting near"));
      assert(error.message.includes("line 1, column 1")); // Refers to the initial ']' token
      assert(error.message.includes("value: '['"));
      return true;
    });
  });

  it.skip("throws NoMatchError when item expected in bubble, but EOF", () => {
    const input = "("; // Parsed as ) (
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Unexpected end of input. Expected an item."));
      assert(error.message.includes("Context: part of structure starting near"));
      assert(error.message.includes("line 1, column 1")); // Refers to initial ')'
      assert(error.message.includes("value: '('"));
      return true;
    });
  });

  it.skip("throws NoMatchError for unexpected token where item is expected in bubble", () => {
    const input = "(1 . 2)"; // Tokenizer produces '(', 1, '.', 2, ')'
                           // Parser (reversed) sees ')', 2, '.', 1, '('
                           // match_item for '.' will fail
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("No match found for token type ."));
      assert(error.message.includes("line 1, column 4")); // '.' is at 1,4
      assert(error.message.includes("value: '.'"));
      return true;
    });
  });

  it.skip("throws ParsingError for quote at EOF", () => {
    const input = "'";
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "ParsingError");
      // The error is "Nothing to quote". The token passed is the quote token itself.
      assert(error.message.includes("Nothing to quote"));
      assert(error.message.includes("line 1, column 1"));
      assert(error.message.includes("value: '''"));
      return true;
    });
  });

  it.skip("throws ParsingError for quote with no preceding item in a vector", () => {
    const input = "(')"; // Tokens: ')', ''', '('
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "ParsingError");
      // pArSe attempts to handle ' after processing ')'.
      // At this point, trEe is (Bubble containing the result of match_bubble).
      // No, pArSe sees ')', calls match_bubble. match_bubble sees '''. Calls match_item.
      // match_item for ' is not defined, should be handled by pArSe.
      // Let's trace pArSe: currentTokenObject.type is ')'. Calls match_bubble.
      // match_bubble: consumes ')'. Loop: peek is '''. Calls match_item.
      // match_item: currentToken.type is '''. Throws "No match found for token type '"
      assert.equal(error.name, "NoMatchError"); // Corrected based on trace
      assert(error.message.includes("No match found for token type '"));
      assert(error.message.includes("line 1, column 2")); // "'" is at 1,2
      assert(error.message.includes("value: '''"));
      return true;
    });
  });

  it.skip("throws NoMatchError for unclosed vector with items then EOF", () => {
    const input = "(a b"; // Tokens: ')', 'b', 'a', '(' -- error expecting '(' got EOF
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Unexpected end of input. Expected token type '('."));
      assert(error.message.includes("Context: part of structure starting near"));
      assert(error.message.includes("line 1, column 1")); // Context is the initial ')' token
      assert(error.message.includes("value: '('"));
      return true;
    });
  });

  it.skip("throws NoMatchError for vector with only a mismatched closer", () => {
    const input = "(]"; // Tokens: ']', '(' -- error expecting ')' got ']'
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Token type ] did not match expected token type )"));
      assert(error.message.includes("line 1, column 2")); // ']' is at 1,2
      return true;
    });
  });

});

describe("Parser Structure and Edge Case Tests", () => {
  it.skip("parses empty string to undefined (or specific empty representation)", () => {
    // tokenize("") returns no tokens (Vector.air / undefined for tokens vector)
    // parseTokens(undefined) returns undefined.
    assert.strictEqual(parse(""), undefined, "Parsing an empty string should result in undefined");
  });

  it.skip("parses string with only whitespace and comments to undefined", () => {
    assert.strictEqual(parse("  \n#comment\t\n   "), undefined, "Parsing whitespace/comment only string should be undefined");
  });

  it.skip("parses multiple top-level expressions into a single vector", () => {
    // parse("1 2 (a b)") should result in a vector: (1 2 (a b))
    // The outer vector is the result of parse(). peek() gives the first element.
    // So, parse("1 2 (a b)") returns a vector containing 1, then 2, then vector (a b)
    // Expected structure: 1 -> 2 -> (a -> b -> air) -> air
    // Vector.make(c, b, a) creates a -> b -> c -> air
    const ast = parse("1 2 (a b)");
    const expected = Vector.make( // This is the outer vector of expressions
        List.from([Ṣymbol.for("a"), Ṣymbol.for("b")]), // Parsed as (b a), then inverted. So (a b)
        2,
        1
    );
    // parse("1 2 (a b)") results in vector (1 2 (a b))
    // Vector.make( (b a), 2, 1) -> 1 -> 2 -> (a b)
    assert.deepEqual(ast, expected, "AST for multiple top-level expressions");
  });

  it.only("parses a single atom symbol correctly", () => {
    const ast = parse("atom").toList();
    // parse("atom") returns a vector containing one symbol: (atom)
    const expected = List.make(Ṣymbol.for("atom"));
    assert.deepEqual(ast, expected, "AST for single atom symbol");
  });

  it("parses a single atom number correctly", () => {
    const ast = parse("123");
    // parse("123") returns a vector containing one number: (123)
    const expected = List.make(123);
    assert.deepEqual(ast, expected, "AST for single atom number");
  });

  // it.only("parses a complex nested structure with quotes, list, and balloons (arrays)", () => {
  //   const input = "'(a (b :c [1 \"s\" 'x]))";
  //   // Expected AST structure:
  //   // Quoted(
  //   //   Vector(
  //   //     Ṣymbol(a),
  //   //     Vector(
  //   //       Ṣymbol(b),
  //   //       Keyword(c),
  //   //       Vector( // Balloon becomes a vector
  //   //         1,
  //   //         "s",
  //   //         Quoted(Ṣymbol(x))
  //   //       )
  //   //     )
  //   //   )
  //   // )
  //   // parse returns a vector containing one item: the Quoted expression.
  //   // So ast.peek() is the Quoted(...) object.

  //   const ast = parse(input);
  //   const expected = List.make( // Outer vector from parse()
  //     new Quoted(
  //       Vector.make( // vector (a ...)
  //         List.from([ // vector [1 "s" 'x] -- assuming balloons are parsed as vectors
  //           new Quoted(Ṣymbol.for("x")),
  //           "s",
  //           1
  //         ]),
  //         Keyword.for("c"),
  //         Ṣymbol.for("b")
  //       ),
  //       Ṣymbol.for("a")
  //     )
  //   );
  //   assert.deepEqual(ast, expected, "AST for complex nested structure");
  // });

  it("parses a semi complex vector", () => {
    const input = "[1 \"s\" °x]";
    // const input = "[°x]";
    // const input = "[x]";
    // const input = "[1]";
    const ast = parse(input);
    // console.log(ast);
    const expected = List.make( // Outer list from parse()
      Vector.make(
        1,
        "s",
        new Bubble(Ṣymbol.for("x"))
      )
    );
    assert.deepEqual(ast, expected, "AST for semi complex vector ");
  });

  it.skip("parses a complex nested structure with quotes, list, and balloons (arrays)", () => {
    const input = "°(a (b :c [1 \"s\" °x]))";
    // Expected AST structure:
    // Bubble(
    //   Vector(
    //     Ṣymbol(a),
    //     Vector(
    //       Ṣymbol(b),
    //       Keyword(c),
    //       Vector( // Balloon becomes a vector
    //         1,
    //         "s",
    //         Quoted(Ṣymbol(x))
    //       )
    //     )
    //   )
    // )
    // parse returns a vector containing one item: the Quoted expression.
    // So ast.peek() is the Quoted(...) object.

    const ast = parse(input);
    console.log(ast);
    const expected = List.make( // Outer vector from parse()
      new Bubble(
        List.make(
          Ṣymbol.for("a"),
          List.make(
            Ṣymbol.for("b"),
            Keyword.for("c"),
            Vector.make(// vector [1 "s" °x] -- assuming balloons are parsed as vectors
              1,
              "s",
              new Bubble(Ṣymbol.for("x"))
            ),
          )
        )
      )
    );
    assert.deepEqual(ast, expected, "AST for complex nested structure");
  });

  it.skip("parses another complex structure: (define x '(1 [2 keyword]))", () => {
    const input = "(define x '(1 [2 :key]))";
    // AST: Vector(Ṣymbol(define), Ṣymbol(x), Quoted(Vector(1, Vector(2, Keyword(key)))))
    const ast = parse(input);
    const expected = Vector.make( // outer vector from parse
      Vector.make( // vector (define ...)
        new Quoted(
          Vector.make( // vector (1 ...)
            List.from([ // vector [2 :key]
              Keyword.for("key"),
              2,
            ]),
            1
          )
        ),
        Ṣymbol.for("x"),
        Ṣymbol.for("define")
      )
    );
    assert.deepEqual(ast, expected, "AST for (define x '(1 [2 :key]))");
  });
});
