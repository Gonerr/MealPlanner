import EasyTable from "easy-table";
import { performance, PerformanceObserver } from "node:perf_hooks";

export const timerify = (fn) => (isEnabled ? performance.timerify(fn) : fn);

export class Performance {
  constructor(isEnabled) {
    if (isEnabled) {
      this.startTime = performance.now();

      this.fnObserver = new PerformanceObserver((items) => {
        items.getEntries().forEach((entry) => this.entries.push(entry));
      });
      this.fnObserver.observe({ entryTypes: ["function"] });
    }
  }

  getTable() {
    const entriesByName = this.entries;
    const table = new EasyTable();
    // ..build table..
    return table.toString().trim();
  }

  getTotalTime() {
    return this.endTime - this.startTime;
  }

  async finalize() {
    this.endTime = performance.now();
  }
}
