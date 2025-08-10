

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

function* tokenize(string) {
  yield {
    value: {
      line: 1,
      columm: 1,
      type: 1,
      value: 1
    }
  }
  yield {
    value: {
      line: 1,
      columm: 2,
      type: 1,
      value: 1
    }
  }
  yield {
    value: {
      line: 1,
      columm: 3,
      type: 1,
      value: 1
    }
  }
}

// console.log(tokenize("love"));
// let tokeniter = tokenize("love");
// console.log(tokeniter);
// console.log(tokeniter.next());
// console.log(tokeniter.next());
// console.log(tokeniter.next());
// console.log(tokeniter.next());
// console.log(tokeniter.next());

const tokens = tokenize("love");
for(const token of tokens) {
  console.log(token);
}

