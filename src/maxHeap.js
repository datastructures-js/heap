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
   * @param {function} [getValueCb]
   * @param {array} [values]
   * @param {any} [leaf]
   */
  constructor(getValueCb, values, leaf) {
    const comparator = (a, b) => {
      const aVal = typeof getValueCb === 'function' ? getValueCb(a) : a;
      const bVal = typeof getValueCb === 'function' ? getValueCb(b) : b;
      return aVal < bVal ? 1 : -1;
    };
    super(comparator, values, leaf);
    this._getValueCb = getValueCb;
  }

  /**
   * Returns a shallow copy of the MaxHeap
   * @public
   * @returns {MaxHeap}
   */
  clone() {
    return new MaxHeap(this._getValueCb, this._nodes.slice(), this._leaf);
  }

  /**
   * Builds a MaxHeap from an array
   * @public
   * @static
   * @param {array} [values]
   * @param {function} [priorityCb]
   * @returns {Heap}
   */
  static heapify(values, getValueCb) {
    if (!Array.isArray(values)) {
      throw new Error('MaxHeap.heapify expects an array');
    }
    return new MaxHeap(getValueCb, values).fix();
  }

  /**
   * Checks if a list of values is a valid max heap
   * @public
   * @static
   * @param {array} [values]
   * @param {function} [getValueCb]
   * @returns {boolean}
   */
  static isHeapified(values, getValueCb) {
    return new MaxHeap(getValueCb, values).isValid();
  }
}

exports.MaxHeap = MaxHeap;
