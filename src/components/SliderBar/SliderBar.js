import React from "react";
import PropTypes from "prop-types";
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
  font-size: 22px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 420px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  width: 280px;
`;

SliderBar.propTypes = {
  value: PropTypes.number.isRequired,
  handleValue: PropTypes.func.isRequired,
};
