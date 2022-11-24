import React from "react";
import styled, { keyframes } from "styled-components";

export default function Loading({ children }) {
  return (
    <Container>
      <Spinner />
      <Text>{children}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(82, 78, 79, 0.5);
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
  margin-top: 30vh;
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
  margin-top: 60px;
  font-size: 60px;
  font-weight: 700;
  text-shadow: 3px 3px 5px gray;
`;
