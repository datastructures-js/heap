import { Heap } from "./heap";
import { IGetCompareValue } from "./maxHeap";

export class MinHeap<T> extends Heap<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, values?: T[]);
  insert(value: T): MinHeap<T>;
  push(value: T): MinHeap<T>;
  fix(): MinHeap<T>;
  clone(): MinHeap<T>;
  static heapify<T>(
    values: T[],
    getCompareValue?: IGetCompareValue<T>
  ): MinHeap<T>;
  static isHeapified<T>(
    values: T[],
    getCompareValue?: IGetCompareValue<T>
  ): boolean;
}
