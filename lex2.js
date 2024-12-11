
//const Lex = require('./lib/lexer.js');


// const symbols = Object.freeze({
//   '(':  Symbol('('),
//   ')':  Symbol(')'),
//   '+':  Symbol('+'),
//   '-':  Symbol('-'),
//   '*':  Symbol('*'),
//   '/':  Symbol('/'),
// });


class Lexer {

  constructor(s, ) {
    // cb([symbols.lparen, symbols.plus,
    //   new SInteger(4), new SInteger(5),
    //   symbols.rparen]);
    // cb(this.s);
  }

  tokenize(s, callback) {
    this.s = s;
    this.head = 0;
    this.result = [];

    while (position < s.length) {
      switch (s[head]) {
        case: [' ', "\t"]
          this.head++; // skip
          break;
        case: ['(', ')', '[', ']', '{', '}', 
               '.', '+', '-', '*', '/']
          this.readHead();
          break;
        case: '"'
          this.readString();
          break;
        case: "'"
          this.readSymbol();
          break;
        case: "\n"
          this.readNewline();
          break;
        case: /./
          this.readIdentifier();
          break;
      }
    }
  }

  return callback(this.result);
}

// Read *head* of input string and appends value as
// a symbol of that type to result. Increments head.
private readHead() {
  result.push(symbols[this.s[this.head++]]);
}

private readString() {
  result.push([
    symbols.string,
    this.readUntil('"', 1)
  ]);
}


private readNumber() {
  let     q = this.s.slice(this.head),
      match = q.match(/^\d+(?:\.\d+)?/);

  result.push(Number(match[0]);
  this.head += match[0].length;
}
private readNewline() {

}
private readSymbol() {
}
private readIdentifier() {
}

private readUntil(m, skip=0) {
  let q = this.s.slice(this.head+=skip),
      i = q.indexOf(m),
      v = q.slice(0, i-1);

  this.head += i+1;
  return v;
}



      switch (state) {
        case: 0 // Start state




      }
    }
  }

  getNextSymbol() {
    return this.state.getNextSymbol();
  }

}

class InitialState {
  constructor(context) {
    this.context = context;
  }

  getNextSymbol() {
    let a = this.context.s[0];

  }
}

let s = "(+ 4 5)"
let lexi = new Lex(s, (result) => {
  console.log(result)
});


function yylex() {
  
}

class Parser {

  word = null,
  list = null,
  glider = null,
  string = /^\".*\"$/,
  number = /^\d+$/,
  keyword = /^:.+$/,
  stropen = false, // string open flag
  checkcomment = false,
  comment = false,
  count = 0,
  counts = [],
  depth = 0, // number of open enclosures
  lc = null,
  progress = 0;

  constructor(s) {

  }

