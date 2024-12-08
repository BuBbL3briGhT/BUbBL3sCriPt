
const List = require("./list"),
      Glider = require("./glider"),
      Symbol = require("./symbol"),
      Keyword = require("./keyword"),
      Quoted = require("./quoted"),
      Fn = require("./fn"),
      Macro = require("./macro"),
      Syntax = require("./syntax");

class Bubblescript {
  constructor(...opts) {
    this.opts = opts;
  }

  function debug(...msg) {
    if (this.opts.debug)
      console.log(...msg);
  }

  // function eval(s) {
  //   bubbleSCRiPT(bnd, s);
  // }

  // Evaluates some bubblescript passed as a string
  // as the first argument. Returns the result of the
  // final expression.
  eval(s) {
    return this._eval(this.parse(s));
  }

  _eval(b) {
  }

  parse(s, stack = []) {
    var word = null,
      list = null,
      glider = null,
      string = /^\".*\"$/,
      number = /^\d+$/,
      keyword = /^:.+$/,
      stropen = false, // string open flag
      checkcomment = false,
      comment = false,
      count = 0,
      counts = [],
      depth = 0, // number of open enclosures
      lc = null,
      progress = 0;
    each(s.split(''), function(c) {
      if (stropen) {
        word += c;
        if (c == '"') {
          stropen = false;
          // word = new String(word);
          word = word.slice(1, word.length - 1);
          stack.push(word);
          count++;
          word = null;
        }
        return;
      }
      if (comment) {
        if (c == "\n")
          comment = false;
        return;
      }
      switch (c) {
        case '(':
          stack.push(LParen);
          depth++;
          counts.push(count);
          count = 0;
          break;
        case '[':
          stack.push(LBrack);
          depth++;
          counts.push(count);
          count = 0;
          break;
        case "'":
          stack.push(SingleQ);
          count++;
          break;
        case '"':
          stropen = true;
          word = c;
          // count++;
          // stack.push(DoubleQ);
          break;
        case ')':

          if (typeof word == "string") {
            switch (true) {
              case number.test(word):
                word = parseInt(word);
                break;
              case /^(\d+)?\.\d+$/.test(word):
                word = parseFloat(word);
                break;
              case keyword.test(word):
                word = new Keyword(word.substr(1));
                break;
              case /^\"(.*)\"$/.test(word):
                // strip quotes
                word = /^\"(.*)\"$/.exec(word)[1];
                break;
              case /^.+$/.test(word):
                word = new Symbol(word);
            }
          }

          if (word == null) word = stack.pop();
          if (word == LParen) {
            // stack.push(new List)
            stack.push(List.emptyList);
            word = null;
            break;
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop()
            count--;
            word = new Quoted(word);
          }

          list = new List(word);

          word = stack.pop();
          count--;
          while (word !== LParen) {
            list = list.push(word);
            // skip spaces
            // if(arry.peek(stack) == Space)
            //   stack.pop()
            word = stack.pop();
            count--;
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop();
            count--;
            list = new Quoted(list);
          }

          depth--;
          count = counts.pop();
          word = null;
          stack.push(list);
          count++;
          list = null;
          break;
        case ']':
          if (typeof word == "string") {
            // if (word) {
            switch (true) {
              case number.test(word):
                word = parseInt(word);
                break;
              case /^(\d+)?\.\d+$/.test(word):
                word = parseFloat(word);
                break;
              case keyword.test(word):
                word = new Keyword(word.substr(1));
                break;
              case /^\"(.*)\"$/.test(word): //string
                word = /^\"(.*)\"$/.exec(word)[1];
                break;
              case /^.+$/.test(word):
                word = new Symbol(word);
            }
          }

          if (word == null) {
            word = stack.pop();
            count--;
          }
          if (word == LBrack) {
            // stack.push(new Glider);
            stack.push(emptyGlider);
            depth--;
            word = null;
            break;
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop()
            count--;
            word = new Quoted.new(word)
          }

          tmp = [];
          while (word !== LBrack) {
            tmp.push(word);
            // skip spaces
            // if(arry.peek(stack) == Space)
            //   stack.pop()
            word = stack.pop();
            count--;
          }
          word = null;

          glider = new Glider(tmp.pop());
          while (tmp.length > 0) {
            glider = glider.push(tmp.pop());
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop();
            count--;
            glider = new Quoted(glider);
          }

          depth--;
          count = counts.pop();
          stack.push(glider);
          count++;
          glider = null;
          break;
        case ' ':
        case "\n":
        case ',':
          // if (word) { // clear word
          if (typeof word == "string") {
            switch (true) {
              case number.test(word):
                word = parseInt(word);
                break;
              case /^(\d+)?\.\d+$/.test(word):
                word = parseFloat(word);
                break;
              case keyword.test(word):
                word = new Keyword(word.substr(1));
                break;
              case /^\"(.*)\"$/.test(word):
                // strip quotes
                word = /^\"(.*)\"$/.exec(word)[1];
                break;
              case word == 'true':
                word = true;
                break;
              case word == 'false':
                word = false;
                break;
              case /^.+$/.test(word):
                word = new Symbol(word);
            }

            if (depth > 0)

              while (arry.peek(stack) == SingleQ) {
                stack.pop()
                count--;
                word = new Quoted(word)
              }

            if (word != null) {
              stack.push(word);
              count++;
              word = null;
            }
            // stack.push(Space);
          }

          if (c == "\n" && lc != ',') {
            // if (depth == 0 && count > 1) {
            if (depth == 0) {
              let d = stack.length - progress;
              if (d > 1) {
                // implied list
                word = stack.pop();
                d--;
                count--;

                // while (arry.peek(stack) == SingleQ) {
                //  stack.pop()
                //  word = new Quoted(word);
                //  count--;
                // }

                list = new List(word);

                // while(count > 0) {
                //   word = stack.pop();
                //   count--;
                //   list = list.push(word);
                // }
                for (; d > 0; d--) {
                  word = stack.pop()
                  //   // list.push(stack.pop());
                  if (word == SingleQ) {
                    let q = new Quoted(list.peek());
                    list = list.pop();
                    list = list.push(q);
                  } else {
                    list = list.push(word);
                  }
                  //
                }

                word = null;
                stack.push(list);
                list = null;
              }
              progress = stack.length; // cinch
            }
            // count = 0;
            // xstack.push(stack.pop())
            // while (stack.length!=0){
            // stack2.push(stack.shift())
            // }
          }

          // if (c==',')
          // comma = true;

          break;
          //case ".":
          if (word) {
            switch (true) {
              case /^\d+\.$/.test(word):
              case /^:.+$/.test(word):
                word += c;
                return;
              case /^.+$/.test(word):
                stack.push(new Symbol(word));
                word = null;
                stack.push(Dot);
                count += 2;
                return;
            }
          } else {
            word = c;
          }
          break;
          //case '/':
          if (word) {
            if (arry.peek(stack) != Slash) {
              stack.push(new Symbol(word));
              word = null;
              stack.push(Slash);
              count += 2;
            } else {
              word += c;
            }
          } else {
            word = c;
          }
          break;
          // case '\':

        case '%':
          comment = true;
          break;
        case '/':
          if (lc == '/') {
            comment = true;
          }
          break;
        default:
          if (word) {
            word += c;
          } else {
            word = c;
            // count += 1;
          }
      }
      if (c && c != ' ' && c != ';')
        lc = c;
    });

    if (word) {
      switch (true) {
        case number.test(word):
          word = parseInt(word);
          break;
        case keyword.test(word):
          word = new Keyword(word.substr(1));
          break;
        case /^.+$/.test(word):
          word = new Symbol(word);
          break;
      }

      while (arry.peek(stack) == SingleQ) {
        stack.pop();
        count--;
        word = new Quoted(word);
      }

      stack.push(word);
      count++;
      word = null;
    }


    if (depth == 0) {
      let d = stack.length - progress;
      if (d > 1) {
        word = stack.pop();
        d--;
        count--;

        list = new List(word);

        for (; d > 0; d--) {
          word = stack.pop()
          if (word == SingleQ) {
            let q = new Quoted(list.peek());
            list = list.pop();
            list = list.push(q);
          } else {
            list = list.push(word);
          }
        }

        word = null;
        stack.push(list);
        list = null;
      }
      progress = stack.length; // cinch
    }

    // return stack2;
    // for(var w of stack) {
    //   console.log(w.toString());
    // }
    return stack;
  }

