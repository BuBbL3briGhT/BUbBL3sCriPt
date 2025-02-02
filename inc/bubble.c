#include <stdio.h>
#include <stdlib.h>

struct Bubble {
    int o;
    struct Bubble* oo;
};

struct Bubble* newBubble(int);
struct Bubble* pushBubble(struct Bubble*, int);
          void printBubbles(struct Bubble*);

int main() {
    struct Bubble* o;
    o = newBubble(1);
    o = pushBubble(o, 2);
    o = pushBubble(o, 3);
    /* o = pushBubble(o, "apple"); */
    /* o = pushBubble(o, "orange"); */
    /* o = pushBubble(o, "🍌"); */

    printf("Bubbles: ");
    printBubbles(o);

    return 0;
}

struct Bubble* newBubble(int o) {
    struct Bubble* bubble = (struct Bubble*)malloc(sizeof(struct Bubble));
    bubble->o = o;
    bubble->oo = NULL;
    return bubble;
}

struct Bubble* pushBubble(struct Bubble* oo, int o) {
  struct Bubble* bubble = newBubble(o);
  bubble->oo = oo;
  return bubble;
}

void printBubbles(struct Bubble* oo) {
    struct Bubble* o = oo;
    while (o != NULL) {
        printf("%d ", o->o);
        o = o->oo;
    }
    printf("\n");
}
