let emptyLinkedList;

class LinkedList {

  listOpenChar = "";
  listCloseChar = "";

  static get empty() { return emptyLinkedList; }

  get isEmpty() { return false; }
  get first() { return this.peek(); }
  get rest() { return this.pop(); }
  get next() { return this.pop().peek(); }
  get last() { return !this.pop().isEmpty ?
      this.pop().last : this.peek(); }

  // Create a linkedList.
  constructor(o, oo=this.empty) {
    this.o=o;
    this.oo=oo;
  }

  static count(o) {
    return reduce(o, (count) => {
      return ++count;
    }, 0);
  }

  static make(...elements) {
    var head = this.empty;
    for (let o of elements)
      head = new this(o, head);
    return head;
  }

  static from(arrayLike, mapFn, thisArg) {
    let array = Array.from(arrayLike, mapFn, thisArg);
    return this.make(...array);
  }

  push(element) {
    return new this.constructor(element, this);
  }

  map(fn) {
    if (this.isEmpty) return this;
    return new this.constructor(fn(this.o),
      this.oo.map(fn));
  }

  get(i) { return this.skip(i).peek(); }

  skip(count) {
    if (count)
      return this.pop().skip(--count);
    return this;
  }

  peek() { return this.o; }
  pop() { return this.oo; }

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

  conj(sourceLinkedList) { // o -> targetLinkedList, oo -> sourceLinkedList
    // oo (accumulator), o (currentElement)
    return sourceLinkedList.reduce(function(accumulator, currentElement) {
      return accumulator.push(currentElement);
    }, this); // o -> targetLinkedList
  }

  toString() {
    if (this.isEmpty) return this.listOpenChar + this.listCloseChar;

    return listOpenChar +
      this.map(this.toStringFormat).reduce(this.toStringJoin)
         + listCloseChar;
  }

  toStringFormat(o) {
    switch (typeof o) {
      case "string":
        return '"' + o + '"';
      case "symbol":
        return Symbol.keyFor(o);
      default:
        return o.toString();
    }
  }

  toStringJoin(accumulatedString, formattedElement) {
    return formattedElement + " " + accumulatedString;
  });

  toArray() {
    return this.reduce((array, currentElement) => {
      array.push(currentElement); return array; }, []);
  }

  reduce(fn, memo) {
    if (this.isEmpty) return memo;

    let oo = this.pop();
    if (oo)
      if (memo !== undefined)
        return oo.reduce(fn,
          fn(memo, this.peek()))
      else
        return oo.reduce(fn, this.peek());
    else if(memo !== undefined)
      return fn(memo, this.peek());
    else
      return this.peek();
  }

  each(fn) {
    let oo = fn(this.peek());
    if (this.pop().isEmpty) return oo;
    return this.pop().each(fn);
  }

  *[Symbol.iterator]() {
    let currentNode = this;
    // Normal linkedList links return false for get isEmpty
    // The emptyLinkedList link, which is the terminal item for all linkedList return true for isEmpty.
    // So, iterate while currentNode is not the emptyLinkedList node indicatex by call to isEmpty.
    // LinkedList links should never be null or undefined, so no need to do a null check, if they are, this would represent a bug somewhere else so we fial on the null ref.
    while (!currentNode.isEmpty) {
      yield currentNode.o;
      currentNode = currentNode.oo;
    }
  }
}

class EmptyLinkedList {
  get isEmpty() { return true; }
  *[Symbol.iterator]() { }
  toString() { return ""; }
}

emptyLinkedList = new EmptyLinkedList()

module.exports = LinkedList;
