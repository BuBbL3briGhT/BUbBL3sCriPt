const fs = require('fs');

const Bubblescript = {
      List: require("./o/list"),
   Bubbles: require("./o/bubbles"),
    Symbol: require("./o/symbol"),
   Keyword: require("./o/keyword"),
    Bubble: require("./o/bubble"),
        Fn: require("./o/fn"),
     Macro: require("./o/macro"),
  tokenize: require("./f/tokenize"),
     parse: require("./f/parse"),
      eval: require("./f/eval")
};

Bubblescript.loadFile = function (path) {
  return Bubblescript.eval(fs.readFileSync(path, 'utf-8'))
}

Bubblescript.loadFile("src/bubls.bubls");

module.exports = Bubblescript;
