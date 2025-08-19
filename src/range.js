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


  wakeUp () {
  }

}
