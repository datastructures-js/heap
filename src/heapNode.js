/**
 * @datastructures-js/heap
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * @class HeapNode
 */
class HeapNode {
  constructor(key, value) {
    this._key = key;
    this._value = value;
  }

  /**
   * @public
   * @returns {number|string}
   */
  getKey() {
    return this._key;
  }

  /**
   * @public
   * @returns {object}
   */
  getValue() {
    return this._value;
  }
}

module.exports = HeapNode;
