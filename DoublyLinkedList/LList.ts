class LinkedNode<T> {
    public data: T;
    public next: LinkedNode<T> | null;
    public prev: LinkedNode<T> | null;

    constructor(data: T, next?: null, prev?: null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}

export class LinkedList<T> {
    private head: LinkedNode<T> = null;
    private tail: LinkedNode<T> = null;
    public reverseList: Array<T> = [];

    constructor(){
        this.head = null;
        this.tail = null;
        this.reverseList = [];
    }

    // inserts a new element at the front (start) of the list
    public pushFront(data: T): void{
        let node = new LinkedNode(data, null, null);
        if(!this.head){
            this.head = node;
            this.tail = this.head;
        } else {
            let newNode: LinkedNode<T>;
            newNode = node;
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    // inserts a new element at the back (end) of the list
    public pushBack(data: T): void{
        let node = new LinkedNode(data, null, null);
        if(!this.head){
            this.head = node;
            this.tail = this.head
        }
        let current: any;
        current = this.head;
        while(current.next !== null){
            current = current.next;
        }
        current.next = new LinkedNode(data, null, current);
        this.tail = current.next;
    };

    //checks if an element is part of the list
    exist(data: T): boolean{
        let current = this.head;

        while(current) {
            if (current.data === data) return true;
            current = current.next;
        }
        return false;
    }

    // show data in LinkedList
    display(): void{
        let current = this.head;
        while(current.next !== null){
            console.log(current.next.data);
            current = current.next
        }
    }

    // reverses the linked list in-place
    public reverse(): void{
        let current = this.tail;
        while (current.prev !== null) {
            this.reverseList.push(current.data);
            current = current.prev;
        }
    }

    // returns a node containing data, or null of such doesn't exist
    get(data): (LinkedNode<T> | null){
        let current = this.head;
        try {
            while(current.data !== data){
                current = current.next
            }
        } catch (err) {
            current.data = null
        }
        return current
    }

    // returns the previous data before a given data
    getPrevious(data) {
        let current = this.head;
        while (current.next !== null &&
        (current.next.data !== data)) {
            current = current.next;
        }
        return current;
    }

    // inserts a new node containing data after the given node
    insertAfter(node: LinkedNode<T>, data: T){
        let newNode = new LinkedNode (data);
        let current = this.get(node);
        newNode.next = current.next;
        newNode.prev = current;
        current.next = newNode;
        newNode.next.prev = newNode;
    }

    // inserts a new node containing data before the given node
    insertBefore(node: LinkedNode<T>, data: T){
        let newNode = new LinkedNode(data);
        let current = this.getPrevious(node);
        newNode.next = current.next;
        newNode.prev = current;
        current.next = newNode;
        newNode.next.prev = newNode;
    }

    // returns a new copy of the current list, copied in reverse. The current list is unmodified
    public reversed(): Array<T>{
        this.reverse();
        return this.reverseList
    }
}
