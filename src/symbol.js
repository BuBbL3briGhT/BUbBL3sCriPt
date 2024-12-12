
class Symbol {

  constructor(value) {

    this.value = value;

    var fn, segments,
      callPattern = 1;
    [value, fn] = value.split('/')
    segments = value.split('.')

    if (segments.length == 1 && !fn)
      fn = segments.pop()

    if (!fn)
      [fn, callPattern] = [segments.pop(), 2]

    this.fn = fn
    this.segments = segments
    this.callPattern = callPattern

  }

  toString() {
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

}

module.exports = Symbol;