  parse(s, stack = []) {

    each(s.split(''), function(c) {
      if (stropen) {
        word += c;
        if (c == '"') {
          stropen = false;
          // word = new String(word);
          word = word.slice(1, word.length - 1);
          stack.push(word);
          count++;
          word = null;
        }
        return;
      }
      if (comment) {
        if (c == "\n")
          comment = false;
        return;
      }
      switch (c) {
        case '(':
          stack.push(sym.lparen);
          break;
        case '[':
          stack.push(sym.lbrak);
          break;
        case "'":
          stack.push(sym.sqout);
          break;
        case '"':
          stack.push(sym.dqout);
          break;
        case ')':

          if (typeof word == "string") {
            switch (true) {
              case number.test(word):
                word = parseInt(word);
                break;
              case /^(\d+)?\.\d+$/.test(word):
                word = parseFloat(word);
                break;
              case keyword.test(word):
                word = new Keyword(word.substr(1));
                break;
              case /^\"(.*)\"$/.test(word):
                // strip quotes
                word = /^\"(.*)\"$/.exec(word)[1];
                break;
              case /^.+$/.test(word):
                word = new Symbol(word);
            }
          }

          if (word == null) word = stack.pop();
          if (word == LParen) {
            // stack.push(new List)
            stack.push(List.emptyList);
            word = null;
            break;
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop()
            count--;
            word = new Quoted(word);
          }

          list = new List(word);

          word = stack.pop();
          count--;
          while (word !== LParen) {
            list = list.push(word);
            // skip spaces
            // if(arry.peek(stack) == Space)
            //   stack.pop()
            word = stack.pop();
            count--;
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop();
            count--;
            list = new Quoted(list);
          }

          depth--;
          count = counts.pop();
          word = null;
          stack.push(list);
          count++;
          list = null;
          break;
        case ']':
          if (typeof word == "string") {
            // if (word) {
            switch (true) {
              case number.test(word):
                word = parseInt(word);
                break;
              case /^(\d+)?\.\d+$/.test(word):
                word = parseFloat(word);
                break;
              case keyword.test(word):
                word = new Keyword(word.substr(1));
                break;
              case /^\"(.*)\"$/.test(word): //string
                word = /^\"(.*)\"$/.exec(word)[1];
                break;
              case /^.+$/.test(word):
                word = new Symbol(word);
            }
          }

          if (word == null) {
            word = stack.pop();
            count--;
          }
          if (word == LBrack) {
            // stack.push(new Glider);
            stack.push(emptyGlider);
            depth--;
            word = null;
            break;
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop()
            count--;
            word = new Quoted.new(word)
          }

          tmp = [];
          while (word !== LBrack) {
            tmp.push(word);
            // skip spaces
            // if(arry.peek(stack) == Space)
            //   stack.pop()
            word = stack.pop();
            count--;
          }
          word = null;

          glider = new Glider(tmp.pop());
          while (tmp.length > 0) {
            glider = glider.push(tmp.pop());
          }

          while (arry.peek(stack) == SingleQ) {
            stack.pop();
            count--;
            glider = new Quoted(glider);
          }

          depth--;
          count = counts.pop();
          stack.push(glider);
          count++;
          glider = null;
          break;
        case ' ':
        case "\n":
        case ',':
          // if (word) { // clear word
          if (typeof word == "string") {
            switch (true) {
              case number.test(word):
                word = parseInt(word);
                break;
              case /^(\d+)?\.\d+$/.test(word):
                word = parseFloat(word);
                break;
              case keyword.test(word):
                word = new Keyword(word.substr(1));
                break;
              case /^\"(.*)\"$/.test(word):
                // strip quotes
                word = /^\"(.*)\"$/.exec(word)[1];
                break;
              case word == 'true':
                word = true;
                break;
              case word == 'false':
                word = false;
                break;
              case /^.+$/.test(word):
                word = new Symbol(word);
            }

            if (depth > 0)

              while (arry.peek(stack) == SingleQ) {
                stack.pop()
                count--;
                word = new Quoted(word)
              }

            if (word != null) {
              stack.push(word);
              count++;
              word = null;
            }
            // stack.push(Space);
          }

          if (c == "\n" && lc != ',') {
            // if (depth == 0 && count > 1) {
            if (depth == 0) {
              let d = stack.length - progress;
              if (d > 1) {
                // implied list
                word = stack.pop();
                d--;
                count--;

                // while (arry.peek(stack) == SingleQ) {
                //  stack.pop()
                //  word = new Quoted(word);
                //  count--;
                // }

                list = new List(word);

                // while(count > 0) {
                //   word = stack.pop();
                //   count--;
                //   list = list.push(word);
                // }
                for (; d > 0; d--) {
                  word = stack.pop()
                  //   // list.push(stack.pop());
                  if (word == SingleQ) {
                    let q = new Quoted(list.peek());
                    list = list.pop();
                    list = list.push(q);
                  } else {
                    list = list.push(word);
                  }
                  //
                }

                word = null;
                stack.push(list);
                list = null;
              }
              progress = stack.length; // cinch
            }
            // count = 0;
            // xstack.push(stack.pop())
            // while (stack.length!=0){
            // stack2.push(stack.shift())
            // }
          }

          // if (c==',')
          // comma = true;

          break;
          //case ".":
          if (word) {
            switch (true) {
              case /^\d+\.$/.test(word):
              case /^:.+$/.test(word):
                word += c;
                return;
              case /^.+$/.test(word):
                stack.push(new Symbol(word));
                word = null;
                stack.push(Dot);
                count += 2;
                return;
            }
          } else {
            word = c;
          }
          break;
          //case '/':
          if (word) {
            if (arry.peek(stack) != Slash) {
              stack.push(new Symbol(word));
              word = null;
              stack.push(Slash);
              count += 2;
            } else {
              word += c;
            }
          } else {
            word = c;
          }
          break;
          // case '\':

        case '%':
          comment = true;
          break;
        case '/':
          if (lc == '/') {
            comment = true;
          }
          break;
        default:
          if (word) {
            word += c;
          } else {
            word = c;
            // count += 1;
          }
      }
      if (c && c != ' ' && c != ';')
        lc = c;
    });

    if (word) {
      switch (true) {
        case number.test(word):
          word = parseInt(word);
          break;
        case keyword.test(word):
          word = new Keyword(word.substr(1));
          break;
        case /^.+$/.test(word):
          word = new Symbol(word);
          break;
      }

      while (arry.peek(stack) == SingleQ) {
        stack.pop();
        count--;
        word = new Quoted(word);
      }

      stack.push(word);
      count++;
      word = null;
    }


    if (depth == 0) {
      let d = stack.length - progress;
      if (d > 1) {
        word = stack.pop();
        d--;
        count--;

        list = new List(word);

        for (; d > 0; d--) {
          word = stack.pop()
          if (word == SingleQ) {
            let q = new Quoted(list.peek());
            list = list.pop();
            list = list.push(q);
          } else {
            list = list.push(word);
          }
        }

        word = null;
        stack.push(list);
        list = null;
      }
      progress = stack.length; // cinch
    }

    // return stack2;
    // for(var w of stack) {
    //   console.log(w.toString());
    // }
    return stack;
  }

}

module.exports = Parser;
