# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [4.3.3] - 2024-01-07
### Fixed
- default compare function for MinHeap

## [4.3.2] - 2023-06-19
### Fixed
- ts types.

## [4.3.1] - 2023-01-08
### Fixed
- lint config.

## [4.3.0] - 2023-01-08
### Added
- `toArray` to convert the heap into an array without sorting.

## [4.2.2] - 2022-12-24
### Fixed
- add iterable for ts definitions.

## [4.2.1] - 2022-12-23
### Fixed
- typo in readme.

## [4.2.0] - 2022-12-23
### Added
- `Symbol.iterator` to iterate on heaps pop.

### Fixed
- `.fix()` to also fix heap leaf value in addition to nodes positions. 

## [4.1.2] - 2022-09-04
### Fixed
- Optimize `.fix()` to run in O(n) runtime instead of O(n*log(n)). 

## [4.1.1] - 2022-08-15
### Fixed
- add types to package.json

## [4.1.0] - 2022-05-30
### Added
- push, pop & top as alias methods for insert, extractRoot & root

## [4.0.2] - 2022-03-13
### Fixed
- ts types (again).

## [4.0.1] - 2022-03-09
### Fixed
- ts types.

## [4.0.0] - 2022-02-21
### Changed
- better code, better world.

## [3.2.0] - 2021-08-05
### Added
- CustomHeap to allow constructing a heap with a custom comparator callback.

## [3.1.1] - 2021-06-20

### Fixed
- index.d.ts

## [3.1.0] - 2021-06-15

### Added
- typescript.

## [3.0.1] - 2021-03-28

### Fixed
- Readme

## [3.0.0] - 2020-01-17

### Changed
- simplified heap nodes. preserves numbers and strings, and use object literal for key:value.
- `.heapify` static function now heapify the input list as well as returning a heap insatnce.

### Added
- `.fix()` to fix positions of nodes in the heap.
- `.isValid` to validate heap nodes are in right positions.
- `.isHeapified` static function to valida if a given list is heapified.

### Fixed
- jsdoc
- README

## [2.0.0] - 2020-04-06
### Changed
- remove none-standard method `.serialize()`. 

### Fixed
- return inserted node in Min/Max Heap.
- README
- jsdoc

## [1.2.0] - 2020-03-07
### Added
- `.leaf()` to get the max node in a MinHeap or the min node in a MaxHeap. 

## [1.1.2] - 2020-03-06
### Fixed
- params naming.

## [1.1.1] - 2019-12-24
### Fixed
- add a table of content to readme

## [1.1.0] - 2019-12-16
### Added
`.serialize()` to convert a heap to a list of serialized nodes.

### Fixed
- improve README.

## [1.0.1] - 2019-12-16
### Fixed
- Readme & Description.

## [1.0.0] - 2019-12-15
### Added
- initial release
