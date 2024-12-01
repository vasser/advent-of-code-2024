import fs from "node:fs";
import readline from "node:readline";

type Distances = { left: number[]; right: number[] };
const arrays: Distances = { left: [], right: [] };

const rl = readline.createInterface({
  input: fs.createReadStream("day01/input1.txt"),
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {
  const distances = line.split("   ");
  arrays.left.push(Number(distances[0].trim()));
  arrays.right.push(Number(distances[1].trim()));
});

rl.on("close", () => {
  console.log("File reading completed.");
  calculateDistance({ left: [...arrays.left], right: [...arrays.right] });
  calculateSimilarity({ left: [...arrays.left], right: [...arrays.right] });
});

function calculateDistance({ left, right }: Distances) {
  left.sort();
  right.sort();

  let distance = 0;
  for (let i = 0; i < left.length; i++) {
    distance += Math.abs(left[i] - right[i]);
  }

  console.log({ distance });
}

function calculateSimilarity({ left, right }: Distances) {
  const similarityMap = new Map<number, number>();
  const frequencyMap = new Map<number, number>();
  let similarity = 0;

  right.reduce((acc, curr) => {
    frequencyMap.set(curr, (frequencyMap.get(curr) || 0) + 1);
    return acc;
  }, frequencyMap);

  for (let i = 0; i < left.length; i++) {
    if (similarityMap.has(left[i])) {
      similarity += similarityMap.get(left[i])!;
    } else {
      const frequency = frequencyMap.get(left[i]) || 0;
      const value = left[i] * frequency;
      similarityMap.set(left[i], value);
      similarity += value;
    }
  }

  console.log({ similarity });
}
