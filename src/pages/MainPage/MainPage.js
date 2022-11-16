import React from "react";
import styled from "styled-components";
import { MdDoubleArrow, MdAdd } from "react-icons/md";

import MainOperationButton from "../../components/common/MainOperationButton";

import webImage from "../../assets/images/mainpage-example-01.png";
import layoutImage from "../../assets/images/mainpage-example-02.png";

export default function MainPage() {
  const handleFileUpload = (event) => {};

  return (
    <Container>
      <Title>Layout Generator</Title>
      <Description>Convert mockup image to HTML & CSS !</Description>
      <SampleWrapper>
        <StyledImage src={webImage} />
        <ArrowIcon />
        <StyledImage src={layoutImage} />
        <AddIcon />
        <TextWrapper>
          <Text>{"HTML\n&\nCSS"}</Text>
        </TextWrapper>
      </SampleWrapper>
      <FileUploaderWrapper>
        <FileInput type="file" onChange={(event) => handleFileUpload(event)} />
        <MainOperationButton>Upload Image</MainOperationButton>
      </FileUploaderWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-top: 100px;
  font-size: 62px;
  text-align: center;
`;

const Description = styled.p`
  margin-top: 30px;
  font-size: 24px;
  text-align: center;
`;

const SampleWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 80px;
  padding: 0 100px;
`;

const StyledImage = styled.img`
  width: 420px;
`;

const ArrowIcon = styled(MdDoubleArrow)`
  font-size: 60px;
`;

const AddIcon = styled(MdAdd)`
  font-size: 60px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 40px;
  text-align: center;
  white-space: pre-line;
`;

const FileUploaderWrapper = styled.label`
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

const FileInput = styled.input`
  display: none;
`;
