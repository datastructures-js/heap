const { expect } = require('chai');
const { Heap } = require('../src/heap');

describe('Heap', () => {
  const numComparator = (a, b) => a.id - b.id;
  const numValues = [
    { id: 50 },
    { id: 80 },
    { id: 30 },
    { id: 90 },
    { id: 60 },
    { id: 40 },
    { id: 20 }
  ];

  const charComparator = (a, b) => (
    a.id < b.id ? 1 : -1
  );
  const charValues = [
    { id: 'm' },
    { id: 'x' },
    { id: 'f' },
    { id: 'b' },
    { id: 'z' },
    { id: 'k' },
    { id: 'c' }
  ];

  describe('min heap', () => {
    const heap = new Heap(numComparator);

    it('insert values', () => {
      numValues.forEach((value) => heap.insert(value));
    });

    it('sort in descending order', () => {
      expect(heap.sort()).to.eql(numValues.slice().sort((a, b) => b.id - a.id));
    });

    it('fix position after sort', () => {
      expect(heap.isValid()).to.equal(false);
      expect(heap.fix().isValid()).to.equal(true);
      expect(heap.leaf()).to.eql({ id: 90 });
    });

    it('gets root value', () => {
      expect(heap.top()).to.eql({ id: 20 });
    });

    it('gets leaf value', () => {
      expect(heap.leaf()).to.eql({ id: 90 });
    });

    it('gets heap size', () => {
      expect(heap.size()).to.equal(7);
    });

    it('checks if heap is empty', () => {
      expect(heap.isEmpty()).to.equal(false);
    });

    it('clone the heap', () => {
      expect(heap.clone().sort())
        .to.eql(numValues.slice().sort((a, b) => b.id - a.id));
      expect(heap.isValid()).to.equal(true);
    });

    it('extract root value', () => {
      expect(heap.extractRoot()).to.deep.equal({ id: 20 });
      expect(heap.extractRoot()).to.deep.equal({ id: 30 });
      expect(heap.extractRoot()).to.deep.equal({ id: 40 });
      expect(heap.extractRoot()).to.deep.equal({ id: 50 });
      expect(heap.extractRoot()).to.deep.equal({ id: 60 });
      expect(heap.extractRoot()).to.deep.equal({ id: 80 });
      expect(heap.extractRoot()).to.deep.equal({ id: 90 });
      expect(heap.isEmpty()).to.equal(true);
    });
  });

  describe('max heap', () => {
    const heap = new Heap(charComparator);

    it('push values', () => {
      charValues.forEach((value) => heap.push(value));
    });

    it('sort in ascending order', () => {
      expect(heap.sort())
        .to.eql(charValues.slice().sort((a, b) => (
          a.id > b.id ? 1 : -1
        )));
    });

    it('fix position after sort', () => {
      expect(heap.isValid()).to.equal(false);
      expect(heap.fix().isValid()).to.equal(true);
      expect(heap.leaf()).to.eql({ id: 'b' });
    });

    it('gets root value', () => {
      expect(heap.root()).to.eql({ id: 'z' });
    });

    it('gets leaf value', () => {
      expect(heap.leaf()).to.eql({ id: 'b' });
    });

    it('gets heap size', () => {
      expect(heap.size()).to.equal(7);
    });

    it('checks if heap is empty', () => {
      expect(heap.isEmpty()).to.equal(false);
    });

    it('clone the heap', () => {
      expect(heap.clone().sort())
        .to.eql(charValues.slice().sort((a, b) => (
          a.id > b.id ? 1 : -1
        )));
      expect(heap.isValid()).to.equal(true);
    });

    it('pop root value', () => {
      expect(heap.pop()).to.deep.equal({ id: 'z' });
      expect(heap.pop()).to.deep.equal({ id: 'x' });
      expect(heap.pop()).to.deep.equal({ id: 'm' });
      expect(heap.pop()).to.deep.equal({ id: 'k' });
      expect(heap.pop()).to.deep.equal({ id: 'f' });
      expect(heap.pop()).to.deep.equal({ id: 'c' });
      expect(heap.pop()).to.deep.equal({ id: 'b' });
      expect(heap.isEmpty()).to.equal(true);
    });
  });

  describe('heapify', () => {
    it('buids min heap from array', () => {
      const heap = Heap.heapify(numValues, numComparator);
      expect(heap.isValid()).to.equal(true);
      expect(heap.leaf()).to.eql({ id: 90 });
    });

    it('builds max heap from array', () => {
      const heap = Heap.heapify(charValues, charComparator);
      expect(heap.isValid()).to.equal(true);
      expect(heap.leaf()).to.eql({ id: 'b' });
    });
  });

  describe('isHeapified', () => {
    it('checks if a list is min-heapified', () => {
      const heapifiedValues = [
        { id: 20 },
        { id: 60 },
        { id: 30 },
        { id: 90 },
        { id: 80 },
        { id: 50 },
        { id: 40 }
      ];
      expect(Heap.isHeapified(heapifiedValues, numComparator)).to.equal(true);
    });

    it('checks if a list is max-heapified', () => {
      const heapifiedValues = [
        { id: 'z' },
        { id: 'x' },
        { id: 'k' },
        { id: 'b' },
        { id: 'm' },
        { id: 'f' },
        { id: 'c' }
      ];
      expect(Heap.isHeapified(heapifiedValues, charComparator)).to.equal(true);
    });
  });

  describe('iterator', () => {
    it('allows iterating on heap elements', () => {
      const testArr = [20, 30, 40, 50, 80, 90];
      const h1 = Heap.heapify(testArr.slice(), (a, b) => a - b);
      expect([...h1]).to.eql(testArr);
      const h2 = Heap.heapify(testArr.slice(), (a, b) => a - b);
      const res = [];
      for (const n of h2) {
        res.push(n);
      }
      expect(res).to.eql(testArr);
    });
  });
  describe('toArray', () => {
    it('Converts the heap to a cloned array.', () => {
      const testArr = [20, 30, 40, 50, 80, 90].sort((a, b) => a - b);
      const h1 = Heap.heapify(testArr.slice(), (a, b) => a - b);
      expect(h1.toArray().sort((a, b) => a - b)).to.eql(testArr);
    });
  });
});
