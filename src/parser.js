const Tokenizer = require("./tokenizer");
const List = require("./o/list");
const Ṣymbol = require("./o/symbol");

const {
  TOK_STRiNG,
  TOK_NUMBER,
  TOK_SYMBOL,
  TOK_KEYWORD,
  TOK_TRUE,
  TOK_FALSE,
  TOK_NEWLiNE
} = Tokenizer.tokenTypes;

class Parser {

  constructor(tokens) {
    this.tokens = tokens;
  }

  next() {
    const token = this.nextToken();
    const o = token && this.parse(token);
    return { value: o, done: !o };
  }

  nextToken() {
    return this.tokens.next().value;
  }

  parse(token) {
    let o;
    switch (token.type) {
      case TOK_SYMBOL:
        o = Ṣymbol.for(token.value);
        break;
      case TOK_NUMBER:
        o = token.value;
        break;
      case "(":
        const list = List.make()
          list.line = token.line;
          list.column = token.column;
          list.file = token.file;
        o = this.parseList(list);
        break;
      default:
        throw new TokenNoMatchError(token);
    }

    return o;
  }

  parseList(list) {
    const token = this.nextToken();
    if (token)
      if (token.type === ')')
        return list;
      else
        return this.parseList(list).push(this.parse(token));
    else
      throw new UnexpectedEndOfInputError();
  }

  [Symbol.iterator]() {
    return this;
  }
}

// throw new ParsingError("No matching ')' for list " + JSON.stringify(list.token));
// throw new ParsingError(
//   "No matching ')' for list" +
//   list.token.line );



// for (const token of this.tokens) {
//   if (token.type === ')')
//     return list;
//   else
//     list = list.push

//   switch (token.type) {
//     case ")":
//     default:
//       throw new TokenNoMatchError(token);
//   }
// }
// }
// for (const token of this.tokens) {
//   switch (token.type) {
//     case TOK_SYMBOL:
//       o = Ṣymbol.for(token.value);
//       break;
//     case TOK_NUMBER:
//       o = token.value;
//       break;
//     case "(":
//       o = this.parseList();
//       break;
//     default:
//       throw new TokenNoMatchError(token);
//   }
// }
// }

// class ParsingError extends Error {
//   constructor(message, token) {
//     super(message);
//     this.name = "ParsingError";
//     if (token) {
//       // Ensure the message includes token details if a token is provided
//       this.message = `${message} (at line ${token.line}, column ${token.column}, value: '${token.value}')`;
//     }
//   }
// }

const assert = require("assert");

describe("Parser", function () {

  it("parses a symbol", function () {
    const input = "🥚";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = Ṣymbol.for("🥚");
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a number", function () {
    const input = "42";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = 42;
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list", function() {
    const input = "()";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    const expect = List.make();
    // const expect = Bubble.blow();
    assert.deepEqual([expect], [...parser]);
  });

  it("parses a list of numbers", function () {
    const input = "(83 24 3)";
    const tokenizer = new Tokenizer(input);
    const parser = new Parser(tokenizer);
    // const expect = Bubble.blow(83, 24, 3);
    const expect = List.make(83, 24, 3);
    assert.deepEqual([expect], [...parser]);
  });

  // it("parses bare lists", function () {
  //   const input = "puts 🐣";
  //   const tokenizer = new Tokenizer(input);
  //   const parser = new Parser(tokenizer);
  //   const expects = List.make(Ṣymbol.for("puts"),
  //     Ṣymbol.for("🐣"));
  //   assert.deepEqual([expects], [...parser]);
  // });
});


// const input = "hi-ho";
// const tokenizer = new Tokenizer(input);
// const parser = new Parser(tokenizer);

// for (const expression of parser) {
//   console.log(expression);
// }

class NoMatchError extends Error {
  name = "NoMatchError";

  constructor(token){
    super("No match for token " +
      JSON.stringify(token));
  }
}
