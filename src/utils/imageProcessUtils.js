import { MAX_CANVAS_SIZE } from "../constants";

const fitToMaxCanvasSize = (width, height) => {
  const canvasWidth =
    width > height
      ? MAX_CANVAS_SIZE.width
      : (width * MAX_CANVAS_SIZE.height) / height;

  const canvasHeight =
    width > height
      ? (height * MAX_CANVAS_SIZE.width) / width
      : MAX_CANVAS_SIZE.height;

  return { width: Math.floor(canvasWidth), height: Math.floor(canvasHeight) };
};

export default fitToMaxCanvasSize;
