const Vector = require("../o/vector");

const TOK_KEYWORD = 'K';
const TOK_NUMBER  = 'N';
const TOK_STRING  = 'S';
const TOK_SYMBOL  = 'Y';
const TOK_TRUE    = 'T';
const TOK_FALSE   = 'F';

function tokenize(inputString) {
  let tokens = Vector.emptyVector;
  let line = 1;
  let column = 1;
  let currentString = inputString; // This string will be sliced

  // Helper to create token objects
  function createToken(type, value) {
    // console.debug("createToken", type, value);
    tokens = tokens.push({ type, value, line, column });
  }

  // Advances head along string by n characters, updating line and column.
  function advance(n = 1) {
    for (let i = 0; i < n; i++) {
      if (currentString[i] === '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
    currentString = currentString.slice(n);
  }

  function tokenizeString() {
    // Ensure regex matches from the start of currentString
    let matchResult = currentString.match(/^"((?:[^\\"]|\\.)*)"/);
    if (matchResult) {
      createToken(TOK_STRING, matchResult[1]);
      advance(matchResult[0].length);
    } else {
      // This should not be reached if called appropriately
      throw new Error(`Unterminated string at ${line}:${column}`);
    }
  }

  function tokenizeNumber() {
    let matchResult = currentString.match(/^\d+(?:\.\d+)?/);
    if (matchResult) {
      createToken(TOK_NUMBER, Number(matchResult[0]));
      advance(matchResult[0].length);
    } else {
      // This should not be reached
      throw new Error(`Invalid number at ${line}:${column}`);
    }
  }

  function tokenizeSymbol() {
    // Original regex: /^([^\s()[\]]*)/, new: /^([^\s()[\]{}:"#'.]+)/
    // The original was more permissive, let's stick to a more specific one for now
    // but ensure it doesn't break existing symbol logic unintentionally.
    // The key is that it must match something if it's called.
    // let matchResult = currentString.match(/^([^\s()[\]{}:"#'.]+)/);

    // console.debug("currentString", currentString);
    let matchResult = currentString.match(/^true/);
    if (matchResult && matchResult[0].length > 0) {
      createToken(TOK_TRUE);
      advance(matchResult[0].length);
    } else {
      let matchResult = currentString.match(/^false/);
      if (matchResult && matchResult[0].length > 0) {
        createToken(TOK_FALSE);
        advance(matchResult[0].length);
      } else {
        // Needing to switch back to the more permissive version in order to get the test for"it should allow dots in symbol name" to pass.
        // The more specfic version is probably the better way to go, but for the exisiting functionality to remain working it currently depends on the symbols being allowed to have dots.
        let matchResult = currentString.match(/^([^\s()[\]]*)/);

        if (matchResult && matchResult[0].length > 0) { // Ensure it matches a non-empty symbol
          createToken(TOK_SYMBOL, matchResult[0]);
          advance(matchResult[0].length);
        } else {
          // If it's not a recognized symbol starter or empty, it's an error.
          // This differs from original, which would make empty symbols or take single chars.
          throw new Error(`Invalid symbol starting with '${currentString[0]}' at ${line}:${column}`);
        }
      }
    }
  }

  function eatComment() {
    let newlineIndex = currentString.indexOf("\n");
    if (newlineIndex > -1) {
      // Advance past the comment line including the newline
      advance(newlineIndex + 1);
    } else {
      // Comment goes to the end of the string
      advance(currentString.length);
    }
  }

  function tokenizeKeyword() {
    // Keywords start with ':' e.g. :foo
    // The regex should match ':' followed by symbol-like characters.
    let matchResult = currentString.match(/^:([^\s()[\]{}:"#'.]+)/);
    if (matchResult) {
      createToken(TOK_KEYWORD, matchResult[1]); // Value is the keyword without ':'
      advance(matchResult[0].length); // Advance by the length of the full token (e.g., ":foo")
    } else {
      // This implies a ':' was not followed by a valid keyword identifier
      throw new Error(`Invalid keyword at ${line}:${column}`);
    }
  }

  while (currentString.length > 0) {
    const char = currentString[0];
    // console.debug("char", char);

    switch (char) {
      case ' ':
      case '\t':
        advance(); // Consumes whitespace, updates column
        break;
      case '\n':
      case '\r':
        advance(); // Consumes newline, updates line and column
        break;
      case '(':
      case ')':
      case '[':
      case ']':
      case '{':
      case '}':
      case '.':
      case "'":
      case "°":
        createToken(char, char); // type and value are the char itself
        advance();
        break;
      case '"':
        tokenizeString();
        break;
      case ':':
        tokenizeKeyword();
        break;
      case '#':
        eatComment();
        break;
      default:
        // Check for numbers before falling back to symbols
        if (/\d/.test(char)) {
          tokenizeNumber();
        } else if (/[^\s()[\]{}:"#'.]/.test(char)) { // Ensure it's a valid start for a symbol
          tokenizeSymbol();
        } else {
          // Handle unexpected characters if necessary, or advance past them
          // For now, this might mean an error or simply advancing
          // Capture current column for accurate error reporting if it's an unexpected char.
          const errorColumn = column;
          throw new Error (`Unexpected character: '${char}' at ${line}:${errorColumn}`);
        }
        break;
    }
  }
  // return tokens.invert();
  return tokens;
}
tokenize.TOK_STRING = TOK_STRING;
tokenize.TOK_NUMBER = TOK_NUMBER;
tokenize.TOK_SYMBOL = TOK_SYMBOL;
tokenize.TOK_KEYWORD = TOK_KEYWORD;
tokenize.TOK_TRUE = TOK_TRUE;
tokenize.TOK_FALSE = TOK_FALSE;

module.exports = tokenize;
