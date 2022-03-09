import { Heap, MinHeap, MaxHeap, ICompare, IGetCompareValue } from '../index';

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

while (!carsHeap.isEmpty()) {
  console.log(carsHeap.extractRoot());
}

const numbersHeap = new MinHeap<number>();

interface IBid {
  id: number;
  value: number;
}
const getBidCompareValue: IGetCompareValue<IBid> = (bid: IBid) => bid.value;
const bidsHeap = new MaxHeap<IBid>(getBidCompareValue);

const numbers = [3, -2, 5, 0, -1, -5, 4];
numbers.forEach((num) => numbersHeap.insert(num));

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

while (!numbersHeap.isEmpty()) {
  console.log(numbersHeap.extractRoot());
}

while (!bidsHeap.isEmpty()) {
  console.log(bidsHeap.extractRoot());
}

cars.forEach((car) => carsHeap.insert(car));
numbers.forEach((num) => numbersHeap.insert(num));
bids.forEach((bid) => bidsHeap.insert(bid));

console.log(carsHeap.root());
console.log(numbersHeap.root());
console.log(bidsHeap.root());

console.log(carsHeap.leaf());
console.log(numbersHeap.leaf());
console.log(bidsHeap.leaf());

console.log(carsHeap.size()); // 7
console.log(numbersHeap.size()); // 7
console.log(bidsHeap.size()); // 7

console.log(carsHeap.sort());
console.log(numbersHeap.sort());
console.log(bidsHeap.sort());

console.log(carsHeap.isValid());
console.log(numbersHeap.isValid());
console.log(bidsHeap.isValid());

const heapifiedCars = Heap.heapify<ICar>(cars, compareCars);
console.log(heapifiedCars.isValid()); // true
console.log(cars);

const heapifiedNumbers = MinHeap.heapify<number>(numbers);
console.log(heapifiedNumbers.isValid()); // true
console.log(numbers);

const heapifiedBids = MaxHeap.heapify<IBid>(bids, (bid) => bid.value);
console.log(heapifiedBids.isValid()); // true
console.log(bids);

console.log(Heap.isHeapified<ICar>(cars, compareCars)); // true
console.log(MinHeap.isHeapified<number>(numbers)); // true
console.log(MaxHeap.isHeapified<IBid>(bids, (bid) => bid.value)); // true
