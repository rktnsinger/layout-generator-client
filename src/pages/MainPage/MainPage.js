import React from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDoubleArrow, MdAdd } from "react-icons/md";

import MainOperationButton from "../../components/common/MainOperationButton";
import Description from "../../components/common/Description";

import { imageURLState } from "../../recoil/store";

import { ACCEPTED_FILE_TYPE } from "../../constants";
import webImage from "../../assets/images/mainpage-example-01.png";
import layoutImage from "../../assets/images/mainpage-example-02.png";

export default function MainPage() {
  const setImageURL = useSetRecoilState(imageURLState);

  const navigate = useNavigate();

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
        <Label htmlFor="file">
          <MainOperationButton>Upload Image</MainOperationButton>
        </Label>
        <FileInput
          type="file"
          id="file"
          accept={ACCEPTED_FILE_TYPE}
          onChange={(event) => handleFileUpload(event)}
        />
      </FileUploaderWrapper>
    </>
  );
}

const Label = styled.label``;

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

const FileUploaderWrapper = styled.div`
  margin-top: 80px;
`;

const FileInput = styled.input`
  display: none;
`;
