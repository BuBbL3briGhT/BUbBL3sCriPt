#include <stdio.h>
#include <stdlib.h>

// Define the structure for a bubble
struct Bubble {
    int o;
    struct Bubble* oo;
};

// Function to create a new bubble
struct Bubble* newBubble(int o) {
    struct Bubble* bubble = (struct Bubble*)malloc(sizeof(struct Bubble));
    bubble->o = o;
    bubble->oo = NULL;
    return bubble;
}

// Function to print the bubbles
void parTay(struct Bubble* oo) {
    struct Bubble* o = oo;
    while (o != NULL) {
        printf("%d ", o->o);
        o = o->oo;
    }
    printf("\n");
}

int main() {
    // Three little bubbles
    struct Bubble* o = newBubble(1);
    o->oo = newBubble(2);
    o->oo->oo = newBubble(3);

    // Print the bubbles
    printf("Bubbles: ");
    parTay(o);

    return 0;
}

