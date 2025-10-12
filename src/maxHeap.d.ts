import { Heap } from "./heap";

export interface IGetCompareValue<T> {
  (value: T): number | string;
}

export class MaxHeap<T> extends Heap<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, values?: T[]);
  insert(value: T): MaxHeap<T>;
  push(value: T): MaxHeap<T>;
  fix(): MaxHeap<T>;
  clone(): MaxHeap<T>;
  static heapify<T>(
    values: T[],
    getCompareValue?: IGetCompareValue<T>
  ): MaxHeap<T>;
  static isHeapified<T>(
    values: T[],
    getCompareValue?: IGetCompareValue<T>
  ): boolean;
}
