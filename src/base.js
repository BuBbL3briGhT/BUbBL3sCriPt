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

const { Fn } = require("./BubbleScript");

class Base {

  muf(key, val) {
    // console.debug("key", key);
    // console.debug("val", val);
    return this[key.toString()]
      = _eval(this, val);
  }

  static send(a,b,...c) {
    if (b.key)
      b = b.key;
    if (c.length > 0) {
      return a[b](...c);
    } else
      return a[b]();
  }

  static if(c,t,f) {
    return _eval(this, _eval(this, c) ? t : f);
  }

  static unless(u,v,w) {
    return _eval(this,!_eval(this,u)?v:w);
  }

  static not(y) {
    return !y;
  }

  static fn(caret, stic) {
    let binding = this;
    return new Fn(binding, caret, stic);
  }

  static and(...a) {
    return a.reduce((a,b) => a && b);
  }

  static or(..._) {
    return _.reduce((a,b) => a || b);
  }

}

Base["+"] = function(...a) {
  // console.log(a);
  return a.reduce((a,b) => a+b);
}

Base["="] = function(a, b) {
  return a == b;
}

Base["/"] = function(...a) {
  return a.reduce((a,b) => a/b);
}

Base["*"] = function(...a) {
  return a.reduce((a,b) => a*b);
}

Base["-"] = function(...a) {
  return a.reduce((a,b) => a-b);
}

Base['>'] = (a,b) => {
  return a > b;
}

Base['<'] = (a,b) => {
  return a < b;
}

module.exports = Base;

const { eval } = require("./BubbleScript");
const _eval = eval.eVaL;