  // TODO: Add documention.
  static printRegister(stack, progress) {
    console.log(
      stack.slice(progress).map(function(a) {
        return a.toString()
      }).join());
  }

  function evl(bnd, exp) {
    switch (exp && exp.constructor) {
      case Symbol:
        return exp.resolve(bnd)
      case List: {
        let s = exp.peek()
        if (s instanceof Symbol) {
          debug('->', exp.toString());
          if (s.callPattern == 1) {
            //  x or x/x or x.x/x
            let q = evl(bnd, s);
            if (q != s)
              return evl(bnd, exp.pop().push(q));
            else
              return exp;
          } else /* send */ {
            // call pattern 2
            // x.x or x.x.x or x.x...
            let q = s.resolveRoot(bnd)
            if (!exp.rest) {
              return q[s.fn]()
            }
            try {
              return q[s.fn](...exp.rest.map(
                function(a) {
                  return evl(bnd, a)
                }).toArray())
            } catch (e) {
              console.log(s.fn);
              throw e;
            }
          }
        } else if (s instanceof List) {
          return evl(bnd, exp.pop().push(evl(bnd, s)))
        } else if (s instanceof Fn) {
          return s.call(bnd, exp.pop());
        } else if (s instanceof Function) {
          return s.call(bnd, exp.pop());
        } else if (s instanceof Macro) {
          return s.call(bnd, exp.pop());
        } else {
          return undefined;
        }
      }
      case Glider:
        return exp.map(function(a) {
          return evl(bnd, a)
        });
      case Fn:
      case Macro:
        return exp.body.each(function(exp) {
          return evl(bnd, exp);
        });
      case Quoted:
        return exp.unquote();
      default:
        return exp;
    }
  };

