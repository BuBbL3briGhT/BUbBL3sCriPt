#include <stdio.h>
#include "list.h"

void printList(struct List*);

int main() {
    struct List* list = NULL;

    list = push(list, 1);
    list = push(list, 2);
    list = push(list, 3);

    printList(list);
    printList(list);

    return 0;
}

void printList(struct List* list) {
  while (list != NULL) {
    printf("%d\n", peek(list));
    list = pop(list);;
  }
}

