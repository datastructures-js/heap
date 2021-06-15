import { HeapNode, Heap } from './heap';

export class MinHeap<T extends number|string, U> extends Heap<T, U> {
  clone(): MinHeap<T, U>;
  static heapify<T extends number|string, U>(list: (HeapNode<T, U> | T)[]): MinHeap<T, U>;
  static isHeapified<T extends number|string, U>(list: (HeapNode<T, U> | T)[]): boolean;
}

export { HeapNode };
