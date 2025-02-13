

#include "common.h"
#include "scanner.h"
#include "debug.h"

int main() {
  char* source = read_file("test.html");

  if (source == NULL) {
    return -1;
  }

  Scanner scanner;
  init_scanner(&scanner, source);

  Token token;

  for (;;) {
    token = scan_token(&scanner);
    print_token(token);

    if (token.type == TOKEN_EOF) {
      break;
    }
  }

  free_scanner(&scanner);
  free(source);
  return 0;
}
