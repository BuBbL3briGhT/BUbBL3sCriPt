// Name: Base
// File: src/f/Base.js
// Author: Kandi Khristmas (kandikrismas@gmail.com)
// Last Updated: May 25, 2025
//
// Description:
//
// Bubblescript base namespace.
//
// All static functions in this class will
// are included in the root bound object.

class Base {

  static muf([key,val]) {
    return this[key.toString()]
      = _eval(this, val);
  }

  static send([a,b,...c]) {
    if (b.key)
      b = b.key;
    if (c.length > 0) {
      return a[b](...c);
    } else
      return a[b]();
  }

  static not([y]) {
    console.debug(y);
    return !y;
  }


}

Base["+"] = function(a) {
  // console.log(a);
  return a.reduce((a,b) => a+b);
}

Base["="] = function([a, b]) {
  return a == b;
}

Base["/"] = function(a) {
  return a.reduce((a,b) => a/b);
}

console.debug("Base 57", Base);
module.exports = Base;
