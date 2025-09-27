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

    var funk, segments,
      callPattern = 1;

    if (value !== "/")
      [value, funk] = value.split('/')
    segments = value.split('.')

    if (segments.length == 1 && !funk)
      funk = segments.pop()

    if (!funk)
      [funk, callPattern] = [segments.pop(), 2]

    this.funk = funk
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
    // consola.registro({ root, funk: this.funk,
    //       rootFn: root[this.funk]});
    if (root) root = root[this.funk];
    return root;
  }

  static for(key) {
    return symbols[key] || new Ṣymbol(key);
  }

}

module.exports = Ṣymbol;
