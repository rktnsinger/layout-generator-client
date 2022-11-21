import { MAX_SIZE_MARGIN } from "../constants";

const checkMainFrame = (rowLines, columnLines, width) => {
  if (!columnLines.length) {
    return "width";
  }

  if (!rowLines.length) {
    return "height";
  }

  const matchedLineWithMaxWidth = rowLines.find(
    (row) => Math.abs(row.startX - row.endX) > width - MAX_SIZE_MARGIN
  );

  return matchedLineWithMaxWidth ? "width" : "height";
};

const generateLayoutProportion = (size, frame) => {
  const { width, height } = size;
  const { rowLines, columnLines } = frame;

  const mainFrame = checkMainFrame(rowLines, columnLines, width);

  const widthProportion = [];
  const heightProportion = [];

  // 2-a. 가로 프레임만 있는 레이아웃일 경우
  if (mainFrame === "width" && !columnLines.length) {
    const dividingPoints = rowLines.map((line) => line.startY);
    let currentHeight = height;

    // TODO: reduce로 변경 가능할 것 같음
    for (let i = rowLines.length; i >= 0; i--) {
      if (i === 0) {
        heightProportion.unshift(((currentHeight / height) * 10).toFixed(1));

        break;
      }

      const tempHeight = currentHeight - dividingPoints[i - 1];
      heightProportion.unshift(((tempHeight / height) * 10).toFixed(1));

      currentHeight -= tempHeight;
    }
  } else if (mainFrame === "height" && !rowLines.length) {
    const dividingPoints = columnLines.map((line) => line.startX);
    let currentWidth = width;

    for (let i = columnLines.length; i >= 0; i--) {
      if (i === 0) {
        widthProportion.unshift(((currentWidth / height) * 10).toFixed(1));

        break;
      }

      const tempWidth = currentWidth - dividingPoints[i - 1];
      widthProportion.unshift(((tempWidth / height) * 10).toFixed(1));

      currentWidth -= tempWidth;
    }
  }

  return { widthProportion, heightProportion };
};

export default generateLayoutProportion;
