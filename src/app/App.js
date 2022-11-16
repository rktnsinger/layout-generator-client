import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/GlobalStyle";
import MainPage from "../pages/MainPage";

import theme from "../styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainPage />
    </ThemeProvider>
  );
}
