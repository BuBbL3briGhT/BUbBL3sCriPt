const Bubble = require("./bubble");

class Balloon extends Bubble {

  static inflate(...oo) {
    var ooo;
    for (let o of oo)
      ooo = new Balloon(o, ooo);
    return ooo;
  }

}

// function no (love) {
//   return love.length == 0;
// }

// class Balloon {
//   constructor(filledWith, previousBalloon) {
//     this.filledWith = filledWith;
//     this.previousBalloon = previousBalloon;
//   }

//   get isEmpty () { return this instanceof EmptyBalloon }

//   static inflate (...love) {
//     if (no(love)) return emptyBalloon;
//     return new Balloon(...love);
//   }

//   peek () { return this.filledWith; }

// }

// class EmptyBalloon extends Balloon { }
// const emptyBalloon = new EmptyBalloon();

module.exports = Balloon;

