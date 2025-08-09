
class AbstractList {

  static from(arrayLike, mapFn, thisArg) {
    let array = Array.from(arrayLike, mapFn, thisArg);
    return this.make(...array);
  }

  constructor(o, oo) {
    this.o=o;
    this.oo=oo;
  }

  peek() { return this.o; }
  pop()  { return this.oo; }

  get isEmpty() { return false; }
  get first() { return this.peek(); }
  get rest() { return this.pop(); }
  get head() { return this.peek(); }
  get tail() { return this.pop(); }
  get next() { return this.pop().peek(); }
  get last() { return !this.pop().isEmpty ?
      this.pop().last : this.peek(); }

  count() {
    return this.reduce((count) => {
      return ++count;
    }, 0);
  }

  map(fn) {
    if (this.isEmpty) return this;
    return new this.constructor(fn(this.peek()),
      this.pop().map(fn));
  }

  get(i) { return this.skip(i).peek(); }

  take(count) {
    if (this.isEmpty)
      return this;

    if (count)
      return this.pop().take(--count)
        .push(this.peek());

    return this.constructor.make()
  }

  skip(count) {
    if (count && !this.isEmpty)
      return this.pop().skip(--count);

    return this;
  }

  shift() {
    return this.invert().pop().invert();
  }

  invert() {
    if (this.isEmpty)
      return this;

    return this.pop().reduce(
      (accumulator, currentElement) => {
        return accumulator.push(currentElement);
      }, this.constructor.make(this.peek()));
  }

  conj(sourceList) {
    return sourceList.reduce(function(accumulator, currentElement) {
      return accumulator.push(currentElement);
    }, this);
  }

  _toString() {
    if (this.isEmpty) return "";
    return this.map(this.toStringFormat).reduce(this.toStringJoin);
  }

  toStringFormat(o) {
    if (!o) return o;
    switch (typeof o) {
      case "string":
        return '"' + o + '"';
      case "symbol":
        return Symbol.keyFor(o);
      default:
        return o.toString();
    }
  }

  toArray() {
    return this.reduce((array, currentElement) => {
      array.push(currentElement); return array; }, []);
  }

  reduce(fn, memo) {
    if (this.isEmpty)
      return memo;

    let oo = this.pop();
    if (oo.isEmpty)
      if(memo == undefined)
        return this.peek();
      else
        return fn(memo, this.peek());
    else
      if (memo != undefined)
        return oo.reduce(fn,
          fn(memo, this.peek()))
      else
        return oo.reduce(fn, this.peek());
  }

  each(fn) {
    let oo = fn(this.peek());
    if (this.pop().isEmpty) return oo;
    return this.pop().each(fn);
  }

  eval(binding) {
    return this.each(xpr =>
      AbstractList.eval(binding, xpr));
  }


  mapEval(binding) {
    return this.map(xpr =>
      AbstractList.eval(binding, xpr));
  }

  find(value) {
    if (this.isEmpty)
      return;
    if (value == this.head)
      return this;
    else
      return this.tail.find(value);
  }

  until(value) {
    if (this.isEmpty)
      return this;
    if (value == this.head)
      return this.constructor.make();
    else
      return new this.constructor(this.head, this.tail.until(value));
  }

  split(value) {
    let result = this.constructor.make();
    let sub = this.find(value);
    if (sub) {
      sub = sub.pop();
      if (sub.find(value))
        result = sub.split(value);
      else
        result = result.push(sub);
    }
    result = result.push(this.until(value));
    return result;
  }

  partition(n) {
    if (this.isEmpty)
      return this;

    return this.skip(n)
               .partition(n)
               .push(this.take(n));
  }

  *[Symbol.iterator]() {
    let currentNode = this;
    while (!currentNode.isEmpty) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}

module.exports = AbstractList;
