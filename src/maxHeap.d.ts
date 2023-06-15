import { Heap } from "./heap";

export interface IGetCompareValue<T> {
  (value: T): number | string;
}

export class MaxHeap<T> implements Iterable<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, _heap?: Heap<T>);
  toArray(): T[];
  [Symbol.iterator](): Iterator<T, any, undefined>;
  insert(value: T): MaxHeap<T>;
  push(value: T): MaxHeap<T>;
  extractRoot(): T | null;
  pop(): T | null;
  sort(): T[];
  fix(): MaxHeap<T>;
  isValid(): boolean;
  clone(): MaxHeap<T>;
  root(): T | null;
  top(): T | null;
  leaf(): T | null;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  static heapify<T>(
    values: T[],
    getCompareValue?: IGetCompareValue<T>
  ): MaxHeap<T>;
  static isHeapified<T>(
    values: T[],
    getCompareValue?: IGetCompareValue<T>
  ): boolean;
}
