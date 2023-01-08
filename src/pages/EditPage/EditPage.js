import React, { useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubPageLayout from "../SubPageLayout";
import LayoutPreview from "../../components/LayoutPreview";

import {
  generatedCodeState,
  imageSizeState,
  imageURLState,
} from "../../recoil/store";
import fitToMaxCanvasSize from "../../utils/fitToMaxCanvasSize";

import { ERROR } from "../../constants";

export default function EditPage() {
  const imageURL = useRecoilValue(imageURLState);
  const imageSize = useRecoilValue(imageSizeState);
  const setGeneratedCode = useSetRecoilState(generatedCodeState);

  const previewRef = useRef();
  const navigate = useNavigate();

  const handleConfirmLayout = () => {
    const { current } = previewRef;

    setGeneratedCode(current?.innerHTML);
    navigate("/result");
  };

  if (!imageURL) {
    return <Navigate to="/error" state={ERROR.badRequest} />;
  }

  return (
    <SubPageLayout
      subTitle="Expected layout as below!"
      buttonText="Generate code"
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
