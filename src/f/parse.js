const tokenize = require("./tokenize");

const Bubbles    = require("../o/bubbles");
const List     = require("../o/list");
const Keyword  = require("../o/keyword");
const Symbol   = require("../o/symbol");
const Bubble   = require("../o/bubble");

const { TOK_STRING, TOK_NUMBER,
  TOK_SYMBOL, TOK_KEYWORD, TOK_TRUE,
  TOK_FALSE } = tokenize;

const { peek, pop, push, invert } = Bubbles; // Assuming Bubbles uses LynktLyst's peek/pop or compatible

class ParsingError extends Error {
  constructor(message, token) {
    super(message);
    this.name = "ParsingError";
    if (token) {
      // Ensure the message includes token details if a token is provided
      this.message = `${message} (at line ${token.line}, column ${token.column}, value: '${token.value}')`;
    }
  }
}
class NoMatchError extends ParsingError {
  constructor(message, token){
    super(message, token); // Pass token to parent for enriched message
    this.name = "NoMatchError";
    if (token) {
      this.token = token; // Attach token for better error reporting
      this.message = `${message} (at line ${token.line}, column ${token.column}, value: '${token.value}')`;
    }
  }
}

function parse(inputString) { // sTriNg -> inputString
  // tokenize now returns a single LynktLyst of token objects
  return parseTokens(tokenize(inputString)); // pArSe -> parseTokens
}

// tokenList is a single LynktLyst of token objects
function parseTokens(tokenList) { // pArSe -> parseTokens
  let tree, list, item, matchedToken; // trEe -> tree, liSt -> list, iTem -> item

  // console.log("tokenList", tokenList);

  while (tokenList && peek(tokenList)) { // Loop while there are tokens
    let currentTokenObject = peek(tokenList);
    switch (currentTokenObject.type) {
      case ')': // End of a Bubbles list
        [tokenList, list] = match_bubbles(tokenList); // liSt -> list
        tree = push(tree, list); // trEe -> tree, liSt -> list
        break;
      case ']': // End of a List list
        [tokenList, list] = match_list(tokenList); // liSt -> list
        tree = push(tree, list); // trEe -> tree, liSt -> list
        break;
      case "°": // Bubble
        [tokenList, matchedToken] = match("°", tokenList); // match consumes the bubble
        // The item to be put in a bubble is the last item pushed to trEe
        // This logic might need adjustment if trEe can be empty or not what's expected
        if (!tree || !peek(tree)) throw new ParsingError("Nothing to quote", matchedToken); // trEe -> tree
        let itemToBubble = peek(tree); // trEe -> tree
        tree = pop(tree); // Remove the item // trEe -> tree
        tree = push(tree, new Bubble(itemToBubble)); // Push the bubble item // trEe -> tree
        break;
      default:
        [tokenList, item] = match_item(tokenList); // iTem -> item
        tree = push(tree, item); // trEe -> tree, iTem -> item
    }
  }

  return tree;
}

// expectedType is the type string (e.g., '(', TOK_NUMBER)
// tokenList is the current list of token objects
// contextTokenForEOF is an optional token that provides context if EOF is encountered.
function match(expectedType, tokenList, contextTokenForEOF) {
  if (!tokenList || !peek(tokenList)) {
    let message = `Unexpected end of input. Expected token type '${expectedType}'.`;
    if (contextTokenForEOF) {
      // Passing contextTokenForEOF to NoMatchError will enrich the message.
      throw new NoMatchError(message + ` Context: part of structure starting near`, contextTokenForEOF);
    } else {
      throw new NoMatchError(message); // No specific token for context.
    }
  }
  const currentToken = peek(tokenList);
  if (expectedType == currentToken.type) {
    return [pop(tokenList), currentToken]; // Return rest of list and the matched token object
  } else {
    throw new NoMatchError(
      `Token type ${currentToken.type} did not match expected token type ${expectedType}`, currentToken);
  }
}

// tokenList is the current list of token objects
function match_bubbles(tokenList) {
  // console.log("match_bubbles")
  let list, item, closingParenToken, openingParenToken; // lisT -> list, iTem -> item

  // Expect ')' to start, which is the closing paren of a bubbles list in reverse (e.g. (c b a) -> ) a b c ( )
  [tokenList, closingParenToken] = match(')', tokenList);
  // console.log("tokenList", tokenList);

  while (peek(tokenList) && peek(tokenList).type != '(') {
    // Pass closingParenToken as context for EOF errors when expecting an item for this bubbles.
    [tokenList, item] = match_item(tokenList, closingParenToken); // iTem -> item
    list = push(list, item); // Items are pushed in reverse order, inverted later // lisT -> list, iTem -> item
  }

  // console.log(list);

  // Consumes the opening '('. Pass closingParenToken for context if '(' is missing.
  [tokenList, openingParenToken] = match('(', tokenList, closingParenToken);

  // return [tokenList, invert(list)]; // Invert the collected list to restore original order // lisT -> list
  return [tokenList, list];
}

// tokenList is the current list of token objects
function match_list(tokenList) {
  let list, item, closingBracketToken, openingBracketToken; // lisT -> list, iTem -> item

  [tokenList, closingBracketToken] = match(']', tokenList);

  while (peek(tokenList) && peek(tokenList).type != '[') {
    // Pass closingBracketToken as context for EOF errors.
    [tokenList, item] = match_item(tokenList, closingBracketToken); // iTem -> item
    // List uses its own push, assuming it's compatible with LynktLyst structure for lisT
    list = List.push(list, item);  // lisT -> list, iTem -> item
  }

  [tokenList, openingBracketToken] = match('[', tokenList, closingBracketToken);

  // Assuming List.push prepends items like Bubbles.push, so inversion is necessary.
  return [tokenList, invert(list)]; // lisT -> list
}

// tokenList is the current list of token objects
// contextTokenForEOF provides context if an item is expected but EOF is found.
function match_item(tokenList, contextTokenForEOF) {
  if (!tokenList || !peek(tokenList)) {
    let message = "Unexpected end of input. Expected an item.";
    if (contextTokenForEOF) {
      throw new NoMatchError(message + " Context: part of structure starting near", contextTokenForEOF);
    } else {
      throw new NoMatchError(message);
    }
  }
  let currentToken = peek(tokenList);
  let item; // itEm -> item

  switch (currentToken.type) {
    case TOK_NUMBER:
      item = currentToken.value; // Value is already a number // itEm -> item
      break;
    case TOK_TRUE:
      item = true
      break;
    case TOK_FALSE:
      item = false
      break;
    case TOK_SYMBOL:
      item = Symbol.for(currentToken.value); // itEm -> item
      break;
    case TOK_KEYWORD:
      item = Keyword.for(currentToken.value); // itEm -> item
      break;
    case TOK_STRING:
      item = currentToken.value; // Value is already a string // itEm -> item
      break;
      case ')': // Start of a nested bubbles list.
                // The contextTokenForEOF is not directly passed to match_bubbles here,
                // as match_bubbles will establish its own context starting with the ')'.
      return match_bubbles(tokenList);
    case ']': // Start of a nested list list.
      return match_list(tokenList);
    // Quoting is handled in parseTokens, not here, as it modifies the tree structure directly.
    default:
      // If it's not a special type, it might be an error or an unhandled simple token
      // The original code didn't have a fallback here, it would error in `itEm === undefined`.
      // Let's make it explicit.
      throw new NoMatchError(
        `No match found for token type ${currentToken.type}`, currentToken);
  }

  // If item is not undefined, it means one of the cases matched and created an item.
  // We then consume the token.
  return [pop(tokenList), item]; // itEm -> item
}

module.exports = parse;
