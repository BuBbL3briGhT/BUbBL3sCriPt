

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
