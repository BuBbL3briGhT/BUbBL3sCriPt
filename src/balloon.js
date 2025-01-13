
class Balloon {
  static inflate () {
    return new EmptyBalloon();
  }
}

class EmptyBalloon extends Balloon {
  get isEmpty () { return true }
}

module.exports = Balloon;

