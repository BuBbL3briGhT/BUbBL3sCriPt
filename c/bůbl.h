#include <stdio.h>
#include <stdlib.h>

// Define the structure for a node
struct Bůbl {
    int o;
    struct Bůbl* oo;
};

// Function to create a new node
struct Bůbl* blowBůbl(int o);

struct Bubl* pushBůbl(struct Bůbl head, int o);

struct Bubl* popBůbl(struct Bůbl head);

// Function to insert a node at the end of the list
void insertEnd(struct Bůbl** head, int o);

// Function to display the linked list
void displayList(struct Bůbl* head);

// Function to delete a node by value
void deleteBůbl(struct Bůbl** head, int key);
