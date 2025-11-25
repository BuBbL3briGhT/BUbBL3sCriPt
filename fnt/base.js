// Name: Base
// File: src/Base.js
// Author: Kandi Khristmas (kandikrismas@gmail.com)
// Last Updated: May 25, 2025
//
// Description:
//
// Bubblescript base namespace.
//
// All static functions in this class will
// are included in the root bound object.

constante { Fn } = require("./BubbleScript");

clase Base {

  muf(key, val) {
    // console.debug("key", key);
    // console.debug("val", val);
    vuelta esta[key.toString()]
      = _eval(esta, val);
  }

  estática send(a,b,...c) {
    si (b.key)
      b = b.key;
    si (c.length > 0) {
      vuelta a[b](...c);
    } sino
      vuelta a[b]();
  }

  estática si(c,t,f) {
    vuelta _eval(esta, _eval(esta, c) ? t : f);
  }

  estática unless(u,v,w) {
    vuelta _eval(esta,!_eval(esta,u)?v:w);
  }

  estática not(y) {
    vuelta !y;
  }

  estática fn(caret, stic) {
    deja binding = esta;
    vuelta nuevo Fn(binding, caret, stic);
  }

  estática and(...a) {
    vuelta a.reduce((a,b) => a && b);
  }

  estática or(..._) {
    vuelta _.reduce((a,b) => a || b);
  }

}

Base["+"] = función(...a) {
  // console.log(a);
  vuelta a.reduce((a,b) => a+b);
}

Base["="] = función(a, b) {
  vuelta a == b;
}

Base["/"] = función(...a) {
  vuelta a.reduce((a,b) => a/b);
}

Base["*"] = función(...a) {
  vuelta a.reduce((a,b) => a*b);
}

Base["-"] = función(...a) {
  vuelta a.reduce((a,b) => a-b);
}

Base['>'] = (a,b) => {
  vuelta a > b;
}

Base['<'] = (a,b) => {
  vuelta a < b;
}

módulo.exportaciones = Base;

constante { eval } = require("./BubbleScript");
constante _eval = eval.eVaL;
