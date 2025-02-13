

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
