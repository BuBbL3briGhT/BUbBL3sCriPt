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

int main() {
  struct Bubble o;

  o = blowBubble();
  printf("° ");

  o = blowIntBubble(7);
  printf("°%d ", o.data.i);

  o = blowCharBubble('h');
  printf("°%c ", o.data.c);

  o = blowStringBubble("fuck");
  printf("°%s ", o.data.s);

  printf("\n");

  return 0;
}
