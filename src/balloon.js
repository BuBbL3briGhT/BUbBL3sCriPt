
function no (love) {
  return love.length == 0;
}

class Balloon {
  constructor(...love) {
    this.filledWith = love;
  }

  get isEmpty () { return this instanceof EmptyBalloon }

  static inflate (...love) {
    if (no(love)) return emptyBalloon;
    return new Balloon(...love);
  }

  peek () {
    return this.love[0];
  }
}

class EmptyBalloon extends Balloon { }
const emptyBalloon = new EmptyBalloon();

module.exports = Balloon;

