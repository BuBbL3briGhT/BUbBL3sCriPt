const symbols = Object.create(null);

const parseṢymbol = (str) => str.split('/')
  .map(part => part.split('.'));

export default class Ṣymbol {
  constructor(value) {
    [segments, fn] = parseṢymbol(value);
    Object.assign(this, {value, segments, fn});
    this.freeze();
    return symbols[value] = this;
  };

  toString() { return this.value; }

  resolveSegments(binding) {
    return this.segments
      .reduce((o,k) => // object, key
        return o && o[k], binding);
  }

  // resolve(binding) {
  //   const o = this.resolveSegments(binding);
  //   const {fn} = this;
  //   return fn ? o[fn] : o;
  // }

  // call(binding, params) {
  //   const o = this.resolveSegments(binding);
  //   const {fn} = this;
  //   if (fn) {
  //     o[fn].call(binding, ...params)
  //   } else {
  //     o(...params)
  //   }
  // }

  static for(key) {
    return symbols[key] || new Ṣymbol(key);
  }
}

