import { Heap } from './heap';

export class CustomHeap<T> extends Heap<T> {
  constructor(
    comparator: (a: T, b: T) => number | boolean,
    elements?: T[],
    leaf?: T
  );

  clone(): CustomHeap<T>;

  static heapify<T>(
    list: T[],
    comparator: (a: T, b: T) => number | boolean
  ): CustomHeap<T>;

  static isHeapified<T>(
    list: T[],
    comparator: (a: T, b: T) => number | boolean
  ): boolean;
}
