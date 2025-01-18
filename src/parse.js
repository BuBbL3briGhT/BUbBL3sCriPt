const Bubble = require("./bubble");
const Balloon = require("./balloon");
const Keyword = require("./keyword");
const Symbol = require("./symbol");
const Quoted = require("./quoted");
const tokenize = require("./tokenize");

const { TOK_STRING, TOK_NUMBER,
  TOK_SYMBOL, TOK_KEYWORD } = tokenize;

const { peek, pop, push, invert } =
  Bubble;

class ParsingError extends Error { }
class NoMatchError extends ParsingError {
  constructor(message){
    super(message);
    this.name = "NoMatchError"
  }
}

function parse(string) {
  return _parse(tokenize(string));
}

function _parse(tv) {
  let [tokens] = tv,
      tree, list, item;

  while (tokens) {
    switch (peek(tokens)) {
      case ')':
        [tv, list] = match_bubble(tv);
              tree = push(tree,list);
          [tokens] = tv;
        break;
      case ']':
        [tv, list] = match_balloon(tv);
              tree = push(tree,list);
          [tokens] = tv;
        break;
      case "'":
         tv = match("'", tv);
        tree = push(pop(tree),
          new Quoted(peek(tree)));
          [tokens] = tv;
        break;
      default:
        [tv, item] = match_item(tv);
              tree = push(tree,item);
          [tokens] = tv;
    }
  }

  return tree;
}

function match(token, tv) {
  let [tokens, values] = tv;
  if (token == peek(tokens))
    return [pop(tokens), pop(values)]
  else
    throw new NoMatchError(
      `Token ${peek(tokens)} did not match ` +
      `expected token ${token}.`);
}

function match_bubble(tv) {
  let list;

     tv = match(')', tv);

  while(peek(tv[0]) != '(') {
      [tv,
     item] = match_item(tv);
      list = push(list,item);
  }

    tv = match('(', tv);

  return [tv, list];
}

function match_balloon(tv) {
  let list;

     tv = match(']', tv);

  while(peek(tv[0]) != '[') {
      [tv,
     item] = match_item(tv);
      list = Balloon.push(list,item);
  }

    tv = match('[', tv);

  return [tv, list];
}

function match_item([tokens, values]) {
  let item;

  switch (peek(tokens)) {

    case TOK_NUMBER:
      item = peek(values);
      break;

    case TOK_SYMBOL:
      item = Symbol.for(peek(values));
      break;

    case TOK_KEYWORD:
      item = Keyword.for(peek(values));
      break;

    case TOK_STRING:
      item = peek(values);
      break;

    case ")":
      return match_bubble([tokens, values]);

    case "]":
      return match_balloon([tokens, values]);

  }

  if (item === undefined) {
    throw new NoMatchError("No match found for token " +
      peek(tokens) + " value: "
      + peek(values) + " item: " +
      item);
  }

  return [[pop(tokens), pop(values)], item];
}

module.exports = parse;
