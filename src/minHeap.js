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
   * Returns min child's index of two children before an index
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
   * Returns a shallow copy of the heap
   * @public
   * @returns {MinHeap}
   */
  clone() {
    return super._clone(MinHeap);
  }

  /**
   * Builds a min heap from an array of items
   * @public
   * @static
   * @param {array} items
   * @returns {MinHeap}
   */
  static heapify(items) {
    return super._heapify(items, MinHeap);
  }

  /**
   * Checks if a list of items is a valid min heap
   * @public
   * @static
   * @param {array} array
   * @returns {boolean}
   */
  static isValidHeap(list) {
    return new MinHeap(list).isValid();
  }
}

module.exports = MinHeap;
