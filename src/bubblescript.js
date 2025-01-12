const fs = require('fs');

const Bubblescript = {
    Bubble: require("./bubble"),
   Balloon: require("./balloon"),
    Symbol: require("./symbol"),
   Keyword: require("./keyword"),
    Quoted: require("./quoted"),
        Fn: require("./fn"),
     Macro: require("./macro"),
  tokenize: require("./tokenize"),
     parse: require("./parse"),
      eval: require("./eval")
};

Bubblescript.loadFile = function (path) {
  return Bubblescript.eval(fs.readFileSync(path, 'utf-8'))
}

module.exports = Bubblescript;
