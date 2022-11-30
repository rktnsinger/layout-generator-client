import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

export default function Loading({ text }) {
  return (
    <Container>
      <Spinner />
      <Text>{text}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  align-self: center;
  width: 100px;
  height: 100px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 4px solid black;
  border-radius: 50%;
  background: transparent;
  animation: ${rotateAnimation} 1s linear infinite;
  transform: translateZ(0);
`;

const Text = styled.p`
  align-self: center;
  font-size: 60px;
  font-weight: 700;
  text-shadow: 3px 3px 5px gray;
`;

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: "Loading...",
};
