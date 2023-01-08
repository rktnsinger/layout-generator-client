const ERROR = {
  invalidLine: "Invalid line data is included.",
  notSupport: "Detected layout type is not yet supported.",
  noImage: "Image is not loaded",
  notFound: "404 Not Found",
  badRequest: "It seems like you approached in wrong way...",
};

const MAIN_BUTTON = {
  goHome: "Go to Home",
};

const LINE_TYPE = {
  row: "row",
  column: "column",
};

const DIVISION_TYPE = {
  full: "full",
  partial: "partial",
};

const LAYOUT_TYPE = {
  row: "rowType",
  column: "columnType",
  complexedRow: "complexedRowType",
};

const ACCEPTED_FILE_TYPE = ".jpeg, .png, .tiff, .bmp";

const DEFAULT_WEIGHT = 50;

const MAX_SIZE_MARGIN = 20;

const LINE_MERGE_LIMIT = 60;

const MAX_CANVAS_SIZE = {
  width: 800,
  height: 600,
};

export {
  ERROR,
  MAIN_BUTTON,
  LINE_TYPE,
  DIVISION_TYPE,
  LAYOUT_TYPE,
  ACCEPTED_FILE_TYPE,
  DEFAULT_WEIGHT,
  MAX_SIZE_MARGIN,
  LINE_MERGE_LIMIT,
  MAX_CANVAS_SIZE,
};
