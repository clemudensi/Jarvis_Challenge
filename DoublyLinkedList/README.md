## LinkedList Algorithm Using TypeScript

#### Available methods are:

* pushBack(data: T): void; // inserts a new element at the back (end) of the list
* pushFront(data: T): void; // inserts a new element at the front (start) of the list
* exists(data: T): boolean; // checks if an element is part of the list
* get(data: T): (Node<T> | null); // returns a node containing data, or null of such doesn't exist
* insertAfter(node: Node<T>, data: T) : void // inserts a new node containing data after the given node 
* insertBefore(node: Node<T>, data: T) : void // inserts a new node containing data before the given node
* reverse(): void // reverses the linked list in-place
* reversed(): List<T> // returns a new copy of the current list, copied in reverse. The current list is unmodified.


