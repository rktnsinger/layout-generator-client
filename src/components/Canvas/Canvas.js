import React, { useEffect, useRef, useState } from "react";
import cv from "@techstark/opencv-js";

import getCanvasSize from "../../utils/imageProcessUtils";
import { DEFAULT_CANVAS } from "../../constants";

export default function Canvas({ imageUrl, weight, initialState = true }) {
  const [isInitialLoad, setIsInitialLoad] = useState(initialState);
  const [preProcessedData, setPreProcessedData] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.src = imageUrl;

    image.onload = () => {
      const input = cv.imread(image);

      const { width, height } = getCanvasSize(
        image,
        DEFAULT_CANVAS.WIDTH,
        DEFAULT_CANVAS.HEIGHT
      );

      const preProcessingImage = () => {
        cv.cvtColor(input, input, cv.COLOR_RGB2GRAY, 0);
        cv.Canny(input, input, 25, 75, 3, false);

        setPreProcessedData(input);
        setIsInitialLoad(false);
      };

      const detectLines = () => {
        const lines = new cv.Mat();
        const linedOutput = cv.Mat.zeros(
          preProcessedData.rows,
          preProcessedData.cols,
          cv.CV_8UC3
        );

        const output = new cv.Mat();
        const color = new cv.Scalar(0, 255, 0);
        const minimumLineLength = input.cols * (weight / 100);

        cv.HoughLinesP(
          preProcessedData,
          lines,
          1,
          Math.PI / 180,
          2,
          minimumLineLength,
          20
        );

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

        const matSize = new cv.Size(width, height);

        cv.resize(linedOutput, output, matSize, 0, 0, cv.INTER_AREA);
        cv.imshow(canvas, output);

        input.delete();
        lines.delete();
        linedOutput.delete();
        output.delete();
      };

      if (isInitialLoad) {
        preProcessingImage();
      } else {
        detectLines();
      }
    };
  }, [isInitialLoad, preProcessedData, imageUrl, weight]);

  return <canvas ref={canvasRef} />;
}
