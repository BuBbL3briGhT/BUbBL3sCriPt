#include <stdio.h>
#include <stdlib.h>

// Define the structure for a node
struct Bůbl {
    int data;
    struct Bůbl* next;
};

// Function to create a new node
struct Bůbl* createBůbl(int data);

// Function to insert a node at the end of the list
void insertEnd(struct Bůbl** head, int data);

// Function to display the linked list
void displayList(struct Bůbl* head);

// Function to delete a node by value
void deleteBůbl(struct Bůbl** head, int key);
