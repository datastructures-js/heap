/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
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
   * Returns max child's index of two children before an index
   * @private
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
   * Returns a shallow copy of the heap
   * @public
   * @returns {MaxHeap}
   */
  clone() {
    return super._clone(MaxHeap);
  }

  /**
   * Builds a max heap from an array of items
   * @public
   * @static
   * @param {array} items
   * @returns {MaxHeap}
   */
  static heapify(items) {
    return super._heapify(items, MaxHeap);
  }

  /**
   * Checks if a list of items is a valid max heap
   * @public
   * @static
   * @param {array} array
   * @returns {boolean}
   */
  static isValidHeap(list) {
    return super._isValidHeap(items, MaxHeap);
  }
}

module.exports = MaxHeap;
