const symbols = Object.create(null);


const parseṢymbol = (str) => str.split('/')
  .map(part => part.split('.'));

export class Ṣymbol {
  constructor(value) {
    [segments, fn] = parseṢymbol(value);
    Object.assign(this, {value, segments, fn});
    this.freeze();
    return symbols[value] = this;
  };

  toString() { return this.value; }

  resolve(binding) {

  }

  call(binding, params) {

  }

  static for(key) {
    return symbols[key] || new Ṣymbol(key);
  }
}


export class Ṣymbol extends Symbol {};


// `Ṣymbol`s are language symbols. Alternatively
// to avoid name clash with the built-in
// Javascript `Symbol` class/object.
export default class Ṣymbol {

  constructor(value) {
    if(symbols[value]) {
      throw new Error("Duplicate symbol initalization");
    }

    this.value = value;

    const fn, segments;

    if (value !== "/")
      [this.value, this.fn] = value.split('/');

    segments = value.split('.');

    if (segments.length == 1 && !fn)
      fn = segments.pop();

    if (!fn)
      [fn, callPattern] = [segments.pop(), 2];

    this.fn = fn;
    this.segments = segments;
    this.callPattern = callPattern;

    return symbols[value] = this;
  }

  get segments() {
    this.segments

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

  static for(key) {
    return symbols[key] || new Ṣymbol(key);
  }

}

// // Return symbol segments.
// export function getSegments(symbol) {
//   const { value } = symbol;
//   const segments = value.split(".");
//   return segments;
// }

// // Converts symbol segments into a lookup list.
// export function segmentsToList(segments) {
// }



