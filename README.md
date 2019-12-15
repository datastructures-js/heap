# @datastructures-js/heap
Javscript implementation for the Min/Max Heap Data Structures & Heap Sort Algorithm.

[![build:?](https://travis-ci.org/datastructures-js/heap.svg?branch=master)](https://travis-ci.org/datastructures-js/heap) 
[![npm](https://img.shields.io/npm/v/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap)
[![npm](https://img.shields.io/npm/dm/@datastructures-js/heap.svg)](https://www.npmjs.com/package/@datastructures-js/heap) [![npm](https://img.shields.io/badge/node-%3E=%206.0-blue.svg)](https://www.npmjs.com/package/@datastructures-js/heap)

# API

## install
```sh
npm install --save @datastructures-js/heap
```

## require/import
### require
```js
const { MinHeap, MaxHeap } = require('@datastructures-js/heap');
```

### import
```js
import { MinHeap, MaxHeap } from '@datastructures-js/heap';
```

## Create a Heap

### Create an empty instance
```js
const minHeap = new MinHeap();

const maxHeap = new MaxHeap();
```

### .heapify(list)
A static function that converts an array of items into a heap structure. The list items can be **number**, **string**, or a serialized heap node like `{ key: 10, value: { someProp: 'someVal' } }`.

```js
const list = [50, 30, 80, 1, 7, 8];

const minHeap = MinHeap.heapify(list);

const maxHeap = MaxHeap.heapify(list);
```

## .insert(key, value)
insert a node into the heap. Heap nodes are instances of the class NodeHeap.
```js
minHeap.insert(50);
minHeap.insert(80);
minHeap.insert(30, 'something');
minHeap.insert(90);
minHeap.insert(60, null);
minHeap.insert(40);
minHeap.insert(20, { name: 'test' });
```

## .root()
returns (peeks) the root node without removing it. The returned node is an instance of **NodeHeap** class which implements the following interface:

### .getKey()
returns the node's key (number or string) that is used to compare with other nodes key.

### .getValue()
returns the value that is associated with the key. Value can be any object type.

### .serialize()
returns an object literal of key/value of the node.

```js
const min = minHeap.root();

console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }
console.log(min.serialize()); // { key: 20, value: { name: 'test' } }
```

## .extractRoot()
returns and remove the root node in the heap.

```js
const min = minHeap.extractRoot();

console.log(min.getKey()); // 20
console.log(min.getValue()); // { name: 'test' }
console.log(min.serialize()); // { key: 20, value: { name: 'test' } }

console.log(minHeap.root().getKey()); // 30
```

## .size()
returns the number of nodes in the heap
```js
console.log(minHeap.size()); // 6
```

## .sort()
Sorting is implemented for both Max Heap (sorting keys in ascending order) & Min Heap (sorting keys in descending order). Calling sort on the heap directly mutates its nodes order. To avoid that and sort a heap while maintaining the structure, you can sort a clone.

```js
const sortedDesc = minHeap.clone().sort();
const sortedAsc = maxHeap.clone().sort();
```
## .clear()

## .clone()
Creates a shallow clone of a heap by slicing the nodes array and passing it to a new heap instance. 
