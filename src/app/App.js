import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "../styles/GlobalStyle";
import MainPage from "../pages/MainPage";
import PreviewPage from "../pages/PreviewPage/PreviewPage";

import theme from "../styles/theme";

export default function App() {
  const [imageUrl, setimageUrl] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        {!imageUrl && <MainPage handleImageUrl={setimageUrl} />}
        {imageUrl && <PreviewPage imageUrl={imageUrl} />}
      </Layout>
    </ThemeProvider>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
