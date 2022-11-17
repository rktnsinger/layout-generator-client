import React, { useEffect, useRef } from "react";
import cv from "@techstark/opencv-js";

import { getCanvasSize } from "../../../utils/imageProcessUtils";

import sampleImage from "../../../assets/images/sample1.png";

const DEFAULT = {
  WIDTH: 1000,
  HEIGHT: 1000,
};

export default function OpenCv() {
  const canvasRef = useRef();
  const cannyRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const cannyCanvas = cannyRef.current;

    const image = new Image();
    image.src = sampleImage;
    image.onload = () => {
      const { width, height } = getCanvasSize(
        image,
        DEFAULT.WIDTH,
        DEFAULT.HEIGHT
      );

      const processingImage = () => {
        cv.onRuntimeInitialized = async () => {
          const source = cv.imread(image);
          const output = new cv.Mat();
          const cannyOutput = new cv.Mat();
          const matSize = new cv.Size(width, height);

          cv.cvtColor(source, source, cv.COLOR_RGB2GRAY, 0);
          cv.Canny(source, source, 25, 75, 3, false);

          cv.resize(source, cannyOutput, matSize, 0, 0, cv.INTER_AREA);
          cv.imshow(cannyCanvas, cannyOutput);

          // hough P
          const linedOutput = cv.Mat.zeros(
            source.rows,
            source.cols,
            cv.CV_8UC3
          );
          const lines = new cv.Mat();
          const color = new cv.Scalar(0, 255, 0);
          cv.HoughLinesP(source, lines, 1, Math.PI / 180, 2, 500, 20);
          // (image, lines, rho, theta, threshold, minLineLength, maxLineGap)

          // draw lines
          for (let i = 0; i < lines.rows; i++) {
            const startPoint = new cv.Point(
              lines.data32S[i * 4],
              lines.data32S[i * 4 + 1]
            );
            const endPoint = new cv.Point(
              lines.data32S[i * 4 + 2],
              lines.data32S[i * 4 + 3]
            );
            cv.line(linedOutput, startPoint, endPoint, color);
          }

          cv.resize(linedOutput, output, matSize, 0, 0, cv.INTER_AREA);
          cv.imshow(canvas, output);

          /*
          // hough
          const { rows, cols } = source;
          const linedOutput = cv.Mat.zeros(rows, cols, cv.CV_8UC3);
          const lines = new cv.Mat();
          cv.HoughLines(source, lines, 1, Math.PI / 180, 200, 0, 0, 0, Math.PI);
          // (src, lines, rho, theta, threshold, srn, stn, min_theta, max_theta)

          // draw lines
          for (let i = 0; i < lines.rows; i += 1) {
            const rho = lines.data32F[i * 2];
            const theta = lines.data32F[i * 2 + 1];
            const a = Math.cos(theta);
            const b = Math.sin(theta);
            const x0 = a * rho;
            const y0 = b * rho;
            const startPoint = { x: x0 - 1000 * b, y: y0 + 1000 * a };
            const endPoint = { x: x0 + 1000 * b, y: y0 - 1000 * a };
            cv.line(linedOutput, startPoint, endPoint, [0, 255, 0, 255]);
          }
          cv.resize(linedOutput, output, matSize, 0, 0, cv.INTER_AREA);
          cv.imshow(canvas, output);
          */

          source.delete();
          output.delete();
        };
      };

      processingImage();
    };
  }, []);

  return (
    <>
      <h1>hough transform 결과</h1>
      <canvas ref={canvasRef} />
      <h2>canny edge detection 결과</h2>
      <canvas ref={cannyRef} />
    </>
  );
}
