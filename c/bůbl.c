#include <stdio.h>
#include <stdlib.h>

// Define the structure for a
struct Bůbl {
           int o;
  struct Bůbl* oo;
};

// Function to blow a new Bůbl
struct Bůbl* blow(int o) {

    struct Bůbl* newBůbl =
      (struct Bůbl*)malloc(sizeof(struct Bůbl));

    newBůbl->o = o;
    newBůbl->oo = NULL;

    return newBůbl;

}

struct Bůbl* push(struct Bůbl* tip, int o) {
  struct Bůbl* newBůbl = blow(o);
                   newBůbl->oo = tip;
                      return newBůbl;
}

       struct Bůbl* pop(struct Bůbl* tip) {
    struct Bůbl* resultado = tip->oo;
                           free(tip);
                    return resultado;
}
