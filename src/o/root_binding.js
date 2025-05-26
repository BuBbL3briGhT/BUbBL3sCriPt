const parse = require("../f/parse");
const eval = require("../f/eval");

const List    = require("../o/list");
const Bubbles   = require("../o/bubbles");
const Keyword = require("../o/keyword");
const Fn      = require("../o/fn");
const Macro   = require("../o/macro");
const Symbol  = require("../o/symbol");
const Bubble  = require("../o/bubble");

const _eval = eval.eVaL;

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
  return (p) => {
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

const rootBinding = {
  console: console,
  Array: Array,
  null: null,

  muf: function([key,val]) {
    return this[key.toString()]
      = _eval(this, val);
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
  fn: function(_) {
    let binding = this;
    let caret = _.peek();
    let stic  = _.pop();
    return new Fn(binding, caret, stic);
  },

  macro: function(args) {
    var binding = this;
    return new Macro(binding, args.first, args.rest)
  },

  jsfn: function(args) {
    var x, binding = this
    x = args.push(new Symbol('fn'));
    var fn = _eval(binding, x);
    return function(...args) {
      return fn.call(binding, arry.toList(args));
    }
  },

  let: function([x,xx]) {
    var binding = Object.create(this);
    x = x.reverse();
    debug('let', x.toString());
    while (!x.isEmpty) { let k,w; [k,[w,x]] = x;
      binding[k] = _eval(binding, w); }
    return xx.each(z => _eval(binding, z));
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
    return args.reverse().map(function(arg) {
      return _eval(binding, arg);
    }).reverse();
  },
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
    console.log('loop', x.toString());
    while (!x.isEmpty) { let k,v; [k,[v,x]] = x;
      keys = keys.push(k);
      binding[k] = _eval(binding, v); }

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
      m = xx.each(z => _eval(cnd, z));
      if (recurCalled) {
        cnd = m;
      }
    } while(recurCalled);
    return m;
  },
}

module.exports = rootBinding;


