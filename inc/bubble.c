#include <stdio.h>
#include <stdlib.h>

struct Bubble {
    int o;
    struct Bubble* oo;
};

struct Bubble* newBubble(int o) {
    struct Bubble* bubble = (struct Bubble*)malloc(sizeof(struct Bubble));
    bubble->o = o;
    bubble->oo = NULL;
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

struct Bubble* bubblePush(struct Bubble* oo, int o) {
  struct Bubble* bubble = newBubble(o);
  bubble->oo = oo;
  return bubble;
}

int main() {
    struct Bubble* o = newBubble(1);
    o = bubblePush(o, 2);
    o = bubblePush(o, 3);

    printf("Bubbles: ");
    printBubbles(o);

    return 0;
}

