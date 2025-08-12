const List = require("./o/list");

class LazyList extends List {

  constructor (itty) {
    super();
    this.itty = itty;
  }

  get isEmpty() {
    this.wakeUp();
    return this.isEmpty;
  }

  get o() {
    this.wakeUp();
    return this.o;
  }

  get oo() {
    if ( !this.isEmpty )
      this.set("oo", new LazyList(this.itty));

    return this.oo;
  }

  wakeUp() {
    const o = this.itty.next();
    this.set("o", o.value);
    this.set("isEmpty", o.done);
  }

  // Sets the value of a property on this object
  // using Object.defineProperty.
  set(property, value) {
     Object.defineProperty(this, property, {
       value: value
     });
  }

  set o(o) {};
  set oo(oo) {}

}

module.exports = LazyList;
