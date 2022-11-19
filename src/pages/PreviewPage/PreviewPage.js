import React, { useState } from "react";
import styled from "styled-components";

import Description from "../../components/common/Description";
import Canvas from "../../components/Canvas";
import SliderBar from "../../components/TrackBar/SliderBar";
import MainOperationButton from "../../components/common/MainOperationButton";

import { DEFAULT_WEIGHT } from "../../constants";

export default function PreviewPage({ imageUrl }) {
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);

  return (
    <>
      <Description>Move slider to detect layout!</Description>
      <CanvasWrapper>
        <Canvas imageUrl={imageUrl} weight={weight} />
      </CanvasWrapper>
      <SliderBarWrapper>
        <SliderBar value={weight} handleValue={setWeight} />
      </SliderBarWrapper>
      <ButtonWrapper>
        <MainOperationButton>Confirm layout</MainOperationButton>
      </ButtonWrapper>
    </>
  );
}

const CanvasWrapper = styled.div``;

const SliderBarWrapper = styled.div``;

const ButtonWrapper = styled.div``;
