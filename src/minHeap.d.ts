import { Heap } from './heap';
import { IGetCompareValue } from './maxHeap';

export class MinHeap<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, _heap?: Heap<T>);
  insert(value: T): MinHeap<T>;
  push(value: T): MinHeap<T>;
  extractRoot(): T;
  pop(): T;
  sort(): T[];
  fix(): MinHeap<T>;
  isValid(): boolean;
  clone(): MinHeap<T>;
  root(): T;
  top(): T;
  leaf(): T;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  static heapify<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MinHeap<T>;
  static isHeapified<T>(values: T[], getCompareValue?: IGetCompareValue<T>): boolean;
}
