

const TOK_KEYWORD = 'K',
      TOK_NUMBER  = 'N',
      TOK_STRiNG  = 'S',
      TOK_SYMBOL  = 'Y',
      TOK_TRUE    = 'T',
      TOK_FALSE   = 'F';


function* tokenize(string) {
  yield {
    value: {
      line: 1,
      columm: 1,
      type: 1,
      value: string
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

const tokens = tokenize("love");
for(const token of tokens) {
  console.log(token);
}

