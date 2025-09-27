const BubbleButt = require("./bubble_butt");

class LazyList extends BubbleButt {

  get emptyList () { return BubbleButt.emptyList }

  constructor (itty) {

    if (!itty.next) {
      // Check to see if itty is iterable.
      if (itty[Symbol.iterator]) {
        // if it is call the iterator method to get the iterator.
        itty = itty[Symbol.iterator]();

        // One final check to make sure we got an iterator back from the iterator method.
        if (!itty.next)
          throw Error("Iterator method returned an object that is not an iterator: " + { itty });

      } else {
        // If itty is niether an iterator or iterable (has a Symbol.iterator function) raise an error.
        throw Error("First parameter is niether an iterator nor iterable: " + { itty });
      }
    }

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
