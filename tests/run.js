import assert from "node:assert";
import { baseOf, widthOf, bitsOf } from "../forframe.js";
import { step, close } from "../framerun.js";
import { render } from "../app.js";

const base = {
  budget: 1, cap: 3,
  state: { blocks: [], asks: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "put", value: 5 }],
  bad_value_code: "E_BAD_VALUE", bad_block_code: "E_BAD_BLOCK",
  no_block_code: "E_NO_BLOCK", event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("baseOf returns a number", () => {
  assert.strictEqual(typeof baseOf([5, 7]), "number");
});

check("widthOf returns a number", () => {
  assert.strictEqual(typeof widthOf([5, 7]), "number");
});

check("bitsOf returns a number", () => {
  assert.strictEqual(typeof bitsOf([[1, [5, 7]]]), "number");
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
