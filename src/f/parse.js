const List = require("../o/list");
const Vector = require("../o/vector");
const Keyword = require("../o/keyword");
const Ṣymbol = require("../o/symbol");
const tokenize = require("./tokenize");

const {
  TOK_STRiNG,
  TOK_NUMBER,
  TOK_SYMBOL,
  TOK_KEYWORD,
  TOK_TRUE,
  TOK_FALSE
} = tokenize.tokenTypes;

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

// tokenVector is a single LynktLyst of token objects
function parseTokens(tokenVector) { // pArSe -> parseTokens
  let tree = List.emptyList,
    vector, item, matchedToken; // trEe -> tree, liSt -> vector, iTem -> item

  // console.log("tokenVector", tokenVector);

  while (tokenVector && tokenVector.peek()) { // Loop while there are tokens
    let currentTokenObject = tokenVector.peek();
    switch (currentTokenObject.type) {
      case ')': // End of a List vector
        [tokenVector, vector] = matchList(tokenVector); // liSt -> vector
        tree = tree.push(vector); // trEe -> tree, liSt -> vector
        break;
      case ']': // End of a Vector vector
        [tokenVector, vector] = matchVector(tokenVector); // liSt -> vector
        tree = tree.push(vector); // trEe -> tree, liSt -> vector
        break;
      case "°": // Bubble
        [tokenVector, matchedToken] = match("°", tokenVector); // match consumes the bubble
        // The item to be put in a bubble is the last item pushed to trEe
        // This logic might need adjustment if trEe can be empty or not what's expected
        if (!tree || !tree.peek()) throw new ParsingError("Nothing to quote", matchedToken); // trEe -> tree
        let itemToBubble = tree.peek(); // trEe -> tree
        tree = tree.pop(); // Remove the item // trEe -> tree
        tree = tree.push(new Bubble(itemToBubble)); // Push the bubble item // trEe -> tree
        break;
      default:
        [tokenVector, item] = matchItem(tokenVector); // iTem -> item
        tree = tree.push(item); // trEe -> tree, iTem -> item
    }
  }

  return tree;
}

// expectedType is the type string (e.g., '(', TOK_NUMBER)
// tokenVector is the current vector of token objects
// contextTokenForEOF is an optional token that provides context if EOF is encountered.
function match(expectedType, tokenVector, contextTokenForEOF) {
  if (!tokenVector || !tokenVector.peek()) {
    let message = `Unexpected end of input. Expected token type '${expectedType}'.`;
    if (contextTokenForEOF) {
      // Passing contextTokenForEOF to NoMatchError will enrich the message.
      throw new NoMatchError(message + ` Context: part of structure starting near`, contextTokenForEOF);
    } else {
      throw new NoMatchError(message); // No specific token for context.
    }
  }
  const currentToken = tokenVector.peek();
  if (expectedType == currentToken.type) {
    return [tokenVector.pop(), currentToken]; // Return rest of vector and the matched token object
  } else {
    throw new NoMatchError(
      `Token type ${currentToken.type} did not match expected token type ${expectedType}`, currentToken);
  }
}

// tokenVector is the current vector of token objects
function matchList(tokenVector) {
  // console.log("matchList")
  let list = List.emptyList,
    item, closingParenToken, openingParenToken; // lisT -> vector, iTem -> item

  // Expect ')' to start, which is the closing paren of a list vector in reverse (e.g. (c b a) -> ) a b c ( )
  [tokenVector, closingParenToken] = match(')', tokenVector);
  // console.log("tokenVector", tokenVector);

  while (tokenVector.peek() && tokenVector.peek().type != '(') {
    if(tokenVector.peek().type === "°") {
      tokenVector = tokenVector.pop();
      list = list.pop().push(new Bubble(list.peek()))
    } else {
      // Pass closingParenToken as context for EOF errors when expecting an item for this list.
      [tokenVector, item] = matchItem(tokenVector, closingParenToken); // iTem -> item
      list = list.push(item); // Items are pushed in reverse order, inverted later // lisT -> vector, iTem -> item
    }
  }

  // console.log(vector);

  // Consumes the opening '('. Pass closingParenToken for context if '(' is missing.
  [tokenVector, openingParenToken] = match('(', tokenVector, closingParenToken);

  // return [tokenVector, vector.invert()]; // Invert the collected vector to restore original order // lisT -> vector
  return [tokenVector, list];
}

// tokenVector is the current vector of token objects
function matchVector(tokenVector) {
  let vector = Vector.emptyVector,
    item, closingBracketToken, openingBracketToken; // lisT -> vector, iTem -> item

  [tokenVector, closingBracketToken] = match(']', tokenVector);

  while (tokenVector.peek() && tokenVector.peek().type != '[') {
    if(tokenVector.peek().type === "°") {
      tokenVector = tokenVector.pop();
      vector = vector.pop().push(new Bubble(vector.peek()))
    } else {
      // Pass closingBracketToken as context for EOF errors.
      [tokenVector, item] = matchItem(tokenVector, closingBracketToken); // iTem -> item
      // Vector uses its own push, assuming it's compatible with LynktLyst structure for lisT
      vector = vector.push(item);  // lisT -> vector, iTem -> item
    }
  }

  [tokenVector, openingBracketToken] = match('[', tokenVector, closingBracketToken);

  // Assuming push prepends items like List.push, so inversion is necessary.
  return [tokenVector, vector.invert()]; // lisT -> vector
}

// tokenVector is the current vector of token objects
// contextTokenForEOF provides context if an item is expected but EOF is found.
function matchItem(tokenVector, contextTokenForEOF) {
  if (!tokenVector || !tokenVector.peek()) {
    let message = "Unexpected end of input. Expected an item.";
    if (contextTokenForEOF) {
      throw new NoMatchError(message + " Context: part of structure starting near", contextTokenForEOF);
    } else {
      throw new NoMatchError(message);
    }
  }
  let currentToken = tokenVector.peek();
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
      item = Ṣymbol.for(currentToken.value); // itEm -> item
      break;
    case TOK_KEYWORD:
      item = Keyword.for(currentToken.value); // itEm -> item
      break;
    case TOK_STRiNG:
      item = currentToken.value; // Value is already a string // itEm -> item
      break;
      case ')': // Start of a nested list vector.
                // The contextTokenForEOF is not directly passed to matchList here,
                // as matchList will establish its own context starting with the ')'.
      return matchList(tokenVector);
    case ']': // Start of a nested vector vector.
      return matchVector(tokenVector);
    // Quoting/Bubble is handled in parseTokens, not here, as it modifies the tree structure directly.
    // case '°':
    //   item = new Bubble(currentToken.value);
    //   break;
    default:
      // If it's not a special type, it might be an error or an unhandled simple token
      // The original code didn't have a fallback here, it would error in `itEm === undefined`.
      // Let's make it explicit.
      throw new NoMatchError(
        `No match found for token type ${currentToken.type}`, currentToken);
  }

  // If item is not undefined, it means one of the cases matched and created an item.
  // We then consume the token.
  return [tokenVector.pop(), item]; // itEm -> item
}

module.exports = parse;
