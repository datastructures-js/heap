import { Heap, IGetCompareValue } from './heap';

export class MaxHeap<T> extends Heap<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, values?: T[], leaf?: T);
  clone(): MaxHeap<T>;
  static heapify<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MaxHeap<T>;
  static isHeapified<T>(values: T[], getCompareValue?: IGetCompareValue<T>): boolean;
}
