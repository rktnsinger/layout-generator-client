const ACCEPTED_FILE_TYPE = ".jpeg, .png, .tiff, .bmp";

const TITLE = "Layout Generator";

const SUBTITLE = {
  main: "Convert mockup image to HTML & CSS !",
  preview: "Move slider to detect lines!",
  edit: "Expected layout as below!",
  result: "All done! Enjoy your work!",
  error: "Something went wrong... please try again",
};

const MESSAGE = {
  previewLoading: "Pre processing...",
};

const ERROR = {
  invalidLine: "Invalid line data is included.",
  notSupport: "Detected layout type is not yet supported.",
  noImage: "Image is not loaded",
  notFound: "404 Not Found",
};

const MAIN_BUTTON = {
  upload: "Upload Image",
  confirm: "Confirm lines",
  generate: "Generate code",
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
  rowC: "complexedRowType",
};

const DEFAULT_WEIGHT = 50;

const MAX_SIZE_MARGIN = 20;

const LINE_MERGE_LIMIT = 60;

const MAX_CANVAS_SIZE = {
  width: 800,
  height: 600,
};

export {
  TITLE,
  ERROR,
  ACCEPTED_FILE_TYPE,
  LINE_TYPE,
  DIVISION_TYPE,
  LAYOUT_TYPE,
  LINE_MERGE_LIMIT,
  DEFAULT_WEIGHT,
  MAX_SIZE_MARGIN,
  MAX_CANVAS_SIZE,
  MESSAGE,
  SUBTITLE,
  MAIN_BUTTON,
};
