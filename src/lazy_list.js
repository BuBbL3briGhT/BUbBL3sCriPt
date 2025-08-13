const List = require("./list");

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
      this.set({ oo: new LazyList(this.itty) });

    return this.oo;
  }

  wakeUp() {
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
