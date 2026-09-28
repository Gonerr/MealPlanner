function concatPlus(arr) {
  let result = "";
  for (const item of arr) {
    result += item;
  }

  return result;
}

function concatJoin(arr) {
  return arr.join("");
}

const arr = Array(1000).fill("hello");

// const start = performance.now();

// for (let i = 0; i < 100000; i++) {
//   concatPlus(arr);
// }

// const end = performance.now();

// console.log(end - start);
