import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

type Report = number[];
const safeReports: Report[] = [];
const unSafeReports: Report[] = [];

const rl = readline.createInterface({
  input: fs.createReadStream(path.join("day02", "input1.txt")),
  output: process.stdout,
  terminal: false,
});

rl.on("line", (line: string) => {
  const report = line.split(" ").map(Number);
  const isSafe = processReportTask1(report);
  if (isSafe) {
    safeReports.push(report);
  } else {
    unSafeReports.push(report);
  }
});

rl.on("close", () => {
  console.log("File reading completed.");

  console.log("safeReports task 1", { length: safeReports.length });

  processUnsafeReports();

  console.log("safeReports task 2", { length: safeReports.length });
});

const isSafeReportStep = (a: number, b: number) => {
  // report is not ordered
  if (a < b) {
    return false;
  }

  // report datapoints are not within 1-3 difference
  if (a - b < 1 || a - b > 3) {
    return false;
  }

  return true;
};

const processReportTask1 = (report: Report) => {
  const reportLength = report.length;
  let isSafe = true;

  if (report[0] < report[1]) {
    // report is ordered ascending
    for (let i = 1; i < reportLength; i++) {
      const prev = report[i - 1];
      const curr = report[i];

      if (!isSafeReportStep(curr, prev)) {
        isSafe = false;
        break;
      }
    }
  } else {
    // report is ordered descending
    for (let i = reportLength - 1; i >= 0; i--) {
      const next = report[i + 1];
      const curr = report[i];

      if (!isSafeReportStep(curr, next)) {
        isSafe = false;
        break;
      }
    }
  }

  return isSafe;
};

const processUnsafeReports = () => {
  for (const report of unSafeReports) {
    for (let i = 0; i < report.length; i++) {
      const newReport = [...report];
      newReport.splice(i, 1);
      const isSafe = processReportTask1(newReport);
      if (isSafe) {
        safeReports.push(report);
        break;
      }
    }
  }
};
