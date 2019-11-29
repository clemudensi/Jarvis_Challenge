import "mocha";
import { expect } from 'chai';
import { LinkedList } from '../LList';

describe('LinkedList', () => {
    let list;
    beforeEach(() => {
        list = new LinkedList();
    });

    it('should insert a new element at the start of the list', () => {
        list.pushFront('head');
        list = list.head;
        expect(list.data).equals('head');
        expect(list.prev).equals(null);
        expect(list.next).equals(null);
    });

    it('should insert a new element at the end of the list', () => {
        list.pushBack(2);
        list = list.head;
        expect(list.data).equals(2);
    });

    it('should check if data exists', () =>{
        list.pushBack(2);
        const result = list.exist(2);
        expect(result).equals(true);
    });

    it('should return a node containing data, or null', () => {
        list.pushBack(2);
        list.get(2);
        list = list.head;
        expect(list.data).equals(2);
        expect(list).to.include.key(['next', 'prev'])
    });
    it('should insert a new node containing data after the given node ', () => {
        list.pushBack(2);
        list.insertAfter(2, 3);
        list.get(2);
        expect(list.head.next.data).equals(3);
    });
    it('should insert a new node containing data before the given node', () => {
        list.pushBack(2);
        list.insertBefore(2, 1);
        list.get(2);
        expect(list.head.prev.data).equals(1);
    });
    it('should return a reverse list', () => {
        list.pushFront('head');
        list.pushBack(2);
        list.insertAfter(2, 3);
        list.insertAfter(3, 4);
        list.insertBefore(3, 5);
        list.reversed();
        const result = list.reverseList;
        expect(result[result.length - 1]).equals(3);
    });
});
