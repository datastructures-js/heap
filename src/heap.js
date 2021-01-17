/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 *
 * @class
 * @abstract
 */
class Heap {
  /**
   * Creates a heap instance
   * @param {array<string|number|object>} nodes
   * @param {string|number|object} [leaf]
   * @returns {number}
   */
  constructor(nodes, leaf) {
    this._nodes = Array.isArray(nodes) ? nodes : [];
    this._leaf = leaf || null;
  }

  /**
   * Calculates left child's index from a parent's index
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  _getLeftChildIndex(parentIndex) {
    return (parentIndex * 2) + 1;
  }

  /**
   * Calculates right child's index from a parent's index
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  _getRightChildIndex(parentIndex) {
    return (parentIndex * 2) + 2;
  }

  /**
   * Calculates parent's index from a child's index
   * @private
   * @param {number} parentIndex
   * @returns {number}
   */
  _getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * Checks if a parent has a left child
   * @private
   * @param {number} parentIndex
   * @returns {boolean}
   */
  _hasLeftChild(parentIndex) {
    return this._getLeftChildIndex(parentIndex) < this.size();
  }

  /**
   * Checks if a parent has a right child
   * @private
   * @param {number} parentIndex
   * @returns {boolean}
   */
  _hasRightChild(parentIndex) {
    return this._getRightChildIndex(parentIndex) < this.size();
  }

  /**
   * Checks if a child has a parent
   * @private
   * @param {number} childIndex
   * @returns {boolean}
   */
  _hasParent(childIndex) {
    return this._getParentIndex(childIndex) >= 0;
  }

  /**
   * Returns heap node's key
   * @private
   * @param {object|number|string} node
   * @returns {number|string}
   */
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

  /**
   * Compares parent & child nodes
   * and returns true if they are in right positions
   *
   * @private
   * @param {object|number|string} parent
   * @param {object|number|string} child
   * @returns {boolean}
   */
  _compare(parentNode, childNode) {
    return this._compareKeys(
      this._getKey(parentNode),
      this._getKey(childNode)
    );
  }

  /**
   * Compares parent & child nodes
   * and returns true if they are in right positions
   *
   * @private
   * @param {object|number|string} parent
   * @param {object|number|string} child
   * @returns {boolean}
   */
  _compareByIndex(parentIndex, childIndex) {
    return this._compareKeys(
      this._getKey(this._nodes[parentIndex]),
      this._getKey(this._nodes[childIndex])
    );
  }

  /**
   * Checks if parent and child nodes should be swapped
   * @private
   * @param {number} parentIndex
   * @param {number} childIndex
   * @returns {boolean}
   */
  _shouldSwap(parentIndex, childIndex) {
    if (parentIndex < 0 || parentIndex >= this.size()) return false;
    if (childIndex < 0 || childIndex >= this.size()) return false;

    return !this._compareByIndex(parentIndex, childIndex);
  }

  /**
   * Bubbles a node from a starting index up in the heap
   * @param {number} [startingIndex]
   * @public
   */
  heapifyUp(startingIndex = this.size() - 1) {
    let childIndex = startingIndex;
    let parentIndex = this._getParentIndex(childIndex);
    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
      childIndex = parentIndex;
      parentIndex = this._getParentIndex(childIndex);
    }
  }

  /**
   * Compares left and right & children of a parent
   * @private
   * @param {number} parentIndex
   * @returns {number} - a child's index
   */
  _compareChildrenOf(parentIndex) {
    if (
      !this._hasLeftChild(parentIndex)
      && !this._hasRightChild(parentIndex)
    ) {
      return -1;
    }

    const leftChildIndex = this._getLeftChildIndex(parentIndex);
    const rightChildIndex = this._getRightChildIndex(parentIndex);

    if (!this._hasLeftChild(parentIndex)) {
      return rightChildIndex;
    }

    if (!this._hasRightChild(parentIndex)) {
      return leftChildIndex;
    }

    return this._compareByIndex(leftChildIndex, rightChildIndex)
      ? leftChildIndex
      : rightChildIndex;
  }

  /**
   * Pushes a node from a starting index down in the heap
   * @private
   */
  _heapifyDown(startingIndex = 0) {
    let parentIndex = startingIndex;
    let childIndex = this._compareChildrenOf(parentIndex);
    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
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
    this._heapifyDown();

    if (root === this._leaf) {
      this._leaf = this.root();
    }

    return root;
  }

  /**
   * Pushes a node with down in the heap before an index
   * @private
   * @param {number} index
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

      if (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
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
   * Sorts the heap by swapping root with all nodes and fixing positions
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
   * @param {any} [value]
   * @returns {Heap}
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
   * Fixes all positions of the nodes in the heap
   * @public
   * @returns {Heap}
   */
  fix() {
    for (let i = 0; i < this.size(); i += 1) {
      this.heapifyUp(i);
    }
    return this;
  }

  /**
   * Verifies that the heap is valid
   * @public
   * @returns {boolean}
   */
  isValid(parentIndex = 0) {
    let isValidLeft = true;
    let isValidRight = true;

    if (this._hasLeftChild(parentIndex)) {
      const leftChildIndex = this._getLeftChildIndex(parentIndex);
      if (!this._compareByIndex(parentIndex, leftChildIndex)) return false;
      isValidLeft = this.isValid(leftChildIndex);
    }

    if (this._hasRightChild(parentIndex)) {
      const rightChildIndex = this._getRightChildIndex(parentIndex);
      if (!this._compareByIndex(parentIndex, rightChildIndex)) return false;
      isValidRight = this.isValid(rightChildIndex);
    }

    return isValidLeft && isValidRight;
  }

  /**
   * Returns the root node in the heap
   * @public
   * @returns {object|number|string|null}
   */
  root() {
    if (this.isEmpty()) return null;
    return this._nodes[0];
  }

  /**
   * Returns a leaf node in the heap
   * @public
   * @returns {object|number|string|null}
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
      throw new Error('.heapify expects an array');
    }

    return new HeapType(list).fix();
  }

  /**
   * Checks if a list of items is a valid heap
   * @protected
   * @static
   * @param {array} array
   * @param {class} HeapType
   * @returns {boolean}
   */
  static _isHeapified(list, HeapType) {
    return new HeapType(list).isValid();
  }
}

module.exports = Heap;
