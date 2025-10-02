
struct List { int data; struct List* next; };

struct List* create(int, struct List*);
struct List* push(struct List*, int);
         int peek(struct List*);
struct List* pop(struct List*);
