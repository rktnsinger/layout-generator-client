import React from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/GlobalStyle";
import MainPage from "../pages/MainPage";
import PreviewPage from "../pages/PreviewPage";
import EditPage from "../pages/EditPage";
import ResultPage from "../pages/ResultPage/ResultPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

import theme from "../styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}
