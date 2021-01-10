/**
 * @license MIT
 * @copyright 2019 Eyas Ranjous <eyas.ranjous@gmail.com>
 */

const Heap = require('./heap');

/**
 * @class MinHeap
 * @extends Heap
 */
class MinHeap extends Heap {
  /**
   * Checks two nodes are in relatively valid position
   * @private
   * @param {object} parent
   * @param {object} child
   * @returns {boolean}
   */
  _compareKeys(parentKey, childKey) {
    return parentKey < childKey;
  }

  /**
   * implements the parent's function to select a child's index before an index
   * @protected
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
    const leftChildKey = this._getKey(this._nodes[leftChildIndex]);
    const rightChildKey = this._getKey(this._nodes[rightChildIndex]);

    if (rightChildKey < leftChildKey && rightChildIndex < index) {
      return rightChildIndex;
    }
    return leftChildIndex;
  }

  /**
   * @public
   * returns a shallow copy of a min heap
   * @returns {MinHeap}
   */
  clone() {
    return super._clone(MinHeap);
  }

  /**
   * @public
   * builds a min heap from an array of items
   * @param {array} items
   * @returns {MinHeap}
   */
  static heapify(items) {
    return super._heapify(items, MinHeap);
  }
}

module.exports = MinHeap;
