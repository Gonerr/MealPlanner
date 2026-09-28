function regexExpression() {
  for (let n = 10; n <= 26; n += 2) {
    const value = "a".repeat(n) + "!";
    const start = performance.now();
    /^(a+)+$/.test(value);
    const elapsed = performance.now() - start;
    console.log(n, elapsed.toFixed(3));
    if (elapsed > 100) break;
  }
}

function testingBenchmark() {
  const { bench, suite } = require("node:bench");

  suite("URL", () => {
    const input = "https://example.com/a?b=c";

    bench(
      "construct",
      {
        samples: 30,
        params: { input: "short" },
      },
      (b) => {
        const operations = 10000;
        let totalLength = 0;

        b.start();
        for (let i = 0; i < operations; i++) {
          totalLength += new URL(input).href.length;
        }
        b.end(operations);

        if (totalLength !== operations * input.length) {
          throw new Error("Unexpected URL result");
        }
      }
    );
  });
}
