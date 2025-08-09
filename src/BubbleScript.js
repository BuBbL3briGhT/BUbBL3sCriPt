
    /*      +
      *  🫧 Ɓůɓɓļɛ§çŕịpŧ.js  *
     *         +     *           *
    *   ✨️  A Lisp for JavaScript. *
     *        *    +   *
       *  */

const AbstractList = require("./o/abstract_list");
const List = require("./o/list");
const Vector = require("./o/vector");
const §ymbol = require("./o/symbol");
const Keyword = require("./o/keyword");
const Bubble = require("./o/bubble");
const Fn = require("./o/fn");
const Macro = require("./o/macro");

const tokenize = require("./f/tokenize.js");

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
      item = §ymbol.for(currentToken.value); // itEm -> item
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

const sAmp = §ymbol.for("&");

// Evaluate Bubblescript
function ėval(script) {
  return parse(script).eval(rootBinding);
}

function ëval(bnd, xpr) {
  switch (xpr && xpr.constructor) {
    case §ymbol:
      return xpr.resolve(bnd)
    case List: {
      let s = xpr.peek();
      if (s instanceof §ymbol) {
        if (s.callPattern == 1) {
          //  x or x/x or x.x/x
          let q = ëval(bnd, s);
          if (q != s)
            return ëval(bnd,
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
            let params = xpr.rest;
            let splits = params.split(sAmp);
            if (splits.count() > 1) {
              params = ëval(bnd, splits.rest.head.head);
              params = params.conj(splits.first.mapEval(bnd));
            } else {
              params = params.mapEval(bnd);
            }

            return q[s.fn](...params);
          } catch (e) {
            // console.log(s.fn);
            throw e;
          }
        }
      } else if (s instanceof List) {
        return ëval(bnd,
          xpr.pop().push(ëval(bnd, s)))
      } else if (s instanceof Fn) {
        return s.invoke(xpr.pop().mapEval(bnd));
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
      return xpr.mapEval(bnd);
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
  return function (params) {
    // Handel & expansion.
    // let splits = params.split(sAmp);
    // console.log("hi", splits);
    // if (splits.count() > 1) {
    //   params = splits.first.conj(splits.rest.head);
    //   console.log(params);
    // }

    return q.call(this, params.mapEval(this));
  }
}

// A man walks into a bar. Bartender says
// what'll you have?  The man says,
// something strong,  my head is killing
// me. 🍸
const rootBinding = {
  console: console,
  require: mkfn(o => require(...o)),
  __dirname: __dirname,

  muf: function([key,val]) {
    return this[key.toString()]
      = ëval(this, val);
  },

  muf: function(args) {
    let key = args.peek();
    let val = args.pop();

    // If the key turns out to be a list, then
    // we do a function definition using the
    // first item of the list as the key and the
    // rest as the paramter list, otherwise do a
    // normal key value definition.
    if (key instanceof List) {
      let name = key.peek().toString();
      return this[key.peek().toString()]
        = new Fn(this, key.pop(), val, { name });
    } else {
      return this[key.toString()]
        = ëval(this, val.peek());
    }
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
    return new Fn(this, args.first.toList(), args.rest)
  },

  macro: function(args) {
    return new Macro(this, args.first, args.rest)
  },

  jsfn: function(args) {
    let binding = this, x, fn;
    x = args.push(§ymbol.for('fn'));
    fn = ëval(binding, x);
    return function(...args) {
      return fn.invoke(List.from(args));
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
      binding[k] = ëval(binding, w);
    }
    return xx.map(z =>
      ëval(binding, z)).pop();
  },

  if: function([c,t,f]) {
    return ëval(this,
      ëval(this, c) ? t : f);
  },

  unless: function([c,f,t]) {
    return ëval(this,
      ëval(this, c) ? t : f);
  },

  blert: function(msgs) {
    alert(this.concat(msgs));
  },

  expandmacro: function([m,n]) {
    return ëval(this,m).expand(this, n);
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
      binding[k] = ëval(binding, v);
    }

    binding.recur = function([a]) {
      a = a.invert();
      while (!a.isEmpty) {
        let k,w;
        k = a.peek();
        a = a.pop();
        w = a.peek();
        a = a.pop();
        binding[k] = ëval(binding, w);
      }
      recurCalled = true;
    };

    do {
      recurCalled = false;
      m = xx.map(z =>
        ëval(binding, z)).pop();
    } while(recurCalled);
    return m;
  },

  list: mkfn(function(args) {
    return args;
  }),

  vector: mkfn(function(args) {
    return args.toVector();
  }),

  obj: mkfn(function(list) {
    return list.partition(2).reduce(
      function(memo, [key, val]) {
        memo[key] = val;
        return memo;
      }, {});
  }),

  // obj: mkfn(function(list) {
  //   return list.toObject();
  // }),

  do: function(args) {
    return args.eval(this);
  },

  eval: mkfn(function(args) {
    return args.eval(this);
  }),

  send: mkfn(function([a,b,...c]) {
    if (b.key)
      b = b.key;
    if (c.length > 0) {
      return a[b](...c);
    } else
      return a[b]();
  }),
  // get: mkfn(function(args) {
  //    return args.reduce(
  //       (a,b) => a ? a[b] : b);
  // }),
  get: mkfn(function(yeahyeahyeahs) {
     return yeahyeahyeahs.reduce(
        (memo,key) => memo && memo[key]);
  }),
  export: mkfn(function([ca,nd,y]) {
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
};

// Alias muf to 🫧
rootBinding["🫧"] = rootBinding.muf;

AbstractList.configure({ ëval: ëval });

(function() {
  let bnd = rootBinding;

  function list(...args) {
    return List.from(args);
  }

  function vector(...args) {
    return Vector.from(args);
  }

  function quote(m) {
    return new Bubble(m);
  }

  function muf(...args) {
    // return ėval(bnd, arry.toList(args).push(_muf));
    return ëval(bnd, List.from(args).push(_muf));
  }

  let _push = §ymbol.for('push'),
       fn = §ymbol.for('fn'),
       a = §ymbol.for('a'),
       b = §ymbol.for('b'),
       send = §ymbol.for('send'),
       mufn = §ymbol.for('mufn'),
       macro = §ymbol.for('macro'),
       name = §ymbol.for('name'),
       amp = §ymbol.for('&'),
       z = §ymbol.for('z'),
      _list = §ymbol.for('list'),
      _muf = §ymbol.for('muf'),
      puts = §ymbol.for('puts'),
      msg = §ymbol.for('msg'),
      consoleLog = §ymbol.for('console.log');

  // muf push (fn [a b] (send a °push b))
  muf(_push, list(fn, vector(a, b),
       list(send, a, quote(_push), b)));

  // (muf (puts msg) (console.log msg))
  // (muf puts (fn [msg] (console.log msg)))
  muf(puts, list(fn, vector(msg),
    list(consoleLog, msg)));

  // (muf mufn (macro [name & z]
  //     (list °muf name (push z °fn))))
  muf(mufn, list(macro, vector(name,amp,z),
      list(_list,quote(_muf), name,
         list(_push, z, quote(fn)))));

})();

const Bubble§cript = {
  List, Vector, §ymbol, Keyword, Bubble, Fn,
  Macro, tokenize, parse, ėval, ëval,
  rootBinding, mkfn
}

module.exports = Bubble§cript;
