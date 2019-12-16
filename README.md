# @datastructures-js/heap
[![build:?](https://travis-ci.org/datastructures-js/heap.svg?branch=master)](https://travis-ci.org/datastructures-js/heap) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/heap)

a complete javascript implementation for the Min/Max Heap data structures & Heap Sort algorithm.

![heap](https://user-images.githubusercontent.com/6517308/70871547-bd852900-1f65-11ea-909f-86f4d090f152.jpg)

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

```js
const minHeap = new MinHeap();

const maxHeap = new MaxHeap();
```

#### .heapify(list)
converts an array of objects to a heap.

the function can read a list elements that are **number**, **string**, or a **serialized heap node** like `{ key: 10, value: { someProp: 'someVal' } }`.

```js
const list = [
  50,
  80,
  { key: 30, value: 'something' },
  90,
  { key: 60, value: null },
  40,
  { key: 20, value: { name: 'test' } }
];

const minHeap = MinHeap.heapify(list);

const maxHeap = MaxHeap.heapify(list);
```

### .insert(key, value)
insert a node into the heap.

**key** can be a **number** or a **string**

**value** can be any **object** type.

a heap node is created as an instance of **NodeHeap**.

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

maxHeap.insert(50);
maxHeap.insert(80);
maxHeap.insert(30, 'something');
maxHeap.insert(90);
maxHeap.insert(60, null);
maxHeap.insert(40);
maxHeap.insert(20, { name: 'test' });
```

### HeapNode
returned with .root() & .extractRoot() functions. It implements the following interface

#### .getKey()
returns the node's key (number or string) that is used to compare with other.

#### .getValue()
returns the value that is associated with the key.

#### .serialize()
returns an object literal of key/value of the node.

### .root()
returns (peeks) the root node without removing it.

```js
const min = minHeap.root();
console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }
console.log(min.serialize()); // { key: 20, value: { name: 'test' } }

const max = maxHeap.root();
console.log(max.getKey()); // 90
console.log(max.getValue()); // undefined
console.log(max.serialize()); // { key: 90, value: undefined }
```

### .extractRoot()
returns and remove the root node in the heap.

```js
const min = minHeap.extractRoot();
console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }
console.log(min.serialize()); // { key: 20, value: { name: 'test' } }
console.log(minHeap.root().getKey()); // 30

const max = maxHeap.extractRoot();
console.log(max.getKey()); // 90
console.log(max.getValue()); // undefined
console.log(max.serialize()); // { key: 20, value: undefined }
console.log(maxHeap.root().getKey()); // 80
```

### .size()
returns the number of nodes in the heap.

```js
console.log(minHeap.size()); // 6
console.log(maxHeap.size()); // 6
```

### .clone()
creates a shallow copy of a heap by slicing the nodes array and passing it to a new heap instance. 

```js
const minHeapClone = minHeap.clone();
minHeapClone.extractRoot();

console.log(minHeapClone.root().getKey()); // 40
console.log(minHeap.root().getKey()); // 30
```

### .sort()
implements Heap Sort and sorts a **Max Heap in ascneding order** or a **Min Heap in descending order**.

calling .sort() directly on a heap will mutate its nodes location. To avoid that, you can sort a shallow copy of the heap.

```js
const sortedAsc = maxHeap.clone().sort(); // does not mutate the heap structure
const sortedDesc = minHeap.clone().sort(); // does not mutate the heap structure
```

If you are using this npm for the purpose of sorting a list of elements using Heap Sort, you can do it like this

```js
const sortedAsc = MaxHeap.heapify(unsortedList).sort();
const sortedDesc = MinHeap.heapify(unsortedList).sort();
```

### .clear()
clears the nodes in the heap

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
