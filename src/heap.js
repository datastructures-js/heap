/**
 * @datastructures-js/heap
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

const HeapNode = require('./heapNode');

const isNumber = (n) => typeof n === 'number';
const isNoneEmptyString = (s) => typeof s === 'string' && s.length;
const isNoneNullObject = (o) => typeof o === 'object' && o !== null;
const isNoneEmptyArray = (a) => Array.isArray(a) && a.length > 0;

/**
 * @class Heap
 * @abstract
 */
class Heap {
  constructor(nodes) {
    this._nodes = Array.isArray(nodes) ? nodes : [];
    this._leaf = null;
  }

  /**
   * @private
   * calculates the left child's index of a parent's index
   * @param {number} parentIndex
   * @returns {number}
   */
  _getLeftChildIndex(parentIndex) {
    return (parentIndex * 2) + 1;
  }

  /**
   * @private
   * calculates the right child's index of a parent's index
   * @param {number} parentIndex
   * @returns {number}
   */
  _getRightChildIndex(parentIndex) {
    return (parentIndex * 2) + 2;
  }

  /**
   * @private
   * calculates a parent's index from a child's index
   * @param {number} parentIndex
   * @returns {number}
   */
  _getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * @private
   * gets the last node's index
   * @returns {number}
   */
  _getLastIndex() {
    return this._nodes.length - 1;
  }

  /**
   * swaps two nodes in the heap by their indices
   * @param {number} i
   * @param {number} j
   */
  _swap(i, j) {
    const temp = this._nodes[i];
    this._nodes[i] = this._nodes[j];
    this._nodes[j] = temp;
  }

  /**
   * @private
   * selects the proper child's index to fix the heap
   * @param {number} parentIndex
   * @returns {number}
   */
  _compareChildrenOf(parentIndex) {
    const leftChildIndex = this._getLeftChildIndex(parentIndex);
    const rightChildIndex = this._getRightChildIndex(parentIndex);
    const size = this.size();

    if (leftChildIndex >= size && rightChildIndex >= size) return -1;
    if (leftChildIndex >= size) return rightChildIndex;
    if (rightChildIndex >= size) return leftChildIndex;

    return this._compareChildren(leftChildIndex, rightChildIndex);
  }

  /**
   * @private
   * bubbles the last inserted node up in the heap
   */
  _heapifyUp() {
    let childIndex = this._getLastIndex();
    let parentIndex = this._getParentIndex(childIndex);

    while (this._shouldSwap(childIndex, parentIndex)) {
      this._swap(childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = this._getParentIndex(childIndex);
    }
  }

  /**
   * @private
   * pushes the replaced root node down in the heap after root's removal
   */
  _heapifyDown() {
    let parentIndex = 0;
    let childIndex = this._compareChildrenOf(parentIndex);
    while (this._shouldSwap(childIndex, parentIndex)) {
      this._swap(childIndex, parentIndex);
      parentIndex = childIndex;
      childIndex = this._compareChildrenOf(parentIndex);
    }
  }

  /**
   * @private
   * pushes the swapped node with root down in its correct location
   * @param {number} i -  swapped node's index
   */
  _heapifyDownUntil(index) {
    let parentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let childIndex;

    while (leftChildIndex < index) {
      childIndex = this._compareChildrenBefore(
        index,
        leftChildIndex,
        rightChildIndex
      );

      if (this._shouldSwap(childIndex, parentIndex)) {
        this._swap(childIndex, parentIndex);
      }

      parentIndex = childIndex;
      leftChildIndex = this._getLeftChildIndex(parentIndex);
      rightChildIndex = this._getRightChildIndex(parentIndex);
    }
  }

  /**
   * @protected
   * returns a shallow copy of a heap
   * @param {class} HeapType
   * @returns {Heap}
   */
  _clone(HeapType) {
    return new HeapType(this._nodes.slice());
  }

  /**
   * @public
   * implements heap sort algorithm by swapping root with i nodes
   * @returns {array} the sorted nodes
   */
  sort() {
    for (let i = this._getLastIndex(); i > 0; i -= 1) {
      this._swap(0, i);
      this._heapifyDownUntil(i);
    }

    return this._nodes;
  }

  /**
   * @public
   * inserts a node into the heap
   * @param {number|string} key
   * @param {object} value
   * @returns {HeapNode}
   */
  insert(key, value) {
    const newNode = new HeapNode(key, value);
    this._nodes.push(newNode);
    this._heapifyUp();
    return newNode;
  }

  /**
   * @public
   * returns the root node in the heap
   * @returns {HeapNode}
   */
  root() {
    if (this.isEmpty()) return null;
    return this._nodes[0];
  }

  /**
   * @public
   * returns a leaf node in the heap
   * @returns {HeapNode}
   */
  leaf() {
    return this._leaf;
  }

  /**
   * @public
   * removes and returns the root node in the heap
   * @returns {HeapNode}
   */
  extractRoot() {
    if (this.isEmpty()) return null;

    const root = this.root();
    this._nodes[0] = this._nodes[this._getLastIndex()];
    this._nodes.pop();
    this._heapifyDown();

    if (root === this._leaf) {
      if (this.isEmpty()) {
        this._leaf = null;
      } else {
        this._leaf = this.root();
      }
    }

    return root;
  }

  /**
   * @public
   * returns the number of nodes in the heap
   * @returns {number}
   */
  size() {
    return this._nodes.length;
  }

  /**
   * @public
   * checks if the heap is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * @public
   * clears the heap
   */
  clear() {
    this._nodes = [];
    this._leaf = null;
  }

  /**
   * @protected
   * @static
   * convert a list of items into a heap
   * @param {array} items
   * @param {class} HeapType
   * @returns {Heap}
   */
  static _heapify(items, HeapType) {
    if (!isNoneEmptyArray(items)) return null;

    const heap = new HeapType();
    items.forEach((item) => {
      if (isNumber(item) || isNoneEmptyString(item)) {
        heap.insert(item);
      } else if (isNoneNullObject(item)
        && (isNumber(item.key) || isNoneEmptyString(item.key))) {
        heap.insert(item.key, item.value);
      }
    });

    return heap;
  }
}

module.exports = Heap;
