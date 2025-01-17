
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

class Namespace {
  constructor(name, that) {
    if (that)
      this.copy(that);
    this.name = name;
  }

  copy(namespace) {
    for (let prop of Object.getOwnPropertyNames(namespace))
      this[prop] = namespace[prop];
  }
}

const MyBubble = new Namespace("MyBubble");
MyBubble.copy(Bubble);
peval("MyBubble");
peval("MyBubble.map");

const AnotherBubble = new Namespace("AnotherBubble");
AnotherBubble.copy(MyBubble);
peval("AnotherBubble");
peval("AnotherBubble.map");

const MyNamespace = new Namespace("MyNamespace", {
  hello () {
    return "Eh, What's up doc?";
  }
});
peval("MyNamespace.hello()");
