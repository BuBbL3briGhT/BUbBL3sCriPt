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


  // Sets the value of a property on this object
  // using Object.defineProperty.
  // set(props) {
  //   for(const prop in props) {
  //     if (Object.hasOwnProperty(this, prop)) {
  //       Object.defineProperty(this, prop, {
  //         value: props[prop]
  //       });
  //     }
  //   }
  // }

  // // Sets the value of a property on this object
  // // using Object.defineProperty.
  // set(props) {
  //   for(const prop in props) {
  //      console.log(prop, props[prop]);
  //      Object.defineProperty(this, prop, {
  //        value: props[prop]
  //      });
  //   }
  // }

  // // Sets the value of a property on this object
  // // using Object.defineProperty.
  // set(properties) {
  //   for(const property in properties) {
  //      Object.defineProperty(this, property, {
  //        value: properties[property]
  //      });
  //   }
  // }

  // // Sets the value of a property on this object
  // // using Object.defineProperty.
  // set(properties) {
  //   properties = Object.entries(properties);
  //   for(const [property, value] of properties) {
  //      Object.defineProperty(this, property, {
  //        value: value
  //      });
  //   }
  // }
