"use strict";
// @ts-ignore
exports.__esModule = true;
var LinkedNode = /** @class */ (function () {
    function LinkedNode(data, next, prev) {
        this.data = data;
        this.next = null;
        this.prev = null;
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
    LinkedList.prototype.pushFront = function (data) {
        var node = new LinkedNode(data);
        // let current: LinkedNode<T>;
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
    LinkedList.prototype.pushBack = function (data) {
        var node = new LinkedNode(data);
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
    LinkedList.prototype.exist = function (data) {
        var current = this.head;
        while (current) {
            if (current.data === data)
                return true;
            current = current.next;
        }
        return false;
    };
    LinkedList.prototype.display = function () {
        var current = this.head;
        while (current.next !== null) {
            console.log(current.next.data);
            current = current.next;
        }
    };
    LinkedList.prototype.reverse = function () {
        var current = this.tail;
        while (current.prev !== null) {
            this.reverseList.push(current.data);
            current = current.prev;
        }
    };
    LinkedList.prototype.get = function (data) {
        var current = this.head;
        try {
            while (current.data !== data) {
                current = current.next;
            }
        }
        catch (err) {
            current = null;
        }
        return current;
    };
    LinkedList.prototype.getPrevious = function (data) {
        var current = this.head;
        while (current.next !== null &&
            (current.next.data !== data)) {
            current = current.next;
        }
        return current;
    };
    LinkedList.prototype.insertAfter = function (node, data) {
        var newNode = new LinkedNode(data);
        var current = this.get(node);
        newNode.next = current.next;
        newNode.prev = current.prev;
        current.next = newNode;
        current.prev = newNode;
    };
    LinkedList.prototype.insertBefore = function (node, data) {
        var newNode = new LinkedNode(data);
        var current = this.getPrevious(node);
        newNode.next = current.next;
        newNode.prev = current.prev;
        current.next = newNode;
        current.prev = newNode;
    };
    // @ts-ignore
    LinkedList.prototype.reversed = function () {
        this.reverse();
        return this.reverseList;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
