import { setTimeout } from "node:timers/promises";
const fnA = setTimeout;
const fnB = setTimeout;

const wrap = (fn) => (isEnabled ? timerify(fn) : fn);
const wrappedA = wrap(fnA);
const wrappedB = wrap(fnB);

async function myApplication() {
  await Promise.all([wrappedA(100), wrappedA(200), wrappedA(300)]);
  await wrappedB(500);
}

const perfObserver = new Performance(isEnabled);

await myApplication();

await perfObserver.finalize();
console.log(perfObserver.getTable());
console.log("Total running time:", prettyMs(perfObserver.getTotalTime()));

perfObserver.reset();
