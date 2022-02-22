import { Heap } from './heap';

export class MaxHeap<T> extends Heap<T> {
  constructor(getValueCb?: (value: T) => string|number, values?: T[], leaf?: T);
  clone(): MaxHeap<T>;
  static heapify<T>(values: T[], getValueCb?: (value: T) => string|number): MaxHeap<T>;
  static isHeapified<T>(values: T[], getValueCb?: (value: T) => string|number): boolean;
}
