#include <stdio.h>
#include <stdlib.h>

// Define the structure for a node
struct Bubble {
    int o;
    struct Bubble* oo;
};

// Function to create a new node
struct Node* newNode(int data) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->next = NULL;
    return node;
}

// Function to print the linked list
void printList(struct Node* head) {
    struct Node* current = head;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\n");
}

int main() {
    // Create a simple linked list with three nodes
    struct Node* head = newNode(1);
    head->next = newNode(2);
    head->next->next = newNode(3);

    // Print the linked list
    printf("Linked list: ");
    printList(head);

    return 0;
}

