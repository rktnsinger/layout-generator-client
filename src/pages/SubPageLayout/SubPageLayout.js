import React from "react";
import styled from "styled-components";

import MainOperationButton from "../../components/common/MainOperationButton";

export default function SubPageLayout({
  subTitle,
  buttonText,
  handleButtonClick,
  children,
}) {
  return (
    <Container>
      <SubTitle>{subTitle}</SubTitle>
      <main>{children}</main>
      <MainOperationButton handleClick={handleButtonClick}>
        {buttonText}
      </MainOperationButton>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 6fr 1fr;
  justify-items: center;
  margin-top: 8vh;
`;

const SubTitle = styled.h1`
  margin-bottom: 40px;
  text-align: center;
`;
