import { LAYOUT_TYPE, MAX_SIZE_MARGIN } from "../constants";

export const isInRange = (target, value, margin = 0) => {
  return target >= value - margin && target <= value + margin;
};

const getDividingPoint = (line) => {
  const { startX, startY, endX } = line;

  return startX === endX ? startX : startY;
};

// const getIntersection = (line) => {
//   const { startX, startY, endX } = line;

//   return startX === endX ? startX : startY;
// };

export const getLayoutType = (rowLines, columnLines, width) => {
  if (!columnLines.length) {
    return LAYOUT_TYPE.row;
  }

  if (!rowLines.length) {
    return LAYOUT_TYPE.column;
  }

  const matchedLineWithMaxWidth = rowLines.find(
    (row) => Math.abs(row.startX - row.endX) > width - MAX_SIZE_MARGIN
  );

  return matchedLineWithMaxWidth ? LAYOUT_TYPE.rowC : LAYOUT_TYPE.columnC;
};

export const getFractionString = (lines, length) => {
  if (!lines.length) {
    return "";
  }

  const segments = lines.map((line) => getDividingPoint(line));

  segments.push(length - segments[segments.length - 1]);

  const fractionString = segments
    .map((segment) => `${((segment / length) * 10).toFixed(1)}fr`)
    .join(" ");

  return fractionString;
};

// export const getLayoutDivisions = (
//   layoutType,
//   intersection,
//   rowLines,
//   columnLines
// ) => {

//   }
// };
