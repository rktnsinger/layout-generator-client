import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubPageLayout from "../SubPageLayout";

import { ERROR, MAIN_BUTTON, SUBTITLE } from "../../constants";

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state;

  const handleRedirectHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <SubPageLayout
      subTitle={SUBTITLE.error}
      buttonText={MAIN_BUTTON.goHome}
      handleButtonClick={handleRedirectHome}
    >
      <Text>{`message: ${message || ERROR.notFound}`}</Text>
    </SubPageLayout>
  );
}

const Text = styled.p`
  font-size: 30px;
`;
