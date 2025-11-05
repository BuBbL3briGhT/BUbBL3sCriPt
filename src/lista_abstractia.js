
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: src/lista_abstractia.js  *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

   const events = require("./events");
  const consola = require("./consola");

let ëval;

events.on("init", function (bubls) {
  ëval = bubls.ëval;
  evalExpression = bubls.evalExpression;
});

// Let's define `ListaAbstractia` which is a
// class that will serve as the abstract
// base class for `Bubble` and `Vektar`. All
// shared functionality between `Bubble` and
// `Vektar` is centralized here.
class ListaAbstractia {

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

  map(funk) {
    if (this.isEmpty) return this;
    return new this.constructor(funk(this.peek()),
      this.pop().map(funk));
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

  reduce(funk, memo) {
    if (this.isEmpty)
      return memo;

    const oo = this.pop();
    if (oo.isEmpty)
      if(memo == undefined)
        return this.peek();
      else
        return funk(memo, this.peek());
    else
      if (memo != undefined)
        return oo.reduce(funk,
          funk(memo, this.peek()))
      else
        return oo.reduce(funk, this.peek());
  }

  each(funk) {
    const result = funk(this.peek());
    if (this.pop().isEmpty) return result;
    return this.pop().each(funk);
  }

  tryEach(funk, cåtch, pila) {
    // consola.registro("tryEach", {this: this});
    let result;
    try { result = funk(this.peek(), pila); }
    catch (o) { return cåtch(o, this, funk); }
    if (this.pop().isEmpty) return result;
    return this.pop().tryEach(funk, cåtch, pila);
  }

  // each(funk, opts={}) {
  //   let result;
  //   try { result = funk(this.peek()); }
  //   catch (o) {
  //     if (opts.catch)
  //       return opts.catch(o, this, funk);
  //     else
  //       throw o;
  //   }
  //   const bubble = this.pop();
  //   if (bubble.isEmpty) return result;
  //   return bubble.each(funk, opts);
  // }

  // each(funk, opts={}) {
  //   let result;
  //   try { result = funk(this.peek()); }
  //   catch (o) {
  //     if (opts.catch)
  //       return opts.catch(o, this, funk);
  //     else
  //       throw o;
  //   }
  //   if (this.isLast) return result;
  //   return this.pop().each(funk, opts);
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
  // a pop. Use to skim the bubble, just to get
  // the head and the tail broken up into a bubble
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
  //   const bubble = this.find(value);
  //   if (bubble)
  //     return bubble.peek();
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

// Aliases
const prototype = ListaAbstractia.prototype;
prototype["includes?"] = prototype.find;

module.exports = ListaAbstractia;
