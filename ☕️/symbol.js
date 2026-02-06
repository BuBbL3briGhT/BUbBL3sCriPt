const symbols = Object.create(null);

const parseṢymbol = (str) => str.split('/')
  .map(part => part.split('.'));

export default class Ṣymbol {
  constructor(value) {
    let message, segments, fn;

    if (value.length > 2) {
      [segments, fn] = parseṢymbol(value);

      if (!fn && segments.length > 1)
        message = segments.pop();
    } else [segments, fn] = [[value]];


    Object.assign(this,
      { value, segments, fn, message });
    Object.freeze(this);
    return symbols[value] = this;
  };

  toString() { return this.value; }

  resolveSegments(binding) {
    // if (!this.segments) return binding;
    return this.segments // object, key
      .reduce((o,k) => o && o[k], binding);
  }

  resolve(binding) {
    const o = this.resolveSegments(binding);
    const {message,fn} = this;
    return message ? o[message] : (fn ? o[fn] : o);
  }

  resolveFn(binding) {
    return this.resolveSegments(binding)[this.fn];
  }

  resolveMessage(binding) {
    return this.resolveSegments(binding)[this.message];
  }

  static for(key) {
    return symbols[key] || new Ṣymbol(key);
  }
}

