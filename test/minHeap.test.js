const { expect } = require('chai');
const MinHeap = require('../src/minHeap');

describe('MinHeap unit tests', () => {
  const minHeap = new MinHeap();

  describe('.insert(key, value)', () => {
    it('should insert nodes into the heap', () => {
      expect(minHeap.insert(50)).to.be.instanceof(MinHeap);
      expect(minHeap.insert(80)).to.be.instanceof(MinHeap);
      expect(minHeap.insert(30, 'something')).to.be.instanceof(MinHeap);
      expect(minHeap.insert(90)).to.be.instanceof(MinHeap);
      expect(minHeap.insert(60, null)).to.be.instanceof(MinHeap);
      expect(minHeap.insert(40)).to.be.instanceof(MinHeap);
      expect(minHeap.insert(20, { name: 'test' })).to.be.instanceof(MinHeap);
    });
  });

  describe('size()', () => {
    it('should return the size of the heap', () => {
      expect(minHeap.size()).to.equal(7);
    });
  });

  describe('.sort()', () => {
    it('should sort a copy of the heap\'s nodes in descending order', () => {
      const sorted = minHeap.clone().sort();
      expect(sorted).to.deep.equal([
        90,
        80,
        { key: 60, value: null },
        50,
        40,
        { key: 30, value: 'something' },
        { key: 20, value: { name: 'test' } }
      ]);
    });
  });

  describe('.root()', () => {
    it('should get the root (min key node) of the heap', () => {
      expect(minHeap.root().key).to.equal(20);
    });
  });

  describe('.leaf()', () => {
    it('should get the leaf (max key node) in the heap', () => {
      expect(minHeap.leaf()).to.equal(90);
    });
  });

  describe('.extractRoot()', () => {
    it('should extract the root (min key) from the heap', () => {
      expect(minHeap.extractRoot().key).to.equal(20);
      expect(minHeap.size()).to.equal(6);

      expect(minHeap.extractRoot().key).to.equal(30);
      expect(minHeap.size()).to.equal(5);

      expect(minHeap.extractRoot()).to.equal(40);
      expect(minHeap.size()).to.equal(4);

      expect(minHeap.extractRoot()).to.equal(50);
      expect(minHeap.size()).to.equal(3);

      expect(minHeap.extractRoot().key).to.equal(60);
      expect(minHeap.leaf()).to.equal(90);
      expect(minHeap.size()).to.equal(2);

      expect(minHeap.extractRoot()).to.equal(80);
      expect(minHeap.size()).to.equal(1);

      expect(minHeap.extractRoot()).to.equal(90);
      expect(minHeap.leaf()).to.equal(null);
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
      expect(items).to.deep.equal([
        { key: 20, value: { name: 'test' } },
        { key: 60, value: null },
        { key: 30, value: 'something' },
        90,
        80,
        50,
        40
      ]);
      expect(heap.extractRoot().key).to.equal(20);
      expect(heap.size()).to.equal(6);

      expect(heap.root().key).to.equal(30);
      expect(heap.root().value).to.equal('something');
      expect(heap.size()).to.equal(6);
    });

    it('should return null if items is not a none-empty array', () => {
      expect(() => MinHeap.heapify('test')).to.throw(Error)
        .and.to.have.property('message', '.heapify expect an array');
    });
  });
});
