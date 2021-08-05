# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
