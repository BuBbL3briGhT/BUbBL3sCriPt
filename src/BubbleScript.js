
    /*      +
      *  🫧 BubbleScript.js  *
     *         +     *           *
    *   ✨️  A Lisp for JavaScript. *
     *        *    +   *
       *  */


let emptyList, emptyVector;

const keywords    = {};

const TOK_KEYWORD = 'K',
      TOK_NUMBER  = 'N',
      TOK_STRING  = 'S',
      TOK_SYMBOL  = 'Y',
      TOK_TRUE    = 'T',
      TOK_FALSE   = 'F';

// We define `AbstractList` which is a
// class that will serve as the abstract
// base class for `List` and `Vector`. All
// shared functionality between `List` and
// `Vector` is centralized here.
class AbstractList {

  static from(arrayLike, mapFn, thisArg) {
    let array = Array.from(arrayLike, mapFn, thisArg);
    return this.make(...array);
  }

  constructor(o, oo) {
    this.o=o;
    this.oo=oo;
  }

  peek() { return this.o; }
  pop()  { return this.oo; }

  get isEmpty() { return false; }
  get first() { return this.peek(); }
  get rest() { return this.pop(); }
  get next() { return this.pop().peek(); }
  get last() { return !this.pop().isEmpty ?
      this.pop().last : this.peek(); }

  count() {
    return this.reduce((count) => {
      return ++count;
    }, 0);
  }

  map(fn) {
    if (this.isEmpty) return this;
    return new this.constructor(fn(this.peek()),
      this.pop().map(fn));
  }

  get(i) { return this.skip(i).peek(); }

  skip(count) {
    if (count)
      return this.pop().skip(--count);
    return this;
  }

  shift() {
    return this.invert().pop().invert();
  }

  invert() {
    if (this.isEmpty)
      return this;

    return this.pop().reduce(
      (accumulator, currentElement) => {
        return accumulator.push(currentElement);
      }, this.constructor.make(this.peek()));
  }

  conj(sourceList) {
    return sourceList.reduce(function(accumulator, currentElement) {
      return accumulator.push(currentElement);
    }, this);
  }

  _toString() {
    if (this.isEmpty) return "";
    return this.map(this.toStringFormat).reduce(this.toStringJoin);
  }

  toStringFormat(o) {
    if (!o) return o;
    switch (typeof o) {
      case "string":
        return '"' + o + '"';
      case "symbol":
        return _Symbol.keyFor(o);
      default:
        return o.toString();
    }
  }

  toArray() {
    return this.reduce((array, currentElement) => {
      array.push(currentElement); return array; }, []);
  }

  reduce(fn, memo) {
    if (this.isEmpty)
      return memo;

    let oo = this.pop();
    if (oo.isEmpty)
      if(memo == undefined)
        return this.peek();
      else
        return fn(memo, this.peek());
    else
      if (memo != undefined)
        return oo.reduce(fn,
          fn(memo, this.peek()))
      else
        return oo.reduce(fn, this.peek());
  }

  each(fn) {
    let oo = fn(this.peek());
    if (this.pop().isEmpty) return oo;
    return this.pop().each(fn);
  }

  *[Symbol.iterator]() {
    let currentNode = this;
    while (!currentNode.isEmpty) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}


// `List` extends `AbstractList` and is
// the primary object in Bubblescript and
// is the programatic representation of a
// list. e.g. `(1 2 3)`
class List extends AbstractList {

  // `List.emptyList` provides an instance
  // of `EmptyList`, which terminates all
  // lists.
  static get emptyList() { return emptyList; }

  // `List.make` makes/creates a new list.
  // `List.make(1, 2, 3)`
  static make(...elements) {
    return List._make(elements);
  }

  static _make(elementsArray, currentLinkedList=emptyList) {
    if (elementsArray.length < 1)
      return currentLinkedList;
    return List._make(elementsArray,
      new List(elementsArray.pop(),
        currentLinkedList));
  }

  // Create a list.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new List(element, this);
  }

  toString() {
    return "(" + this._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  toVector() {
    return this.reduce((vector, o) => {
      return vector.push(o); },
      Vector.emptyVector);
  }

  eval(binding) {
    return this.each(xpr =>
      $eval(binding, xpr));
  }

  each(fn) {
    let result;
    try {
      result = fn(this.peek());
    } catch (o) {
      if (o instanceof MacroExpanded) {
        let expanded = o.expanded;
        this.o  = expanded.first;
        this.oo = this.rest.conj(expanded.rest.invert());
        return this.each(fn);
      }
    }
    if (this.pop().isEmpty) return result;
    return this.pop().each(fn);
  }
}

class EmptyList extends List {
  get isEmpty() { return true; }
}

emptyList = new EmptyList()


class Vector extends AbstractList {

  static get emptyVector() { return emptyVector; }

  static make(...elements) {
    var head = emptyVector;
    for (let o of elements)
      head = new this(o, head);
    return head;
  }

  constructor(o, oo=emptyVector) {
    super(o, oo);
  }

  push(element) {
    return new Vector(element, this);
  }

