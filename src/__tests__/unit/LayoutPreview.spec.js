import React from "react";
import { RecoilRoot } from "recoil";
import { Navigate } from "react-router-dom";

import LayoutPreview from "../../components/LayoutPreview";

import { detectedLinesState, imageSizeState } from "../../recoil/store";
import { render } from "../../utils/test-utils/testUtils";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    Navigate: jest.fn(),
  };
});

describe("<LayoutPreview />", () => {
  const IMAGE_SIZE = { width: 500, height: 300 };

  const renderSnapshot = (lines) => {
    const initializeState = ({ set }) => {
      set(imageSizeState, IMAGE_SIZE);
      set(detectedLinesState, lines);
    };

    const { baseElement } = render(
      <RecoilRoot initializeState={initializeState}>
        <LayoutPreview />
      </RecoilRoot>
    );

    return baseElement;
  };

  describe("01-LAYOUT_TYPE.row(rowLine만 존재하는 경우)", () => {
    it("case: 1 rowLine", () => {
      const detectedLines = {
        rowLines: [{ startX: 0, startY: 100, endX: 500, endY: 100 }],
        columnLines: [],
      };
      const view = renderSnapshot(detectedLines);

      expect(view).toMatchSnapshot();
    });

    it("case: 2 rowLine", () => {
      const detectedLines = {
        rowLines: [
          { startX: 0, startY: 50, endX: 500, endY: 50 },
          { startX: 0, startY: 250, endX: 500, endY: 250 },
        ],
        columnLines: [],
      };
      const view = renderSnapshot(detectedLines);

      expect(view).toMatchSnapshot();
    });
  });

  describe("02-LAYOUT_TYPE.column(columnLine만 존재하는 경우)", () => {
    it("case: 1 columnLine", () => {
      const detectedLines = {
        rowLines: [],
        columnLines: [{ startX: 150, startY: 300, endX: 150, endY: 0 }],
      };
      const view = renderSnapshot(detectedLines);

      expect(view).toMatchSnapshot();
    });

    it("case: 2 columnLines", () => {
      const detectedLines = {
        rowLines: [],
        columnLines: [
          { startX: 100, startY: 300, endX: 100, endY: 0 },
          { startX: 400, startY: 300, endX: 400, endY: 0 },
        ],
      };
      const view = renderSnapshot(detectedLines);

      expect(view).toMatchSnapshot();
    });
  });

  describe("03-LAYOUT_TYPE.complexedRow", () => {
    it("case: 1 rowLine, 1 columnLine", () => {
      const detectedLines = {
        rowLines: [{ startX: 0, startY: 80, endX: 500, endY: 80 }],
        columnLines: [{ startX: 100, startY: 300, endX: 100, endY: 80 }],
      };
      const view = renderSnapshot(detectedLines);

      expect(view).toMatchSnapshot();
    });

    it("case: 1 rowLine, 2 columnLine", () => {
      const detectedLines = {
        rowLines: [{ startX: 0, startY: 80, endX: 500, endY: 80 }],
        columnLines: [
          { startX: 100, startY: 300, endX: 100, endY: 80 },
          { startX: 380, startY: 300, endX: 380, endY: 80 },
        ],
      };
      const view = renderSnapshot(detectedLines);

      expect(view).toMatchSnapshot();
    });

    it("case: 2 rowLine, 2 columnLine", () => {
      const detectedLines = {
        rowLines: [
          { startX: 0, startY: 80, endX: 500, endY: 80 },
          { startX: 0, startY: 220, endX: 500, endY: 220 },
        ],
        columnLines: [
          { startX: 100, startY: 220, endX: 100, endY: 80 },
          { startX: 400, startY: 220, endX: 400, endY: 80 },
        ],
      };
      const view = renderSnapshot(detectedLines);

      expect(view).toMatchSnapshot();
    });
  });

  describe("04-default(사전 정의된 layoutType이 아닌 경우)", () => {
    it("에러페이지로 리다이렉트 되어야 한다", () => {
      const detectedLines = {
        rowLines: [
          { startX: 80, startY: 100, endX: 350, endY: 100 },
          { startX: 80, startY: 400, endX: 350, endY: 400 },
        ],
        columnLines: [
          { startX: 80, startY: 300, endX: 80, endY: 0 },
          { startX: 350, startY: 300, endX: 350, endY: 0 },
        ],
      };

      const initializeState = ({ set }) => {
        set(imageSizeState, IMAGE_SIZE);
        set(detectedLinesState, detectedLines);
      };

      render(
        <RecoilRoot initializeState={initializeState}>
          <LayoutPreview />
        </RecoilRoot>
      );

      expect(Navigate).toBeCalled();
    });
  });
});
