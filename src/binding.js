export default const bnd = {
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

