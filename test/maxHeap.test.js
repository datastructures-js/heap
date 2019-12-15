const { expect } = require('chai');
const MaxHeap = require('../src/maxHeap');

describe('MaxHeap unit tests', () => {
  const maxHeap = new MaxHeap();

  describe('.insert(key, value)', () => {
    it('should insert nodes into the heap', () => {
      maxHeap.insert(50);
      maxHeap.insert(80);
      maxHeap.insert(30, 'something');
      maxHeap.insert(90);
      maxHeap.insert(60, null);
      maxHeap.insert(40);
      maxHeap.insert(20, { name: 'test' });
    });
  });

  describe('size()', () => {
    it('should return the size of the heap', () => {
      expect(maxHeap.size()).to.equal(7);
    });
  });

  describe('.sort()', () => {
    it('should sort a copy of the heap\'s nodes in ascending order', () => {
      expect(maxHeap.clone().sort().map((n) => n.serialize()))
        .to.deep.equal([
          { key: 20, value: { name: 'test' } },
          { key: 30, value: 'something' },
          { key: 40, value: undefined },
          { key: 50, value: undefined },
          { key: 60, value: null },
          { key: 80, value: undefined },
          { key: 90, value: undefined }
        ]);
    });
  });

  describe('.root()', () => {
    it('should get the root of the heap', () => {
      expect(maxHeap.root().serialize()).to.deep.equal({
        key: 90,
        value: undefined
      });
    });
  });

  describe('.extractRoot()', () => {
    it('should extract the root (max key) from the heap', () => {
      expect(maxHeap.extractRoot().serialize()).to.deep.equal({
        key: 90,
        value: undefined
      });
      expect(maxHeap.size()).to.equal(6);

      expect(maxHeap.extractRoot().serialize()).to.deep.equal({
        key: 80,
        value: undefined
      });
      expect(maxHeap.size()).to.equal(5);

      expect(maxHeap.extractRoot().serialize()).to.deep.equal({
        key: 60,
        value: null
      });
      expect(maxHeap.size()).to.equal(4);

      expect(maxHeap.extractRoot().serialize()).to.deep.equal({
        key: 50,
        value: undefined
      });
      expect(maxHeap.size()).to.equal(3);

      expect(maxHeap.extractRoot().serialize()).to.deep.equal({
        key: 40,
        value: undefined
      });
      expect(maxHeap.size()).to.equal(2);

      expect(maxHeap.extractRoot().serialize()).to.deep.equal({
        key: 30,
        value: 'something'
      });
      expect(maxHeap.size()).to.equal(1);

      expect(maxHeap.extractRoot().serialize()).to.deep.equal({
        key: 20,
        value: { name: 'test' }
      });
      expect(maxHeap.size()).to.equal(0);

      expect(maxHeap.extractRoot()).to.equal(null);
      expect(maxHeap.root()).to.equal(null);
      expect(maxHeap.size()).to.equal(0);
    });
  });

  describe('.clear()', () => {
    it('should clear the items in the heap', () => {
      maxHeap.insert(50);
      maxHeap.clear();
      expect(maxHeap.root()).to.equal(null);
      expect(maxHeap.size()).to.equal(0);
    });
  });

  describe('.heapify(items)', () => {
    it('should build a heap from a list of items', () => {
      const items = [
        'b',
        'x',
        { key: 'r', value: 'something' },
        't',
        { key: 'a', value: null },
        'c',
        { key: 'm', value: { name: 'test' } }
      ];
      const heap = MaxHeap.heapify(items);

      expect(heap.extractRoot().serialize()).to.deep.equal({
        key: 'x',
        value: undefined
      });
      expect(heap.size()).to.equal(6);

      expect(heap.root().serialize()).to.deep.equal({
        key: 't',
        value: undefined
      });
      expect(heap.root().getValue()).to.equal(undefined);
      expect(heap.size()).to.equal(6);
    });

    it('should return null if items is not a none-empty array', () => {
      expect(MaxHeap.heapify('test')).to.equal(null);
    });
  });
});
