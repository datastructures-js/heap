import { Heap } from './heap';

export class CustomHeap<T> extends Heap<T> {
  constructor(
    comparator: (a: T, b: T) => number,
    elements?: T[],
    leaf?: T
  );

  static heapify<T>(
    list: T[],
    comparator: (a: T, b: T) => number
  ): CustomHeap<T>;

  static isHeapified<T>(
    list: T[],
    comparator: (a: T, b: T) => number
  ): boolean;
}
