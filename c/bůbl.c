#include <stdio.h>
#include <stdlib.h>

// Define the structure for a
struct Bůbl {
           int o;
  struct Bůbl* oo;
};

// Function to blow a new Bůbl
struct Bůbl* blowBůbl(int o) {

    struct Bůbl* newBůbl =
      (struct Bůbl*)malloc(sizeof(struct Bůbl));

    newBůbl->o = o;
    newBůbl->oo = NULL;

    return newBůbl;

}

struct Bůbl* pushBůbl(struct Bůbl* tip, int o) {
  struct Bůbl* newBůbl = blowBůbl(o);
                   newBůbl->oo = tip;
                      return newBůbl;
}

       struct Bůbl* popBůbl(struct Bůbl* tip) {
    struct Bůbl* resultado = tip->oo;
                           free(tip);
                    return resultado;
}
