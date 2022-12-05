import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MainOperationButton from "../../components/common/MainOperationButton";

import { render } from "../../utils/test-utils/testUtils";

describe("<MainOperationButton />", () => {
  const INITIAL_PROPS = {
    text: "hello vaco",
    fn: jest.fn(),
  };

  it("props로 전달된 text를 렌더링한다.", () => {
    render(
      <MainOperationButton
        text={INITIAL_PROPS.text}
        handleClick={INITIAL_PROPS.fn}
      />
    );
    const button = screen.getByRole("button");

    expect(button).toHaveTextContent(INITIAL_PROPS.text);
  });

  it("버튼 클릭시, props로 전달된 onClick 핸들러 함수가 실행된다", async () => {
    render(
      <MainOperationButton
        text={INITIAL_PROPS.text}
        handleClick={INITIAL_PROPS.fn}
      />
    );
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    expect(INITIAL_PROPS.fn).toHaveBeenCalledTimes(1);
  });
});
