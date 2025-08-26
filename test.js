console.log(this);

this.hello = "Bonjure";

function hola() {
  console.log(this.hello);
  console.log(this);
};

// hola();

console.log(global);
console.log(this.global);
