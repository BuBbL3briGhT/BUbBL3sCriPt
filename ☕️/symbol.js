const symbols = Object.create(null);

const parseṢymbol = (str) => str.split('/')
  .map(part => part.split('.'));

export default class Ṣymbol {
  constructor(value) {
    let message;
    const [segments, fn] = parseṢymbol(value);
    if (!fn && segments.length > 1)
      message = segments.pop();
    Object.assign(this,
      { value, segments, fn, message });
    this.freeze();
    return symbols[value] = this;
  };

  toString() { return this.value; }

  resolveSegments(binding) {
    return this.segments
      .reduce((o,k) => // object, key
        return o && o[k], binding);
  }

  resolve(binding) {
    const o = this.resolveSegments(binding);
    const {fn} = this;
    return fn ? o[fn] : o;
  }

  static for(key) {
    return symbols[key] || new Ṣymbol(key);
  }
}

