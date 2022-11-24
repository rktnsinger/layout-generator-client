import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ErrorPage from "../ErrorPage/ErrorPage";
import Canvas from "../../components/Canvas";
import SliderBar from "../../components/SliderBar";
import Description from "../../components/common/Description";
import MainOperationButton from "../../components/common/MainOperationButton";

import { imageURLState } from "../../recoil/store";

import { DEFAULT_WEIGHT } from "../../constants";

export default function PreviewPage() {
  const imageURL = useRecoilValue(imageURLState);

  const [weight, setWeight] = useState(DEFAULT_WEIGHT);

  const navigate = useNavigate();

  const handleConfirmLines = () => {
    navigate("/edit");
  };

  if (!imageURL) {
    return <ErrorPage />;
  }

  return (
    <>
      <Description>Move slider to detect lines!</Description>
      <CanvasWrapper>
        <Canvas weight={weight} />
      </CanvasWrapper>
      <SliderBarWrapper>
        <SliderBar value={weight} handleValue={setWeight} />
      </SliderBarWrapper>
      <ButtonWrapper>
        <MainOperationButton handleClick={() => handleConfirmLines("/edit")}>
          Confirm lines
        </MainOperationButton>
      </ButtonWrapper>
    </>
  );
}

const CanvasWrapper = styled.div``;

const SliderBarWrapper = styled.div``;

const ButtonWrapper = styled.div``;
