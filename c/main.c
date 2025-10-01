#include <stdio.h>
#include "linked_list.h"

/* int main() { */
/*   printf("¡Hola, GuionDeBurbuja!\n"); */
/*   return 0; */
/* } */

int main() {
    struct Bůbl* head = NULL;

    // Insert nodes
    insertEnd(&head, 10);
    insertEnd(&head, 20);
    insertEnd(&head, 30);

    printf("Linked List: ");
    displayList(head);

    // Delete a node
    printf("Deleting 20...\n");
    deleteBůbl(&head, 20);

    printf("Updated Linked List: ");
    displayList(head);

    return 0;
}
