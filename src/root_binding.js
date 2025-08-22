const List = require("./list");
const Vector = require("./vector");
const Fn = require("./fn");
const Ṣymbol = require("./symbol");
const { Macro }= require("./macro");
const { ëval } = require("./eval");
const Range = require("./range");
const LazyList = require("./lazy_list");
const reqůire = require("./reqůire");
const mkfn = require("./util/mkfn");

// A man walks into a bar. Bartender says
// what'll you have?  The man says,
// something strong,  my head is killing
// me. 🍸
const rootBinding = {
  console: console,
  // Js require
  ["reqūire"]: mkfn(o => require(...o)),

  // Bubblescript require
  // ["reqůire"]: mkfn(o => reqůire(...o)),

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

  const: function (list) {
    const key = list.peek();
    const value = list.pop();

    switch (key.constructor) {
      case List:
        // List sets a function
        break;
      case Vector:
        // Vector destructures
        const o = value.eval(this);
        console.log("value", value);
        console.log("o", o);
        for (const k of key) {
          const sKey = k.toString();
          if (Object.hasOwn(this, sKey))
            throw new Error("const " + sKey + " already set");

          this[sKey] = o[sKey];
          console.log(sKey);
        }
        break;
      default:
        // Symbol sets
        const sKey = key.toString();
        if (Object.hasOwn(this, sKey))
          throw new Error("const " + sKey + " already set");
        // return this[sKey]
        //   = ëval(this, value.peek());
        return this[sKey] = value.eval(this);
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
    const binding = this;
    const x = args.push(Ṣymbol.for('fn'));
    const fn = ëval(binding, x);
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
  //
  get: mkfn(function(yeahyeahyeahs) {
    // console.log(yeahyeahyeahs);
     return yeahyeahyeahs.reduce(
        (memo,key) => memo && memo[key]);
  }),

  range: mkfn(function (yippies) {
    return new Range(...yippies);
  }),

  lazy: mkfn(function (itty) {
    return new LazyList(...itty);
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
  })
};

// Alias muf to 🫧
rootBinding["🫧"] = rootBinding.muf;

module.exports = { rootBinding, mkfn };
