const assert = require("assert");
const   fs   = require("fs");
const  Yaml  = require("yaml");

const parse = require("../src/parse");
const Stack = require("../src/stack");
const List = require("../src/list");
const Keyword = require("../src/keyword");
const {type} = require("../src/fns"); // Assuming fns is a valid module
const Symbol = require("../src/symbol");
const Quoted = require("../src/quoted");

// Use Stack's static methods.
const { peek, pop, make: makeStack, from:
  stackFrom } = Stack;

const symbol = Symbol.for("symbol"),
      a = Symbol.for("a"),
      b = Symbol.for("b"),
      c = Symbol.for("c");

const keyword = Keyword.for("keyword");

let data = fs.readFileSync("test/fixtures/parser.yml", 'utf8');
let fixtures = Yaml.parse(data);

describe("parse(string)", () => {

  it("parses (1 2 3) into the correct AST structure", () => {
    const ast = parse("(1 2 3)");
    const expectedAst = makeStack(1, 2, 3);
    assert.deepEqual(peek(ast), expectedAst, "AST for (1 2 3) should be a stack of 1, 2, 3");
  });

  it("parses a quoted bubble", function () {
    let m = parse("'(a b c)")
    assert(peek(m) instanceof Quoted);
  });

  itParses("symbol", {expects: symbol});
  itParses(":keyword",
    {expects: keyword});
  itParses("(1 2 3)",
    {expects: makeStack(1, 2, 3)});
  itParses("(a b c)",
    {expects: makeStack(a, b, c)});
  itParses("(a 3 b 2 c 1)",
    {expects: makeStack(a, 3, b, 2, c, 1)});

  itParses2("a nested bubble", "(1 (2))",
     stackFrom([1, stackFrom([2])]));


  // (define (abs x)
  //   (if (< x 0)
  //       (- x)
  //       x))
  itParsesFixture("abs",
    { expects:
        stackFrom([Symbol.for("define"),
          stackFrom([Symbol.for("abs"),
                     Symbol.for("x")]),
          stackFrom([Symbol.for("if"),
            stackFrom([Symbol.for("<"),
              Symbol.for("x"), 0]),
            stackFrom([Symbol.for("-"),
              Symbol.for("x")]),
            Symbol.for("x")])])}); // Changed Bubble.from to stackFrom

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
    assert.deepEqual(peek(p), expects);
  });
}

function itParses(s, {expects}) {
  it(`parses "${s}"`, function() {
    let p = parse(s);
    assert.deepEqual(peek(p), expects);
  });
}

function itParses2(desc, s, expects) {
  it(`correctly parses ${desc}`, function() {
    let p = parse(s);
    assert.deepEqual(peek(p), expects);
  });
}

assertParse = function(inputString, expectedAst) { // stRinG -> inputString, eXpEct3d -> expectedAst
  let resultAst = parse(inputString); // icKy -> resultAst
  assert.deepEqual(peek(resultAst), expectedAst); // assert.equal -> assert.deepEqual
};

assertBubble = function(bubble) {
  assert(type(bubble) === 'Bubble');
};

assertBubblesEqual = function(actual, expected) {
  assert.deepEqual(actual, expected);
};