  toString() {
    return "[" + this._toString() + "]";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return formattedElement + " " + accumulatedString;
  };

  toList() {
    return this.reduce((list, o) => {
      return list.push(o); },
      List.emptyList);
  }

}

class EmptyVector extends Vector {
  get isEmpty() { return true; }
}

emptyVector = new EmptyVector()


class _Symbol {

  constructor(value) {

    this.value = value;

    var fn, segments,
      callPattern = 1;

    if (value !== "/")
      [value, fn] = value.split('/')
    segments = value.split('.')

    if (segments.length == 1 && !fn)
      fn = segments.pop()

    if (!fn)
      [fn, callPattern] = [segments.pop(), 2]

    this.fn = fn
    this.segments = segments
    this.callPattern = callPattern

  }

  toString() {
    return this.value;
  }

  valueOf() {
    return this.value;
  }

  resolveRoot(bnd) {
    return this.segments
      .reduce(function(e, f) {
        return e && e[f]
      }, bnd)
  }

  resolve(bnd) {
    var r = this.resolveRoot(bnd)
    if (r) r = r[this.fn];
    return r;
  }

  static for(key) {
    return new _Symbol(key);
  }

}


class Keyword {
  constructor(key) {
    if(keywords[key]) {
      throw new Keyword.DoopError(key);
    }
    this.key = key;
    return keywords[key] = this;
  }

  toString() {
    return ":" + this.key;
  }

  static for(key) {
    return keywords[key] || new Keyword(key);
  }
}

class KeywordDoopError extends Error {
  constructor(key) {
    super(`Keyword with key '${key}' already exists.`);
    this.name = "KeywordDoopError";
  }
}

Keyword.DoopError = KeywordDoopError;


class Bubble {
  constructor(o) {
    this.o = o;
  }

  pop() {
    return this.o;
  }

  toString() {
    return "°" + this.o;
  }

  inspect() {
    return "°" + this.o.inspect;
  }
}


class Fn {

  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args.toList();
    this.body = body;
  }

  invoke(args) {
    let bnd = Object.create(this.bnd);

    var x, y;
    x = this.args;
    y = args;
    while (!x.isEmpty) {
      if (x.first == '&') {
        x = x.rest;
        bnd[x.first] = y
        x = null;
        y = null;
        break;
      }
      bnd[x.first] = y && y.first;
      x = x.rest;
      y = y && y.rest;
    }

    return this.body.eval(bnd);
  }

  toString() {
    return this.body.push(this.args)
      .push(new _Symbol("fn"))
      .toString()
  }

}


class Macro {
  constructor(bnd, args, body) {
    this.bnd = bnd;
    this.args = args.toList();
    this.body = body;
  }

  expand(args) {
    let bnd = Object.create(this.bnd);

    var x, y;
    x = this.args;
    y = args;
    while (!x.isEmpty) {
      if (x.first == '&') {
        x = x.rest;
        bnd[x.first] = y
        x = null;
        y = null;
        break;
      }
      bnd[x.first] = y && y.first;
      x = x.rest;
      y = y && y.rest;
    }
    return this.body.eval();
  }

  toString() {
    return "(macro " + this.args.toString() +
      this.body.toString() + ")";
  }
}

