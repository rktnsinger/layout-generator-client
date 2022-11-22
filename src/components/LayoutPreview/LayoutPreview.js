import React from "react";
import { FRAME_TYPE, MAX_SIZE_MARGIN } from "../../constants";
import { mockSize, mockFrame } from "../../mockLayout";
import generateLayoutProportion from "../../utils/generateLayoutProportion";

export default function LayoutPreview() {
  const mainFrame = FRAME_TYPE.width;
  const { rowLines, columnLines } = mockFrame;
  const { width, height } = mockSize;

  // 너비, 길이의 비율 구하고, css 속성으로 매핑하기
  const { heightProportion, widthProportion } = generateLayoutProportion(
    mockSize,
    mockFrame
  );
  let gridTemplateRows = "";
  let gridTemplateColumns = "";

  heightProportion.forEach((proportion) => {
    gridTemplateRows += `${proportion}fr `;
  });
  widthProportion.forEach((proportion) => {
    gridTemplateColumns += `${proportion}fr `;
  });

  // 렌더링될 레이아웃 구획 추출하기
  const layoutDivisions = [];
  const joinedLines = [...rowLines, ...columnLines].sort(
    (a, b) => a.startX - b.startX
  );
  for (let i = 0; i < joinedLines.length; i++) {
    const { startX, startY, endX, endY } = joinedLines[i];

    if (Math.abs(startX - endX) > width - MAX_SIZE_MARGIN) {
      if (layoutDivisions[i - 1] === FRAME_TYPE.height) {
        layoutDivisions.push(FRAME_TYPE.height, FRAME_TYPE.width);
      } else {
        layoutDivisions.push(FRAME_TYPE.width);
      }
    } else {
      layoutDivisions.push(FRAME_TYPE.height);
    }
  }

  switch (mainFrame) {
    case FRAME_TYPE.width:
      if (!columnLines.length) {
        return (
          <section
            style={{
              display: "grid",
              gridTemplateRows,
            }}
          >
            {heightProportion?.map((proportion, index) => (
              <div key={`${proportion}-${index * 1}`}>{index + 1}</div>
            ))}
          </section>
        );
      }

      return (
        <section
          style={{
            display: "grid",
            gridTemplateRows,
            gridTemplateColumns,
          }}
        >
          {layoutDivisions.map((div, index) => {
            return div === FRAME_TYPE.width ? (
              <div
                key={`div${index * 1}`}
                style={{ gridColumn: `1 / ${widthProportion.length + 1}` }}
              >
                {index + 1}
              </div>
            ) : (
              <div key={`div${index * 1}`}>{index + 1}</div>
            );
          })}
        </section>
      );
    case FRAME_TYPE.height:
      if (!rowLines.length) {
        return (
          <section
            style={{
              display: "grid",
              gridTemplateColumns,
            }}
          >
            {widthProportion?.map((proportion, index) => (
              <div key={`${proportion}-${index * 1}`}>{index + 1}</div>
            ))}
          </section>
        );
      }

      return <section />;
    default:
      return null;
  }
}
