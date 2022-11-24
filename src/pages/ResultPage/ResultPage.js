import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Description from "../../components/common/Description";
import MainOperationButton from "../../components/common/MainOperationButton";

import { generatedCodeState } from "../../recoil/store";
import formatCode from "../../utils/formatCode";

export default function ResultPage() {
  const generatedCode = useRecoilValue(generatedCodeState);

  const navigate = useNavigate();

  const formattedCode = formatCode(generatedCode);

  const handleRedirectHome = () => {
    navigate("/", { replace: true });
  };

  if (!generatedCode) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Description>All done! Enjoy your work!</Description>
      <Code>{formattedCode}</Code>
      <MainOperationButton handleClick={handleRedirectHome}>
        Go to Home
      </MainOperationButton>
    </>
  );
}

const Code = styled.div`
  width: 700px;
  margin-bottom: 80px;
  padding: 30px;
  background-color: lightgray;
  white-space: pre-wrap;
`;
