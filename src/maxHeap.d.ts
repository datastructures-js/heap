import { Heap } from './heap';

export interface IGetCompareValue<T> {
  (value: T): number | string;
}

export class MaxHeap<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, _heap?: Heap<T>);
  insert(value: T): MaxHeap<T>;
  push(value: T): MaxHeap<T>;
  extractRoot(): T;
  pop(): T;
  sort(): T[];
  fix(): MaxHeap<T>;
  isValid(): boolean;
  clone(): MaxHeap<T>;
  root(): T;
  top(): T;
  leaf(): T;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  static heapify<T>(values: T[], getCompareValue?: IGetCompareValue<T>): MaxHeap<T>;
  static isHeapified<T>(values: T[], getCompareValue?: IGetCompareValue<T>): boolean;
}
