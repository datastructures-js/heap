/**
 * @datastructures-js/heap
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const Heap = require('./heap');

/**
 * @class MaxHeap
 * @extends Heap
 */
class MaxHeap extends Heap {
  /**
   * Checks two nodes are in relatively valid position
   * @private
   * @param {object} parent
   * @param {object} child
   * @returns {boolean}
   */
  _compareKeys(parentKey, childKey) {
    return parentKey > childKey;
  }

  /**
   * @private
   * returns the max child's index of two children before an index
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
    const leftChildKey = this._getKey(this._nodes[leftChildIndex]);
    const rightChildKey = this._getKey(this._nodes[rightChildIndex]);

    if (rightChildKey > leftChildKey && rightChildIndex < index) {
      return rightChildIndex;
    }
    return leftChildIndex;
  }

  /**
   * @public
   * returns a shallow copy of a max heap
   * @returns {MaxHeap}
   */
  clone() {
    return super._clone(MaxHeap);
  }

  /**
   * @public
   * @static
   * builds a max heap from an array of items
   * @param {array} items
   * @returns {MaxHeap}
   */
  static heapify(items) {
    return super._heapify(items, MaxHeap);
  }
}

module.exports = MaxHeap;
