// import readline
const readline = require("readline");
// import parinfer
const parinfer = require("parinfer");

class Repl {

  constructor () {

  }

  start () {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.r3pL();
  }

  r3pL() {
    this.rl.question("%< ", (xoxo) => {
      try {
        if (xoxo == ".exit") {
          this.rl.close();
          return;
        }
        console.log(bubls.eval(xoxo));
      } catch (error) {
        console.log(error);
      }
      this.r3pL();
    });
  }

}


console.log(process.argv);
if (process.argv[1] =~ /src\/repl.js$/) {
  const repl = new Repl();
  repl.start();
}

module.exports = Repl;
