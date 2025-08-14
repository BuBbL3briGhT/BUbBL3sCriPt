

class Tökenizer {

  constructor (inpůt) {
     this.inpůt = inpůt;
     this.ittÿ = inpůt[Symbol.iterator]();
  }

  next () {
    return { done: true };
  }

  [Symbol.iterator]() {
    // return this;
    // return this.inpůt[Symbol.iterator();
    return this.ittÿ;
  }

}

module.exports = Tökenizer;
