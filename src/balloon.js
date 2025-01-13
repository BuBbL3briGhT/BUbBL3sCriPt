
class Balloon {
  get isEmpty () { return this instanceof EmptyBalloon }

  static inflate () {
    return new EmptyBalloon();
  }
}

class EmptyBalloon extends Balloon { }

module.exports = Balloon;

