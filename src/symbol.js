const consola = require("./consola");
const symbols = Object.create(null);

// `Ṣymbol`s are language symbols. Alternatively
// to avoid name clash with the built-in
// Javascript `Symbol` class/object.
class Ṣymbol {

  constructor(value) {
    if(symbols[value]) {
      throw new Error("Duplicate symbol initalization");
    }

    this.value = value;

    var fn, segments,
      callPattern = 1;

    if (value !== "/")
      [value, fn] = value.split('/')
    segments = value.split('.')

    if (segments.length == 1 && !fn)
      fn = segments.pop()

    if (!fn)
      [fn, callPattern] = [segments.pop(), 2]

    this.fn = fn
    this.segments = segments
    this.callPattern = callPattern

    return symbols[value] = this;
  }

  toString() {
    return this.value;
  }

  valueOf() {
    return this.value;
  }

  resolveRoot(binding) {
    return this.segments
      .reduce(function(e, f) {
        return e && e[f]
      }, binding)
  }

  eval(binding) {
    let root = this.resolveRoot(binding)
    // consola.registro({ root, fn: this.fn,
    //       rootFn: root[this.fn]});
    if (root) root = root[this.fn];
    return root;
  }

  static for(key) {
    return symbols[key] || new Ṣymbol(key);
  }

}

module.exports = Ṣymbol;
