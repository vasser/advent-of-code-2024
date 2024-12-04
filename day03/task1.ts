import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const rl = readline.createInterface({
  // to make it pass for both task1 and task2
  // glued all lines in one line
  input: fs.createReadStream(path.join("day03", "input.txt")),
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {
  // task 1
  const { starts, ends } = detectMulSignals(line);
  calculateResult(line, starts, ends);

  // task 2
  calculateResultWithInterruptions(line);
});

rl.on("close", () => {
  console.log("File reading completed.");
  console.log({ result, result2 });
});

let result = 0;
let result2 = 0;

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

/**
 * For second task used regex to detect valid mul signals
 */
const calculateResultWithInterruptions = (line: string) => {
  const enabledInstructions: string[] = [];

  const chunks = line.split("don't()") || [line];

  // instructions before the first interruption are always enabled
  enabledInstructions.push(chunks[0]);

  for (const chunk of chunks.slice(1)) {
    // instructions after the interruption are enabled if they contain "do()"
    const index = chunk.indexOf("do()");
    if (index >= 0) {
      enabledInstructions.push(chunk.slice(index + 4));
    }
  }

  for (const line of enabledInstructions) {
    const validMuls = line.match(/mul\((\d+),(\d+)\)/g) || [];

    for (const mul of validMuls) {
      const nums = mul.match(/\d+/g)?.map(Number) || [];
      result2 += nums[0] * nums[1];
    }
  }
};

/**
 * For first task used string manipulation with
 * starts and ends to detect valid mul signals
 */
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
