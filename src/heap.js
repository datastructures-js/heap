/**
 * datastructures-js/heap
 * @copyright 2019 Eyas Ranjous <eyas.ranjous@gmail.com>
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
  constructor() {
    this.init();
  }

  /**
   * initializes the heap nodes list
   * @internal
   */
  init(nodes) {
    this.nodes = nodes || [];
  }

  /**
   * calculates the left child's index of a parent's index
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  getLeftChildIndex(parentIndex) {
    return (parentIndex * 2) + 1;
  }

  /**
   * calculates the right child's index of a parent's index
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  getRightChildIndex(parentIndex) {
    return (parentIndex * 2) + 2;
  }

  /**
   * calculates a parent's index from a child's index
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * gets the last node's index
   * @private
   * @returns {number}
   */
  getLastIndex() {
    return this.nodes.length - 1;
  }

  /**
   * swaps two nodes in the heap by their indices
   * @param {number} i
   * @param {number} j
   */
  swap(i, j) {
    const temp = this.nodes[i];
    this.nodes[i] = this.nodes[j];
    this.nodes[j] = temp;
  }

  /**
   * returns the correct child's index to fix the heap
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  compareChildrenOf(parentIndex) {
    const leftChildIndex = this.getLeftChildIndex(parentIndex);
    const rightChildIndex = this.getRightChildIndex(parentIndex);
    const size = this.size();

    if (leftChildIndex >= size && rightChildIndex >= size) return 0;
    if (leftChildIndex >= size) return rightChildIndex;
    if (rightChildIndex >= size) return leftChildIndex;

    return this.compareChildren(leftChildIndex, rightChildIndex);
  }

  /**
   * bubbles the last inserted node up in the heap
   * @private
   */
  heapifyUp() {
    let childIndex = this.getLastIndex();
    let parentIndex = this.getParentIndex(childIndex);

    while (childIndex > 0 && this.shouldSwap(childIndex, parentIndex)) {
      this.swap(childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = this.getParentIndex(childIndex);
    }
  }

  /**
   * pushes the replaced root node down in the heap after root's removal
   * @private
   */
  heapifyDown() {
    let parentIndex = 0;
    let childIndex = this.compareChildrenOf(parentIndex);

    while (childIndex > 0 && this.shouldSwap(childIndex, parentIndex)) {
      this.swap(childIndex, parentIndex);
      parentIndex = childIndex;
      childIndex = this.compareChildrenOf(parentIndex);
    }
  }

  /**
   * pushes the swapped node with root down in its correct location
   * @param {number} i -  swapped node's index
   * @private
   */
  heapifyDownUntil(index) {
    let parentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let childIndex;

    while (rightChildIndex < index) {
      childIndex = this.compareChildrenBefore(
        index,
        leftChildIndex,
        rightChildIndex
      );

      if (this.shouldSwap(childIndex, parentIndex)) {
        this.swap(childIndex, parentIndex);
      }

      parentIndex = childIndex;
      leftChildIndex = this.getLeftChildIndex(parentIndex);
      rightChildIndex = this.getRightChildIndex(parentIndex);
    }
  }

  /**
   * implements heap sort algorithm by swapping root with i nodes
   * @public
   * @returns {array} sorted nodes list
   */
  sort() {
    for (let i = this.getLastIndex(); i > 0; i -= 1) {
      this.swap(0, i);
      this.heapifyDownUntil(i);
    }

    return this.nodes;
  }

  /**
   * applies a shallow clone on a heap
   * @protected
   * @returns {Heap}
   */
  clone(HeapType) {
    const heap = new HeapType();
    heap.init(this.nodes.slice());
    return heap;
  }

  /**
   * inserts a node into the heap
   * @param {number|string} key
   * @param {object} value
   * @public
   */
  insert(key, value) {
    this.nodes.push(new HeapNode(key, value));
    this.heapifyUp();
  }

  /**
   * removes and returns the root node in the heap
   * @public
   * @returns {HeapNode}
   */
  extractRoot() {
    if (this.size() === 0) return null;

    const root = this.nodes[0];
    this.nodes[0] = this.nodes[this.getLastIndex()];
    this.nodes.pop();
    this.heapifyDown();

    return root;
  }

  /**
   * returns the root node in the heap
   * @public
   * @returns {HeapNode}
   */
  root() {
    if (this.size() === 0) return null;
    return this.nodes[0];
  }

  /**
   * returns the number of nodes in the heap
   * @public
   * @returns {number}
   */
  size() {
    return this.nodes.length;
  }

  /**
   * clears the heap
   * @public
   */
  clear() {
    this.init();
  }

  /**
   * convert a list of items into a heap
   * @param {array} items
   * @param {Class} HeapType
   * @protected
   * @static
   * @returns {Heap}
   */
  static heapify(items, HeapType) {
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
