
class List  {

  constructor(head, tail) {
    this.head = head;
    this.tail = tail || List.emptyList;
  }

  static from(a) {
    var list;
    a = Array.from(a);
    list = new List(a.pop());
    while (a.length > 0) {
      list = list.push(a.pop());
    }
    return list;
  }

  push(val) {
    return new List(val, this);
  }

  peek() {
    return this.head;
  }
  pop() {
    return this.tail || List.emptyList;
  }

  get isEmpty() { return false; }

  get first() {
    return this.head;
  }
  get rest() {
    return this.tail;
  }
  get next() {
    return this.tail.head;
  }
  get last() {
    return this.tail ? this.tail.last : this.head;
  }

  count() {
    return this.reduce(function(memo, i) {
      return memo + 1;
    }, 0);
  }

  shift() {
    return this.reverse().pop().reverse();
  }

  reverse() {
    var list;

    if (this.isEmpty) return this;

    list = new List(this.head);
    return this.tail.reduce(function(memo, i) {
      return memo.push(i);
    }, list);
  }

  reverse() {
    var list;

    if (this.isEmpty) return this;

    list = new List(this.head);

    list = this.tail.reduce((memo, i) => {
      return memo.push(i);
    }, list);
    return list;
  }

  conj(val) {
    return val.reduce(function(memo, i) {
      return memo.push(i);
    }, this);
  }

  join(delimiter = ' ') {
    // if (this.isEmpty)
    //   return '';

    if (this.tail) {
      return this.head + delimiter + this.tail.join()
    } else {
      let t = typeof this.head;
      switch (t) {
        case "string":
          return '"' + this.head + '"';
        case "symbol":
          return Symbol.keyFor(this.head);
      }
      return this.head.toString()
    }
  }

  toString() {
    return "(" + this.join() + ")"
  }

  toString() {
    let format = (item) => {
      switch (typeof item) {
        case "string":
          return '"' + item + '"';
        case "symbol":
          return Symbol.keyFor(item);
        default:
          return item.toString();
      }

    }
    let join = (memo, item) => {
      return item + " " + memo;
    }
    return "(" + this.map(format).reduce(join) + ")";
  }

  inspect() {
    "(" + map(function(q) {
      q.inspect()
    }).join() + ")"
  }

  toArray() {
    if (this.tail) {
      return [this.head].concat(this.tail.toArray());
    } else {
      return [this.head];
    }
  }

  map(fn) {
    var tail = null,
      head;
    if (this.tail)
      tail = this.tail.map(fn);
    head = fn(this.head);
    return new List(head, tail);
  }

  reduce(fn, memo) {
    if (this.isEmpty)
      return memo;

    if (memo === undefined) {
      memo = this.head;
    } else {
      memo = fn(memo, this.head);
    }

    return this.tail.reduce(fn, memo);
  }

  each(fn) {
    var result = fn(this.head);
    if (this.tail)
      return this.tail.each(fn);
    return result;
  }

  *[global.Symbol.iterator]() {
    yield this.peek();
    yield this.pop();
  }

  static create(...items) {
    if (items.length == 0)
      return this.emptyList;
    else
      return List.from(items);
  }

}

class EmptyList extends List {
  get isEmpty() { return true; }
  toString() { return "()"; }
  push(val) { return new List(val); }
  reverse() { return this; }
  map() { return this; }
}

List.emptyList = new EmptyList;

module.exports = List;
