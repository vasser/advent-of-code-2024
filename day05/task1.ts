import fs from "node:fs";
import path from "node:path";

const json = JSON.parse(
  fs.readFileSync(path.join("day05", "input.json")).toString()
);

const rules: [number, number][] = json.rules;
const sections: number[][] = json.sections;

const rulesMap = new Map<number, number[]>();
for (const [a, b] of rules) {
  if (!rulesMap.has(a)) {
    rulesMap.set(a, [b]);
  } else {
    rulesMap.get(a)?.push(b);
  }
}

const isValidSection = (section: number[]): boolean => {
  let valid: boolean = true;

  for (let i = 0; i < section.length; i++) {
    const current = section[i];
    let previous: number | undefined;
    let next: number | undefined;

    if (i !== 0) {
      previous = section[i - 1];
    }

    if (i !== section.length - 1) {
      next = section[i + 1];
    }

    if (previous) {
      if (rulesMap.get(previous)?.includes(current)) {
        valid = true;
      } else {
        valid = false;
      }
    }

    if (next) {
      if (rulesMap.get(current)?.includes(next)) {
        valid = true;
      } else {
        valid = false;
      }
    }

    if (!valid) {
      break;
    }
  }

  return valid;
};

const result = sections
  .filter(isValidSection)
  .map((section) => section[Math.floor(section.length / 2)])
  .reduce((acc, curr) => acc + curr, 0);

console.log({ result });
