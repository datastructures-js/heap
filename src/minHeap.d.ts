import { Heap, IGetCompareValue } from './heap';

export class MinHeap<T> extends Heap<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, values?: T[], leaf?: T);
  clone(): MinHeap<T>;
  static heapify<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MinHeap<T>;
  static isHeapified<T>(values: T[], getCompareValue?: IGetCompareValue<T>): boolean;
}
