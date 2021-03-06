const { expect } = require('chai');
const { MaxHeap } = require('../src/maxHeap');

describe('MaxHeap unit tests', () => {
  const maxHeap = new MaxHeap();

  describe('.insert(key, value)', () => {
    it('should insert nodes into the heap', () => {
      expect(maxHeap.insert(50)).to.be.instanceof(MaxHeap);
      expect(maxHeap.insert(80)).to.be.instanceof(MaxHeap);
      expect(maxHeap.insert(30, 'something')).to.be.instanceof(MaxHeap);
      expect(maxHeap.insert(90)).to.be.instanceof(MaxHeap);
      expect(maxHeap.insert(60, null)).to.be.instanceof(MaxHeap);
      expect(maxHeap.insert(40)).to.be.instanceof(MaxHeap);
      expect(maxHeap.insert(20, { name: 'test' })).to.be.instanceof(MaxHeap);
    });
  });

  describe('size()', () => {
    it('should return the size of the heap', () => {
      expect(maxHeap.size()).to.equal(7);
    });
  });

  describe('.isValid()', () => {
    it('should validate the heap', () => {
      expect(maxHeap.isValid()).to.equal(true);
    });
  });

  describe('.sort()', () => {
    it('should sort a copy of the heap\'s nodes in ascending order', () => {
      const sorted = maxHeap.clone().sort();
      expect(sorted).to.deep.equal([
        { key: 20, value: { name: 'test' } },
        { key: 30, value: 'something' },
        40,
        50,
        { key: 60, value: null },
        80,
        90
      ]);
    });
  });

  describe('.root()', () => {
    it('should get the root (max key node) of the heap', () => {
      expect(maxHeap.root()).to.equal(90);
    });
  });

  describe('.leaf()', () => {
    it('should get the leaf (min key node) in the heap', () => {
      expect(maxHeap.leaf().key).to.equal(20);
    });
  });

  describe('.extractRoot()', () => {
    it('should extract the root (max key) from the heap', () => {
      expect(maxHeap.extractRoot()).to.equal(90);
      expect(maxHeap.size()).to.equal(6);

      expect(maxHeap.extractRoot()).to.equal(80);
      expect(maxHeap.size()).to.equal(5);

      expect(maxHeap.extractRoot().key).to.equal(60);
      expect(maxHeap.size()).to.equal(4);

      expect(maxHeap.extractRoot()).to.equal(50);
      expect(maxHeap.size()).to.equal(3);

      expect(maxHeap.extractRoot()).to.equal(40);
      expect(maxHeap.leaf().key).to.equal(20);
      expect(maxHeap.size()).to.equal(2);

      expect(maxHeap.extractRoot().key).to.equal(30);
      expect(maxHeap.leaf().key).to.equal(20);
      expect(maxHeap.size()).to.equal(1);

      expect(maxHeap.extractRoot().key).to.equal(20);
      expect(maxHeap.leaf()).to.equal(null);
      expect(maxHeap.size()).to.equal(0);

      expect(maxHeap.extractRoot()).to.equal(null);
      expect(maxHeap.root()).to.equal(null);
      expect(maxHeap.size()).to.equal(0);
    });
  });

  describe('.clear()', () => {
    it('should clear the list in the heap', () => {
      maxHeap.insert(50);
      maxHeap.clear();
      expect(maxHeap.root()).to.equal(null);
      expect(maxHeap.size()).to.equal(0);
    });
  });

  describe('.fix()', () => {
    it('fixes nodes position of heap list', () => {
      const testHeap = new MaxHeap([1, 2, 3, 4, 5, 6, 7]);
      expect(testHeap.isValid()).to.equal(false);
      expect(testHeap.fix().isValid()).to.equal(true);
    });
  });

  describe('.heapify(list)', () => {
    it('should build a heap from a list of list', () => {
      const list = [
        'b',
        'x',
        { key: 'r', value: 'something' },
        't',
        { key: 'a', value: null },
        'c',
        { key: 'm', value: { name: 'test' } }
      ];
      const heap = MaxHeap.heapify(list);

      expect(heap.extractRoot()).to.equal('x');
      expect(heap.size()).to.equal(6);

      expect(heap.root()).to.equal('t');
      expect(heap.root().value).to.equal(undefined);
      expect(heap.size()).to.equal(6);
    });

    it('should throw an error if list is not an array', () => {
      expect(() => MaxHeap.heapify('test')).to.throw(Error)
        .and.to.have.property('message', '.heapify expects an array');
    });
  });

  describe('.isHeapified(list)', () => {
    it('returns true for a valid heap list', () => {
      expect(MaxHeap.isHeapified([
        90,
        80,
        40,
        50,
        { key: 60, value: null },
        { key: 30, value: 'something' },
        { key: 20, value: { name: 'test' } }
      ])).to.equal(true);
    });

    it('returns false for invalid heap list', () => {
      expect(MaxHeap.isHeapified([
        { key: 20, value: { name: 'test' } },
        { key: 30, value: 'something' },
        40,
        { key: 60, value: null },
        80,
        50,
        90
      ])).to.equal(false);
    });
  });
});
