# include <stdio.h>

enum BubbleType { BUBL_EMPTY, BUBL_INT,
  BUBL_CHAR, BUBL_STR };

union BubbleData {
   int i;
   char c;
   char* s;
};

struct Bubble {
  enum BubbleType type;
  union BubbleData data;
};


struct Bubble blowBubble() {
  struct Bubble o;
  o.type = BUBL_EMPTY;
  return o;
}

struct Bubble blowIntBubble(int i) {
  struct Bubble o;
  o.type = BUBL_INT;
  o.data.i = i;
  return o;
}

struct Bubble blowCharBubble(char c) {
  struct Bubble o;
  o.type = BUBL_CHAR;
  o.data.c = c;
  return o;
}

struct Bubble blowStringBubble(char* str) {
  struct Bubble o;
  o.type = BUBL_STR;
  o.data.s = str;
  return o;
}

void printBubble(struct Bubble o) {
  printf("°");
  switch (o.type) {
    case BUBL_INT:
      printf("%d", o.data.i);
      break;
    case BUBL_CHAR:
      printf("%c", o.data.c);
      break;
    case BUBL_STR:
      printf("%s", o.data.s);
      break;
    default:
      break;
  }
}

void printBubbles(struct Bubble* bubbles, int length) {
  printf("%d ", length);
  printf("%lu ", sizeof(bubbles));
  printf("%lu ", sizeof(bubbles[0]));
  for (int i = 0; i < length; i++) {
    printBubble(bubbles[i]);
    printf(" ");
  }
  printf("\n");
}

int main() {
  struct Bubble myBubbles[4] = {
    blowBubble(),
    blowIntBubble(3),
    blowCharBubble('y'),
    blowStringBubble("green")
  };

  int length = sizeof(myBubbles) / sizeof(myBubbles[0]);
  printf("%d ", length);
  printf("%lu ", sizeof(myBubbles));
  printf("%lu ", sizeof(myBubbles[0]));
  printBubbles(myBubbles, length);

  return 0;
}
