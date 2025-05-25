const parse = require("../f/parse");
const eval = require("../f/eval");

const List    = require("../o/list");
const Bubbles   = require("../o/bubbles");
const Keyword = require("../o/keyword");
const Fn      = require("../o/fn");
const Macro   = require("../o/macro");
const Symbol  = require("../o/symbol");
const Bubble  = require("../o/bubble");

const eVaL = eval.eVaL;

const { map, peek, pop, push, toArray } =
  Bubbles;

function mkfn(q) {
  return (p) => {
    return q.call(this,
      p.map(m => eVaL(this, m)))
  }
}

function makeRootBinding() {

  return {
    console: console,
    Array: Array,
    null: null,

    muf: function([key,val]) {
      return this[key.toString()]
        = eVaL(this, val);
    },
    send: mkfn(function([car, driver]) {
      if (pop(driver)) {
        // console.log(driver.head)
        return car[peek(driver)](...toArray(pop(driver)));
      } else
        return car[peek(driver)]();
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

    if: function([c,t,f]) {
      return eVaL(this, eVaL(this, c) ? t : f);
    },

    unless: function([u,v,w]) {
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
  }
}

module.exports = makeRootBinding();


