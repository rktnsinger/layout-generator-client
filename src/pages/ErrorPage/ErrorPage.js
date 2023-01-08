import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import SubPageLayout from "../SubPageLayout";

import { ERROR, MAIN_BUTTON } from "../../constants";

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;

  const handleRedirectHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <SubPageLayout
      subTitle="Something went wrong... please try again"
      buttonText={MAIN_BUTTON.goHome}
      handleButtonClick={handleRedirectHome}
    >
      <Text>{`message: ${state || ERROR.notFound}`}</Text>
    </SubPageLayout>
  );
}

const Text = styled.p`
  font-size: 30px;
`;
