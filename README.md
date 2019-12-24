# @datastructures-js/heap
[![build:?](https://travis-ci.org/datastructures-js/heap.svg?branch=master)](https://travis-ci.org/datastructures-js/heap) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/heap)

a complete javascript implementation for the Min/Max Heap data structures & Heap Sort algorithm.

![heap](https://user-images.githubusercontent.com/6517308/70871547-bd852900-1f65-11ea-909f-86f4d090f152.jpg)

# Table of Contents
* [Install](#install)
* [API](#build)
  * [require](#require)
  * [import](#import)
  * [Creating a Heap](#create-a-heap)
    * [new](#new)
    * [.heapify(list)](#heapifylist)
  * [.insert(key, value)](#insertkey-value)
  * [.root()](#root)
  * [.extractRoot()](#extractroot)
  * [.serialize()](#serialize)
  * [.size()](#size)
  * [.clone()](#clone)
  * [.sort()](#sort)
  * [.clear()](#clear)
 * [Build](#build)

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

### create a heap

#### new
creates an empty heap.

##### Example
```js
const minHeap = new MinHeap();

const maxHeap = new MaxHeap();
```

#### .heapify(list)
converts an array of objects to a heap.

##### runtime
O(n)

##### params
###### list<{number}|{string}|{object}> : {array}
elements can be number, string or serialized heap node objects.

##### return : {Heap}
*MinHeap* or *MaxHeap* instance.

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

##### runtime
O(log(n))

##### params
###### key : {number} | {string}
the value that is used to compare nodes in the heap.

###### value : {object}
the value that is associated with a key.

##### Example

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
peeks on the root without removing it.

##### runtime
O(1)

##### return : {HeapNode}
the root node in the heap. It implements the following interface

###### .getKey()
returns the node's key that is used to compare with other nodes.

###### .getValue()
returns the value that is associated with the key.

###### .serialize()
returns an object literal of key/value of the node.

##### Example

```js
const min = minHeap.root();
console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }
console.log(min.serialize()); // { key: 20, value: { name: 'test' } }

const max = maxHeap.root();
console.log(max.getKey()); // 'z'
console.log(max.getValue()); // null
console.log(max.serialize()); // { key: 'z', value: null }
```

### .extractRoot()
removes and returns the root node in the heap.

##### runtime
O(log(n))

##### return : {HeapNode}
the root node in the heap.

##### Example

```js
const min = minHeap.extractRoot();
console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }
console.log(min.serialize()); // { key: 20, value: { name: 'test' } }
console.log(minHeap.root().getKey()); // 30

const max = maxHeap.extractRoot();
console.log(max.getKey()); // 'z'
console.log(max.getValue()); // null
console.log(max.serialize()); // { key: 'z', value: null }
console.log(maxHeap.root().getKey()); // 'x'
```

### .serialize()
converts the heap into a list of serialized nodes.

##### runtime
O(n)

##### return : {array\<object\>}

a serialized list of heap nodes

##### Example

```js
console.log(minHeap.serialize());
/*
[
  { key: 30, value: 'something' },
  { key: 60, value: null },
  { key: 40, value: undefined },
  { key: 90, value: undefined },
  { key: 80, value: undefined },
  { key: 50, value: undefined }
]
*/

console.log(maxHeap.serialize());
/*
[
  { key: 'x', value: undefined },
  { key: 'm', value: undefined },
  { key: 'k', value: undefined },
  { key: 'b', value: undefined },
  { key: 'c', value: { name: 'test' } },
  { key: 'f', value: 'something' }
]
*/
```

### .size()

##### runtime
O(1)

##### return : {number}
the number of nodes in the heap.

##### Example
```js
console.log(minHeap.size()); // 6
console.log(maxHeap.size()); // 6
```

### .clone()
creates a shallow copy of a heap by slicing the nodes array and passing it to a new heap instance. 

##### runtime
O(n)

##### return : {Heap}
*MinHeap* or *MaxHeap* instance.

##### Example

```js
const minHeapClone = minHeap.clone();
minHeapClone.extractRoot();

console.log(minHeapClone.root().getKey()); // 40
console.log(minHeap.root().getKey()); // 30
```

### .sort()
implements Heap Sort and sorts a *Max Heap in ascneding order* or a *Min Heap in descending order*.

##### runtime
O(n\*log(n))

##### return : {array}
a sorted list by key of the heap nodes.

*note : calling .sort() directly on a heap will mutate its nodes location. If you want to avoid that, you can sort a shallow copy of the heap.*

##### Example

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

If you are using this npm for the purpose of sorting a list of elements using Heap Sort, you can do this:

```js
const unsortedList = [3, 7, 2, 10, 4, 9, 8, 5, 1, 6];

const ascSorted = MaxHeap.heapify(unsortedList).sort().map(n => n.getKey());
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const descSorted = MinHeap.heapify(unsortedList).sort().map(n => n.getKey());
// [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

### .clear()
clears the nodes in the heap.

##### runtime
O(1)

##### Example

```js
minHeap.clear();
maxHeap.clear();

console.log(minHeap.size()); // 0
console.log(minHeap.root()); // null

console.log(maxHeap.size()); // 0
console.log(maxHeap.root()); // null
```

## Build
lint + tests
```
grunt build
```

## License
The MIT License. Full License is [here](https://github.com/datastructures-js/heap/blob/master/LICENSE)
