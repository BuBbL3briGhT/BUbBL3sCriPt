#include <stdio.h>
#include <stdlib.h>

// Define the structure for a
struct Bůbl {
           int o;
  struct Bůbl* oo;
};

// Function to create a new node
struct Bůbl* createBůbl(int o) {

    struct Bůbl* newBůbl =
      (struct Bůbl*)malloc(sizeof(struct Bůbl));

    newBůbl->o = o;
    newBůbl->oo = NULL;

    return newBůbl;

}

// Function to insert a node at the end of the list
void insertEnd(struct Bůbl** head, int o) {
    struct Bůbl* newBůbl = createBůbl(o);
    if (*head == NULL) {
        *head = newBůbl;
        return;
    }
    struct Bůbl* temp = *head;
    while (temp->oo != NULL) {
        temp = temp->oo;
    }
    temp->oo = newBůbl;
}

// Function to display the linked list
void displayList(struct Bůbl* head) {
    if (head == NULL) {
        printf("The list is empty.\n");
        return;
    }
    struct Bůbl* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->o);
        temp = temp->oo;
    }
    printf("NULL\n");
}

// Function to delete a node by value
void deleteBůbl(struct Bůbl** head, int key) {
    struct Bůbl* temp = *head;
    struct Bůbl* prev = NULL;

    // If the head node itself holds the key
    if (temp != NULL && temp->o == key) {
        *head = temp->oo;
        free(temp);
        return;
    }

    // Search for the key
    while (temp != NULL && temp->o != key) {
        prev = temp;
        temp = temp->oo;
    }

    // If the key was not found
    if (temp == NULL) {
        printf("Key not found in the list.\n");
        return;
    }

    // Unlink the node and free memory
    prev->oo = temp->oo;
    free(temp);
}
