
class Balloon {

  constructor(head, tail) {
    this.head = head;
    this.tail = tail || Balloon.emptyBalloon;
  }

  static from(a) {
    a = Array.from(a);
    var head = a.pop(),
       tail = a;
     if (tail.length > 0)
         return new Balloon(head, this.from(tail));
     return new Balloon(head);
  }

  peek() {
    return this.head;
  }
  push(val) {
    return new Balloon(val, this);
  }
  pop() {
    return this.tail || Balloon.emptyBalloon;
  }

  get isEmpty() { return false; }

  conj(...val) {
    return val.reduce(function(i, memo) {
      memo.push(i);
    }, this);
  }

  get first() {
    if (this.tail) {
      return this.tail.first
    } else {
      return this.head
    }
  }

  get rest() {
    if (this._rest == null)
      if (this.tail)
        this._rest = new Balloon(this.head, this.tail.rest);

    return this._rest;
  }

  get second() {
    return this.rest.first;
  }

  join(delimiter = ' ') {
    if (this.rest)
      return this.first + delimiter + this.rest.join();
    else
    if (typeof this.first == "string")
      return '"' + this.first + '"';
    else
      return this.first + '';
  }

  toString() {
    return "[" + this.join() + "]"
  }

  inspect() {
    "[" + this.map(function(q) {
      q.inspect()
    }).join() + "]";
  }

  map(funk, ...aux) {
    var tail = null;

    var result = new Balloon(funk(this.first,
      ...aux.map(function(q) {
        return q ? q.first : q
      })));

    if (!this.rest)
      return result;

    function into(a, b) {
      var c = new Balloon(b.peek());
      b = b.pop();

      while (!b.isEmpty) {
        c = c.push(b.peek());
        b = b.pop();
      }
      while (!c.isEmpty) {
        a = a.push(c.peek());
        c = c.pop();
      }

      return a;
    }

    return into(result, this.rest.map(funk,
      ...aux.map(function(q) {
        return q.rest
      })));
  }

  mapp(funk, ...aux) {
    var tail = null;

    var result = new Balloon(funk(this.first,
      ...aux.map(function(q) {
        return q ? q.first : q
      })));

    return this.rest.map(function(...args) {
      return new Balloon(funk(...args), result);
    }, ...aux.map(function(q) {
      return q.rest
    }));

  }

  reduce(funk, memo) {
    if (this.tail)
      memo = this.tail.reduce(funk, memo);
    return funk(memo, this.head);
  }

  reduce(funk, memo) {
    var a, b, c = this;
    if (memo == undefined) {
      a = this.head;
      c = this.tail;
      if (!c) {
        return a;
      } else {
        b = c.head;
        c = c.tail;
        memo = funk(a, b);
        if (!c)
          return memo;
      }
    }
    return c.push(memo).reduce(funk);
  }

  reverse() {
    if (!this.tail) return this;
    var glider = new Balloon(this.head);
    return this.tail.reduce(function(memo, i) {
      return memo.push(i);
    }, glider);
  }
  each(funk) {
    if (this.tail)
      this.tail.each(funk);
    funk(this.head);
  }

  *[global.Symbol.iterator]() {
    yield this.peek();
    yield this.pop();
  }
}

class EmptyBalloon extends Balloon {
  get isEmpty() { return true }

  push (val) {
    return new Balloon(val);
  }

  toString () {
    return "[]";
  }
}

Balloon.emptyBalloon = new EmptyBalloon;

module.exports = Balloon;
