#include <stdio.h>
#include <stdlib.h>

// Define the structure for a node
struct Node {
    int data;
    struct Node* next;
};

// Function to create a new node
struct Node* createNode(int data);

// Function to insert a node at the end of the list
void insertEnd(struct Node** head, int data);

// Function to display the linked list
void displayList(struct Node* head);

// Function to delete a node by value
void deleteNode(struct Node** head, int key);
