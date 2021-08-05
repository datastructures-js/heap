/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 */

const { Heap } = require('./heap');

/**
 * @class CustomHeap
 * @extends Heap
 */
class CustomHeap extends Heap {
  constructor(comparator, nodes, leaf) {
    if (typeof comparator !== 'function') {
      throw new Error('CustomHeap expects a comparator function');
    }
    super(nodes, leaf);
    this._comparator = comparator;
  }

  /**
   * Compares parent & child nodes
   * and returns true if they are in right positions
   *
   * @private
   * @param {object|number|string} parent
   * @param {object|number|string} child
   * @returns {number}
   */
  _compare(parentNode, childNode) {
    return this._comparator(parentNode, childNode) <= 0;
  }

  /**
   * Returns child's index of two children before an index
   * @private
   * @param {number} index
   * @param {number} leftChildIndex
   * @param {number} rightChildIndex
   * @returns {number}
   */
  _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
    const compare = this._comparator(
      this._nodes[rightChildIndex],
      this._nodes[leftChildIndex]
    );

    if (compare <= 0 && rightChildIndex < index) {
      return rightChildIndex;
    }

    return leftChildIndex;
  }

  /**
   * Returns a shallow copy of the heap
   * @public
   * @returns {CustomHeap}
   */
  clone() {
    return new CustomHeap(
      this._comparator,
      this._nodes.slice(),
      this._leaf
    );
  }

  /**
   * Builds a custom heap from an array of items
   * @public
   * @static
   * @param {array} list
   * @param {function} comparator
   * @returns {CustomHeap}
   */
  static heapify(list, comparator) {
    if (!Array.isArray(list)) {
      throw new Error('.heapify expects an array');
    }

    if (typeof comparator !== 'function') {
      throw new Error('.heapify expects a comparator function');
    }

    return new CustomHeap(comparator, list).fix();
  }

  /**
   * Checks if a list of items is a valid custom heap
   * @public
   * @static
   * @param {array} list
   * @param {function} comparator
   * @returns {boolean}
   */
  static isHeapified(list, comparator) {
    if (!Array.isArray(list)) {
      throw new Error('.heapify expects an array');
    }

    if (typeof comparator !== 'function') {
      throw new Error('.isHeapified expects a comparator function');
    }

    return new CustomHeap(comparator, list).isValid();
  }
}

exports.CustomHeap = CustomHeap;