describe("Parser Error Handling", () => {
  it("throws NoMatchError for mismatched closing delimiter in bubble", () => {
    const input = "(1 2]";
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Token type ] did not match expected token type )"));
      assert(error.message.includes("line 1, column 5")); // Assuming ']' is at 1,5
      return true;
    });
  });

  it("throws NoMatchError for mismatched closing delimiter in balloon", () => {
    const input = "[1 2)";
    assert.throws(() => parse(input), (error) => {
      assert.equal(error.name, "NoMatchError");
      assert(error.message.includes("Token type ) did not match expected token type ]"));
      assert(error.message.includes("line 1, column 5"));
      return true;
    });
  });

  it("throws NoMatchError for incomplete bubble list (EOF)", () => {
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

  it("throws NoMatchError for incomplete balloon list (EOF)", () => {
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

  it("throws NoMatchError when item expected in bubble, but EOF", () => {
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

  it("throws NoMatchError for unexpected token where item is expected in bubble", () => {
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

  it("throws ParsingError for quote at EOF", () => {
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

  it("throws ParsingError for quote with no preceding item in a list", () => {
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

  it("throws NoMatchError for unclosed list with items then EOF", () => {
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

  it("throws NoMatchError for list with only a mismatched closer", () => {
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
  it("parses empty string to undefined (or specific empty representation)", () => {
    // tokenize("") returns no tokens (List.air / undefined for tokens list)
    // parseTokens(undefined) returns undefined.
    assert.strictEqual(parse(""), undefined, "Parsing an empty string should result in undefined");
  });

  it("parses string with only whitespace and comments to undefined", () => {
    assert.strictEqual(parse("  \n#comment\t\n   "), undefined, "Parsing whitespace/comment only string should be undefined");
  });

  it("parses multiple top-level expressions into a single list", () => {
    // parse("1 2 (a b)") should result in a list: (1 2 (a b))
    // The outer list is the result of parse(). peek() gives the first element.
    // So, parse("1 2 (a b)") returns a list containing 1, then 2, then list (a b)
    // Expected structure: 1 -> 2 -> (a -> b -> air) -> air
    // makeList(c, b, a) creates a -> b -> c -> air
    const ast = parse("1 2 (a b)");
    const expected = makeList( // This is the outer list of expressions
        stackFrom([Symbol.for("a"), Symbol.for("b")]), // Parsed as (b a), then inverted. So (a b)
        2,
        1
    );
    // parse("1 2 (a b)") results in list (1 2 (a b))
    // makeList( (b a), 2, 1) -> 1 -> 2 -> (a b)
    assert.deepEqual(ast, expected, "AST for multiple top-level expressions");
  });

  it("parses a single atom symbol correctly", () => {
    const ast = parse("atom");
    // parse("atom") returns a list containing one symbol: (atom)
    const expected = makeList(Symbol.for("atom"));
    assert.deepEqual(ast, expected, "AST for single atom symbol");
  });

  it("parses a single atom number correctly", () => {
    const ast = parse("123");
    // parse("123") returns a list containing one number: (123)
    const expected = makeList(123);
    assert.deepEqual(ast, expected, "AST for single atom number");
  });

  it("parses a complex nested structure with quotes, bubbles, and balloons (arrays)", () => {
    const input = "'(a (b :c [1 \"s\" 'x]))";
    // Expected AST structure:
    // Quoted(
    //   List(
    //     Symbol(a),
    //     List(
    //       Symbol(b),
    //       Keyword(c),
    //       List( // Balloon becomes a list
    //         1,
    //         "s",
    //         Quoted(Symbol(x))
    //       )
    //     )
    //   )
    // )
    // parse returns a list containing one item: the Quoted expression.
    // So peek(ast) is the Quoted(...) object.

    const ast = parse(input);
    const expected = makeList( // Outer list from parse()
      new Quoted(
        makeList( // list (a ...)
          stackFrom([ // list [1 "s" 'x] -- assuming balloons are parsed as lists
            new Quoted(Symbol.for("x")),
            "s",
            1
          ]),
          Keyword.for("c"),
          Symbol.for("b")
        ),
        Symbol.for("a")
      )
    );
    assert.deepEqual(ast, expected, "AST for complex nested structure");
  });

  it("parses another complex structure: (define x '(1 [2 keyword]))", () => {
    const input = "(define x '(1 [2 :key]))";
    // AST: List(Symbol(define), Symbol(x), Quoted(List(1, List(2, Keyword(key)))))
    const ast = parse(input);
    const expected = makeList( // outer list from parse
      makeList( // list (define ...)
        new Quoted(
          makeList( // list (1 ...)
            stackFrom([ // list [2 :key]
              Keyword.for("key"),
              2,
            ]),
            1
          )
        ),
        Symbol.for("x"),
        Symbol.for("define")
      )
    );
    assert.deepEqual(ast, expected, "AST for (define x '(1 [2 :key]))");
  });
});
