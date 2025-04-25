
  function
  matchItem ([tokens, values], tree) {
    let item;
    switch (peek(tokens)) {
      case TOK_NUMBER:
      case TOK_STRING:
        tree = push(tree, peek(values));
        break;

      case TOK_SYMBOL:
        tree = push(tree, Symbol.for(peek(values)));
        break;

      case TOK_KEYWORD:
        tree = push(tree,
        Keyword.for(peek(values)));
        break;

      case "'":
        tree = push(pop(tree),
        new Quoted(peek(tree)));
        break;

      case ")":
        return matchBubble([tokens, values], tree);

       case "]":
          return matchBalloon([tokens, values], tree);
    }

    if (item === undefined) {
      throw new NoMatchError
        ("No match found for token " +
          peek(tokens) + " value: "
          + peek(values) + " item: " +
          item);
    }

    return [[pop(tokens), pop(values)], item];
  }


  function matchItem ([tokens, values], tree)
  {
    let item;
    switch (peek(tokens)) {
      case TOK_NUMBER:
      case TOK_STRING:
        tree = push(tree, peek(values));
        break;

      case TOK_SYMBOL:
        tree = push(tree, Symbol.for(peek(values)));
        break;

      case TOK_KEYWORD:
        tree = push(tree,
        Keyword.for(peek(values)));
        break;

      case "'":
        tree = push(pop(tree),
        new Quoted(peek(tree)));
        break;

      case ")":
        return matchBubble([tokens, values], tree);

       case "]":
          return matchBalloon([tokens, values], tree);
    }

    if (item === undefined) {
      throw new NoMatchError
        ("No match found for token " +
          peek(tokens) + " value: "
          + peek(values) + " item: " +
          item);
    }

    return [[pop(tokens), pop(values)], item];
  }



function matchItem (tokens, tree) { }


   // (fn matchItem [tokens])
   // (fn matchItem [tokens])



  function matchItem (tokens, tree)
  {
    let item;
    (loop [tokens]
      (switch (peek tokens)
        [TOK_NUMBER
    switch (peek(tokens)) {
      case TOK_NUMBER:
      case TOK_STRING:
        tree = push(tree, peek(values));
        break;

      case TOK_SYMBOL:
        tree = push(tree, Symbol.for(peek(values)));
        break;

      case TOK_KEYWORD:
        tree = push(tree,
        Keyword.for(peek(values)));
        break;

      case "'":
        tree = push(pop(tree),
        new Quoted(peek(tree)));
        break;

      case ")":
        return matchBubble([tokens, values], tree);

       case "]":
          return matchBalloon([tokens, values], tree);
    }

    return [[pop(tokens), pop(values)], item];
  }

