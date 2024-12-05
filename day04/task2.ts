import fs from "node:fs";
import path from "node:path";

const file = fs
  .readFileSync(path.join("day04", "input.txt"))
  .toString()
  .split("\n")
  .filter(Boolean);

const variations = ["M.M.A.S.S", "M.S.A.M.S", "S.M.A.S.M", "S.S.A.M.M"];

const xMasSearch = (file: string[]): number => {
  let result = 0;

  for (let i = 0; i < file[0].length - 2; i++) {
    let str = "";
    for (let j = 0; j < file.length - 2; j++) {
      str =
        `${file[j][i]}.${file[j][i + 2]}` +
        `.${file[j + 1][i + 1]}.` +
        `${file[j + 2][i]}.${file[j + 2][i + 2]}`; // 3x3 matrix

      if (variations.includes(str)) {
        result++;
      }
      str = "";
    }
  }

  return result;
};

const result = xMasSearch(file);

console.log({ result });
