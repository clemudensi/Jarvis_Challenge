"use strict";
exports.__esModule = true;
var LinkedNode = /** @class */ (function () {
    function LinkedNode(data, next, prev) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
    return LinkedNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.reverseList = [];
        this.head = null;
        this.tail = null;
        this.reverseList = [];
    }
    // inserts a new element at the front (start) of the list
    LinkedList.prototype.pushFront = function (data) {
        var node = new LinkedNode(data, null, null);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        }
        else {
            var newNode = void 0;
            newNode = node;
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    };
    // inserts a new element at the back (end) of the list
    LinkedList.prototype.pushBack = function (data) {
        var node = new LinkedNode(data, null, null);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        }
        var current;
        current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = new LinkedNode(data, null, current);
        this.tail = current.next;
    };
    ;
    //checks if an element is part of the list
    LinkedList.prototype.exist = function (data) {
        var current = this.head;
        while (current) {
            if (current.data === data)
                return true;
            current = current.next;
        }
        return false;
    };
    // show data in LinkedList
    LinkedList.prototype.display = function () {
        var current = this.head;
        while (current.next !== null) {
            console.log(current.next.data);
            current = current.next;
        }
    };
    // reverses the linked list in-place
    LinkedList.prototype.reverse = function () {
        var current = this.tail;
        while (current.prev !== null) {
            this.reverseList.push(current.data);
            current = current.prev;
        }
    };
    // returns a node containing data, or null of such doesn't exist
    LinkedList.prototype.get = function (data) {
        var current = this.head;
        try {
            while (current.data !== data) {
                current = current.next;
            }
        }
        catch (err) {
            current.data = null;
        }
        return current;
    };
    // returns the previous data before a given data
    LinkedList.prototype.getPrevious = function (data) {
        var current = this.head;
        while (current.next !== null &&
            (current.next.data !== data)) {
            current = current.next;
        }
        return current;
    };
    // inserts a new node containing data after the given node
    LinkedList.prototype.insertAfter = function (node, data) {
        var newNode = new LinkedNode(data);
        var current = this.get(node);
        newNode.next = current.next;
        newNode.prev = current;
        current.next = newNode;
        newNode.next.prev = newNode;
    };
    // inserts a new node containing data before the given node
    LinkedList.prototype.insertBefore = function (node, data) {
        var newNode = new LinkedNode(data);
        var current = this.getPrevious(node);
        newNode.next = current.next;
        newNode.prev = current;
        current.next = newNode;
        newNode.next.prev = newNode;
    };
    // returns a new copy of the current list, copied in reverse. The current list is unmodified
    LinkedList.prototype.reversed = function () {
        this.reverse();
        return this.reverseList;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
