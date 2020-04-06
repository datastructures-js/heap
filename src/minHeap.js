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
   * @private
   * gets the min child's index of two node's children
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  _getMinChildIndex(leftChildIndex, rightChildIndex) {
    const leftChild = this._nodes[leftChildIndex];
    const rightChild = this._nodes[rightChildIndex];
    if (leftChild.getKey() < rightChild.getKey()) {
      return leftChildIndex;
    }
    return rightChildIndex;
  }

  /**
   * @private
   * returns the min child's index of two children before an index
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  _getMinChildIndexBefore(index, leftChildIndex, rightChildIndex) {
    const leftChild = this._nodes[leftChildIndex];
    const rightChild = this._nodes[rightChildIndex];
    if (rightChild.getKey() < leftChild.getKey() && rightChildIndex < index) {
      return rightChildIndex;
    }
    return leftChildIndex;
  }

  /**
   * @protected
   * checks if child's key is smaller than its parent's key
   * @returns {boolean}
   */
  _shouldSwap(childIndex, parentIndex) {
    if (childIndex < 0 || childIndex >= this.size()) return false;
    if (parentIndex < 0 || parentIndex >= this.size()) return false;

    const child = this._nodes[childIndex];
    const parent = this._nodes[parentIndex];

    return child.getKey() < parent.getKey();
  }

  /**
   * @protected
   * @override
   * implements the parent's function to select a child's index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  _compareChildren(leftChildIndex, rightChildIndex) {
    return this._getMinChildIndex(leftChildIndex, rightChildIndex);
  }

  /**
   * @protected
   * @override
   * implements the parent's function to select a child's index before an index
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
    return this._getMinChildIndexBefore(index, leftChildIndex, rightChildIndex);
  }

  /**
   * @public
   * @override
   * inserts a node into the heap and rebase leaf node to max key
   * @param {number|string} key
   * @param {object} value
   */
  insert(key, value) {
    const newNode = super.insert(key, value);
    if (this._leaf === null || key > this._leaf.getKey()) {
      this._leaf = newNode;
    }
    return newNode;
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
