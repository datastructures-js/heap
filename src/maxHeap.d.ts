import { HeapNode, Heap } from './heap';

export abstract class MaxHeap<T extends number|string, U> extends Heap<T, U> {
  clone(): MaxHeap<T, U>;
  static heapify<T extends number|string, U>(list: (HeapNode<T, U> | T)[]): MaxHeap<T, U>;
  static isHeapified<T extends number|string, U>(list: (HeapNode<T, U> | T)[]): boolean;
}
