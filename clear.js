const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdout.write("hi");
process.stdout.clearLine(-1);
process.stdout.cursorTo(0);
process.stdout.write("wow");
process.stdout.write("\n");
