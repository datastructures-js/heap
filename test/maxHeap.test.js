const { expect } = require('chai');
const { MaxHeap } = require('../src/maxHeap');

describe('MaxHeap', () => {
  describe('primitive values heap', () => {
    const values = ['m', 'x', 'f', 'b', 'z', 'k', 'c'];
    const heap = new MaxHeap();

    it('insert values', () => {
      values.forEach((value) => heap.insert(value));
    });

    it('sort in ascending order', () => {
      expect(heap.sort()).to.eql(values.slice().sort((a, b) => (
        a > b ? 1 : -1
      )));
    });

    it('fix position after sort', () => {
      expect(heap.isValid()).to.equal(false);
      expect(heap.fix().isValid()).to.equal(true);
    });

    it('gets root value', () => {
      expect(heap.root()).to.eql('z');
    });

    it('gets leaf value', () => {
      expect(heap.leaf()).to.eql('b');
    });

    it('gets heap size', () => {
      expect(heap.size()).to.equal(7);
    });

    it('checks if heap is empty', () => {
      expect(heap.isEmpty()).to.equal(false);
    });

    it('clone the heap', () => {
      expect(heap.clone().sort()).to.eql(values.slice().sort((a, b) => (
        a > b ? 1 : -1
      )));
      expect(heap.isValid()).to.equal(true);
    });

    it('extract root value', () => {
      expect(heap.extractRoot()).to.deep.equal('z');
      expect(heap.extractRoot()).to.deep.equal('x');
      expect(heap.extractRoot()).to.deep.equal('m');
      expect(heap.extractRoot()).to.deep.equal('k');
      expect(heap.extractRoot()).to.deep.equal('f');
      expect(heap.extractRoot()).to.deep.equal('c');
      expect(heap.extractRoot()).to.deep.equal('b');
      expect(heap.isEmpty()).to.equal(true);
    });
  });

  describe('object values heap', () => {
    const values = [
      { id: 'm' },
      { id: 'x' },
      { id: 'f' },
      { id: 'b' },
      { id: 'z' },
      { id: 'k' },
      { id: 'c' }
    ];
    const heap = new MaxHeap((value) => value.id);

    it('push values', () => {
      values.forEach((value) => heap.push(value));
    });

    it('sort in ascending order', () => {
      expect(heap.sort()).to.eql(values.slice().sort((a, b) => (
        a.id > b.id ? 1 : -1
      )));
    });

    it('fix position after sort', () => {
      expect(heap.isValid()).to.equal(false);
      expect(heap.fix().isValid()).to.equal(true);
    });

    it('gets root value', () => {
      expect(heap.top()).to.eql({ id: 'z' });
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
      expect(heap.clone().sort()).to.eql(values.slice().sort((a, b) => (
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

  describe('isValid', () => {
    it('consider heap with duplicates as valid', () => {
      const maxHeap = new MaxHeap((x) => x.value);

      maxHeap.insert({ value: 2268 });
      maxHeap.insert({ value: 2268 });
      expect(maxHeap.isValid()).to.equal(true);

      const maxHeap2 = new MaxHeap();
      maxHeap2.insert(22);
      maxHeap2.insert(22);
      expect(maxHeap2.isValid()).to.equal(true);
    });
  });

  describe('iterator', () => {
    it('allows iterating on heap elements', () => {
      const testArr = [90, 80, 50, 40, 30, 20];
      const h1 = MaxHeap.heapify(testArr.slice());
      expect([...h1]).to.eql(testArr);
      const h2 = MaxHeap.heapify(testArr.slice());
      const res = [];
      for (const n of h2) {
        res.push(n);
      }
      expect(res).to.eql(testArr);
    });
  });
  describe('toArray', () => {
    it('Converts the heap to a cloned array.', () => {
      const testArr = [90, 80, 50, 40, 30, 20].sort((a, b) => -a + b);
      const h1 = MaxHeap.heapify(testArr.slice());
      expect(h1.toArray().sort((a, b) => -a + b)).to.eql(testArr);
    });
  });
});
