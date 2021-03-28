# @datastructures-js/heap
[![build:?](https://travis-ci.org/datastructures-js/heap.svg?branch=master)](https://travis-ci.org/datastructures-js/heap)
[![npm](https://img.shields.io/npm/v/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/heap)

a complete javascript implementation for the Min/Max Heap data structures & Heap Sort algorithm.

<table>
<tr><th>Min Heap</th><th>Max Heap</th></tr>
<tr>
  <td>
    <img alt="Min Heap" src="https://user-images.githubusercontent.com/6517308/36940955-78f30c82-1f15-11e8-9ed1-6d9414c243c4.png">
  </td>
  <td>
    <img alt="Max Heap" src="https://user-images.githubusercontent.com/6517308/36940962-844a7fe8-1f15-11e8-8165-6fd62ba1914f.png">
  </td>
</tr>
</table>

# Table of Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [new](#new)
  * [.insert(key[, value])](#insertkey-value)
  * [.extractRoot()](#extractroot)
  * [.root()](#root)
  * [.leaf()](#leaf)
  * [.size()](#size)
  * [.clone()](#clone)
  * [.isValid()](#isvalid)
  * [.fix()](#fix)
  * [.sort()](#sort)
  * [.clear()](#clear)
  * [Heap.heapify(list)](#heapheapifylist)
  * [Heap.isHeapified(list)](#heapisHeapifiedlist)
 * [Build](#build)
 * [License](#license)

## install
```sh
npm install --save @datastructures-js/heap
```

### require
```js
const { MinHeap, MaxHeap } = require('@datastructures-js/heap');
```

### import
```js
import { MinHeap, MaxHeap } from '@datastructures-js/heap';
```

## API

### new
creates an empty heap.

```js
const minHeap = new MinHeap();

const maxHeap = new MaxHeap();
```

### .insert(key[, value])
insert a node into the heap. If value is provided (anything except undefined), the node is stored as `{key: ..., value: ...}` otherwise, the node is the key (number or string).

<table>
  <tr>
    <th align="center">params</th>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td>
      key: number | string
      <br />
      value: any
    </td>
    <td align="center">MinHeap | MaxHeap</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
const minHeap = new MinHeap()
  .insert(50)
  .insert(80)
  .insert(30, 'something')
  .insert(90)
  .insert(60, null)
  .insert(40)
  .insert(20, { name: 'test' });

const maxHeap = new MaxHeap()
  .insert('m')
  .insert('x')
  .insert('f', 'something')
  .insert('b')
  .insert('z', null)
  .insert('k')
  .insert('c', { name: 'test' });
```

### .extractRoot()
removes and returns the root node in the heap.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number | string | object</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
console.log(minHeap.extractRoot()); // { key: 20, value: { name: 'test' } }
console.log(minHeap.extractRoot()); // { key: 30, value: 'something' }
console.log(minHeap.extractRoot()); // 40

console.log(maxHeap.extractRoot()); // { key: 'z', value: null }
console.log(maxHeap.extractRoot()); // 'x'
console.log(maxHeap.extractRoot()); // 'm'
```

### .root()
returns the root node without removing it.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number | string | object</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(minHeap.root()); // 50

console.log(maxHeap.root()); // 'k'
```

### .leaf()
returns a node with max key in MinHeap, or with min key in MaxHeap.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number | string | object</td>
    <td align="center">O(1)</td>
  </tr>
</table>

```js
console.log(minHeap.leaf()); // 90

console.log(maxHeap.leaf()); // 'b'
```

### .size()
returns the number of nodes in the heap.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">number</td>
    <td align="center">O(1)</td>
  </tr>
</table>


```js
console.log(minHeap.size()); // 4
console.log(maxHeap.size()); // 4
```

### .clone()
creates a shallow copy of the heap.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">MinHeap | MaxHeap</td>
    <td align="center">O(n)</td>
  </tr>
</table>

```js
const minHeapClone = minHeap.clone();
minHeapClone.extractRoot();
console.log(minHeapClone.root()); // 60
console.log(minHeap.root()); // 50

const maxHeapClone = maxHeap.clone();
maxHeapClone.extractRoot();
console.log(maxHeapClone.root()); // { key: 'f', value: 'something' }
console.log(maxHeap.root()); // 'k'
```

### .isValid()
checks if the heap is valid.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">boolean</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
console.log(minHeap.isValid()); // true

console.log(maxHeap.isValid()); // true
```

### .fix()
fixes a heap by making the necessary changes in node positions.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">MinHeap | MaxHeap</td>
    <td align="center">O(log(n))</td>
  </tr>
</table>

```js
console.log(minHeap.fix().isValid()); // true

console.log(maxHeap.fix().isValid()); // true
```

### .sort()
implements Heap Sort and sorts a <b>Max Heap in ascending order</b> or a <b>Min Heap in descending order</b>.

<table>
  <tr>
    <th align="center">return</th>
    <th align="center">runtime</th>
  </tr>
  <tr>
    <td align="center">array&lt;number|string|object&gt;</td>
    <td align="center">O(n*log(n))</td>
  </tr>
</table>

*note: calling .sort() directly on a heap will mutate its nodes location. To avoid that, you might either sort a shallow copy. You can also use use .fix() to fix the mutated heap positions*

```js
console.log(maxHeap.clone().sort()); // sorting a copy of the heap
/*
[
  'b',
  { key: 'c', value: { name: 'test' } },
  { key: 'f', value: 'something' },
  'k'
]
*/
console.log(maxHeap.root()); // 'k'

console.log(minHeap.sort()); // will mutate the heap
/*
[ 90, 80, { key: 60, value: null }, 50 ]
*/
console.log(minHeap.isValid()); // false
minHeap.fix(); // fix it
console.log(minHeap.isValid()); // true
```

To sort a list of elements directtly using Heap Sort, it can be done like:

```js
const ascSorted = MaxHeap.heapify([3, 7, 2, 10, 4, 9, 8, 5, 1, 6]).sort();
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const descSorted = MinHeap.heapify([3, 7, 2, 10, 4, 9, 8, 5, 1, 6]).sort();
// [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

### .clear()
clears the nodes in the heap.

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

```js
minHeap.clear();
maxHeap.clear();

console.log(minHeap.size()); // 0
console.log(minHeap.root()); // null

console.log(maxHeap.size()); // 0
console.log(maxHeap.root()); // null
```

### Heap.heapify(list)
Heapifies an existing list. It returns a heap instance as well as changing the list positions properly.

<table>
 <tr>
  <th>params</th>
  <th>return</th>
  <th>runtime</th>
 </tr>
 <tr>
  <td>list: array&lt;number|string|object&gt;</td>
  <td>MinHeap | MaxHeap</td>
  <td>O(n)</td>
 </tr>
</table>

```js
const numList = [
  50,
  80,
  30,
  90,
  60,
  40,
  20
];
MinHeap.heapify(numList);
console.log(numList);
/*
[
  20,
  60,
  30,
  90,
  80,
  50,
  40
]
*/

const strList = [
  'm',
  'x',
  'f',
  'b',
  'z',
  'k',
  'c'
];
const maxHeap = MaxHeap.heapify(strList);
console.log(strList);
/*
[
  'z',
  'x',
  'k',
  'b',
  'm',
  'f',
  'c'
]
*/
console.log(maxHeap.isValid()); // true

const objList = [
  { key: 50, value: 't1' },
  { key: 80, value: 't2' },
  { key: 30, value: 't3' },
  { key: 90, value: 't4' },
  { key: 60, value: 't5' },
  { key: 40, value: 't6' },
  { key: 20, value: 't7' }
];
MinHeap.heapify(objList);
console.log(objList);
/*
[
  { key: 20, value: 't7' },
  { key: 60, value: 't5' },
  { key: 30, value: 't3' },
  { key: 90, value: 't4' },
  { key: 80, value: 't2' },
  { key: 50, value: 't1' },
  { key: 40, value: 't6' }
]
*/
```

### Heap.isHeapified(list)
Checks if a given list is heapified.

<table>
 <tr>
  <th>params</th>
  <th>return</th>
  <th>runtime</th>
 </tr>
 <tr>
  <td>list: array&lt;number|string|object&gt;</td>
  <td>boolean</td>
  <td>O(log(n))</td>
 </tr>
</table>

```js
MinHeap.isHeapified([
  50,
  80,
  30,
  90,
  60,
  40,
  20
]); // false

MinHeap.isHeapified([
  20,
  60,
  30,
  90,
  80,
  50,
  40
]); // true

MaxHeap.isHeapified([
  'm',
  'x',
  'f',
  'b',
  'z',
  'k',
  'c'
]); // false

MaxHeap.isHeapified([
  'z',
  'x',
  'k',
  'b',
  'm',
  'f',
  'c'
]); // true
```

## Build

```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/heap/blob/master/LICENSE)
