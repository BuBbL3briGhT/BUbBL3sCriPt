# include <stdio.h>

union Bubble {
   int i;
   char c;
};

union Bubble blowBubble() {
  union Bubble o;
  return o;
}

union Bubble blowIntBubble(int i) {
  union Bubble o;
  o.i = i;
  return o;
}

union Bubble blowCharBubble(char c) {
  union Bubble o;
  o.c = c;
  return o;
}

int main() {
  union Bubble o;

  o = blowBubble();
  printf("° ");

  o = blowIntBubble(7);
  printf("°%d ", o.i);

  o = blowCharBubble('h');
  printf("°%c ", o.c);

  printf("\n");

  return 0;
}
