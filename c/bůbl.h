#include <stdio.h>
#include <stdlib.h>

struct Bůbl { int o; struct Bůbl* oo; };

struct Bůbl* blow(int);
struct Bůbl* push(struct Bůbl*, int);
struct Bůbl* pop(struct Bůbl*);
