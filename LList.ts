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

    exist(data: T): boolean{
        let current = this.head;

        while(current) {
            if (current.data === data) return true;
            current = current.next;
        }
        return false;
    }

    display(): void{
        let current = this.head;
        while(current.next !== null){
            console.log(current.next.data);
            current = current.next
        }
    }

    public reverse(): void{
        let current = this.tail;
        while (current.prev !== null) {
            this.reverseList.push(current.data);
            current = current.prev;
        }
    }

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

    getPrevious(data) {
        let current = this.head;
        while (current.next !== null &&
        (current.next.data !== data)) {
            current = current.next;
        }
        return current;
    }

    insertAfter(node: LinkedNode<T>, data: T){
        let newNode = new LinkedNode (data);
        let current = this.get(node);
        newNode.next = current.next;
        newNode.prev = current;
        current.next = newNode;
        newNode.next.prev = newNode;
    }

    insertBefore(node: LinkedNode<T>, data: T){
        let newNode = new LinkedNode(data);
        let current = this.getPrevious(node);
        newNode.next = current.next;
        newNode.prev = current;
        current.next = newNode;
        newNode.next.prev = newNode;
    }

    public reversed(): Array<T>{
        this.reverse();
        return this.reverseList
    }
}
