import { Heap, IGetCompareValue } from './heap';

export class MinHeap<T> extends Heap<T> {
  constructor(getValueCb?: (value: T) => string|number, values?: T[], leaf?: T);
  clone(): MinHeap<T>;
  static heapify<T>(values: T[], getValueCb?: IGetCompareValue<T>): MinHeap<T>;
  static isHeapified<T>(values: T[], getValueCb?: IGetCompareValue<T>): boolean;
}
