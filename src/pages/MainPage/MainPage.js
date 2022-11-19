import React from "react";
import styled from "styled-components";
import { MdDoubleArrow, MdAdd } from "react-icons/md";

import MainOperationButton from "../../components/common/MainOperationButton";
import Description from "../../components/common/Description";

import { ACCEPTED_FILE_TYPE } from "../../constants";
import webImage from "../../assets/images/mainpage-example-01.png";
import layoutImage from "../../assets/images/mainpage-example-02.png";

export default function MainPage({ handleImageUrl }) {
  const handleFileUpload = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      handleImageUrl(reader.result);
    };
  };

  return (
    <>
      <Title>Layout Generator</Title>
      <Description>Convert mockup image to HTML & CSS !</Description>
      <SampleWrapper>
        <StyledImage src={webImage} alt="mockup" />
        <IconWrapper>
          <MdDoubleArrow />
        </IconWrapper>
        <StyledImage src={layoutImage} alt="layout" />
        <IconWrapper>
          <MdAdd />
        </IconWrapper>
        <TextWrapper>
          <p>{"HTML\n&\nCSS"}</p>
        </TextWrapper>
      </SampleWrapper>
      <FileUploaderWrapper>
        <FileInput
          type="file"
          accept={ACCEPTED_FILE_TYPE}
          onChange={(event) => handleFileUpload(event)}
        />
        <MainOperationButton>Upload Image</MainOperationButton>
      </FileUploaderWrapper>
    </>
  );
}

const Title = styled.h1`
  margin-top: 100px;
  font-size: 66px;
  text-align: center;
`;

const SampleWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 80px;
  padding: 0 80px;
`;

const StyledImage = styled.img`
  width: 420px;
`;

const IconWrapper = styled.div`
  font-size: 50px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 40px;
  text-align: center;
  white-space: pre-line;
`;

const FileUploaderWrapper = styled.label`
  margin-top: 80px;
`;

const FileInput = styled.input`
  display: none;
`;
