import { HeapNode, Heap } from './heap';

export class MinHeap<T extends number|string, U = undefined> extends Heap<T, U> {
  clone(): MinHeap<T, U>;
  static heapify<T extends number|string, U = undefined>(list: (HeapNode<T, U> | T)[]): MinHeap<T, U>;
  static isHeapified<T extends number|string, U = undefined>(list: (HeapNode<T, U> | T)[]): boolean;
}

export { HeapNode };
