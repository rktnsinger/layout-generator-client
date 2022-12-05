/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";

import theme from "../../styles/theme";

function CustomWrapper({ children }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
}

const customRender = (ui, options) =>
  render(ui, { wrapper: CustomWrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };

CustomWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
