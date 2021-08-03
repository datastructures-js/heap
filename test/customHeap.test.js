const { expect } = require('chai');
const { CustomHeap } = require('../src/customHeap');

describe('CustomHeap unit tests', () => {
  describe('constructor', () => {
    it('creates a min heap with a comparator', () => {
      const heap = new CustomHeap((a, b) => a.id - b.id);
      heap.insert({ id: 10 });
      heap.insert({ id: 90 });
      heap.insert({ id: 40 });
      heap.insert({ id: 70 });
      heap.insert({ id: 20 });
      expect(heap.extractRoot()).to.deep.equal({ id: 10 });
      expect(heap.extractRoot()).to.deep.equal({ id: 20 });
      expect(heap.extractRoot()).to.deep.equal({ id: 40 });
      expect(heap.extractRoot()).to.deep.equal({ id: 70 });
      expect(heap.extractRoot()).to.deep.equal({ id: 90 });
    });

    it('creates a max heap with a comparator', () => {
      const heap = new CustomHeap((a, b) => b.id - a.id);
      heap.insert({ id: 10 });
      heap.insert({ id: 90 });
      heap.insert({ id: 40 });
      heap.insert({ id: 70 });
      heap.insert({ id: 20 });
      expect(heap.extractRoot()).to.deep.equal({ id: 90 });
      expect(heap.extractRoot()).to.deep.equal({ id: 70 });
      expect(heap.extractRoot()).to.deep.equal({ id: 40 });
      expect(heap.extractRoot()).to.deep.equal({ id: 20 });
      expect(heap.extractRoot()).to.deep.equal({ id: 10 });
    });
  });
  describe('MaxHeap', () => {
    it('heapify with comparator', () => {
      const maxHeap = CustomHeap.heapify(
        [{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }, { n: 6 }, { n: 7 }],
        (a, b) => a.n > b.n
      );
      expect(maxHeap.isValid()).to.equal(true);
    });

    it('isHeapified with comparator', () => {
      const isHeapified = CustomHeap.isHeapified(
        [{ n: 7 }, { n: 4 }, { n: 6 }, { n: 1 }, { n: 3 }, { n: 2 }, { n: 5 }],
        (a, b) => a.n > b.n
      );
      expect(isHeapified).to.equal(true);
    });
  });

  describe('MinHeap', () => {
    it('heapify with comparator', () => {
      const minHeap = CustomHeap.heapify(
        [{ n: 7 }, { n: 6 }, { n: 5 }, { n: 4 }, { n: 3 }, { n: 2 }, { n: 1 }],
        (a, b) => a.n < b.n
      );
      expect(minHeap.isValid()).to.equal(true);
    });

    it('isHeapified with comparator', () => {
      const isHeapified = CustomHeap.isHeapified(
        [{ n: 1 }, { n: 4 }, { n: 2 }, { n: 7 }, { n: 5 }, { n: 6 }, { n: 3 }],
        (a, b) => a.n < b.n
      );
      expect(isHeapified).to.equal(true);
    });
  });
});
