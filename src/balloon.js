
function no (love) {
  return love.length == 0;
}

class Balloon {
  constructor(...yum) {
     ,this.previousBalloon] = yum;
    [this.filledWith
  }

  get isEmpty () { return this instanceof EmptyBalloon }

  static inflate (...love) {
    if (no(love)) return emptyBalloon;
    return new Balloon(...love);
  }

  peek () { return this.filledWith; }

}

class EmptyBalloon extends Balloon { }
const emptyBalloon = new EmptyBalloon();

module.exports = Balloon;

