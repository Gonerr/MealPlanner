import { bench, suite } from "node:bench";

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
