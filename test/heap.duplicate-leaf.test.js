const assert = require('assert');
const { Heap } = require('../src/heap');

describe('Heap duplicate leaf regression', () => {
  it('keeps a zero leaf when one of two zero values is extracted', () => {
    const heap = new Heap((a, b) => a - b, [0, 0]);
    const extracted = heap.extractRoot();
    const leaf = heap.leaf();

    assert.strictEqual(extracted, 0);
    assert.strictEqual(leaf, 0);
  });

  it('clears the leaf when the last zero value is extracted', () => {
    const heap = new Heap((a, b) => a - b, [0]);
    const extracted = heap.extractRoot();
    const leaf = heap.leaf();

    assert.strictEqual(extracted, 0);
    assert.strictEqual(leaf, null);
    assert.strictEqual(heap.root(), null);
    assert.strictEqual(heap.size(), 0);
    assert.strictEqual(heap.isEmpty(), true);
    assert.deepStrictEqual(heap.toArray(), []);
  });
});
