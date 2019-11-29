"use strict";
exports.__esModule = true;
require("mocha");
var chai_1 = require("chai");
var LList_1 = require("../LList");
describe('LinkedList', function () {
    var list;
    beforeEach(function () {
        list = new LList_1.LinkedList();
    });
    it('should insert a new element at the start of the list', function () {
        list.pushFront('head');
        list = list.head;
        chai_1.expect(list.data).equals('head');
        chai_1.expect(list.prev).equals(null);
        chai_1.expect(list.next).equals(null);
    });
    it('should insert a new element at the end of the list', function () {
        list.pushBack(2);
        list = list.head;
        chai_1.expect(list.data).equals(2);
    });
    it('should check if data exists', function () {
        list.pushBack(2);
        var result = list.exist(2);
        chai_1.expect(result).equals(true);
    });
    it('should return a node containing data, or null', function () {
        list.pushBack(2);
        list.get(2);
        list = list.head;
        chai_1.expect(list.data).equals(2);
        chai_1.expect(list).to.include.key(['next', 'prev']);
    });
    it('should insert a new node containing data after the given node ', function () {
        list.pushBack(2);
        list.insertAfter(2, 3);
        list.get(2);
        chai_1.expect(list.head.next.data).equals(3);
    });
    it('should insert a new node containing data before the given node', function () {
        list.pushBack(2);
        list.insertBefore(2, 1);
        list.get(2);
        chai_1.expect(list.head.prev.data).equals(1);
    });
    it('should return a reverse list', function () {
        list.pushFront('head');
        list.pushBack(2);
        list.insertAfter(2, 3);
        list.insertAfter(3, 4);
        list.insertBefore(3, 5);
        list.reversed();
        var result = list.reverseList;
        chai_1.expect(result[result.length - 1]).equals(3);
    });
});
