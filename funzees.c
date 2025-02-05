# include <stdio.h>

enum BubbleType { BUBL_EMPTY, BUBL_INT, BUBL_CHAR, BUBL_STR };

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
  printf(" ");
}

int main() {
  struct Bubble a, b, c ,d;

  a = blowBubble();
  b = blowIntBubble(9);
  c = blowCharBubble('m');
  d = blowStringBubble("orange");

  printBubble(a);
  printBubble(b);
  printBubble(c);
  printBubble(d);
  printf("\n");

  return 0;
}
