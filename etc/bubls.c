#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
  char bubls[] = "./bin/bubls";
  if (argc > 1) {
    /* printf("%s\n", argv[1]); */
    strcat(bubls, " ");
    strcat(bubls, argv[1]);
    return system(bubls);
  } else {
    /* printf("No arguments provided\n"); */
    return system(bubls);
  }
}
