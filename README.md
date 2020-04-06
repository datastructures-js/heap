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
* [API](#api)
  * [require](#require)
  * [import](#import)
  * [Construction](#construction)
  * [.insert(key, value)](#insertkey-value)
  * [.root()](#root)
  * [.leaf()](#leaf)
  * [.extractRoot()](#extractroot)
  * [.size()](#size)
  * [.clone()](#clone)
  * [.sort()](#sort)
  * [.clear()](#clear)
  * [HeapNode](#heapnode)
 * [Build](#build)
 * [License](#license)

## install
```sh
npm install --save @datastructures-js/heap
```

## API

### require
```js
const { MinHeap, MaxHeap } = require('@datastructures-js/heap');
```

### import
```js
import { MinHeap, MaxHeap } from '@datastructures-js/heap';
```

### Construction

#### using "new"
creates an empty heap.

##### Example
```js
const minHeap = new MinHeap();

const maxHeap = new MaxHeap();
```

#### using ".heapify(list)"
converts an existing array to a heap.

<table>
  <tr><th align="center" colspan="3">params</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td><td align="center"><b>item type</b></td></tr>
  <tr><td>list</td><td>array</td><td><i>number</i>, <i>string</i> or <i>object literal</i> with key/value props</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>MinHeap or MaxHeap</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(n)</td>
 </tr>
</table>

##### Example

```js
const numList = [
  50,
  80,
  { key: 30, value: 'something' },
  90,
  { key: 60, value: null },
  40,
  { key: 20, value: { name: 'test' } }
];

const strList = [
  'm',
  'x',
  { key: 'f', value: 'something' },
  'b',
  { key: 'z', value: null },
  'k',
  { key: 'c', value: { name: 'test' } }
];

const minHeap = MinHeap.heapify(numList);

const maxHeap = MaxHeap.heapify(strList);
```

### .insert(key, value)
insert a node into the heap.

<table>
  <tr><th align="center" colspan="2">params</th></tr>
  <tr><td><b>name</b></td><td><b>type</b></td></tr>
  <tr><td>key</td><td>number or string</td></tr>
  <tr><td>value</td><td>object</td></tr>
</table>

<table>
 <tr><th>return</th></tr>
 <tr>
  <td><a href="#heapnode">HeapNode</a></td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>


#### Example

```js
const minHeap = new MinHeap();

const maxHeap = new MaxHeap();

minHeap.insert(50);
minHeap.insert(80);
minHeap.insert(30, 'something');
minHeap.insert(90);
minHeap.insert(60, null);
minHeap.insert(40);
minHeap.insert(20, { name: 'test' });

maxHeap.insert('m');
maxHeap.insert('x');
maxHeap.insert('f', 'something');
maxHeap.insert('b');
maxHeap.insert('z', null);
maxHeap.insert('k');
maxHeap.insert('c', { name: 'test' });
```

### .root()
returns the root without removing it.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td><a href="#heapnode">HeapNode</a></td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
const min = minHeap.root();
console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }

const max = maxHeap.root();
console.log(max.getKey()); // 'z'
console.log(max.getValue()); // null
```

### .leaf()
returns the node with the max key in MinHeap, or with the min key in MaxHeap.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td><a href="#heapnode">HeapNode</a></td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
const maxLeaf = minHeap.leaf();
console.log(maxLeaf.getKey()); // 90

const minLeaf = maxHeap.leaf();
console.log(minLeaf.getKey()); // 'b'
```

### .extractRoot()
removes and returns the root node in the heap.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td><a href="#heapnode">HeapNode</a></td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(log(n))</td>
 </tr>
</table>

#### Example

```js
const min = minHeap.extractRoot();
console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }
console.log(minHeap.root().getKey()); // 30

const max = maxHeap.extractRoot();
console.log(max.getKey()); // 'z'
console.log(max.getValue()); // null
console.log(maxHeap.root().getKey()); // 'x'
```

### .size()
returns the number of nodes in the heap.

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>number</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(1)</td>
 </tr>
</table>

#### Example

```js
console.log(minHeap.size()); // 6
console.log(maxHeap.size()); // 6
```

### .clone()
creates a shallow copy of a heap by slicing the nodes array and passing it to a new heap instance. 

<table>
 <tr><th>return</th></tr>
 <tr>
  <td>MinHeap or MaxHeap</td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(n)</td>
 </tr>
</table>

#### Example

```js
const minHeapClone = minHeap.clone();
minHeapClone.extractRoot();

console.log(minHeapClone.root().getKey()); // 40
console.log(minHeap.root().getKey()); // 30
```

### .sort()
implements Heap Sort and sorts a <b>Max Heap in ascneding order</b> or a <b>Min Heap in descending order</b>.

<table>
 <tr><th>return</th><th>description</th></tr>
 <tr>
  <td>array</td>
  <td>a sorted list by key of <a href="#heapnode">HeapNode</a></td>
 </tr>
</table>

<table>
 <tr>
  <th>runtime</th>
 </tr>
 <tr>
  <td>O(n*log(n))</td>
 </tr>
</table>

*note : calling .sort() directly on a heap will mutate its nodes location. If you want to avoid that, you can sort a shallow copy of the heap.*

#### Example

```js
console.log(maxHeap.clone().sort()); // does not mutate the heap structure
/*
[
  HeapNode { key: 'b', value: undefined },
  HeapNode { key: 'c', value: { name: 'test' } },
  HeapNode { key: 'f', value: 'something' },
  HeapNode { key: 'k', value: undefined },
  HeapNode { key: 'm', value: undefined },
  HeapNode { key: 'x', value: undefined }
]
*/
console.log(maxHeap.root()); // HeapNode { key: 'x', value: undefined }

console.log(minHeap.clone().sort()); // does not mutate the heap structure
/*
[
  HeapNode { key: 90, value: undefined },
  HeapNode { key: 80, value: undefined },
  HeapNode { key: 60, value: null },
  HeapNode { key: 50, value: undefined },
  HeapNode { key: 40, value: undefined },
  HeapNode { key: 30, value: 'something' }
]
*/
console.log(minHeap.root()); // HeapNode { key: 30, value: 'something' }
```
To sort a list of elements directtly using Heap Sort, it can be done like:

```js
const unsortedList = [3, 7, 2, 10, 4, 9, 8, 5, 1, 6];

const ascSorted = MaxHeap.heapify(unsortedList).sort().map((node) => node.getKey());
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const descSorted = MinHeap.heapify(unsortedList).sort().map((node) => node.getKey());
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

#### Example

```js
minHeap.clear();
maxHeap.clear();

console.log(minHeap.size()); // 0
console.log(minHeap.root()); // null

console.log(maxHeap.size()); // 0
console.log(maxHeap.root()); // null
```

### HeapNode

#### .getKey()
returns the node's key.

<table>
 <tr><th>return</th></tr>
 <tr><td>string or number</td></tr>
</table>

#### .getValue()
returns the node's associated value.

<table>
 <tr><th>return</th></tr>
 <tr><td>object</td></tr>
</table>

## Build
lint + tests
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/heap/blob/master/LICENSE)
