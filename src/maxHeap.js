/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 */

const { Heap } = require('./heap');

/**
 * @class MaxHeap
 * @extends Heap
 */
class MaxHeap extends Heap {
  /**
   * @param {function} [getCompareValue]
   * @param {array} [values]
   * @param {number|string|object} [leaf]
   */
  constructor(getCompareValue, values, leaf) {
    const compare = (a, b) => {
      const aVal = typeof getCompareValue === 'function' ? getCompareValue(a) : a;
      const bVal = typeof getCompareValue === 'function' ? getCompareValue(b) : b;
      return aVal < bVal ? 1 : -1;
    };
    super(compare, values, leaf);
    this._getCompareValue = getCompareValue;
  }

  /**
   * Returns a shallow copy of the MaxHeap
   * @public
   * @returns {MaxHeap}
   */
  clone() {
    return new MaxHeap(this._getCompareValue, this._nodes.slice(), this._leaf);
  }

  /**
   * Builds a MaxHeap from an array
   * @public
   * @static
   * @param {array} values
   * @param {function} [getCompareValue]
   * @returns {MaxHeap}
   */
  static heapify(values, getCompareValue) {
    if (!Array.isArray(values)) {
      throw new Error('MaxHeap.heapify expects an array');
    }
    return new MaxHeap(getCompareValue, values).fix();
  }

  /**
   * Checks if a list of values is a valid max heap
   * @public
   * @static
   * @param {array} values
   * @param {function} [getCompareValue]
   * @returns {boolean}
   */
  static isHeapified(values, getCompareValue) {
    return new MaxHeap(getCompareValue, values).isValid();
  }
}

exports.MaxHeap = MaxHeap;
