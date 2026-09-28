import { bench } from "node:bench";

const arr = Array(1000).fill("hello");

function concatPlus(arr) {
  let result = "";

  for (const item of arr) {
    result += item;
  }

  return result;
}

function calculate(n) {
  let result = 0;

  for (let i = 0; i < n; i++) {
    result += Math.sqrt(i);
  }

  return result;
}

function concatJoin(arr) {
  return arr.join("");
}

bench("concat with +", () => {
  concatPlus(arr);
});

bench("concat with join", () => {
  concatJoin(arr);
});

for (let i = 0; i < 20; i++) {
  const start = performance.now();

  calculate(1000000);

  console.log(i, performance.now() - start);
}
