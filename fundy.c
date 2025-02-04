# include <stdio.h>

union Bubble {
   int i;
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

int main() {
  union Bubble o;

  o = blowBubble();
  printf("° ");

  o = blowIntBubble(7);
  printf("°%d ", o.i);

  printf("\n");

  return 0;
}
