import React, { useRef } from "react";
import styled from "styled-components";
import LayoutPreview from "../../components/LayoutPreview/LayoutPreview";
import { mockSize, mockFrame } from "../../mockLayout";

import fitToMaxCanvasSize from "../../utils/imageProcessUtils";

import "./style.css";

export default function ConfirmPage() {
  // TODO : 입력된 선분이 하나도 없을 시 에러처리
  const previewRef = useRef();

  return (
    <>
      <p>Confirm page</p>
      <Container>
        <PreviewWrapper
          ref={previewRef}
          size={fitToMaxCanvasSize(mockSize.width, mockSize.height)}
        >
          <LayoutPreview />
        </PreviewWrapper>
        <div className="layout">
          <div className="l1">1</div>
          <div className="l2">2</div>
          <div className="l3">3</div>
          <div className="l4">4</div>
          <div className="l5">5</div>
        </div>
      </Container>
    </>
  );
}

const PreviewWrapper = styled.div`
  section {
    width: ${(props) => props.size.width}px;
    height: ${(props) => props.size.height}px;
    background-color: lightgray;
  }

  div {
    border: 2px solid black;
  }
`;

const Container = styled.div`
  display: flex;
  width: 1300px;
`;
