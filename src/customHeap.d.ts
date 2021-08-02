import { HeapNode, Heap } from './heap';

export class CustomHeap<T extends number|string, U = undefined> extends Heap<T, U> {
  constructor(
    comparator: (a: HeapNode<T, U> | T, b: HeapNode<T, U> | T) => boolean,
    elements?: (HeapNode<T, U> | T)[],
    leaf?: (HeapNode<T, U> | T)
  );
  clone(): CustomHeap<T, U>;
  static heapify<T extends number|string, U = undefined>(list: (HeapNode<T, U> | T)[]): CustomHeap<T, U>;
  static isHeapified<T extends number|string, U = undefined>(list: (HeapNode<T, U> | T)[]): boolean;
}

export { HeapNode };
