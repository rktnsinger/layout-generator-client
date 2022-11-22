import { FRAME_TYPE, MAX_SIZE_MARGIN } from "../constants";

const checkMainFrame = (rowLines, columnLines, width) => {
  if (!columnLines.length) {
    return FRAME_TYPE.width;
  }

  if (!rowLines.length) {
    return FRAME_TYPE.height;
  }

  const matchedLineWithMaxWidth = rowLines.find(
    (row) => Math.abs(row.startX - row.endX) > width - MAX_SIZE_MARGIN
  );

  return matchedLineWithMaxWidth ? FRAME_TYPE.width : FRAME_TYPE.height;
};

const generateLayoutProportion = (size, frame) => {
  const { width, height } = size;
  const { rowLines, columnLines } = frame;

  const mainFrame = checkMainFrame(rowLines, columnLines, width);

  const widthProportion = [];
  const heightProportion = [];

  // 가로선 비율 계산
  const dividingRowPoints = rowLines.map((line) => line.startY);
  let currentHeight = height;

  for (let i = rowLines.length; i >= 0; i--) {
    if (i === 0) {
      heightProportion.unshift(((currentHeight / height) * 10).toFixed(1));

      break;
    }

    const tempHeight = currentHeight - dividingRowPoints[i - 1];
    heightProportion.unshift(((tempHeight / height) * 10).toFixed(1));

    currentHeight -= tempHeight;
  }

  // 세로선 비율 계산
  const dividingColumnPoints = columnLines.map((line) => line.startX);
  let currentWidth = width;

  // TODO: reduce로 변경 가능할 것 같음
  for (let i = columnLines.length; i >= 0; i--) {
    if (i === 0) {
      widthProportion.unshift(((currentWidth / height) * 10).toFixed(1));

      break;
    }

    const tempWidth = currentWidth - dividingColumnPoints[i - 1];
    widthProportion.unshift(((tempWidth / height) * 10).toFixed(1));

    currentWidth -= tempWidth;
  }

  return { widthProportion, heightProportion };
};

export default generateLayoutProportion;
