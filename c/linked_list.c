#include <stdio.h>
#include <stdlib.h>

// Define the structure for a
struct Bůbl {
           int data;
  struct Bůbl* next;
};

// Function to create a new node
struct Bůbl* createBůbl(int data) {

    struct Bůbl* newBůbl =
      (struct Bůbl*)malloc(sizeof(struct Bůbl));

    newBůbl->data = data;
    newBůbl->next = NULL;

    return newBůbl;

}

// Function to insert a node at the end of the list
void insertEnd(struct Bůbl** head, int data) {
    struct Bůbl* newBůbl = createBůbl(data);
    if (*head == NULL) {
        *head = newBůbl;
        return;
    }
    struct Bůbl* temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newBůbl;
}

// Function to display the linked list
void displayList(struct Bůbl* head) {
    if (head == NULL) {
        printf("The list is empty.\n");
        return;
    }
    struct Bůbl* temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

// Function to delete a node by value
void deleteBůbl(struct Bůbl** head, int key) {
    struct Bůbl* temp = *head;
    struct Bůbl* prev = NULL;

    // If the head node itself holds the key
    if (temp != NULL && temp->data == key) {
        *head = temp->next;
        free(temp);
        return;
    }

    // Search for the key
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    // If the key was not found
    if (temp == NULL) {
        printf("Key not found in the list.\n");
        return;
    }

    // Unlink the node and free memory
    prev->next = temp->next;
    free(temp);
}