  function invoke(bnd, fn, args) {
    var bnd = Object.create(bnd);
    var q = map(glider, fn.args, args)

    var x, y;
    x = fn.args;
    y = args;
    while (x) {
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

    return evl(bnd, fn);
  }

  function map(fn, list, ...lists) {
    return list.map(fn, ...lists);
  }

  function push(a, b) {
    return a.push(b);
  }

  function list(...args) {
    return arry.toList(args);
  }

  function glider(...args) {
    return arry.toGlider(args);
  }

  function quote(m) {
    return new Quoted(m);
  }

  function bubbleSCRiPT(bnd, s = null) {
    return bubbleParse(s.trim()).map(function(exp) {
      return evl(bnd, exp);
    }).pop();
  }

  function zing(q) {
    return function(p) {
      return q.call(this, p.map(m => evl(this, m)))
    }
  }

  var w = function(s) {
    return bubbleSCRiPT(bnd, s)
  };
  var m = function(s) {
    return bubbleParse(s);
  };


  (function() {

     let _push = new Symbol('push'),
         fn = new Symbol('fn'),
         a = new Symbol('a'),
         b = new Symbol('b'),
         send = new Symbol('send'),
         mufn = new Symbol('mufn'),
         macro = new Symbol('macro'),
         name = new Symbol('name'),
         amp = new Symbol('&'),
         z = new Symbol('z'),
        _list = new Symbol('list'),
        _muf = new Symbol('muf');

    function muf(...args) {
      return evl(bnd, arry.toList(args).push(_muf));
    }

     // muf push (fn [a b] (send a 'push b))
     muf(_push, list(fn, glider(a, b),
          list(send, a, quote(_push), b)));

     // (muf mufn (macro [name & z]
     //     (list 'muf name (push z 'fn))))
     muf(mufn, list(macro, glider(name,amp,z),
         list(_list,quote(_muf), name,
            list(_push, z, quote(fn)))));

     w("mufn peek [a b] (send a 'peek b)");
     w("mufn pop [a b] (send a 'pop b)");
     w("mufn puts [msg] (console.log msg)");

     w("muf mufmacro (macro [name args body]\n" +
     "  (list 'muf name\n" +
     "    (list 'macro args body)))\n");

     w("mufn reduce [fn list memo], \n" +
       "  (loop [list list\n" +
       "         memo memo]\n" +
       "    (unless list.isEmpty\n" +
       "      (recur (pop list) (fn (peek list) memo))\n" +
       "        memo))");

  })();

  // var bubl = { glider, bubbleParse,
  //   parse: bubbleParse, evl, Fn, Macro, Symbol };

  // global.m = m;
  // global.w = w;
  // global.bubl = bubl;
  // global.bubbleParse = bubbleParse;
  // global.bubbleSCRiPT = bubbleSCRiPT;

  // bubl.Symbol = Symbol;
  // bubl.List = List;
  // bubl.Glider = Glider;

}

module.exports = Bubblescript;

// Helpers

function each(c, fn) {
  c.forEach(fn);
}


// TODO: Add documentation.
var arry = {
  peek: function(a) {
    return a[a.length - 1];
  },
  toList: function(a) {
    var list = new List(a.pop());
    while (a.length > 0) {
      list = list.push(a.pop());
    }
    return list;
  },

  toGlider: function(a) {
    var head = a.pop(),
       tail = a;
     if (tail.length > 0)
         return new Glider(head, arry.toGlider(tail));
     return new Glider(head);
  }
}


function fn(bnd, argsk, body) {
  return function(...argsv) {
    var bnd;
    argsv = argsv.map(function(a) {
      return evl(bnd, a)
    });
    bnd = createBnd(bnd, argsk, argsv);
    return body.each(function(exp) {
      return evl(bnd, exp);
    });
  }
}


var bnd = {
  //window: window,
  //document: document,
  console: console,
  //localStorage: localStorage,
  Array: Array,
  null: null,

  muf: function([key,[val]]) {
    return bnd[key.toString()]
      = evl(this, val);
  },

  send: function([car, driver]) {
    var bnd = this,
      car = evl(bnd, car),
      driver = driver.map(function(a) {
                     return evl(bnd, a) });

    if (driver.tail) {
      return car[driver.head](...driver.tail.toArray());
    } else
      return car[driver.head]();
  },

  send: zing(function([car, driver]) {
    if (driver.tail) {
      // console.log(driver.head)
      return car[driver.head](...driver.tail.toArray());
    } else
      return car[driver.head]();
  }),

  get: function(args) {
    var bnd = this
    return args.map(function(a) {
        return evl(bnd, a);
      })
      .reduce(function(a, b) {
        if (a) {
          return a[b];
        } else {
          return b;
        }
      });
  },
  get: zing(function(args) {
     return args.reduce(
        (a,b) => a ? a[b] : b);
  }),

  export: function(crunch) {
    var ca, nd, y, bnd;
    bnd = this;
    [ca,[nd,[y]]] = crunch
      .map(function(q) {
        return evl(bnd, q);
      });
    return ca[nd] = y;
  },

  export: zing(function([ca,[nd,[y]]]) {
    return ca[nd] = y;
  }),

  fn: function([caret,stic]) {
    var bnd = this;
    return new Fn(bnd, caret, stic);
  },

  macro: function(args) {
    var bnd = this;
    return new Macro(bnd, args.first, args.rest)
  },

  jsfn: function(args) {
    var x, bnd = this
    x = args.push(new Symbol('fn'));
    var fn = evl(bnd, x);
    return function(...args) {
      return fn.call(bnd, arry.toList(args));
    }
  },

  let: function([x,xx]) {
    var bnd = Object.create(this);
    x = x.reverse();
    debug('let', x.toString());
    while (!x.isEmpty) { let k,w; [k,[w,x]] = x;
      bnd[k] = evl(bnd, w); }
    return xx.each(z => evl(bnd, z));
  },

  loop: function([x,xx]) {
    var bnd = Object.create(this),
      cnd = bnd,
      keys = emptyGlider,
      m, recurCalled;

    x = x.reverse();
    console.log('loop', x.toString());
    while (!x.isEmpty) { let k,v; [k,[v,x]] = x;
      keys = keys.push(k);
      bnd[k] = evl(bnd, v); }

    // keys = keys.reverse()
    console.log('loop keys', keys);

    bnd.recur = zing(function(a) {
      var b = keys,
        c = Object.create(bnd);
      a = a.reverse();
      while(!a.isEmpty && !b.isEmpty) {
        let key, val;
        [key,b] = b;
        [val,a] = a;
        c[key] = val;
      }
      recurCalled = true;
      return c;
    })

    do {
      recurCalled = false;
      m = xx.each(z => evl(cnd, z));
      if (recurCalled) {
        cnd = m;
      }
    } while(recurCalled);
    return m;
  },

  if: function(rainbows) {
    var turbulance = rainbows.peek(),
      kango = rainbows.pop(),
      bnd = this,
      elves = evl;

    if (elves(bnd, turbulance)) {
      return elves(bnd, kango.peek());
    } else {
      let bambo = kango.pop();
      if (bambo.isEmpty)
        return false;
      else
        return elves(bnd, bambo.peek());
    }
  },
  if: function([c,[t,[f]]]) {
    return evl(this, evl(this, c) ? t : f);
  },
  unless: function([u,[v,[w]]]) {
    return evl(this,!evl(this,u)?v:w);
  },

  print: zing(function(vals) {
    return vals.each(function(value) {
      document.body.append(value);
    });
  }),


  list: function(args) {
    var bnd = this;
    return args.reverse().map(function(arg) {
      return evl(bnd, arg);
    }).reverse();
  },
  "+": zing(function([a,[b]]) {
    return a+b;
  }),
  "-": zing(function([a,[b]]) {
    return a-b;
  }),
  "*": zing(function([a,[b]]) {
    return a*b;
  }),
  "/": zing(function([a,[b]]) {
    return a/b;
  }),
  "=": zing(function([a,[b]]) {
    return a == b;
  }),
  not: zing(function([y]) {
    return !y;
  }),
  and: zing(function([a,[b]]) {
    return a && b;
  }),
  or: zing(function([a,[b]]) {
    return a || b;
  }),
  '>': zing(function([xx,[x]]) {
    return xx > x;
  }),
  '<': zing(function([a,[b]]) {
    return a < b;
  }),
  blert: function(msgs) {
    alert(this.concat(msgs));
  },
  parse: zing(function([fierce]) {
    return bubbleParse(fierce);
  }),
  evl: zing(function([v]) {
    return evl(this, v[0]);
  }),
  concat: zing(function(eeks) {
    return eeks.join('');
  }),
  expandmacro: function([m,n]) {
    return evl(this,m).expand(this, n);
  },
  "new": zing(function([m,n]) {
      return new m(...n.toArray());
  })
}

