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
   * inserts a node into the heap and rebase leaf node to min key
   * @param {number|string} key
   * @param {object} value
   * @public
   * @override
   */
  insert(key, value) {
    const newNode = super.insert(key, value);
    if (this.leafNode === null || key < this.leafNode.getKey()) {
      this.leafNode = newNode;
    }
  }

  /**
   * checks if child's key is bigger that its parent's key
   * @protected
   * @returns {boolean}
   */
  shouldSwap(childIndex, parentIndex) {
    const child = this.nodes[childIndex];
    const parent = this.nodes[parentIndex];
    return child.getKey() > parent.getKey();
  }

  /**
   * gets the max child's index of two node's children
   * @private
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
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
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  getMaxChildIndexBefore(index, leftChildIndex, rightChildIndex) {
    const leftChild = this.nodes[leftChildIndex];
    const rightChild = this.nodes[rightChildIndex];
    if (rightChild.getKey() > leftChild.getKey() && rightChildIndex < index) {
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
    return this.getMaxChildIndex(leftChildIndex, rightChildIndex);
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
    return this.getMaxChildIndexBefore(index, leftChildIndex, rightChildIndex);
  }

  /**
   * returns a shallow copy of a max heap
   * @public
   * @override
   * @returns {MaxHeap}
   */
  clone() {
    return super.clone(MaxHeap);
  }

  /**
   * builds a max heap from an array of items
   * @param {array} items
   * @public
   * @override
   * @static
   * @returns {MaxHeap}
   */
  static heapify(items) {
    return super.heapify(items, MaxHeap);
  }
}

module.exports = MaxHeap;
