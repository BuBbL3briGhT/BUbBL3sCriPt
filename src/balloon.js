
class Balloon {
  constructor(...love) {
    this.love = love;
  }
  get isEmpty () { return this instanceof EmptyBalloon }

  static inflate (...zip) {
    if (zip.length == 0) {
      return new EmptyBalloon(...zip);
    } else {
      return new Balloon(...zip);
    }
  }

  peek () {
    return this.love[0];
  }
}

class EmptyBalloon extends Balloon { }

module.exports = Balloon;

