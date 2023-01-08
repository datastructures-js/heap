# @datastructures-js/heap
[![npm](https://img.shields.io/npm/v/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/heap)

A javascript implementation for Heap data structure. Heap base class allows creating heaps using a custom compare function, and MinHeap/MaxHeap classes extend it for use cases that do not require complex comparison like primitive values and known comparison object prop.

<img src="https://user-images.githubusercontent.com/6517308/121813242-859a9700-cc6b-11eb-99c0-49e5bb63005b.jpg">

# contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [constructor](#constructor)
  * [insert (push)](#insert-push)
  * [extractRoot (pop)](#extractroot-pop)
  * [root (top)](#root-top)
  * [leaf](#leaf)
  * [size](#size)
  * [sort](#sort)
  * [isValid](#isvalid)
  * [fix](#fix)
  * [clone](#clone)
  * [clear](#clear)
  * [heapify](#heapify)
  * [isHeapified](#isheapified)
  * [Symbol.iterator](#symboliterator)
  * [toArray](#toarray)
 * [Build](#build)
 * [License](#license)


## install
```sh
npm install --save @datastructures-js/heap
```

## require
```js
const { Heap, MinHeap, MaxHeap } = require('@datastructures-js/heap');
```

## import
```js
import {
  Heap,
  MinHeap,
  MaxHeap,
  ICompare,
  IGetCompareValue,
} from '@datastructures-js/heap';
```

## API

### constructor

#### Heap
constructor requires a compare function that tells the heap when to swap values. Function works similar to javascript sort callback, bigger than 0, means, swap elements.

##### TS
```ts
interface ICar {
  year: number;
  price: number;
}

const compareCars: ICompare<ICar> = (a: ICar, b: ICar) => {
  if (a.year > b.year) {
    return -1;
  }
  if (a.year < b.year) {
    // prioratize newest cars
    return 1;
  }
  // with least price
  return a.price < b.price ? -1 : 1;
};

const carsHeap = new Heap<ICar>(compareCars);
```

##### JS
```js
const compareCars = (a, b) => {
  if (a.year > b.year) {
    return -1;
  }
  if (a.year < b.year) {
    // prioratize newest cars
    return 1;
  }
  // with least price
  return a.price < b.price ? -1 : 1;
};

const carsHeap = new Heap(compareCars);
```

#### MinHeap, MaxHeap
constructor does not require a compare function and it's useful when working with primitive values like numbers, it can also be used with objects by passing a callback that indicates what object prop will be used in comparison.

##### TS
```ts
const numbersHeap = new MinHeap<number>();

interface IBid {
  id: number;
  value: number;
}
const getBidCompareValue: IGetCompareValue<IBid> = (bid: IBid) => bid.value;
const bidsHeap = new MaxHeap<IBid>(getBidCompareValue);
```

##### JS
```js
const numbersHeap = new MinHeap();
const bidsHeap = new MaxHeap((bid) => bid.value);
```

### insert (push)
inserts a value in a correct position into the heap in O(log(n)) runtime.

```js
const cars = [
  { year: 2013, price: 35000 },
  { year: 2010, price: 2000 },
  { year: 2013, price: 30000 },
  { year: 2017, price: 50000 },
  { year: 2013, price: 25000 },
  { year: 2015, price: 40000 },
  { year: 2022, price: 70000 }
];
cars.forEach((car) => carsHeap.insert(car));

const numbers = [3, -2, 5, 0, -1, -5, 4];
numbers.forEach((num) => numbersHeap.push(num));

const bids = [
  { id: 1, value: 1000 },
  { id: 2, value: 20000 },
  { id: 3, value: 1000 },
  { id: 4, value: 1500 },
  { id: 5, value: 12000 },
  { id: 6, value: 4000 },
  { id: 7, value: 8000 }
];
bids.forEach((bid) => bidsHeap.insert(bid));
```

### extractRoot (pop)
removes and returns the root (top) value of the heap in O(log(n)) runtime.

```js
while (!carsHeap.isEmpty()) {
  console.log(carsHeap.extractRoot());
}
/*
{ year: 2022, price: 70000 }
{ year: 2017, price: 50000 }
{ year: 2015, price: 40000 }
{ year: 2013, price: 25000 }
{ year: 2013, price: 30000 }
{ year: 2013, price: 35000 }
{ year: 2010, price: 2000 }
*/

while (!numbersHeap.isEmpty()) {
  console.log(numbersHeap.pop());
}
/*
-5
-2
-1
0
3
4
5
*/

while (!bidsHeap.isEmpty()) {
  console.log(bidsHeap.extractRoot());
}
/*
{ id: 2, value: 20000 }
{ id: 5, value: 12000 }
{ id: 7, value: 8000 }
{ id: 6, value: 4000 }
{ id: 4, value: 1500 }
{ id: 3, value: 1000 }
{ id: 1, value: 1000 }
*/
```

### root (top)
returns the root node without removing it.

```js
// reload values
cars.forEach((car) => carsHeap.insert(car));
numbers.forEach((num) => numbersHeap.insert(num));
bids.forEach((bid) => bidsHeap.insert(bid));

console.log(carsHeap.root()); // { year: 2022, price: 70000 }
console.log(numbersHeap.top()); // -5
console.log(bidsHeap.top()); // { id: 2, value: 20000 }
```

### leaf
returns a leaf node in the heap.

```js
console.log(carsHeap.leaf()); // { year: 2010, price: 2000 }
console.log(numbersHeap.leaft()); // 5
console.log(bidsHeap.leaf()); // { id: 1, value: 1000 }
```

### size
returns the number of nodes in the heap.

```js
console.log(carsHeap.size()); // 7
console.log(numbersHeap.size()); // 7
console.log(bidsHeap.size()); // 7
```

### sort
returns a list of sorted values in O(n*log(n)) runtime, based on the comparison logic, and in reverse order. In MaxHeap it returns the list of sorted values in ascending order, and in descending order in MinHeap. sort mutates the node positions in the heap, to prevent that, you can sort a clone of the heap.

```js
console.log(carsHeap.sort());
/*
[
  { year: 2010, price: 2000 },
  { year: 2013, price: 35000 },
  { year: 2013, price: 30000 },
  { year: 2013, price: 25000 },
  { year: 2015, price: 40000 },
  { year: 2017, price: 50000 },
  { year: 2022, price: 70000 }
]
*/

console.log(numbersHeap.sort());
// [5, 4, 3, 0, -1, -2, -5]

console.log(bidsHeap.sort());
/*
[
  { id: 1, value: 1000 },
  { id: 3, value: 1000 },
  { id: 4, value: 1500 },
  { id: 6, value: 4000 },
  { id: 7, value: 8000 },
  { id: 5, value: 12000 },
  { id: 2, value: 20000 }
]
*/
```

### isValid
checks if the heap is valid (all nodes are positioned correctly) in log(n) runtime.

```js
// after sorting the heaps directly, node positions are mutated
console.log(carsHeap.isValid()); // false
console.log(numbersHeap.isValid()); // false
console.log(bidsHeap.isValid()); // false
```

### fix
fixes the heap by making the necessary swaps between nodes in O(n) runtime.

```js
console.log(carsHeap.fix().isValid()); // true

console.log(numbersHeap.fix().isValid()); // true

console.log(bidsHeap.fix().isValid()); // true
```

### clone
creates a shallow copy of the heap.

```js
console.log(carsHeap.clone().sort());
/*
[
  { year: 2010, price: 2000 },
  { year: 2013, price: 35000 },
  { year: 2013, price: 30000 },
  { year: 2013, price: 25000 },
  { year: 2015, price: 40000 },
  { year: 2017, price: 50000 },
  { year: 2022, price: 70000 }
]
*/

console.log(numbersHeap.clone().sort());
// [5, 4, 3, 0, -1, -2, -5]

console.log(bidsHeap.clone().sort());
/*
[
  { id: 1, value: 1000 },
  { id: 3, value: 1000 },
  { id: 4, value: 1500 },
  { id: 6, value: 4000 },
  { id: 7, value: 8000 },
  { id: 5, value: 12000 },
  { id: 2, value: 20000 }
]
*/

// original heaps not mutated
console.log(carsHeap.isValid()); // true
console.log(numbersHeap.isValid()); // true
console.log(bidsHeap.isValid()); // true
```

### clear
clears the heap.

```js
carsHeap.clear();
numbersHeap.clear();
bidsHeap.clear();

console.log(carsHeap.size()); // 0
console.log(numbersHeap.size()); // 0
console.log(bidsHeap.size()); // 0
```

### heapify
converts a list of values into a heap without using an additional space in O(n) runtime.

##### TS
```ts
const heapifiedCars = Heap.heapify<ICar>(cars, compareCars);
console.log(heapifiedCars.isValid()); // true
// list is heapified
console.log(cars);
/*
[
  { year: 2022, price: 70000 },
  { year: 2013, price: 25000 },
  { year: 2017, price: 50000 },
  { year: 2010, price: 2000 },
  { year: 2013, price: 30000 },
  { year: 2013, price: 35000 },
  { year: 2015, price: 40000 }
]
*/

const heapifiedNumbers = MinHeap.heapify<number>(numbers);
console.log(heapifiedNumbers.isValid()); // true
console.log(numbers);
// [-5, -1, -2, 3, 0, 5, 4]

const heapifiedBids = MaxHeap.heapify<IBid>(bids, (bid) => bid.value);
console.log(heapifiedBids.isValid()); // true
console.log(bids);
/*
[
  { id: 2, value: 20000 },
  { id: 5, value: 12000 },
  { id: 7, value: 8000 },
  { id: 1, value: 1000 },
  { id: 4, value: 1500 },
  { id: 3, value: 1000 },
  { id: 6, value: 4000 }
]
*/
```

##### JS
```ts
const heapifiedCars = Heap.heapify(cars, compareCars);
console.log(heapifiedCars.isValid()); // true
console.log(heapifiedCars.leaf()); // { year: 2010, price: 2000 }

// original list is heapified
console.log(cars);
/*
[
  { year: 2022, price: 70000 },
  { year: 2013, price: 25000 },
  { year: 2017, price: 50000 },
  { year: 2010, price: 2000 },
  { year: 2013, price: 30000 },
  { year: 2013, price: 35000 },
  { year: 2015, price: 40000 }
]
*/

const heapifiedNumbers = MinHeap.heapify(numbers);
console.log(heapifiedNumbers.isValid()); // true
console.log(heapifiedNumbers.leaf()); // 5
console.log(numbers);
// [-5, -1, -2, 3, 0, 5, 4]

const heapifiedBids = MaxHeap.heapify(bids, (bid) => bid.value);
console.log(heapifiedBids.isValid()); // true
console.log(heapifiedBids.leaf()); // { id: 1, value: 1000 }
console.log(bids);
/*
[
  { id: 2, value: 20000 },
  { id: 5, value: 12000 },
  { id: 7, value: 8000 },
  { id: 1, value: 1000 },
  { id: 4, value: 1500 },
  { id: 3, value: 1000 },
  { id: 6, value: 4000 }
]
*/
```

### isHeapified
Checks if a given list is heapified.

#### TS
```ts
console.log(Heap.isHeapified<ICar>(cars, compareCars)); // true
console.log(MinHeap.isHeapified<number>(numbers)); // true
console.log(MaxHeap.isHeapified<IBid>(bids, (bid) => bid.value)); // true
```

#### JS
```js
console.log(Heap.isHeapified(cars, compareCars)); // true
console.log(MinHeap.isHeapified(numbers)); // true
console.log(MaxHeap.isHeapified(bids, (bid) => bid.value)); // true
```

### Symbol.iterator
The heaps implement a Symbol.iterator that makes them iterable on `pop`.
```js
console.log([...carsHeap]);
/*
[
  { year: 2022, price: 70000 },
  { year: 2017, price: 50000 },
  { year: 2015, price: 40000 },
  { year: 2013, price: 25000 },
  { year: 2013, price: 30000 },
  { year: 2013, price: 35000 },
  { year: 2010, price: 2000 }
]
*/
console.log(carsHeap.size()); // 0

console.log([...numbersHeap]); // [5, -5, -2, -1, 0, 3, 4]
console.log(numbersHeap.size()); // 0

for (const bid of bidsHeap) {
  console.log(bid);
}
/*
{ id: 2, value: 20000 }
{ id: 5, value: 12000 }
{ id: 7, value: 8000 }
{ id: 6, value: 4000 }
{ id: 4, value: 1500 }
{ id: 1, value: 1000 }
{ id: 3, value: 1000 }
*/
console.log(bidsHeap.size()); // 0
```

### toArray

Converts the heap to a cloned array without sorting.

```js
console.log(carsHeap.toArray());
/*
[
  { year: 2022, price: 70000 },
  { year: 2017, price: 50000 },
  { year: 2015, price: 40000 },
  { year: 2013, price: 25000 },
  { year: 2013, price: 30000 },
  { year: 2013, price: 35000 },
  { year: 2010, price: 2000 }
]
*/


console.log(numbersHeap.toArray()); // [5, -5, -2, -1, 0, 3, 4]

console.log(bidsHeap.toArray());

/*
[
{ id: 2, value: 20000 },
{ id: 5, value: 12000 },
{ id: 7, value: 8000 },
{ id: 6, value: 4000 },
{ id: 4, value: 1500 },
{ id: 1, value: 1000 },
{ id: 3, value: 1000 }
]
*/

```

## Build

```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/heap/blob/master/LICENSE)
