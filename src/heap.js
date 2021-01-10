/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 *
 * @class
 * @abstract
 */
class Heap {
  constructor(nodes, leaf) {
    this._nodes = Array.isArray(nodes) ? nodes : [];
    this._leaf = leaf || null;
  }

  /**
   * Calculates left child's index of a parent node
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  _getLeftChildIndex(parentIndex) {
    return (parentIndex * 2) + 1;
  }

  /**
   * Calculates right child's index of a parent node
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  _getRightChildIndex(parentIndex) {
    return (parentIndex * 2) + 2;
  }

  /**
   * Calculates parent's index of a child node
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  _getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  _getKey(node) {
    if (typeof node === 'object') return node.key;
    return node;
  }

  /**
   * Swaps two nodes in the heap
   * @private
   * @param {number} i
   * @param {number} j
   */
  _swap(i, j) {
    const temp = this._nodes[i];
    this._nodes[i] = this._nodes[j];
    this._nodes[j] = temp;
  }

  _compare(parent, child) {
    return this._compareKeys(this._getKey(parent), this._getKey(child));
  }

  /**
   * @protected
   * checks if child's key is bigger that its parent's key
   * @returns {boolean}
   */
  _shouldSwap(childIndex, parentIndex) {
    if (childIndex < 0 || childIndex >= this.size()) return false;
    if (parentIndex < 0 || parentIndex >= this.size()) return false;

    return !this._compare(this._nodes[parentIndex], this._nodes[childIndex]);
  }

  /**
   * Bubbles last inserted node up in the heap
   * @internal
   */
  heapifyUp(startingIndex = this.size() - 1) {
    let childIndex = startingIndex;
    let parentIndex = this._getParentIndex(childIndex);
    while (this._shouldSwap(childIndex, parentIndex)) {
      this._swap(childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = this._getParentIndex(childIndex);
    }
  }

  /**
   * Selects the proper child's index to fix the heap
   * @private
   * @param {number} parentIndex
   * @returns {number} - a child index
   */
  _compareChildrenOf(parentIndex) {
    const leftChildIndex = this._getLeftChildIndex(parentIndex);
    const rightChildIndex = this._getRightChildIndex(parentIndex);
    const size = this.size();

    if (leftChildIndex >= size && rightChildIndex >= size) return -1;
    if (leftChildIndex >= size) return rightChildIndex;
    if (rightChildIndex >= size) return leftChildIndex;

    const leftChildKey = this._getKey(this._nodes[leftChildIndex]);
    const rightChildKey = this._getKey(this._nodes[rightChildIndex]);

    return this._compare(leftChildKey, rightChildKey)
      ? leftChildIndex
      : rightChildIndex;
  }

  /**
   * Pushes the root node down in the heap after root's removal
   * @internal
   */
  heapifyDown(startingIndex = 0) {
    let parentIndex = startingIndex;
    let childIndex = this._compareChildrenOf(parentIndex);
    while (this._shouldSwap(childIndex, parentIndex)) {
      this._swap(childIndex, parentIndex);
      parentIndex = childIndex;
      childIndex = this._compareChildrenOf(parentIndex);
    }
  }

  /**
   * Removes and returns the root node in the heap
   * @public
   * @returns {object}
   */
  extractRoot() {
    if (this.isEmpty()) return null;

    const root = this.root();
    this._nodes[0] = this._nodes[this.size() - 1];
    this._nodes.pop();
    this.heapifyDown();

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
   * Pushes the swapped node with root down in its correct location
   * @private
   * @param {number} index -  swapped node's index
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
   * Returns a shallow copy of the heap
   * @protected
   * @param {class} HeapType
   * @returns {Heap}
   */
  _clone(HeapType) {
    return new HeapType(this._nodes.slice(), this._leaf);
  }

  /**
   * Implements heap sort algorithm by swapping anf fixing
   * @public
   * @returns {array} the sorted nodes
   */
  sort() {
    for (let i = this.size() - 1; i > 0; i -= 1) {
      this._swap(0, i);
      this._heapifyDownUntil(i);
    }

    return this._nodes;
  }

  /**
   * Inserts a node in the right position into the heap
   * @public
   * @param {number|string} key
   * @param {any} value
   * @returns {object}
   */
  insert(key, value) {
    const newNode = value !== undefined ? { key, value } : key;
    this._nodes.push(newNode);
    this.heapifyUp();
    if (this._leaf === null || !this._compare(newNode, this._leaf)) {
      this._leaf = newNode;
    }
    return this;
  }

  /**
   * Returns the root node in the heap
   * @public
   * @returns {object}
   */
  root() {
    if (this.isEmpty()) return null;
    return this._nodes[0];
  }

  /**
   * Returns a leaf node in the heap
   * @public
   * @returns {object}
   */
  leaf() {
    return this._leaf;
  }

  /**
   * Returns the number of nodes in the heap
   * @public
   * @returns {number}
   */
  size() {
    return this._nodes.length;
  }

  /**
   * Checks if the heap is empty
   * @public
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * Clears the heap
   * @public
   */
  clear() {
    this._nodes = [];
    this._leaf = null;
  }

  /**
   * Convert a list of items into a heap
   * @protected
   * @static
   * @param {array} array
   * @param {class} HeapType
   * @returns {Heap}
   */
  static _heapify(list, HeapType) {
    if (!Array.isArray(list)) {
      throw new Error('.heapify expect an array');
    }

    const heap = new HeapType(list);
    for (let i = 0; i < heap.size(); i += 1) {
      heap.heapifyUp(i);
    }

    return heap;
  }
}

module.exports = Heap;
