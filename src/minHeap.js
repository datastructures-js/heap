/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 */

const { Heap } = require('./heap');

/**
 * @class MinHeap
 * @extends Heap
 */
class MinHeap extends Heap {
  /**
   * @param {function} [getCompareValue]
   * @param {array} [values]
   * @param {number|string|object} [leaf]
   */
  constructor(getCompareValue, values, leaf) {
    const compare = (a, b) => {
      const aVal = typeof getCompareValue === 'function' ? getCompareValue(a) : a;
      const bVal = typeof getCompareValue === 'function' ? getCompareValue(b) : b;
      return aVal < bVal ? -1 : 1;
    };
    super(compare, values, leaf);
    this._getCompareValue = getCompareValue;
  }

  /**
   * Returns a shallow copy of the MinHeap
   * @public
   * @returns {MinHeap}
   */
  clone() {
    return new MinHeap(this._getCompareValue, this._nodes.slice(), this._leaf);
  }

  /**
   * Builds a MinHeap from an array
   * @public
   * @static
   * @param {array} values
   * @param {function} [getCompareValue]
   * @returns {MinHeap}
   */
  static heapify(values, getCompareValue) {
    if (!Array.isArray(values)) {
      throw new Error('MinHeap.heapify expects an array');
    }
    return new MinHeap(getCompareValue, values).fix();
  }

  /**
   * Checks if a list of values is a valid min heap
   * @public
   * @static
   * @param {array} values
   * @param {function} [getCompareValue]
   * @returns {boolean}
   */
  static isHeapified(values, getCompareValue) {
    return new MinHeap(getCompareValue, values).isValid();
  }
}

exports.MinHeap = MinHeap;
