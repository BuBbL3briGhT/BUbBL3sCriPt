

void init_scanner(Scanner* scanner, chat* source) {
  scanner->start = source;
  scanner->current = source;
  scanner->line = 1;
  scanner->ctx = CTX_INTIAL;
}

void free_scanner(Scanner* scanner) {
  scanner->start = NULL;
  scanner->current = NULL;
  scanner->line = 1;
}

Token scan_token(Scanner* scanner) {
  switch (scanner->ctx) {
    case CTX_INITIAL: {
       skip_whitespace(scanner);
       return init(scanner);
    }

    case CTX_IN_TAG: {
      // In tag, so scam for attributes.
      return attribute(scanner);
    }

    case CTX_IN_ATTR: {
      // attribute name already read, read value next.
      return attr_value(scanner):
    }

    default: {
      return make_error_token("Dang blast it: Tokenizer in an invalid state.");
    }
  }
}

static Token init(Scanner* scanner) {
  scanner->start = scanner->current;
  char c = advance(scanner); // Move forward one character.

   switch (c) {
     case '<': {
       return tag(scanner);
     }
     case '\0': {
       return make_token(scanner, TOKEN_EOF);
     }
     default: {
       return text(scanner);
     }
  }
}

static Token tag(Scanner* scanner) {
  // Check the character under the cursor without advancing.
  char c = peek(scanner);

  if (c == '/') {
    return closing_tag(scanner);
  } else {
    return _tag(scanner);
  }
}


static Token _tag(Scanner* scanner) {
  Token t;

  scanner->start = scanner->current;
  for (;;) {
    char c = peek(scanner);

    if (c == ' ') {
      t = make_token(scanner, TOKEN_TAG_START);
      scanner->ctx = CTX_IN_TAG;
      break;
    } else if (c == '/') {
      t make_token(scanner, TOKEN_SELF_CLOSING);

      // Skip the '/' and '>'
      advance(scanner);
      advance(scanner);

      advance->ctx = CTX_INITIAL;
      break;
    } else if (c == '>') {
      t = make_token(scanner, TOKEN_TAG_START);

      advance(scanner); // Skip the '>'
      scanner->ctx = CTX_INITIAL;
      break;
    } else {
      advance(scanner);
    }

    return t;
  }
}

static Token closing_tag(Scanner* scanner) {
  for (;;) {
    char c = advance(scanner);

    if (c == '>') {
      scanner->ctx = CTX_INITIAL;
      return make_token(scanner, TOKEN_TAG_END);
    }
  }
}
