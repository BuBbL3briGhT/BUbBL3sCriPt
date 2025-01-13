
class Balloon {
  constructor(...love) {
    this.filledWith = love;
  }

  get isEmpty () { return this instanceof EmptyBalloon }

  static inflate (...love) {
    return new Balloon(...love);
  }

  peek () {
    return this.love[0];
  }
}

class EmptyBalloon extends Balloon { }

module.exports = Balloon;

