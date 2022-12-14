import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubPageLayout from "../SubPageLayout";

import { generatedCodeState } from "../../recoil/store";
import formatCode from "../../utils/formatCode";

import { MAIN_BUTTON } from "../../constants";

export default function ResultPage() {
  const generatedCode = useRecoilValue(generatedCodeState);

  const navigate = useNavigate();

  const formattedCode = formatCode(generatedCode);

  const handleRedirectHome = () => {
    navigate("/");
  };

  if (!generatedCode) {
    return <Navigate to="/" />;
  }

  return (
    <SubPageLayout
      subTitle="All done! Enjoy your work!"
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
