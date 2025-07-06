const parse = require("../f/parse");

const List    = require("../o/list");
const Bubbles   = require("../o/bubbles");
const Keyword = require("../o/keyword");
const Fn      = require("../o/fn");
const Macro   = require("../o/macro");
const Symbol  = require("../o/symbol");
const Bubble  = require("../o/bubble");


const { map, peek, pop, push, toArray } =
  Bubbles;

const { from: listFromArray } = List;

// Makes a Bubblescript function from a
// Javascript function.
// Params:
//   q: A Javascript function that will be
//   called for this function.
// Returns an annonomous function that is
// sutible for use with bubblescript.
// #coreUtilityFunction
// TODO: Create tests for mkfn.
function mkfn(q) {
  return function (p) {
    return q.call(this,
      p.map(m => _eval(this, m)))
  }
}

// function mkfn(q) {
//   return (p) => {
//     return q.call(this,
//       ...p.map(m => _eval(this, m)))
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

  muf: function([key,val]) {
    return this[key.toString()]
      = _eval(this, val);
  },
  // fn: function([caret, stic]) {
  //   return new Fn(this, caret, stic);
  // },
  fn: function(_) {
    let binding = this;
    let caret = _.peek();
    let stic  = _.pop();
    return new Fn(binding, caret, stic);
  },
  send: mkfn(function([a,b,...c]) {
    if (b.key)
      b = b.key;
    if (c.length > 0) {
      return a[b](...c);
    } else
      return a[b]();
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

  macro: function(args) {
    return new Macro(this, args.first, args.rest)
  },

  jsfn: function(args) {
    var x, binding = this
    x = args.push(new Symbol('fn'));
    var fn = _eval(binding, x);
    return function(...args) {
      return fn.call(binding, arry.toList(args));
    }
  },

  let: function([x,...xx]) {
    let binding = Object.create(this);
    x = x.invert();
    while (x) {
      let k,w;
      k = x.peek();
      x = x.pop();
      w = x.peek();
      x = x.pop();
      binding[k] = _eval(binding, w);
    }
    return xx.forEach(z =>
      _eval(binding, z));
  },

  if: function([c,t,f]) {
    return _eval(this, _eval(this, c) ? t : f);
  },

  unless: function([u,v,w]) {
    return _eval(this,!_eval(this,u)?v:w);
  },

  print: mkfn(function(vals) {
    return vals.each(function(value) {
      document.body.append(value);
    });
  }),

  list: function(args) {
    var binding = this;
    return args.invert().map(function(arg) {
      return _eval(binding, arg);
    }).invert();
  },

  // list: function(args) {
  //   return invert(map(invert(args), arg => _eval(this, arg)));
  // },
  // list: function(args) {
  //   (invert
  //     (map (invert args)
  //       (curry _eval this)))
  //       (fn [arg] (_eval this arg))));
  // },

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
  blert: function(msgs) {
    alert(this.concat(msgs));
  },
  parse: mkfn(function([s]) {
    return parse(s);
  }),
  _eval: mkfn(function([v]) {
    return _eval(this, v[0]);
  }),
  concat: mkfn(function(eeks) {
    return eeks.join('');
  }),
  expandmacro: function([m,n]) {
    return _eval(this,m).expand(this, n);
  },
  "new": mkfn(function([m,n]) {
      return new m(...n.toArray());
  }),
  loop: function([x,xx]) {
    var binding = Object.create(this),
      cnd = binding,
      keys = emptyGlider,
      m, recurCalled;

    x = x.reverse();
    // console.log('loop', x.toString());
    while (!x.isEmpty) { let k,v; [k,[v,x]] = x;
      keys = keys.push(k);
      binding[k] = _eval(binding, v); }

    // keys = keys.reverse()
    // console.log('loop keys', keys);

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
      m = xx.each(z => _eval(cnd, z));
      if (recurCalled) {
        cnd = m;
      }
    } while(recurCalled);
    return m;
  },
}

module.exports = rootBinding;

const eval = require("../f/eval");
const _eval = eval.eVaL;


(function() {
  let bnd = rootBinding;
  let evl = _eval;

  function list(...args) {
    return Bubbles.from(args);
  }
  function glider(...args) {
    return List.from(args);
  }

  function quote(m) {
    return new Bubble(m);
  }

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
      // return _eval(bnd, arry.toList(args).push(_muf));
      return _eval(bnd, Bubbles.from(args).push(_muf));
    }

    // muf push (fn [a b] (send a 'push b))
    muf(_push, list(fn, glider(a, b),
         list(send, a, quote(_push), b)));

    // (muf mufn (macro [name & z]
    //     (list 'muf name (push z 'fn))))
    muf(mufn, list(macro, glider(name,amp,z),
        list(_list,quote(_muf), name,
           list(_push, z, quote(fn)))));

})();
