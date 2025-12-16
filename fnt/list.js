
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: fnt/list.js              *
   *   Date: December, 2025           *
   *   Library: Bubblescript          *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

    const { BubbleScriptError,
            UndefinedFunctionError }
                 = require("./errors");

    const { interpolate } = require("./strings");

// Let's define `AbstractList` which is a
// class that will serve as the abstract
// base class for `List` and `Vektar`. All
// shared functionality between `List` and
// `Vektar` is centralized here.
class AbstractList {

  static from(arrayLike, mapFn, thisArg) {
    let array = Array.from(arrayLike, mapFn, thisArg);
    return this.blow(...array);
  }

  constructor(o, oo) {
    Object.assign(this, {o, oo});
  }

  peek() { return this.o; }
  pop()  { return this.oo; }


  get isEmpty() { return false; }
  get ["isEmpty?"]() { return this.isEmpty; }
  get ["empty?"]() { return this.isEmpty; }
  get first() { return this.peek(); }
  get rest() { return this.pop(); }
  get head() { return this.peek(); }
  get tail() { return this.pop(); }
  get next() { return this.pop().peek(); }
  get last() { return !this.pop().isEmpty ?
      this.pop().last : this.peek(); }

  count() {
    return this.reduce(i => i+1, 0);
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

    return this.constructor.blow();
  }

  skip(i) {
    if (i && !this.isEmpty)
      return this.pop().skip(i-1);
    return this;
  }

  shift() {
    return this.invert().pop().invert();
  }

  select(...properties) {
    return this.map(o => properties.reduce(
      (memo, key) => {
        memo[key] = o[key];
        return memo;
      }, {}));
  }

  invert() {
    if (this.isEmpty)
      return this;

    return this.pop().reduce(
      (accumulator, currentElement) => {
        return accumulator.push(currentElement);
      }, this.constructor.blow(this.peek()));
  }

  // Conjunta una lista con esta lista.
  conj(lista) {
    if (lista.isEmpty)
      return this;
    return this.conj(lista.pop())
      .push(lista.peek());
  }

  _toString() {
    if (this.isEmpty) return "";
    return this.map(this.toStringFormat)
      .reduce(this.toStringJoin);
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

    const oo = this.pop();
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
    const result = fn(this.peek());
    if (this.pop().isEmpty) return result;
    return this.pop().each(fn);
  }

  tryEach(fn, cåtch, pila) {
    // consola.registro("tryEach", {this: this});
    let result;
    try { result = fn(this.peek(), pila); }
    catch (o) { return cåtch(o, this, fn); }
    if (this.pop().isEmpty) return result;
    return this.pop().tryEach(fn, cåtch, pila);
  }

  // each(fn, opts={}) {
  //   let result;
  //   try { result = fn(this.peek()); }
  //   catch (o) {
  //     if (opts.catch)
  //       return opts.catch(o, this, fn);
  //     else
  //       throw o;
  //   }
  //   const list = this.pop();
  //   if (list.isEmpty) return result;
  //   return list.each(fn, opts);
  // }

  // each(fn, opts={}) {
  //   let result;
  //   try { result = fn(this.peek()); }
  //   catch (o) {
  //     if (opts.catch)
  //       return opts.catch(o, this, fn);
  //     else
  //       throw o;
  //   }
  //   if (this.isLast) return result;
  //   return this.pop().each(fn, opts);
  // }

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
      return this.constructor.blow();
    else
      return new this.constructor(this.head, this.tail.until(value));
  }

  split(value) {
    let result = this.constructor.blow();
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

  // Simple little method returns a peek and
  // a pop. Use to skim the list, just to get
  // the head and the tail broken up into a list
  // which can the be destructed into locals
  // or otherwise manipulated. There might be
  // a more conventenal what to do this, but
  // this is serving my purposes for the time begin.
  // #LongLivePlop! ✨️
  plop() {
    return this.constructor.
      blow(this.peek(), this.pop());
  }


  join(delimiter="") {
    return this.reduce((memo,i) =>
      memo + delimiter + i);
  }

  // include (value) {
  //   return this.find(value).?peek();
  // }

  // include (value) {
  //   const list = this.find(value);
  //   if (list)
  //     return list.peek();
  // }

  // ["includes?"] (value) {
  //   return !!this.include(value);
  //   // return !!this.find(value);
  // }

  *[Symbol.iterator]() {
    let currentNode = this;
    while (!currentNode.isEmpty) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}


let emptyList;

const traceTemplate =
  "    en ${func} (${file}:${line}:${column})";
const interpolateTrace =
  interpolate.bind(traceTemplate);

/**
 * @class List
 * @extends AbstractList
 * @description The primary data structure in Bubblescript, representing a Lisp-like list.
 * @example
 * const list = List.blow(1, 2, 3);
 * // => (1 2 3)
 */
class List extends AbstractList {

  /**
   * @static
   * @property {EmptyList} emptyList - An instance of `EmptyList`, which terminates all lists.
   */
  static get emptyList() { return emptyList; }

  /**
   * @static
   * @method make
   * @description Creates a new list.
   * @param {...*} elements - The elements to add to
   *   the list.
   * @returns {List} The new list.
   * @example
   * const list = List.make(1, 2, 3);
   * // => (1 2 3)
   */
  static make(...elements) {
    return List._make(elements);
  }

  static _make(elements, list=emptyList) {
    if (elements.length < 1)
      return list;
    return List._make(elements,
      list.push(elements.pop()));
  }

  // Create a list.
  constructor(o, oo=emptyList) {
    super(o, oo);
  }

  push(element) {
    return new List(element, this);
  }

  toString() {
    return "(" + this._toString() + ")";
  }

  toStringJoin(accumulatedString, formattedElement) {
    return accumulatedString + " " + formattedElement;
  };

  // toVector() {
  //   return this.reduce((vektar, o) => {
  //     return vektar.push(o); },
  //     Vektar.emptyVector);
  // }

  map(func) {
    if (this.isEmpty) return List.emptyList;
    return new List(func(this.peek()),
        this.pop().map(func));
  }

  toList() {
    return this.map(o => o);
  }

  zip (list) {
    if (this.isEmpty)
      return list;

    if (list.isEmpty)
      return this;

    return this.pop()
      .zip(list.pop())
      .push(list.peek())
      .push(this.peek());
  }

  unzip () {
    if (this.isEmpty)
      return List.blow(this, this);

    const that = this.pop();

    if (that.isEmpty)
      return List.blow(this, that);

    const [a, b] = that.pop().unzip();
    return List.blow(
      a.push(this.peek()),
      b.push(that.peek()));
  }
}

class EmptyList extends List {
  get isEmpty() { return true; }
}

emptyList = new EmptyList();

module.exports = { AbstractList, List };

