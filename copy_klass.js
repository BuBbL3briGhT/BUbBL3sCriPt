
const LL = require("./src/lynkt_lyst");

console.log(LL.prototype);
console.log(LL.getOwnPropertyNames);
console.log(LL.name);
// console.log(LL.keys());
for (let key in LL)
  console.log(key);

console.log(Object.keys(LL));
console.log(Object.getOwnPropertyNames(LL));

class Bubble{};
for (prop of Object.getOwnPropertyNames(LL)) {
  console.log(prop);
  console.log(LL[prop]);
  Bubble[prop] = LL[prop];
}

console.log(Bubble.make);
delete Bubble.make;
console.log(Bubble.make);

function peval(string) {
  console.log(string, "=>", eval(string));
}

peval("Bubble.map");
