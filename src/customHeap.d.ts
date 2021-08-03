import { Heap } from './heap';

export class CustomHeap<T> extends Heap<T> {
  constructor(
    comparator: (a: T, b: T) => number | boolean,
    elements?: T[],
    leaf?: T
  );

  clone(): CustomHeap<T>;

  static heapify<T extends any>(
    list: T[],
    comparator: (a: T, b: T) => number | boolean
  ): CustomHeap<T>;

  static isHeapified<T extends any>(
    list: T[],
    comparator: (a: T, b: T) => number | boolean
  ): boolean;
}
