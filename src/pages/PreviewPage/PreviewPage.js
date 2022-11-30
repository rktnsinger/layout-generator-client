import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";

import SubPageLayout from "../SubPageLayout";
import Loading from "../../components/common/Loading";
import Canvas from "../../components/Canvas";
import SliderBar from "../../components/SliderBar";

import { imageURLState } from "../../recoil/store";

import {
  DEFAULT_WEIGHT,
  ERROR,
  MAIN_BUTTON,
  MESSAGE,
  SUBTITLE,
} from "../../constants";

export default function PreviewPage() {
  const imageURL = useRecoilValue(imageURLState);

  const [weight, setWeight] = useState(DEFAULT_WEIGHT);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleConfirmLines = () => {
    navigate("/edit");
  };

  if (!imageURL) {
    return <Navigate to="/error" state={ERROR.noImage} />;
  }

  return (
    <SubPageLayout
      subTitle={SUBTITLE.preview}
      buttonText={MAIN_BUTTON.confirm}
      handleButtonClick={handleConfirmLines}
    >
      {isLoading && <Loading text={MESSAGE.previewLoading} />}
      <Canvas weight={weight} handleLoading={setIsLoading} />
      <SliderBar value={weight} handleValue={setWeight} />
    </SubPageLayout>
  );
}
