import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

type Report = number[];
const reports: Report[] = [];
const safeReports: Report[] = [];

const rl = readline.createInterface({
  input: fs.createReadStream(path.join("day02", "input1.txt")),
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {
  const report = line.split(" ").map(Number);
  processReportTask1(report);
});

rl.on("close", () => {
  console.log("File reading completed.");
  console.log("safeReports", { safeReports, length: safeReports.length });
});

const processReportTask1 = (report: Report) => {
  const reportLength = report.length;
  let isSafe = true;

  if (report[0] < report[1]) {
    for (let i = 1; i < reportLength; i++) {
      const prev = report[i - 1];
      const curr = report[i];
      if (curr < prev) {
        isSafe = false;
        break;
      }

      if (curr - prev < 1 || curr - prev > 3) {
        isSafe = false;
        break;
      }
    }
  } else {
    for (let i = reportLength - 1; i >= 0; i--) {
      const next = report[i + 1];
      const curr = report[i];
      if (curr < next) {
        isSafe = false;
        break;
      }

      if (curr - next < 1 || curr - next > 3) {
        isSafe = false;
        break;
      }
    }
  }

  if (isSafe) {
    safeReports.push(report);
  }
};
