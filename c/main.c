#include <stdio.h>
#include "bůbl.h"

/* int main() { */
/*   printf("¡Hola, GuionDeBurbuja!\n"); */
/*   return 0; */
/* } */

int main() {
    struct Bůbl* tip = NULL;


    tip = push(*tip, 1);
    tip = push(*tip, 2);
    tip = push(*tip, 3);

    while (tip != NULL) {
      printf("%d\n", tip->o);
      tip = tip->oo;
    }

    return 0;
}
