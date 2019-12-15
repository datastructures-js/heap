/**
 * datastructures-js/heap
 * @copyright 2019 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const Heap = require('./heap');

/**
 * @class MaxHeap
 * @extends Heap
 */
class MaxHeap extends Heap {
  /**
   * checks if the max child should be swapped with its parent
   * @protected
   * @returns {boolean}
   */
  shouldSwap(maxChildIndex, parentIndex) {
    const maxChild = this.nodes[maxChildIndex];
    const parent = this.nodes[parentIndex];
    return maxChild.getKey() > parent.getKey();
  }

  /**
   * gets the max child's index of two node's children
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @privaye
   * @returns {number}
   */
  getMaxChildIndex(leftChildIndex, rightChildIndex) {
    const leftChild = this.nodes[leftChildIndex];
    const rightChild = this.nodes[rightChildIndex];
    if (leftChild.getKey() > rightChild.getKey()) {
      return leftChildIndex;
    }
    return rightChildIndex;
  }

  /**
   * returns the max child's index of two children before an index
   * @private
   * @param {number} i
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  getMaxChildIndexBefore(i, leftChildIndex, rightChildIndex) {
    const leftChild = this.nodes[leftChildIndex];
    const rightChild = this.nodes[rightChildIndex];
    if (leftChild.getKey() > rightChild.getKey() && leftChildIndex < i) {
      return leftChildIndex;
    }
    return rightChildIndex;
  }

  /**
   * implements the parent's function to select a child's index
   * @protected
   * @override
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  compareChildren(leftChildIndex, rightChildIndex) {
    return this.getMaxChildIndex(leftChildIndex, rightChildIndex);
  }

  /**
   * implements the parent's function to select a child's index before an index
   * @protected
   * @override
   * @param {number} i
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  compareChildrenUntil(i, leftChildIndex, rightChildIndex) {
    return this.getMaxChildIndexBefore(i, leftChildIndex, rightChildIndex);
  }

  /**
   * applies a shallow clone on the max heap
   * @public
   * @returns {MinHeap}
   */
  clone() {
    return super.clone(MaxHeap);
  }

  /**
   * builds a max heap from an array of items
   * @param {array} items
   * @public
   * @static
   * @returns {MaxHeap}
   */
  static heapify(items) {
    return super.heapify(items, MaxHeap);
  }
}

module.exports = MaxHeap;
