
class List  {
  constructor(head, ...tail) {
    this.head = head;
    this.tail = tail[0];
    if (tail.length > 1)
      this.tail = List.from(tail);
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
    if (!this.tail) return this;
    var list = new List(this.head);
    return this.tail.reduce(function(memo, i) {
      return memo.push(i);
    }, list);
  }

  conj(val) {
    return val.reduce(function(memo, i) {
      return memo.push(i);
    }, this);
  }

  join(delimiter = ' ') {
    if (this.tail) {
      return this.head + delimiter + this.tail.join()
    } else {
      if (typeof this.head == "string") {
        return '"' + this.head + '"';
      }
      return this.head.toString()
    }
  }

  toString() {
    return "(" + this.join() + ")"
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
    var a, b, c = this;
    if (memo == undefined) {
      a = this.head;
      c = this.tail;
      if (!c) {
        return a;
      } else {
        b = c.head;
        c = c.tail;
        memo = fn(a, b);
        if (!c)
          return memo;
      }
    }
    return c.push(memo).reduce(fn);
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

}

class EmptyList extends List {
  get isEmpty() { return true; }
  push(val) {
    return new List(val);
  }
  toString() {
    return "()";
  }
  reverse() {
    return this;
  }

  map() { return this; }

}

List.emptyList = new EmptyList;

module.exports = List;