class MacroExpanded {
  constructor(expanded) {
    this.expanded = expanded;
  }
}


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

  function tokenize_Symbol() {
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
          tokenize_Symbol();
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
      item = _Symbol.for(currentToken.value); // itEm -> item
      break;
    case TOK_KEYWORD:
      item = Keyword.for(currentToken.value); // itEm -> item
      break;
    case TOK_STRING:
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


// Evaluate Bubblescript
function _eval(script) {
  return parse(script).each(rootBinding);
}

function $eval(bnd, xpr) {
  switch (xpr && xpr.constructor) {
    case _Symbol:
      return xpr.resolve(bnd)
    case List: {
      let s = xpr.peek();
      if (s instanceof _Symbol) {
        if (s.callPattern == 1) {
          //  x or x/x or x.x/x
          let q = $eval(bnd, s);
          if (q != s)
            return $eval(bnd,
              xpr.pop().push(q));
          else
            return xpr;
        } else /* send */ {
          // call pattern 2
          // x.x or x.x.x or x.x...
          let q = s.resolveRoot(bnd)
          if (!xpr.rest) {
            return q[s.fn]()
          }
          try {
            return q[s.fn](...xpr.rest.map(
              (a) => $eval(bnd, a)).toArray());
          } catch (e) {
            // console.log(s.fn);
            throw e;
          }
        }
      } else if (s instanceof List) {
        return $eval(bnd,
          xpr.pop().push($eval(bnd, s)))
      } else if (s instanceof Fn) {
        return s.invoke(xpr.pop().eval());
      } else if (s instanceof Function) {
        return s.call(bnd, xpr.pop());
      } else if (s instanceof Macro) {
        let expanded = s.expand(xpr.pop());
        throw new MacroExpanded(expanded);
      } else {
        return undefined;
      }
    }
    case Vector:
      return xpr.eval();
    case Bubble:
      return xpr.pop();
    default:
      return xpr;
  }
};

// Makes a Bubblescript function from a
// Javascript function.
// Params:
//   q: A Javascript function that will be
//   called for this function.
// Returns an annonomous function that is
// sutible for use with Bubblescript.
// #coreUtilityFunction
// TODO: Create tests for mkfn.
function mkfn(q) {
  return function (p) {
    return q.call(this,
      p.map(m => $eval(this, m)))
  }
}

// function mkfn(q) {
//   return (p) => {
//     return q.call(this,
//       ...p.map(m => $eval(this, m)))
//   }
// }


// A man walks into a bar. Bartender says
// what'll you have?  The man says,
// something strong,  my head is killing
// me. 🍸
const rootBinding = {
  console: console,
  Array: Array,
  null: null,
  List: List,
  Vector: Vector,

  muf: function([key,val]) {
    return this[key.toString()]
      = $eval(this, val);
  },
  // fn: function([caret, stic]) {
  //   return new Fn(this, caret, stic);
  // },
  // fn: function(_) {
  //   // console.log(_);
  //   let binding = this;
  //   let caret = _.peek();
  //   let stic  = _.pop();
  //   return new Fn(binding, caret, stic);
  // },

  fn: function(args) {
    return new Fn(this, args.first, args.rest)
  },

  macro: function(args) {
    return new Macro(this, args.first, args.rest)
  },

  jsfn: function(args) {
    var x, binding = this
    x = args.push(new _Symbol('fn'));
    var fn = $eval(binding, x);
    return function(...args) {
      return fn.call(binding, arry.toVector(args));
    }
  },

  let: function([x,...xx]) {
    let binding = Object.create(this);
    x = x.invert();
    while (!x.isEmpty) {
      let k,w;
      k = x.peek();
      x = x.pop();
      w = x.peek();
      x = x.pop();
      binding[k] = $eval(binding, w);
    }
    return xx.map(z =>
      $eval(binding, z)).pop();
  },

  if: function([c,t,f]) {
    return $eval(this,
      $eval(this, c) ? t : f);
  },

  unless: function([c,f,t]) {
    return $eval(this,
      $eval(this, c) ? t : f);
  },

  blert: function(msgs) {
    alert(this.concat(msgs));
  },

  expandmacro: function([m,n]) {
    return $eval(this,m).expand(this, n);
  },

  loop: function([x,...xx]) {
    var binding = Object.create(this),
      m, recurCalled;

    x = x.invert();
    while (!x.isEmpty) {
      let k,v;
      k = x.peek();
      x = x.pop();
      v = x.peek();
      x = x.pop();
      binding[k] = $eval(binding, v);
    }

    binding.recur = function([a]) {
      a = a.invert();
      while (!a.isEmpty) {
        let k,w;
        k = a.peek();
        a = a.pop();
        w = a.peek();
        a = a.pop();
        binding[k] = $eval(binding, w);
      }
      recurCalled = true;
    };

    do {
      recurCalled = false;
      m = xx.map(z =>
        $eval(binding, z)).pop();
    } while(recurCalled);
    return m;
  },

  list: mkfn(function(args) {
    return args;
  }),

  vector: mkfn(function(args) {
    return args.toVector();
  }),

  eval: mkfn(function(args) {
    return args.eval();
  }),

  send: mkfn(function([a,b,...c]) {
    if (b.key)
      b = b.key;
    if (c.length > 0) {
      return a[b](...c);
    } else
      return a[b]();
  }),
  get: mkfn(function(args) {
     return args.reduce(
        (a,b) => a ? a[b] : b);
  }),
  export: mkfn(function([ca,[nd,[y]]]) {
    return ca[nd] = y;
  }),
  print: mkfn(function(vals) {
    return vals.each(function(value) {
      document.body.append(value);
    });
  }),
  "+": mkfn(function(a) {
    return a.reduce((a,b) => a+b);
  }),
  "-": mkfn(function(a) {
    return a.reduce((a,b) => a-b);
  }),
  "*": mkfn(function(a) {
    return a.reduce((a,b) => a*b);
  }),
  "/": mkfn(function(a) {
    return a.reduce((a,b) => a/b);
  }),
  "=": mkfn(function([a, b]) {
    return a == b;
  }),
  not: mkfn(function([y]) {
    return !y;
  }),
  and: mkfn(function(a) {
    return a.reduce((a,b) => a && b);
  }),
  or: mkfn(function(_) {
    return _.reduce((a,b) => a || b);
  }),
  '>': mkfn(([a,b]) => {
    return a > b;
  }),
  '<': mkfn(([a,b]) => {
    return a < b;
  }),
  parse: mkfn(function([s]) {
    return parse(s);
  }),
  concat: mkfn(function(eeks) {
    return eeks.join('');
  }),
  "new": mkfn(function([m,n]) {
      return new m(...n.toArray());
  }),
}

const BubbleScript = {
  List, Vector, Symbol: _Symbol, Keyword,
  Bubble, Fn, Macro, tokenize, parse, eval:
  _eval
}

module.exports = BubbleScript;
