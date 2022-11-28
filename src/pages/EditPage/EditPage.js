import React, { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubPageLayout from "../SubPageLayout";
import LayoutPreview from "../../components/LayoutPreview";

import { generatedCodeState, imageSizeState } from "../../recoil/store";
import fitToMaxCanvasSize from "../../utils/fitToMaxCanvasSize";
import { MAIN_BUTTON, SUBTITLE } from "../../constants";

export default function EditPage() {
  const imageSize = useRecoilValue(imageSizeState);
  const setGeneratedCode = useSetRecoilState(generatedCodeState);

  const previewRef = useRef();
  const navigate = useNavigate();

  const handleConfirmLayout = () => {
    const { current } = previewRef;

    setGeneratedCode(current?.innerHTML);
    navigate("/result");
  };

  return (
    <SubPageLayout
      subTitle={SUBTITLE.edit}
      buttonText={MAIN_BUTTON.generate}
      handleButtonClick={handleConfirmLayout}
    >
      <PreviewWrapper
        ref={previewRef}
        size={fitToMaxCanvasSize(imageSize.width, imageSize.height)}
      >
        <LayoutPreview />
      </PreviewWrapper>
    </SubPageLayout>
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
