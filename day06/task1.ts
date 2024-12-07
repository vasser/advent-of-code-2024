import fs from "node:fs";
import path from "node:path";

const file = fs
  .readFileSync(path.join("day06", "input.txt"))
  .toString()
  .split("\n")
  .filter(Boolean);

const obstacle = "#";

// we need to find the starting point, coordinates of ^
// hardcoding it to skip the search
const position = { row: 85, column: 61 };

const positions = new Set<string>();
positions.add(JSON.stringify(position));

/**
 * if we want to move to the right, we need to increase the column
 * if we want to move to the left, we need to decrease the column
 * if we want to move down, we need to increase the row
 * if we want to move down, we need to decrease the row
 */
const shift = { row: -1, columns: 0 };

/**
 * Should turn 90 degrees to the right
 */
const makeTurn = () => {
  if (Math.abs(shift.row) === 1) {
    shift.columns = shift.row * -1;
    shift.row = 0;
  } else {
    shift.row = shift.columns;
    shift.columns = 0;
  }
};

const buildPath = () => {
  while (true) {
    const next =
      file?.[position.row + shift.row]?.[position.column + shift.columns];

    if (!next) {
      break;
    }

    if (next === obstacle) {
      makeTurn();
    }

    position.row += shift.row;
    position.column += shift.columns;

    positions.add(JSON.stringify(position));
  }
};

buildPath();

console.log({ distinctPositions: positions.size });
