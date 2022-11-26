import isInRange from "./isInRange";

import { LINE_MERGE_LIMIT, LINE_TYPE, MAX_SIZE_MARGIN } from "../constants";

const sortAndMergeLines = (lines, lineLength) => {
  if (!lines.length) {
    return lines;
  }

  const copiedLines = [...lines];
  const lineType =
    copiedLines[0]?.startY === copiedLines[0]?.endY
      ? LINE_TYPE.row
      : LINE_TYPE.column;

  return copiedLines
    .sort((a, b) => {
      if (lineType === LINE_TYPE.row) {
        return a.startY - b.startY;
      }

      return a.startX - b.startX;
    })
    .reduce((result, line, index, array) => {
      const { startX, startY } = line;
      const currentPoint = lineType === LINE_TYPE.row ? startY : startX;

      if (
        currentPoint < MAX_SIZE_MARGIN ||
        currentPoint > lineLength - MAX_SIZE_MARGIN
      ) {
        return result;
      }

      if (index === 0) {
        result.push(line);

        return result;
      }

      const prevPoint =
        lineType === LINE_TYPE.row
          ? array[index - 1].startY
          : array[index - 1].startX;

      const isMergeable = isInRange(currentPoint, prevPoint, LINE_MERGE_LIMIT);

      if (isMergeable) {
        return result;
      }

      result.push(line);

      return result;
    }, []);
};

export default sortAndMergeLines;
