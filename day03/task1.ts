import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const rl = readline.createInterface({
  input: fs.createReadStream(path.join("day03", "input.txt")),
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {
  const { starts, ends } = detectMulSignals(line);
  calculateResult(line, starts, ends);
});

rl.on("close", () => {
  console.log("File reading completed.");
  console.log({ result });
});

let result = 0;

const detectMulSignals = (
  line: string
): { starts: number[]; ends: number[] } => {
  const starts: number[] = [];
  const ends: number[] = [];

  const start = "mul(";
  const end = ")";

  for (let i = 4; i < line.length; i++) {
    const chars = line.slice(i - 4, i);

    if (chars === start) {
      starts.push(i - 4);
    } else if (line[i] === end) {
      ends.push(i);
    }
  }

  return { starts, ends };
};

const calculateResult = (line: string, starts: number[], ends: number[]) => {
  const mul = new RegExp(/^mul\(\d+,\d+\)$/);

  for (const i of starts) {
    for (const j of ends) {
      if (i < j) {
        const chars = line.slice(i, j + 1);
        const isMul = mul.test(chars);
        if (isMul) {
          const nums = chars.match(/\d+/g)?.map(Number) || [];
          result += nums[0] * nums[1];
        }
      }
    }
  }
};
