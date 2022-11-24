import React from "react";
import styled from "styled-components";

export default function MainOperationButton({ children, handleClick }) {
  return <Wrapper onClick={handleClick}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 90px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.beige};
  text-align: center;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.black};
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.brown};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.5s ease;
  }
`;
