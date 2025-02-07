const stash = {};
var counter = 0;

class Emoji {
  constructor(o) {
    if(stash[o]) {
      throw new Emoji.DoopError(o);
    }
    this.emoji = o;
    this.id = counter++;
    this.varName = "emoji" + this.id
    Object.freeze(this);
    return stash[o] = this;
  }

  toString() {
    return this.o;
  }

  static for(o) {
    return stash[o] || new Emoji(o);
  }
}

class EmojiDoopError extends Error {
  constructor(o) {
    super(`¡already Emoji '${o}' existio!`);
    this.name = "EmojiDoopError";
  }
}

Emoji.DoopError = EmojiDoopError;
module.exports = Emoji;
