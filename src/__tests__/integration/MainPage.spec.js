import React from "react";
import { screen } from "@testing-library/react";

import MainPage from "../../pages/MainPage";

import { render } from "../../utils/test-utils/testUtils";

import { MAIN_BUTTON, TITLE } from "../../constants";

describe("<MainPage />", () => {
  it("title과 MainOperationButton에 알맞은 텍스트가 렌더링되어야 한다.", () => {
    render(<MainPage />);
    const title = screen.getByText(TITLE);
    const button = screen.getByRole("button");

    expect(title).toBeInTheDocument();
    expect(button).toHaveTextContent(MAIN_BUTTON.upload);
  });
});
