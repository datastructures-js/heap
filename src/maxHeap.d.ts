import { Heap, IGetCompareValue } from './heap';

export class MaxHeap<T> extends Heap<T> {
  constructor(getValueCb?: IGetCompareValue<T>, values?: T[], leaf?: T);
  clone(): MaxHeap<T>;
  static heapify<T>(values: T[], getValueCb?: IGetCompareValue<T>): MaxHeap<T>;
  static isHeapified<T>(values: T[], getValueCb?: IGetCompareValue<T>): boolean;
}
