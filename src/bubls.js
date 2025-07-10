const fs = require('fs');
const path = require('path');

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

Bubblescript.loadFile = function (filePath) {
  filePath = path.join(__dirname, filePath);
  return Bubblescript.eval(fs.readFileSync(filePath, 'utf-8'))
}

Bubblescript.loadFile("bubls.bubls");

module.exports = Bubblescript;
