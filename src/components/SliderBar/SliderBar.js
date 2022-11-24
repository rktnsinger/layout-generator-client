import React from "react";
import styled from "styled-components";

export default function SliderBar({ value, handleValue }) {
  return (
    <Container>
      <p>Detected lines from image</p>
      <InputWrapper>
        <span>Add</span>
        <StyledInput
          type="range"
          value={value}
          onChange={(event) => handleValue(Number(event.target.value))}
        />
        <span>Reduce</span>
      </InputWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div``;

const StyledInput = styled.input`
  width: 300px;
`;
