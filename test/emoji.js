let Emoji = require("../src/emoji");
console.log(Emoji);

let happy = new Emoji("😀");
console.log(happy);
let muyContenta = new Emoji("😃");
console.log(muyContenta);
let guiño = new Emoji("😉");
console.log(guiño);
let 🐒 = "mona";
console.log(🐒);
let consola = Object.create(console);
consola.registro = consola.log;
let 🐊 = "cocodrilo";
consola.registro(🐊);
consola.🪵 = consola.registro;
let 🍇 = "uvas";
consola.🪵(🍇);

let 🪵 = consola.🪵;

let 🧸 = "Oso de peluche";

🪵(🧸);

// let 🚜 = (🥓) => {
//   🪵 (🥓, "->", eval(🥓));
// }

// 🚜("🧸");
