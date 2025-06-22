const readline = require('readline');
const Parinfer = require("parinfer");
const bubls = require('./src/bubls');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// var currentLine = "";
// var lines = [currentLine];
var lines = [""];
var cursor_x = 0;
var cursor_y = 0;
var linesDrawn = 0;
const history = makeHistory();

function makeHistory() {
  let history = [];
  var i = 0;

  this.push = function(expression) {
    history.push(expression);
    i = history.length - 1;
    // console.log(history);
    // console.log(history.length);
  }

  this.previous = function() {
    if (i > 0)
      return history[i--];
    else
      return history[0];
  }

  this.next = function() {
    if (i < history.length) {
      return history[i++];
    } else {
      return "";
    }
  }

  return this;
}

process.stdin.on('keypress', (str, key) => {
  // console.log('Key pressed:', key);
  if (key.ctrl && key.name === 'c') {
    process.exit();
  }

  if (key.meta === true) { // alt
    if (key.name === 'return') {
      cursor_y++;
      // make space for new line. move each line lower down by one starting from the last line.
      for (let i = lines.length;
        i > cursor_y; i--) {
        lines[i] = lines[i-1];
      }
      // lines[cursor_y] = "";
      lines[cursor_y] = lines[cursor_y-1].slice(cursor_x);
      lines[cursor_y-1] = lines[cursor_y-1].slice(0, cursor_x);
      cursor_x = 0;
      process.stdout.write("\n");
    }
  } else if (key.name === 'space') {
    type(" ");
  } else if (key.name === 'backspace') {
    backspace();
  } else if (key.name === 'left') {
    cursor_x = Math.max(0, cursor_x - 1);
  } else if (key.name === 'right') {
    cursor_x = Math.min(
      lines[cursor_y].length
      , cursor_x + 1);
  } else if (key.name === 'up') {
    if (cursor_y == 0) {

      // let historyi = history.length;
      // let expression = history[historyi-1];
      let expression = history.previous();
      lines = expression.split("\n");
    } else {
      cursor_y = cursor_y - 1;
      cursor_x = Math.min(cursor_x, lines[cursor_y].length);
    }
  } else if (key.name === 'down') {
    if (cursor_y == lines.length-1) {
      let expression = history.next();
      lines = expression.split("\n");
    } else {
      cursor_y = Math.min(lines.length-1, cursor_y + 1);
      cursor_x = Math.min(cursor_x, lines[cursor_y].length);
    }
  } else {
    // currentLine += key.name;
    // currentLine.push(key.name);
    let sequence = key.sequence;
    type(sequence);
  }
  lines = parinfer(lines);
  if (key.meta === false && key.name === 'return') {
    process.stdout.write("\n");
      // evaluate...
    // console.log(lines.join("\n"));
    let expression = lines.join("\n");
    let result =
      bubls.eval(expression);
      // encodeURI(lines.join("\n"))
      // bubls.eval("1");
    history.push(expression);
    // console.log(history);
    console.log(result);
    lines = [""];
    cursor_x = 0;
    cursor_y = 0;
    linesDrawn = 0;
  }
  updateView();
});

function parinfer(lines) {
  let raw = lines.join("\n");
  // var out = Parinfer.indentMode(raw, { // Use indentMode or parenMode as needed
  var out = Parinfer.smartMode(raw, { // Use indentMode or parenMode as needed
    cursorLine: cursor_y,
    cursorX: cursor_x
    // Parinfer options
  });
  let text = out.text.replaceAll("\r", "");
  return text.split("\n");
}

function type(sequence) {
  lines[cursor_y] =
    lines[cursor_y].slice(0, cursor_x) +
    sequence +
    lines[cursor_y].slice(cursor_x);
  cursor_x++;
}

function backspace() {
  let m = cursor_x - 1;
  if (m < 0) {
    if (cursor_y > 0) {
      // splice together lines.
      cursor_y--;
      cursor_x = lines[cursor_y].length;
      lines[cursor_y] =
        lines[cursor_y] + lines[cursor_y+1];
      for (let i = cursor_y+1;
        i < lines.length; i++) {
          lines[i] = lines[i+1];
      }
      // lines.pop() ;
      lines[lines.length-1] = "";
    } else {
      cursor_x = 0;
    }
  } else {
    lines[cursor_y] =
      lines[cursor_y].slice(0, cursor_x-1) +
      lines[cursor_y].slice(cursor_x);
    cursor_x = m;
  }
}

function updateView() {
  clear();
  process.stdout.write(lines.join("\n"));
  linesDrawn = lines.length;
  process.stdout.moveCursor(0, cursor_y-lines.length+1);
  process.stdout.cursorTo(cursor_x);
}

function clear() {
  const y = linesDrawn - cursor_y
  process.stdout.moveCursor(0, y);
  clearLines(linesDrawn);
}

function clearLines(n) {
  for (let i = 0; i < n; i++) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.moveCursor(0, -1);
  }
}

function log(msg) {
  process.stdout.moveCursor(0, -10);
  console.log(msg);
  process.stdout.moveCursor(0, 9);
}


process.stdin.resume();

// log('Press any key...');
