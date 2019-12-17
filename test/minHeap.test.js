const { expect } = require('chai');
const MinHeap = require('../src/minHeap');

describe('MinHeap unit tests', () => {
  const minHeap = new MinHeap();

  describe('.insert(key, value)', () => {
    it('should insert nodes into the heap', () => {
      minHeap.insert(50);
      minHeap.insert(80);
      minHeap.insert(30, 'something');
      minHeap.insert(90);
      minHeap.insert(60, null);
      minHeap.insert(40);
      minHeap.insert(20, { name: 'test' });
    });
  });

  describe('size()', () => {
    it('should return the size of the heap', () => {
      expect(minHeap.size()).to.equal(7);
    });
  });

  describe('.sort()', () => {
    it('should sort a copy of the heap\'s nodes in descending order', () => {
      expect(minHeap.clone().sort().map((n) => n.serialize()))
        .to.deep.equal([
          { key: 90, value: undefined },
          { key: 80, value: undefined },
          { key: 60, value: null },
          { key: 50, value: undefined },
          { key: 40, value: undefined },
          { key: 30, value: 'something' },
          { key: 20, value: { name: 'test' } }
        ]);
    });
  });

  describe('.root()', () => {
    it('should get the root of the heap', () => {
      expect(minHeap.root().serialize()).to.deep.equal({
        key: 20,
        value: { name: 'test' }
      });
    });
  });

  describe('.serialize()', () => {
    it('should serialize the heap nodes', () => {
      expect(minHeap.serialize()).to.deep.equal([
        {
          key: 20,
          value: { name: 'test' }
        },
        {
          key: 60,
          value: null
        },
        {
          key: 30,
          value: 'something'
        },
        {
          key: 90,
          value: undefined
        },
        {
          key: 80,
          value: undefined
        },
        {
          key: 50,
          value: undefined
        },
        {
          key: 40,
          value: undefined
        }
      ]);
    });
  });

  describe('.extractRoot()', () => {
    it('should extract the root (min key) from the heap', () => {
      expect(minHeap.extractRoot().serialize()).to.deep.equal({
        key: 20,
        value: { name: 'test' }
      });
      expect(minHeap.size()).to.equal(6);

      expect(minHeap.extractRoot().serialize()).to.deep.equal({
        key: 30,
        value: 'something'
      });
      expect(minHeap.size()).to.equal(5);

      expect(minHeap.extractRoot().serialize()).to.deep.equal({
        key: 40,
        value: undefined
      });
      expect(minHeap.size()).to.equal(4);

      expect(minHeap.extractRoot().serialize()).to.deep.equal({
        key: 50,
        value: undefined
      });
      expect(minHeap.size()).to.equal(3);

      expect(minHeap.extractRoot().serialize()).to.deep.equal({
        key: 60,
        value: null
      });
      expect(minHeap.size()).to.equal(2);

      expect(minHeap.extractRoot().serialize()).to.deep.equal({
        key: 80,
        value: undefined
      });
      expect(minHeap.size()).to.equal(1);

      expect(minHeap.extractRoot().serialize()).to.deep.equal({
        key: 90,
        value: undefined
      });
      expect(minHeap.size()).to.equal(0);

      expect(minHeap.extractRoot()).to.equal(null);
      expect(minHeap.root()).to.equal(null);
      expect(minHeap.size()).to.equal(0);
    });
  });

  describe('.clear()', () => {
    it('should clear the items in the heap', () => {
      minHeap.insert(50);
      minHeap.clear();
      expect(minHeap.root()).to.equal(null);
      expect(minHeap.size()).to.equal(0);
    });
  });

  describe('.heapify(items)', () => {
    it('should build a heap from a list of items', () => {
      const items = [
        50,
        80,
        { key: 30, value: 'something' },
        90,
        { key: 60, value: null },
        40,
        { key: 20, value: { name: 'test' } }
      ];
      const heap = MinHeap.heapify(items);

      expect(heap.extractRoot().serialize()).to.deep.equal({
        key: 20,
        value: { name: 'test' }
      });
      expect(heap.size()).to.equal(6);

      expect(heap.root().serialize()).to.deep.equal({
        key: 30,
        value: 'something'
      });
      expect(heap.root().getValue()).to.equal('something');
      expect(heap.size()).to.equal(6);
    });

    it('should return null if items is not a none-empty array', () => {
      expect(MinHeap.heapify('test')).to.equal(null);
    });
  });
});
