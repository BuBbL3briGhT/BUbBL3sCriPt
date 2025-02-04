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
  printf("%d \n", o.i);

  o = blowIntBubble(7);
  printf("%d \n", o.i);

  return 0;
}
