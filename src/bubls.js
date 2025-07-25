const fs = require('fs');
const path = require('path');

const Bubblescript = require("./bubblescript");

// const Bubblescript = {
//       List: require("./o/list"),
//     Vector: require("./o/vector"),
//     Symbol: require("./o/symbol"),
//    Keyword: require("./o/keyword"),
//     Bubble: require("./o/bubble"),
//         Fn: require("./o/fn"),
//      Macro: require("./o/macro"),
//   tokenize: require("./f/tokenize"),
//      parse: require("./f/parse"),
//       eval: require("./f/eval")
// };

Bubblescript.loadFile = function (filePath) {
  filePath = path.join(__dirname, filePath);
  return Bubblescript.eval(fs.readFileSync(filePath, 'utf-8'))
}
module.exports = Bubblescript;

Bubblescript.loadFile("../lib/core.🫧");
