import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubPageLayout from "../SubPageLayout/SubPageLayout";

import { generatedCodeState } from "../../recoil/store";
import formatCode from "../../utils/formatCode";

import { MAIN_BUTTON, SUBTITLE } from "../../constants";

export default function ResultPage() {
  const generatedCode = useRecoilValue(generatedCodeState);

  const navigate = useNavigate();

  const formattedCode = formatCode(generatedCode);

  const handleRedirectHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <SubPageLayout
      subTitle={SUBTITLE.result}
      buttonText={MAIN_BUTTON.goHome}
      handleButtonClick={handleRedirectHome}
    >
      <Code>{formattedCode}</Code>
    </SubPageLayout>
  );
}

const Code = styled.div`
  padding: 30px;
  background-color: lightgray;
  white-space: pre-wrap;
`;
