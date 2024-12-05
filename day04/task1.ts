import fs from "node:fs";
import path from "node:path";

const file = fs
  .readFileSync(path.join("day04", "input.txt"))
  .toString()
  .split("\n")
  .filter(Boolean);

const word1 = "XMAS";
const word2 = "SAMX";

const searchInArray = (array: string[]): number => {
  let result = 0;

  for (const line of array) {
    result += line.match(/XMAS/g)?.length || 0;
    result += line.match(/SAMX/g)?.length || 0;
  }

  return result;
};

const horizontalSearch = (file: string[]) => {
  return searchInArray(file);
};

const verticalSearch = (file: string[]): number => {
  const columns: string[] = [];

  for (let i = 0; i < file[0].length; i++) {
    columns[i] = "";
    for (let j = 0; j < file.length; j++) {
      columns[i] += file[j][i];
    }
  }

  return searchInArray(columns);
};

// I'm too lazy to refactor this function
// and make it in 1 loop
const diagonalSearch = (file: string[]): number => {
  let result = 0;

  // diagonal search right to left
  for (let i = 0; i < file[0].length - 3; i++) {
    let str = "";
    for (let j = 0; j < file.length - 3; j++) {
      str = `${file[j][i]}${file[j + 1][i + 1]}${file[j + 2][i + 2]}${
        file[j + 3][i + 3]
      }`;

      if (str.includes(word1) || str.includes(word2)) {
        result++;
      }
      str = "";
    }
  }

  // diagonal search left to right
  for (let i = 3; i < file[0].length; i++) {
    let str = "";
    for (let j = 0; j < file.length - 3; j++) {
      str = `${file[j][i]}${file[j + 1][i - 1]}${file[j + 2][i - 2]}${
        file[j + 3][i - 3]
      }`;

      if (str.includes(word1) || str.includes(word2)) {
        result++;
      }
      str = "";
    }
  }

  return result;
};

let result = 0;

result += horizontalSearch(file);
result += verticalSearch(file);
result += diagonalSearch(file);

console.log({ result });
