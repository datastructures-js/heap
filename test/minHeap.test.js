const { expect } = require('chai');
const { MinHeap } = require('../src/minHeap');

describe('MinHeap', () => {
  describe('primitive values heap', () => {
    const values = [50, 80, 30, 90, 60, 40, 20];
    const heap = new MinHeap();

    it('insert values', () => {
      values.forEach((value) => heap.insert(value));
    });

    it('sort in descending order', () => {
      expect(heap.sort()).to.eql(values.slice().sort((a, b) => b - a));
    });

    it('fix position after sort', () => {
      expect(heap.isValid()).to.equal(false);
      expect(heap.fix().isValid()).to.equal(true);
    });

    it('gets root value', () => {
      expect(heap.root()).to.eql(20);
    });

    it('gets leaf value', () => {
      expect(heap.leaf()).to.eql(90);
    });

    it('gets heap size', () => {
      expect(heap.size()).to.equal(7);
    });

    it('checks if heap is empty', () => {
      expect(heap.isEmpty()).to.equal(false);
    });

    it('clone the heap', () => {
      expect(heap.clone().sort()).to.eql(values.slice().sort((a, b) => b - a));
      expect(heap.isValid()).to.equal(true);
    });

    it('extract root value', () => {
      expect(heap.extractRoot()).to.deep.equal(20);
      expect(heap.extractRoot()).to.deep.equal(30);
      expect(heap.extractRoot()).to.deep.equal(40);
      expect(heap.extractRoot()).to.deep.equal(50);
      expect(heap.extractRoot()).to.deep.equal(60);
      expect(heap.extractRoot()).to.deep.equal(80);
      expect(heap.extractRoot()).to.deep.equal(90);
      expect(heap.isEmpty()).to.equal(true);
    });
  });

  describe('object values heap', () => {
    const values = [
      { id: 50 },
      { id: 80 },
      { id: 30 },
      { id: 90 },
      { id: 60 },
      { id: 40 },
      { id: 20 }
    ];
    const heap = new MinHeap((value) => value.id);

    it('push values', () => {
      values.forEach((value) => heap.push(value));
    });

    it('sort in descending order', () => {
      expect(heap.sort()).to.eql(values.slice().sort((a, b) => b.id - a.id));
    });

    it('fix position after sort', () => {
      expect(heap.isValid()).to.equal(false);
      expect(heap.fix().isValid()).to.equal(true);
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
        .to.eql(values.slice().sort((a, b) => b.id - a.id));
      expect(heap.isValid()).to.equal(true);
    });

    it('pop root value', () => {
      expect(heap.pop()).to.deep.equal({ id: 20 });
      expect(heap.pop()).to.deep.equal({ id: 30 });
      expect(heap.pop()).to.deep.equal({ id: 40 });
      expect(heap.pop()).to.deep.equal({ id: 50 });
      expect(heap.pop()).to.deep.equal({ id: 60 });
      expect(heap.pop()).to.deep.equal({ id: 80 });
      expect(heap.pop()).to.deep.equal({ id: 90 });
      expect(heap.isEmpty()).to.equal(true);
    });
  });

  describe('isValid', () => {
    it('consider heap with duplicates as valid', () => {
      const minHeap = new MinHeap((x) => x.value);

      minHeap.insert({ value: 2268 });
      minHeap.insert({ value: 2268 });
      expect(minHeap.isValid()).to.equal(true);

      const minHeap2 = new MinHeap();
      minHeap2.insert(22);
      minHeap2.insert(22);
      expect(minHeap2.isValid()).to.equal(true);
    });
  });

  describe('iterator', () => {
    it('allows iterating on heap elements', () => {
      const testArr = [20, 30, 40, 50, 80, 90];
      const h1 = MinHeap.heapify(testArr.slice());
      expect([...h1]).to.eql(testArr);
      const h2 = MinHeap.heapify(testArr.slice());
      const res = [];
      for (const n of h2) {
        res.push(n);
      }
      expect(res).to.eql(testArr);
    });
  });

  describe('toArray', () => {
    it('Converts the heap to a cloned array', () => {
      const testArr = [20, 30, 40, 50, 80, 90].sort((a, b) => a - b);
      const h1 = MinHeap.heapify(testArr.slice());
      expect(h1.toArray().sort((a, b) => a - b)).to.eql(testArr);
    });
  });
});
