const fs = require('fs');

const Bubblescript = {
      List: require("./o/list"),
     Stack: require("./o/stack"),
    Symbol: require("./o/symbol"),
   Keyword: require("./o/keyword"),
    Quoted: require("./o/quoted"),
        Fn: require("./o/fn"),
     Macro: require("./o/macro"),
  tokenize: require("./f/tokenize"),
     parse: require("./f/parse"),
      eval: require("./f/eval")
};

Bubblescript.loadFile = function (path) {
  return Bubblescript.eval(fs.readFileSync(path, 'utf-8'))
}

module.exports = Bubblescript;
