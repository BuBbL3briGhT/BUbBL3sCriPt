#include <stdio.h>
#include <stdlib.h>

struct Bubble {
    int o;
    struct Bubble* oo;
};

struct Bubble* blowBubble(int);
struct Bubble* blowBubble(struct Bubble*, int);
struct Bubble* popBubble(struct Bubble*);
void           printBubbles(struct Bubble*);

int main() {
    struct Bubble* o;
    o = blowBubble(1);
    o = blowBubble(o, 2);
    o = blowBubble(o, 3);
    /* o = blowBubble(o, "apple"); */
    /* o = blowBubble(o, "orange"); */
    /* o = blowBubble(o, "🍌"); */

    printf("Bubbles: ");
    printBubbles(o);

    return 0;
}

struct Bubble* blowBubble(int o) {
    struct Bubble* bubble = (struct Bubble*)malloc(sizeof(struct Bubble));
    bubble->o = o;
    bubble->oo = NULL;
    return bubble;
}

struct Bubble* blowBubble(struct Bubble* oo, int o) {
  struct Bubble* bubble = blowBubble(o);
  bubble->oo = oo;
  return bubble;
}

/* struct Bubble* blowBubbles(); */

void printBubbles(struct Bubble* oo) {
    struct Bubble* o = oo;
    while (o != NULL) {
        printf("%d ", o->o);
        o = o->oo;
    }
    printf("\n");
}
