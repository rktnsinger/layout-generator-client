/* eslint-disable react/no-array-index-key */
import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";

import { detectedLinesState, imageSizeState } from "../../recoil/store";
import {
  getFractionString,
  getLayoutType,
  isProperLineData,
} from "../../utils/layoutUtils";
import isInRange from "../../utils/isInRange";

import { DIVISION_TYPE, LAYOUT_TYPE, ERROR } from "../../constants";

export default function LayoutPreview() {
  const imageSize = useRecoilValue(imageSizeState);
  const detectedLines = useRecoilValue(detectedLinesState);

  const { width: imageWidth, height: imageHeight } = imageSize;
  const { rowLines, columnLines } = detectedLines;
  const isProperLine = isProperLineData(rowLines, columnLines);

  if (!isProperLine) {
    return <Navigate to="/error" state={ERROR.invalidLine} />;
  }

  const layoutType = getLayoutType(rowLines, columnLines, imageWidth);
  const gridTemplateRows = getFractionString(rowLines, imageHeight);
  const gridTemplateColumns = getFractionString(columnLines, imageWidth);

  const divisions = [];
  let currentDivision = DIVISION_TYPE.full;
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
            <div key={index}>{index + 1}</div>
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
            <div key={index}>{index + 1}</div>
          ))}
        </section>
      );

    case LAYOUT_TYPE.rowC:
      while (divisions.length < rowLines.length + columnLines.length + 1) {
        intersection = columnLines[0].endY;

        if (currentDivision === DIVISION_TYPE.full) {
          divisions.push(DIVISION_TYPE.full);

          if (isInRange(rowLines[currentLineIndex].startY, intersection, 20)) {
            currentDivision = DIVISION_TYPE.partial;
            intersectionIndex = currentLineIndex;
            currentLineIndex = 0;
          } else {
            currentLineIndex += 1;
          }
        }

        if (currentDivision === DIVISION_TYPE.partial) {
          if (columnLines.length - 1 === currentLineIndex) {
            divisions.push(DIVISION_TYPE.partial, DIVISION_TYPE.partial);

            currentDivision = DIVISION_TYPE.full;
            currentLineIndex = intersectionIndex + 1;
          } else {
            divisions.push(DIVISION_TYPE.partial);

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
                key={`${div}-${index}`}
                style={{ gridColumn: `1 / ${columnLines.length + 2}` }}
              >
                {index + 1}
              </div>
            ) : (
              <div key={`${div}-${index}`}>{index + 1}</div>
            );
          })}
        </section>
      );

    default:
      return <Navigate to="/error" state={ERROR.notSupport} />;
  }
}
