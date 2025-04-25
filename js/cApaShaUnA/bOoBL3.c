#include <stdio.h>
#include <stdlib.h>

struct Bubble {
    void* o;
    struct Bubble* oo;
};

struct Bubble* blowBubble(void*);
struct Bubble* blowBubble(struct Bubble*, void*);
struct Bubble* blowBubble(int);
struct Bubble* blowBubble(struct Bubble*, int);
void* popBubble(struct Bubble*);
void printBubbles(struct Bubble*);

int main() {

  int i = 179;
  void* o = &i;
  printf("%d ", *(int *)o);
  printf("%d ", *(int *)o);

  char *s = "bet";
  o = &s;
  printf("%s ", *(char *)o);
  // printf("%s ", *(char)o);



    // struct Bubble* o;
    // o = blowBubble(8);
    // printf("%d ", *(int *)o->o);
    // printf("%d ", *(int *)o->o);
    // o = blowBubble(o, 2);
    // o = blowBubble(o, 3);
    /* o = blowBubble(o, "apple"); */
    /* o = blowBubble(o, "orange"); */
    /* o = blowBubble(o, "🍌"); */

    // printf("Bubbles: ");
    // printBubbles(o);
    // o = blowBubble(8);
    // printf("%d ", *(int *)o->o);
    printf("\n");

    return 0;
}

struct Bubble* blowBubble(void* o) {
    struct Bubble* bubble = (struct Bubble*)malloc(sizeof(struct Bubble));
    // printf("%d ", *(int *)o);
    bubble->o = o;
    // printf("%d ", *(int *)bubble->o);
    bubble->oo = NULL;
    return bubble;
}

struct Bubble* blowBubble(struct Bubble* oo, void* o) {
  struct Bubble* bubble = blowBubble(o);
  bubble->oo = oo;
  return bubble;
}

struct Bubble* blowBubble(int o) {
  return blowBubble(&o);
}

struct Bubble* blowBubble(struct Bubble* oo, int o) {
  return blowBubble(oo, &o);
}
/* struct Bubble* blowBubbles(); */

void printBubbles(struct Bubble* oo) {
    // printf("%d ", *(int *)oo->o);
    struct Bubble* o = oo;
    while (o != NULL) {
        printf("%d ", *(int *)o->o);
        o = o->oo;
    }
    printf("\n");
}
