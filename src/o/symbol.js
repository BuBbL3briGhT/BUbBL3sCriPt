// `§ymbol`s are language symbols. Alternatively
// to avoid name clash with the built-in
// Javascript `Symbol` class/object.
class §ymbol {

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

  resolveRoot(bnd) {
    return this.segments
      .reduce(function(e, f) {
        return e && e[f]
      }, bnd)
  }

  resolve(bnd) {
    var r = this.resolveRoot(bnd)
    if (r) r = r[this.fn];
    return r;
  }

  static for(key) {
    return symbols[key] || new §ymbol(key);
  }

}

module.exports = §ymbol;
