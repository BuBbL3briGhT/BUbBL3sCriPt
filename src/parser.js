const Tokenizer = require("./tokenizer");


const string = "(apple 🍏 orange 🍊 pina 🪅)";
const tokenizer = new Tokenizer(string, { filePath: "imaginary" });
for (const token of tokenizer) {
  console.log(token);
}
