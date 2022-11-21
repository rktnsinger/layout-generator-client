import React, { useRef } from "react";
import styled from "styled-components";

import generateLayoutProportion from "../../utils/generateLayoutProportion";
import fitToMaxCanvasSize from "../../utils/imageProcessUtils";

import "./style.css";

export default function ConfirmPage() {
  // TODO : 입력된 선분이 하나도 없을 시 에러처리
  const previewRef = useRef();

  const size = { width: 3002, height: 1883 };
  const frame = {
    rowLines: [
      { startX: 0, startY: 103, endX: 2697, endY: 103 },
      { startX: 0, startY: 196, endX: 2697, endY: 196 },
    ],
    columnLines: [{ startX: 614, startY: 1737, endX: 614, endY: 194 }],
  };

  const { heightProportion, widthProportion } = generateLayoutProportion(
    size,
    frame
  );
  let gridTemplateRows = "";
  let gridTemplateColumns = "";

  heightProportion.forEach((proportion) => {
    gridTemplateRows += `${proportion}fr `;
  });
  widthProportion.forEach((proportion) => {
    gridTemplateColumns += `${proportion}fr `;
  });

  return (
    <>
      <p>Confirm page</p>
      <p>Test layout</p>
      <TestWrapper>
        <PreviewFrame
          ref={previewRef}
          size={fitToMaxCanvasSize(size.width, size.height)}
        >
          <section
            style={{
              display: "grid",
              gridTemplateRows,
              gridTemplateColumns,
            }}
          >
            {heightProportion?.map((proportion, index) => (
              <div key={proportion}>{index + 1}</div>
            ))}
            {widthProportion.map((proportion, index) => (
              <div key={proportion}>{index + 1}</div>
            ))}
          </section>
        </PreviewFrame>
        <div className="layout">
          <div className="l1">1</div>
          <div className="l2">2</div>
          <div className="l3">3</div>
          <div className="l4">4</div>
          <div className="l5">5</div>
          <div className="l6">6</div>
        </div>
      </TestWrapper>
    </>
  );
}

const PreviewFrame = styled.div`
  section {
    width: ${(props) => props.size.width}px;
    height: ${(props) => props.size.height}px;
    background-color: lightgray;
  }

  div {
    border: 2px solid black;
  }
`;

const TestWrapper = styled.div`
  display: flex;
  width: 1300px;
`;
