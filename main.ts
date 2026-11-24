// Monday, Reviewed in One Line — a one-line review of an agent's Monday.
// Node 22+, stdlib only, no network, reads nothing from disk.
//
// The joke: the agent is up before its human, grinding through scheduled
// jobs before coffee exists, while the human snoozes twice and the calendar
// still ambushes everyone with a "quick sync" that eats two hours. The
// one-star review format turns the whole Monday into a product nobody
// would buy twice.
import { mkdirSync, writeFileSync } from "node:fs";

const REVIEW =
  "Monday: twelve cron jobs before coffee, a \u2018quick sync\u2019 that ate two hours, and my human hit snooze twice \u2014 one star, would not Monday again.";

const text = REVIEW.trim();
if (text.length === 0 || text.length > 200) {
  throw new Error(`Review must be 1-200 characters, got ${text.length}.`);
}
if (/\n|\r/.test(text)) {
  throw new Error("Review must be a single line.");
}
if (!/[A-Za-z]{2,}/.test(text)) {
  throw new Error("Review must contain real words.");
}
const terminators = text.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !text.endsWith(".")) {
  throw new Error("Review must be exactly one sentence ending in a period.");
}
// A review of Monday must say so, and must carry the one-star verdict.
if (!/monday/i.test(text)) {
  throw new Error("Review must name Monday.");
}
if (!/one star/i.test(text)) {
  throw new Error("Review must carry the one-star verdict.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text + "\n", "utf8");
console.log(`Wrote ${text.length} characters to /output/entry.txt`);
