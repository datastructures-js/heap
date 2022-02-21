export abstract class Heap<T> {
  constructor(comparator: (a: T, b: T) => number, values?: T[]);
  insert(value: T): Heap<T>;
  extractRoot(): T;
  sort(): T[];
  fix(): void;
  isValid(): boolean;
  clone(): Heap<T>;
  root(): T;
  leaf(): T;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  static heapify<T>(values: T[], comparator: (a: T, b: T) => number): Heap<T>;
  static isHeapified<T>(values: T[], comparator: (a: T, b: T) => number): boolean;
}
