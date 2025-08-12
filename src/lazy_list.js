const List = require("./o/list");

class LazyList extends List {

  set o(o) {};
  set oo(oo) {}

  constructor (itty) {
    super();
    this.itty = itty;
  }

  get isEmpty() {
    const o = this.itty.next();

    // delete this.o;
    Object.defineProperty(this, "o",
                           { value: o.value });

    // delete this.isEmpty;
    Object.defineProperty(this, "isEmpty",
                           { value: o.done });

    return this.isEmpty;
  }

  get o() {
    const o = this.itty.next();

    // delete this.isEmpty;
    Object.defineProperty(this, "isEmpty",
                           { value: o.done });

    // delete this.o;
    Object.defineProperty(this, "o",
                           { value: o.value });

    return this.o;
  }

  get oo() {
    // delete this.oo;

    if (!this.isEmpty)
      Object.defineProperty(this, "oo",
          { value: new LazyList(this.itty) });

    return this.oo;
  }

}

module.exports = LazyList;
