import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDoubleArrow, MdAdd } from "react-icons/md";

import MainOperationButton from "../../components/common/MainOperationButton";

import { imageURLState } from "../../recoil/store";

import {
  ACCEPTED_FILE_TYPE,
  MAIN_BUTTON,
  SUBTITLE,
  TITLE,
} from "../../constants";
import webImage from "../../assets/images/mainpage-example-01.png";
import layoutImage from "../../assets/images/mainpage-example-02.png";

export default function MainPage() {
  const setImageURL = useSetRecoilState(imageURLState);

  const fileUploadRef = useRef();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileUploadRef.current.click();
  };

  const handleFileUpload = (event) => {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageURL(reader.result);

      navigate("/preview");
    };
  };

  return (
    <Container>
      <Title>{TITLE}</Title>
      <Description>{SUBTITLE.main}</Description>
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
      <MainOperationButton
        text={MAIN_BUTTON.upload}
        handleClick={handleButtonClick}
      />
      <FileInput
        type="file"
        ref={fileUploadRef}
        accept={ACCEPTED_FILE_TYPE}
        onChange={(event) => handleFileUpload(event)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 50px 400px;
  justify-items: center;
  margin-top: 15vh;
`;

const Title = styled.h1`
  font-size: 66px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 32px;
`;

const SampleWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

const FileInput = styled.input`
  display: none;
`;
