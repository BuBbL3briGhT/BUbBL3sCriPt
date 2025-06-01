const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var input = "";
var x_pos = 0;
var y_pos = 0;

process.stdin.on('keypress', (str, key) => {
  // console.log('Key pressed:', key);
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
  input += key.name;
  updateView():
});

function updateView() {
  clear();
  console.log(input);
}


process.stdin.resume();

// console.log('Press any key...');
