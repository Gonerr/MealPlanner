import Benchmark from "benchmark";
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

const suite = new Benchmark.Suite();

suite
  .add("plus", function () {
    plus(strings);
  })
  .add("join", function () {
    join(strings);
  })
  .add("concat", function () {
    concat(strings);
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run();

//
