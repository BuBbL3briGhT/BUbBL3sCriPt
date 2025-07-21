const parse = require("../f/parse");

const Vector    = require("../o/vector");
const List   = require("../o/list");
const Keyword = require("../o/keyword");
const Fn      = require("../o/fn");
const Macro   = require("../o/macro");
const Symbol  = require("../o/symbol");
const Bubble  = require("../o/bubble");


// const { map, peek, pop, push, toArray } =
//   List;

// const { from: vectorFromArray, push: vectorPush} = Vector;

// Makes a Listcript function from a
// Javascript function.
// Params:
//   q: A Javascript function that will be
//   called for this function.
// Returns an annonomous function that is
// sutible for use with listcript.
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
  List: List,
  Vector: Vector,

  muf: function([key,val]) {
    return this[key.toString()]
      = _eval(this, val);
  },
  // fn: function([caret, stic]) {
  //   return new Fn(this, caret, stic);
  // },
  fn: function(_) {
    // console.log(_);
    let binding = this;
    let caret = _.peek();
    let stic  = _.pop();
    return new Fn(binding, caret, stic);
  },

  macro: function(args) {
    return new Macro(this, args.first, args.rest)
  },

  jsfn: function(args) {
    var x, binding = this
    x = args.push(new Symbol('fn'));
    var fn = _eval(binding, x);
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
      binding[k] = _eval(binding, w);
    }
    return xx.map(z =>
      _eval(binding, z)).pop();
  },

  if: function([c,t,f]) {
    return _eval(this,
      _eval(this, c) ? t : f);
  },

  unless: function([c,f,t]) {
    return _eval(this,
      _eval(this, c) ? t : f);
  },
  // vector: function(args) {
  //   var binding = this;
  //   return args.map(function(arg) {
  //     return _eval(binding, arg);
  //   }).invert();
  // },
  list: mkfn(function(args) {
    return args;
  }),

  vector: mkfn(function(args) {
    return args.toVector();
  }),

  // vector: function(args) {
  //   return invert(map(invert(args), arg => _eval(this, arg)));
  // },
  // vector: function(args) {
  //   (invert
  //     (map (invert args)
  //       (curry _eval this)))
  //       (fn [arg] (_eval this arg))));
  // },

  blert: function(msgs) {
    alert(this.concat(msgs));
  },

  expandmacro: function([m,n]) {
    return _eval(this,m).expand(this, n);
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
      binding[k] = _eval(binding, v);
    }

    binding.recur = function([a]) {
      a = a.invert();
      while (!a.isEmpty) {
        let k,w;
        k = a.peek();
        a = a.pop();
        w = a.peek();
        a = a.pop();
        binding[k] = _eval(binding, w);
      }
      recurCalled = true;
    };

    do {
      recurCalled = false;
      m = xx.map(z =>
        _eval(binding, z)).pop();
    } while(recurCalled);
    return m;
  },


  send: mkfn(function([a,b,...c]) {
    if (b.key)
      b = b.key;
    if (c.length > 0) {
      // console.log("a", a);
      // console.log("b", b);
      // console.log("c", c);
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
  _eval: mkfn(function([v]) {
    return _eval(this, v[0]);
  }),
  concat: mkfn(function(eeks) {
    return eeks.join('');
  }),
  "new": mkfn(function([m,n]) {
      return new m(...n.toArray());
  }),
}

module.exports = rootBinding;

const eval = require("../f/eval");
const _eval = eval.eVaL;


(function() {
  let bnd = rootBinding;
  let evl = _eval;

  function vector(...args) {
    return List.from(args);
  }
  function glider(...args) {
    return Vector.from(args);
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
      _vector = new Symbol('vector'),
      _muf = new Symbol('muf');

    function muf(...args) {
      // return _eval(bnd, arry.toVector(args).push(_muf));
      return _eval(bnd, List.from(args).push(_muf));
    }

    // // muf push (fn [a b] (send a °push b))
    // muf(_push, vector(fn, glider(a, b),
    //      vector(send, a, quote(_push), b)));

    // muf push (fn [a b] (send a :push b))
    muf(_push, vector(fn, glider(a, b),
         vector(send, a, new Keyword("push"), b)));

    // (muf mufn (macro [name & z]
    //     (vector 'muf name (push z 'fn))))
    muf(mufn, vector(macro, glider(name,amp,z),
        vector(_vector,quote(_muf), name,
           vector(_push, z, quote(fn)))));

})();
