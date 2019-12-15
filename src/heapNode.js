/**
 * datastructures-js/heap
 * @copyright 2019 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

/**
 * @class HeapNode
 */
class HeapNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  /**
   * @public
   * @returns {number|string}
   */
  getKey() {
    return this.key;
  }

  /**
   * @public
   * @returns {object}
   */
  getValue() {
    return this.value;
  }

  /**
   * serialize heap node's properties
   * @public
   * @returns {object}
   */
  serialize() {
    return {
      key: this.key,
      value: this.value
    };
  }
}

module.exports = HeapNode;
