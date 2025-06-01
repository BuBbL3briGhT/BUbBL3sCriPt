const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  console.log('Key pressed:', key);
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }
});

process.stdin.resume();

console.log('Press any key...');
