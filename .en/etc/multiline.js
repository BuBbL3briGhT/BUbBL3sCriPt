const readline = require("readline");

let rl = readline.createInterface(process.stdin);
let lines = [];
let prompt = '> ';

function ask() {
  rl.question(prompt, (line) => {
    if (line === 'end') {
      // Process collected lines here
      console.log('Input:');
      lines.forEach((l) => console.log(l));
      rl.close();
    } else {
      lines.push(line);
      prompt = ''; // Remove prompt after the first line
      process.stdout.clearLine(0);
      ask();
    }
  });
}

ask();
