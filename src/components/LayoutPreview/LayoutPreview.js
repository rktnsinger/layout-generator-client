import React from "react";
import { useRecoilValue } from "recoil";

import { detectedLinesState, imageSizeState } from "../../recoil/store";
import {
  getFractionString,
  getLayoutType,
  isInRange,
} from "../../utils/layout";

import { DIVISION_TYPE, LAYOUT_TYPE } from "../../constants";

export default function LayoutPreview() {
  const imageSize = useRecoilValue(imageSizeState);
  const detectedLines = useRecoilValue(detectedLinesState);

  const { width: imageWidth, height: imageHeight } = imageSize;
  const { rowLines, columnLines } = detectedLines;
  const layoutType = getLayoutType(rowLines, columnLines, imageWidth);
  const gridTemplateRows = getFractionString(rowLines, imageHeight);
  const gridTemplateColumns = getFractionString(columnLines, imageWidth);

  const divisions = [];
  const { full, partial } = DIVISION_TYPE;
  let currentDivision = full;
  let currentLineIndex = 0;
  let intersection = 0;
  let intersectionIndex = 0;

  switch (layoutType) {
    case LAYOUT_TYPE.row:
      return (
        <section
          style={{
            display: "grid",
            gridTemplateRows,
          }}
        >
          {Array.from({ length: rowLines.length + 1 }).map((item, index) => (
            <div key={`${index * 1}`}>{index + 1}</div>
          ))}
        </section>
      );

    case LAYOUT_TYPE.column:
      return (
        <section
          style={{
            display: "grid",
            gridTemplateColumns,
          }}
        >
          {Array.from({ length: columnLines.length + 1 }).map((item, index) => (
            <div key={`${index * 1}`}>{index + 1}</div>
          ))}
        </section>
      );

    case LAYOUT_TYPE.rowC:
      while (divisions.length < rowLines.length + columnLines.length + 1) {
        intersection = columnLines[0].endY;

        if (currentDivision === full) {
          divisions.push(full);

          if (isInRange(rowLines[currentLineIndex].startY, intersection, 10)) {
            currentDivision = partial;
            intersectionIndex = currentLineIndex;
            currentLineIndex = 0;
          } else {
            currentLineIndex += 1;
          }
        }

        if (currentDivision === partial) {
          if (columnLines.length - 1 === currentLineIndex) {
            divisions.push(partial, partial);

            currentDivision = full;
            currentLineIndex = intersectionIndex + 1;
          } else {
            divisions.push(partial);

            currentLineIndex += 1;
          }
        }
      }

      return (
        <section
          style={{
            display: "grid",
            gridTemplateRows,
            gridTemplateColumns,
          }}
        >
          {divisions.map((div, index) => {
            return div === DIVISION_TYPE.full ? (
              <div
                key={`div${index * 1}`}
                style={{ gridColumn: `1 / ${columnLines.length + 2}` }}
              >
                {index + 1}
              </div>
            ) : (
              <div key={`div${index * 1}`}>{index + 1}</div>
            );
          })}
        </section>
      );

    default:
      return null;
  }
}
