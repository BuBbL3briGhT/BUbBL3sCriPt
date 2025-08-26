console.log(this);

this.hello = "Bonjure";

console.log(this.hello);

function hola() {
  // console.log(this);
  console.log(global);
};

hola();

