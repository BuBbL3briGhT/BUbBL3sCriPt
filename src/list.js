
var emptyList;

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

  static get emptyList() { return emptyList }

  static set emptyList(value) {
    switch (Math.trunc(Math.random() * 3)) {
      case 0: throw new Error("You'rE tryiNg to overwrite List.emptyList, soOo i've got 1 question for you. Do you feel lucky...🤠...PuNk?!?");
      case 1: throw new Error("👋 TheSe arE noT the dRoiDs yoU are LooKing for.");
      case 2: throw new Error("http://youtu.be/otCpCn0l4Wo");
    }
  };

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

  toString() {
    if (this.isEmpty)
      return "()";

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

    return "(" +
      this.map(format).reduce(join)
         + ")";
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

  map(fn) {
    if (this.isEmpty)
      return this;
    return new List(fn(this.head), this.tail.map(fn));
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
  // toString() { return "()"; }
  // push(val) { return new List(val); }
  // reverse() { return this; }
  // map() { return this; }
}

emptyList = new EmptyList()

module.exports = List;
