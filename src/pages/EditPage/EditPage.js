import React, { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ErrorPage from "../ErrorPage/ErrorPage";
import LayoutPreview from "../../components/LayoutPreview/LayoutPreview";
import Description from "../../components/common/Description";
import MainOperationButton from "../../components/common/MainOperationButton";

import {
  detectedLinesState,
  generatedCodeState,
  imageSizeState,
} from "../../recoil/store";
import fitToMaxCanvasSize from "../../utils/fitToMaxCanvasSize";

export default function EditPage() {
  const imageSize = useRecoilValue(imageSizeState);
  const detectedLines = useRecoilValue(detectedLinesState);
  const setGeneratedCode = useSetRecoilState(generatedCodeState);

  const previewRef = useRef();
  const navigate = useNavigate();

  const handleConfirmLayout = () => {
    const { current } = previewRef;

    if (!current) {
      navigate("/error");
    }

    setGeneratedCode(current?.innerHTML);
    navigate("/result");
  };

  if (!detectedLines.rowLines) {
    return <ErrorPage />;
  }

  return (
    <>
      <Description>Expected layout as below!</Description>
      <PreviewWrapper
        ref={previewRef}
        size={fitToMaxCanvasSize(imageSize.width, imageSize.height)}
      >
        <LayoutPreview />
      </PreviewWrapper>
      <MainOperationButton handleClick={handleConfirmLayout}>
        Generate code
      </MainOperationButton>
    </>
  );
}

const PreviewWrapper = styled.div`
  margin-bottom: 80px;

  section {
    width: ${(props) => props.size.width}px;
    height: ${(props) => props.size.height}px;
    background-color: lightgray;
  }

  div {
    border: 2px solid black;
  }
`;
