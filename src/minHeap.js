/**
 * datastructures-js/heap
 * @copyright 2019 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const Heap = require('./heap');

/**
 * @class MinHeap
 * @extends Heap
 */
class MinHeap extends Heap {
  /**
   * checks if the min child should be swapped with its parent
   * @protected
   * @returns {boolean}
   */
  shouldSwap(minChildIndex, parentIndex) {
    const minChild = this.nodes[minChildIndex];
    const parent = this.nodes[parentIndex];
    return minChild.getKey() < parent.getKey();
  }

  /**
   * gets the min child's index of two node's children
   * @private
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  getMinChildIndex(leftChildIndex, rightChildIndex) {
    const leftChild = this.nodes[leftChildIndex];
    const rightChild = this.nodes[rightChildIndex];
    if (leftChild.getKey() < rightChild.getKey()) {
      return leftChildIndex;
    }
    return rightChildIndex;
  }

  /**
   * returns the min child's index of two children before an index
   * @private
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  getMinChildIndexBefore(index, leftChildIndex, rightChildIndex) {
    const leftChild = this.nodes[leftChildIndex];
    const rightChild = this.nodes[rightChildIndex];
    if (rightChild.getKey() < leftChild.getKey() && rightChildIndex < index) {
      return rightChildIndex;
    }
    return leftChildIndex;
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
    return this.getMinChildIndex(leftChildIndex, rightChildIndex);
  }

  /**
   * implements the parent's function to select a child's index before an index
   * @protected
   * @override
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
    return this.getMinChildIndexBefore(index, leftChildIndex, rightChildIndex);
  }

  /**
   * applies a shallow clone on the min heap
   * @public
   * @override
   * @returns {MinHeap}
   */
  clone() {
    return super.clone(MinHeap);
  }

  /**
   * builds a min heap from an array of items
   * @param {array} items
   * @public
   * @override
   * @static
   * @returns {MinHeap}
   */
  static heapify(items) {
    return super.heapify(items, MinHeap);
  }
}

module.exports = MinHeap;
