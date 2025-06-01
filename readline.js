const readline = require('readline');
const debounce = require('debounce');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// Ek Kom Vir Daai Bouda

// const values = [
//   'ek kom vir',
//   'daai bouda'
// ];

// const rl = readline.createInterface(process.stdin);

// const showResults = debounce(() => {
//   console.log(
//     '\n',
//     values.filter((val) => val.startsWith(rl.line)).join(' '),
//   );
// }, 300);

// console.log(process);

// process.stdin.on('keypress', (c, k) => {
//   console.log(1);
//   showResults();
// });

// process.stdin.on('keypress', (c, k) => {
//   console.log(c, k);
// });


// console.clear();

process.stdin.on('data', (chunk) => {
  // console.log('Data received:', chunk.toString());
  // console.log('Data received:', chunk);
  //
  // rl.clearLine();
  // rl.commit();
  // rl.clearLine(process.stdout);
  // console.log("hi");
  process.stdout.write("hi");
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
});

