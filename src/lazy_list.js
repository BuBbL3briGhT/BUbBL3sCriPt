const List = require("./list");

class LazyList extends List {

  constructor (itty) {
    super();
    // console.log('itty', itty);
    // console.trace();
    if (!itty.next)
      throw Error("First parametor is not an iterator: " + { itty });
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
      this.set({ oo: new LazyList(this.itty) });

    return this.oo;
  }

  wakeUp() {
    console.log('this.itty', this.itty);
    console.log('this.itty.next', this.itty.next);
    const o = this.itty.next();
    this.set({ o: o.value, isEmpty: o.done });
  }

  set(props) {
    for(const prop in props) {
      Object.defineProperty(this, prop, {
        value: props[prop]
      });
    }
  }

  set o(o) {};
  set oo(oo) {}

}

module.exports = LazyList;
