const LazyList = require("./lazy_list");

class Range extends LazyList {

  constructor (startend, end, step) {
    if (!end) {
      this.start = 0;
      this.end = startend || Infinity;
    } else {
      this.start = startend;
      this.end = end;
    }
    this.step = step || 1;
  }


  get oo() {
    if ( !this.isEmpty )
      this.set({ oo: new Range(this.o+this.step, this.end, this.step) });

    return this.oo;
  }


  wakeUp () {
  }

}
