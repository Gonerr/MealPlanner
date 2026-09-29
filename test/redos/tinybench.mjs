import { Bench } from "tinybench";

const strings = ["aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh"];

function plus(strings) {
  let result = "";
  for (const str of strings) result += str;
  return result;
}

function join(strings) {
  return strings.join("");
}

function concat(strings) {
  return "".concat(...arguments);
}

const suite = new Bench();

suite
  .add("plus", function () {
    plus(strings);
  })
  .add("join", function () {
    join(strings);
  })
  .add("concat", function () {
    concat(strings);
  });

suite.addEventListener("complete", function () {
  console.table(suite.table());
});

suite.run();

// JavaScript выполняется в JIT-компилируемом runtime.
// V8 постепенно собирает информацию о коде и может его оптимизировать