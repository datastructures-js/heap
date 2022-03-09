interface IComparator<T> {
  (a: T, b: T): number;
}

export interface IGetCompareValue<T> {
  (value: T): number|string;
}

export class Heap<T> {
  constructor(comparator: (a: T, b: T) => number, values?: T[], leaf?: T);
  insert(value: T): Heap<T>;
  extractRoot(): T;
  sort(): T[];
  fix(): Heap<T>;
  isValid(): boolean;
  clone(): Heap<T>;
  root(): T;
  leaf(): T;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
  static heapify<T>(values: T[], comparator: IComparator<T> | IGetCompareValue<T>): Heap<T>;
  static isHeapified<T>(values: T[], comparator: IComparator<T> | IGetCompareValue<T>): boolean;
}
