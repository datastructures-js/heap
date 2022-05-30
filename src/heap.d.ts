export interface ICompare<T> {
  (a: T, b: T): number;
}

export class Heap<T> {
  constructor(comparator: ICompare<T>, values?: T[], leaf?: T);
  insert(value: T): Heap<T>;
  push(value: T): Heap<T>;
  extractRoot(): T;
  pop(): T;
  sort(): T[];
  fix(): Heap<T>;
  isValid(): boolean;
  clone(): Heap<T>;
  root(): T;
  top(): T;
  leaf(): T;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  static heapify<T>(values: T[], comparator: ICompare<T>): Heap<T>;
  static isHeapified<T>(values: T[], comparator: ICompare<T>): boolean;
}
