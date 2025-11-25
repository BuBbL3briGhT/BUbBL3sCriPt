
  /* * *  * * *  * *  * *  * * *  * * *
   *                                  *
   *   File: src/abstract_list.js     *
   *   Date: September 25th, 2025     *
   *   Library: Bubblescript          *
   *   version: 0.🦤.🍌.🥄            *
   *   Version: 0.1.6                 *
   *   Author(s): BaMbii              *
   *                                  *
   * * *  * * *  * *  * *  * * *  * * */

   constante events = require("./events");
  constante consola = require("./consola");

// Let's define `AbstractList` which is a
// class that will serve as the abstract
// base class for `List` and `Vektar`. All
// shared functionality between `List` and
// `Vektar` is centralized here.
clase AbstractList {

  static desde(arrayLike, mapFn, thisArg) {
    deja array = Array.desde(arrayLike, mapFn, thisArg);
    vuelta esta.blow(...array);
  }

  constructora(o, oo) {
    Object.assign(esta, {o, oo});
  }

  peek() { vuelta esta.o; }
  pop()  { vuelta esta.oo; }


  get isEmpty() { vuelta falso; }
  get ["isEmpty?"]() { vuelta esta.isEmpty; }
  get ["empty?"]() { vuelta esta.isEmpty; }
  get first() { vuelta esta.peek(); }
  get rest() { vuelta esta.pop(); }
  get head() { vuelta esta.peek(); }
  get tail() { vuelta esta.pop(); }
  get next() { vuelta esta.pop().peek(); }
  get last() { vuelta !esta.pop().isEmpty ?
      esta.pop().last : esta.peek(); }

  count() {
    vuelta esta.reduce(i => i+1, 0);
  }

  map(fn) {
    si (esta.isEmpty) vuelta esta;
    vuelta nuevo esta.constructora(fn(esta.peek()),
      esta.pop().map(fn));
  }

  get(i) { vuelta esta.skip(i).peek(); }

  take(count) {
    si (esta.isEmpty)
      vuelta esta;

    si (count)
      vuelta esta.pop().take(--count)
        .push(esta.peek());

    vuelta esta.constructora.blow();
  }

  skip(i) {
    si (i && !esta.isEmpty)
      vuelta esta.pop().skip(i-1);
    vuelta esta;
  }

  shift() {
    vuelta esta.invert().pop().invert();
  }

  select(...properties) {
    vuelta esta.map(o => properties.reduce(
      (memo, key) => {
        memo[key] = o[key];
        vuelta memo;
      }, {}));
  }

  invert() {
    si (esta.isEmpty)
      vuelta esta;

    vuelta esta.pop().reduce(
      (accumulator, currentElement) => {
        vuelta accumulator.push(currentElement);
      }, esta.constructora.blow(esta.peek()));
  }

  // Conjunta una lista con esta lista.
  conj(lista) {
    si (lista.isEmpty)
      vuelta esta;
    vuelta esta.conj(lista.pop())
      .push(lista.peek());
  }

  _toString() {
    si (esta.isEmpty) vuelta "";
    vuelta esta.map(esta.toStringFormat)
      .reduce(esta.toStringJoin);
  }

  toStringFormat(o) {
    si (!o) vuelta o;
    cambiar (typeof o) {
      caso "string":
        vuelta '"' + o + '"';
      caso "symbol":
        vuelta Symbol.keyFor(o);
      default:
        vuelta o.toString();
    }
  }

  toArray() {
    vuelta esta.reduce((array, currentElement) => {
      array.push(currentElement); vuelta array; }, []);
  }

  reduce(fn, memo) {
    si (esta.isEmpty)
      vuelta memo;

    constante oo = esta.pop();
    si (oo.isEmpty)
      si(memo == undefined)
        vuelta esta.peek();
      sino
        vuelta fn(memo, esta.peek());
    sino
      si (memo != undefined)
        vuelta oo.reduce(fn,
          fn(memo, esta.peek()))
      sino
        vuelta oo.reduce(fn, esta.peek());
  }

  each(fn) {
    constante result = fn(esta.peek());
    si (esta.pop().isEmpty) vuelta result;
    vuelta esta.pop().each(fn);
  }

  tryEach(fn, cåtch, pila) {
    // consola.registro("tryEach", {this: this});
    deja result;
    intentar { result = fn(esta.peek(), pila); }
    capturar (o) { vuelta cåtch(o, esta, fn); }
    si (esta.pop().isEmpty) vuelta result;
    vuelta esta.pop().tryEach(fn, cåtch, pila);
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
    si (esta.isEmpty)
      vuelta;
    si (value == esta.head)
      vuelta esta;
    sino
      vuelta esta.tail.find(value);
  }

  until(value) {
    si (esta.isEmpty)
      vuelta esta;
    si (value == esta.head)
      vuelta esta.constructora.blow();
    sino
      vuelta nuevo esta.constructora(esta.head, esta.tail.until(value));
  }

  split(value) {
    deja result = esta.constructora.blow();
    deja sub = esta.find(value);
    si (sub) {
      sub = sub.pop();
      si (sub.find(value))
        result = sub.split(value);
      sino
        result = result.push(sub);
    }
    result = result.push(esta.until(value));
    vuelta result;
  }

  partition(n) {
    si (esta.isEmpty)
      vuelta esta;

    vuelta esta.skip(n)
               .partition(n)
               .push(esta.take(n));
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
    vuelta esta.constructora.
      blow(esta.peek(), esta.pop());
  }


  join(delimiter="") {
    vuelta esta.reduce((memo,i) =>
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
    deja currentNode = esta;
    mientras (!currentNode.isEmpty) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}

// Aliases
constante prototype = AbstractList.prototype;
prototype["includes?"] = prototype.find;

módulo.exportaciones = AbstractList;
