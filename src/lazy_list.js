const List = require("./o/list");

class LazyList extends List {

  constructor (itty) {
    super();
    this.itty = itty;
  }

  set o(o) {};
  set oo(oo) {}

  get isEmpty() {
    const o = this.itty.next();

    Object.defineProperty(this, "o",
                           { value: o.value });

    Object.defineProperty(this, "isEmpty",
                           { value: o.done });

    return this.isEmpty;
  }

  get o() {
    const o = this.itty.next();

    Object.defineProperty(this, "isEmpty",
                           { value: o.done });

    Object.defineProperty(this, "o",
                           { value: o.value });

    return this.o;
  }

  get oo() {
    if (!this.isEmpty)
      Object.defineProperty(this, "oo",
          { value: new LazyList(this.itty) });

    return this.oo;
  }

}

module.exports = LazyList;
