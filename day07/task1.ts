import fs from "node:fs";
import path from "node:path";

const file = fs
  .readFileSync(path.join("day07", "input.txt"))
  .toString()
  .split("\n")
  .filter(Boolean);

const operators: { result: number; values: number[] }[] = file.map((line) => {
  const parts = line.split(": ");
  const result = parseInt(parts[0]);
  const values = parts[1].split(" ").map((v) => parseInt(v));

  return { result, values };
});

const postionsVariationsCache = new Map<number, string[]>();

// returns all possible variations of 0 and 1 for a given length
// we will count 0 as + and 1 as * in the expression
const postionsVariations = (length: number): string[] => {
  if (postionsVariationsCache.has(length)) {
    return postionsVariationsCache.get(length) as string[];
  }

  const result: string[] = [];
  for (let i = 0; i < 2 ** length; i++) {
    result.push(i.toString(2).padStart(length, "0"));
  }

  postionsVariationsCache.set(length, result);
  return result;
};

let matches = 0;

const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;

for (const { result, values } of operators) {
  const variations = postionsVariations(values.length - 1);

  for (const variation of variations) {
    const [first, ...rest] = values;

    const r = rest.reduce((acc, value, i) => {
      const operator = variation[i] === "0" ? add : multiply;
      return operator(acc, value);
    }, first);

    if (r === result) {
      matches += r;
      break;
    }
  }
}

console.log(matches);
