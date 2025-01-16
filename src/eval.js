
const Bubble = require("./bubble");
const Keyword = require("./keyword");
const parse = require("./parse");
const Balloon = require("./balloon");
const Fn = require("./fn");
const Macro = require("./macro");
const Symbol = require("./symbol");
// const Symbobl = require("./symbobl");
const Quoted = require("./quoted");

const { map, peek, pop, push, toArray } = Bubble;

function mkfn(q) {
  return (p) => {
    return q.call(this,
      p.map(m => eVaL(this, m)))
  }
}

const rootBinding = {
  //window: window,
  //document: document,
  console: console,
  //localStorage: localStorage,
  Array: Array,
  null: null,

  muf: function([key,[val]]) {
    return binding[key.toString()]
      = eVaL(this, val);
  },

  send: function([car, driver]) {
    var binding = this,
      car = eVaL(binding, car),
      driver = driver.map(function(a) {
                     return eVaL(binding, a) });

    if (driver.tail) {
      return car[driver.head](...driver.tail.toArray());
    } else
      return car[driver.head]();
  },

  send: mkfn(function([car, driver]) {
    if (pop(driver)) {
      // console.log(driver.head)
      return car[peek(driver)](...toArray(pop(driver)));
    } else
      return car[peek(driver)]();
  }),

  get: function(args) {
    var binding = this
    return args.map(function(a) {
        return eVaL(binding, a);
      })
      .reduce(function(a, b) {
        if (a) {
          return a[b];
        } else {
          return b;
        }
      });
  },
  get: mkfn(function(args) {
     return args.reduce(
        (a,b) => a ? a[b] : b);
  }),

  export: function(crunch) {
    var ca, nd, y, binding;
    binding = this;
    [ca,[nd,[y]]] = crunch
      .map(function(q) {
        return eVaL(binding, q);
      });
    return ca[nd] = y;
  },

  export: mkfn(function([ca,[nd,[y]]]) {
    return ca[nd] = y;
  }),

  fn: function([caret,stic]) {
    var binding = this;
    return new Fn(binding, caret, stic);
  },

  macro: function(args) {
    var binding = this;
    return new Macro(binding, args.first, args.rest)
  },

  jsfn: function(args) {
    var x, binding = this
    x = args.push(new Symbol('fn'));
    var fn = eVaL(binding, x);
    return function(...args) {
      return fn.call(binding, arry.toList(args));
    }
  },

  let: function([x,xx]) {
    var binding = Object.create(this);
    x = x.reverse();
    debug('let', x.toString());
    while (!x.isEmpty) { let k,w; [k,[w,x]] = x;
      binding[k] = eVaL(binding, w); }
    return xx.each(z => eVaL(binding, z));
  },

  loop: function([x,xx]) {
    var binding = Object.create(this),
      cnd = binding,
      keys = emptyGlider,
      m, recurCalled;

    x = x.reverse();
    console.log('loop', x.toString());
    while (!x.isEmpty) { let k,v; [k,[v,x]] = x;
      keys = keys.push(k);
      binding[k] = eVaL(binding, v); }

    // keys = keys.reverse()
    console.log('loop keys', keys);

    binding.recur = mkfn(function(a) {
      var b = keys,
        c = Object.create(binding);
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
      m = xx.each(z => eVaL(cnd, z));
      if (recurCalled) {
        cnd = m;
      }
    } while(recurCalled);
    return m;
  },

  if: function(rainbows) {
    var turbulance = rainbows.peek(),
      kango = rainbows.pop(),
      binding = this,
      elves = eVaL;

    if (elves(binding, turbulance)) {
      return elves(binding, kango.peek());
    } else {
      let bambo = kango.pop();
      if (bambo.isEmpty)
        return false;
      else
        return elves(binding, bambo.peek());
    }
  },
  if: function([c,[t,[f]]]) {
    return eVaL(this, eVaL(this, c) ? t : f);
  },
  unless: function([u,[v,[w]]]) {
    return eVaL(this,!eVaL(this,u)?v:w);
  },

  print: mkfn(function(vals) {
    return vals.each(function(value) {
      document.body.append(value);
    });
  }),


  list: function(args) {
    var binding = this;
    return args.reverse().map(function(arg) {
      return eVaL(binding, arg);
    }).reverse();
  },
  "+": mkfn(function([a,[b]]) {
    return a+b;
  }),
  "-": mkfn(function([a,[b]]) {
    return a-b;
  }),
  "*": mkfn(function([a,[b]]) {
    return a*b;
  }),
  "/": mkfn(function([a,[b]]) {
    return a/b;
  }),
  "=": mkfn(function([a,[b]]) {
    return a == b;
  }),
  not: mkfn(function([y]) {
    return !y;
  }),
  and: mkfn(function([a,[b]]) {
    return a && b;
  }),
  or: mkfn(function([a,[b]]) {
    return a || b;
  }),
  '>': mkfn(function([xx,[x]]) {
    return xx > x;
  }),
  '<': mkfn(function([a,[b]]) {
    return a < b;
  }),
  blert: function(msgs) {
    alert(this.concat(msgs));
  },
  parse: mkfn(function([fierce]) {
    return bubbleParse(fierce);
  }),
  eVaL: mkfn(function([v]) {
    return eVaL(this, v[0]);
  }),
  concat: mkfn(function(eeks) {
    return eeks.join('');
  }),
  expandmacro: function([m,n]) {
    return eVaL(this,m).expand(this, n);
  },
  "new": mkfn(function([m,n]) {
      return new m(...n.toArray());
  })
}

// Evaluate Bubblescript
function eval(script) {
  return parse(script)
    .map(function(expression) {
      return eVaL(rootBinding, expression);
    }).peek();
}

function debug(...params) {
  console.log(...params);
}

function eVaL(bnd, xpr) {
  // console.log(xpr)
  switch (xpr && xpr.constructor) {
    case Symbol:
      // debug('->', xpr.resolve(bnd));
      return xpr.resolve(bnd)
    case Bubble: {
      // console.log("🧀");
      let s = peek(xpr);
      // debug('->', s instanceof Symbol);
      if (s instanceof Symbol) {
      // if (typeof s == "symbol") {
        // debug('->', xpr.toString());
        // debug('->', s.callPattern);
        // let q = eVaL(bnd, s);
        // if (q != s)
        //   return eVaL(bnd,
        //     push(pop(xpr), q));
        if (s.callPattern == 1) {
          //  x or x/x or x.x/x
          let q = eVaL(bnd, s);
          if (q != s)
            return eVaL(bnd,
              push(pop(xpr), q));
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
            // return q[s.fn](...xpr.rest.map(
            //   function(a) {
            //     return eVaL(bnd, a)
            //   }).toArray())
            // console.log(xpr.rest);
            // console.log(toArray(map(xpr.rest,
            //   function(a) {
            //     return eVaL(bnd, a);
            //   })));
            return q[s.fn](...toArray(map(xpr.rest,
              function(a) {
                return eVaL(bnd, a);
              })));
          } catch (e) {
            console.log(s.fn);
            throw e;
          }
        }
      } else if (s instanceof Bubble) {
        return eVaL(bnd,
          push(pop(xpr), eVaL(bnd, s)))
      } else if (s instanceof Fn) {
        return s.call(bnd, pop(xpr));
      } else if (s instanceof Function) {
        return s.call(bnd, pop(xpr));
      } else if (s instanceof Macro) {
        return s.call(bnd, pop(xpr));
      } else {
        return undefined;
      }
    }
    case Balloon:
      return Balloon.map(xpr, (a) => {
        return eVaL(bnd, a)
      });
    case Fn:
    // case Macro:
      return each(xpr.body, (xpr) => {
        return eVaL(bnd, xpr);
      });
    case Quoted:
      return unquote(xpr);
    default:
      return xpr;
  }
};


module.exports = eval;


