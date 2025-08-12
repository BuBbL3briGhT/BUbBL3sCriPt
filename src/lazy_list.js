// const List = require("./o/list");
const AbstractList = require("./o/abstract_list");

// class LazyList extends List {
class LazyList extends AbstractList {

  constructor (itty) {
    super();
    this.itty = itty;
  }

  get isEmpty() {
    const o = this.itty.next();

    // delete this.o;
    Object.defineProperty(this, "o",
                           { value: o.value });
    // this.o = o.value;

    // delete this.isEmpty;
    Object.defineProperty(this, "isEmpty",
                           { value: o.done });
    // this.isEmpty = o.done;

    return this.isEmpty;
  }

  get o() {
    const o = this.itty.next();

    delete this.isEmpty;
    Object.defineProperty(this, "isEmpty",
                           { value: o.done });
    // this.isEmpty = o.done;

    delete this.o;
    Object.defineProperty(this, "o",
                           { value: o.value });
    // this.o = o.value;

    return this.o;
  }

  get oo() {
    delete this.oo;

    if (!this.isEmpty)
      // this.oo = new LazyList(this.itty);
      Object.defineProperty(this, "oo",
          { value: new LazyList(this.itty) });

    return this.oo;
  }

  set o(o) {};
  set oo(oo) {}

  // get oo() {
  //   delete this.oo;

  //   this.oo = !this.isEmpty ?
  //                  new LazyList(this.itty);

  //   return this.oo;
  // }

  // get oo() {
  //   delete this.oo;
  //   if (this.isEmpty)
  //     this.oo = undefined
  //   else
  //     this.oo = new LazyList(this.itty);
  // }

  // get oo() {
  //   this.oo = undefined
  //   if (this.isEmpty)
  //     this.oo = new LazyList(this.itty);
  // }


  // get isEmpty() {
  //   if (this._isEmpty)
  //     return this._isEmpty.value;
  //   else {
  //     const o = this.itty.next();
  //     // this.isEmpty = o.done;
  //     // this.isEmpty = { value: o.done }
  //     this.o = o.value;
  //     if (o.done)
  //     else
  //       this._isEmpty =

  //   }

  // }

  // get o () {
  //   if (this._o) return this._o;

  //   const o = this.itty.next();
  //   if (o.done)
  //     this.isEmpty = true;
  //   else
  //     this.o = o.value;
  // }


  // get oo () {
  //   this.oo
  //   const o = itty.next();
  //   if (o.done)
  //     this._oo = List.emptyList;
  //   else


  //   this._oo = new LazyList(itty.next

  // }

}

module.exports = LazyList;
