import { HeapNode, Heap } from './heap';

export class MaxHeap<T extends number|string, U = undefined> extends Heap<T, U> {
  clone(): MaxHeap<T, U>;
  static heapify<T extends number|string, U = undefined>(list: (HeapNode<T, U> | T)[]): MaxHeap<T, U>;
  static isHeapified<T extends number|string, U = undefined>(list: (HeapNode<T, U> | T)[]): boolean;
}

export { HeapNode };
