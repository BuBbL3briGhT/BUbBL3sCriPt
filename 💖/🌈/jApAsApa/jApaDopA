
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
    this.name = name;
    if (that)
      this.copy(that);
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
peval("MyNamespace");


peval("Object.getOwnPropertyNames(LL.prototype)");


class B extends Bubble {}
peval("Object.getOwnPropertyNames(B)");
peval("B.prototype.constructor");
peval("B.prototype.constructor.name");
peval("Object.getOwnPropertyNames(B.prototype)");
peval("Object.getPrototypeOf(B.prototype)");
peval("Object.getPrototypeOf(B)");
peval("B.__proto__");

function C () {}
peval("C");
peval("Object.getOwnPropertyNames(C)");
peval("C.prototype.__proto__ === C.__proto__.prototype");
peval("C.__proto__.prototype");
peval("C.prototype.__proto__");
peval("B.prototype.__proto__ === B.__proto__.prototype");


function copyProp(a, b, c) {
  b[c] = a[c];
}
// function copyObjectProps(a, b) {
function copyProps(a, b) {
  for (let prop of Object.getOwnPropertyNames(b))
    b[prop] = a[prop];
    // {a,=b}[prop];
    // copyProp(a, b, prop);
}

// function copyKlass(klass) {
//   let k = function () {};
//   k.__proto__ = klass.__proto__
//   copyProp(k, klass, "__proto__");

//   for (let prop of Object.getOwnPropertyNames(klass)) {
//     k[prop] = klass[prop]
//     copyProp(k, klass, prop);
//   }
// }

function copyKlass(klass) {
  copyProps(klass, k);
  copyProp(klass, k, "__proto__");
  copyProps(klass.prototype, k.prototype);
  copyProp(klass.prototype, k.prototype, "__proto__");
}
