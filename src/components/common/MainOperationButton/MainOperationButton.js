import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export default function MainOperationButton({ type, text, handleClick }) {
  return (
    <Button type={type} onClick={handleClick}>
      {text}
    </Button>
  );
}

const Button = styled.button`
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

MainOperationButton.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

MainOperationButton.defaultProps = {
  type: "button",
};
