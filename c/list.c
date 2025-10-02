#include <stdio.h>
#include <stdlib.h>

struct List { int data; struct List* next; };

struct List* create(int data, struct List* next) {
  struct List* list =
    (struct List*)malloc(sizeof(struct List));

  list->data = data; list->next = next;

  return list;
}

struct List* push(struct List* list, int data) {
  return create(data, list);
}

int peek(struct List* list) {
  return list->data;
}

struct List* pop(struct List* list) {
  struct List* _list = list.next;
  free(list);
  return _list;
}
