

const TOK_KEYWORD = 'K',
      TOK_NUMBER  = 'N',
      TOK_STRiNG  = 'S',
      TOK_SYMBOL  = 'Y',
      TOK_TRUE    = 'T',
      TOK_FALSE   = 'F';


function tokenize(string) {

  // return iterable
  //
  return {
    next() {
      return {
        value: {
          type: 1,
          value: 1,
          line: 1,
          columm: 1
        }
      }
    }
    // *[Symbol.iterator]() {

    // }
  }
}

console.log(tokenize("love"));
let tokeniter = tokenize("love");
console.log(tokeniter);
console.log(tokeniter.next());

