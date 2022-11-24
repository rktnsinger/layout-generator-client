import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import cv from "@techstark/opencv-js";

import {
  imageURLState,
  imageSizeState,
  detectedLinesState,
} from "../../recoil/store";
import fitToMaxCanvasSize from "../../utils/fitToMaxCanvasSize";

export default function Canvas({ weight, initialState = true }) {
  const imageURL = useRecoilValue(imageURLState);
  const setImageSize = useSetRecoilState(imageSizeState);
  const setDetectedLines = useSetRecoilState(detectedLinesState);

  const [isInitialLoad, setIsInitialLoad] = useState(initialState);
  const [preProcessedData, setPreProcessedData] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.src = imageURL;

    image.onload = () => {
      const input = cv.imread(image);
      const rowLines = [];
      const columnLines = [];
      const { width, height } = fitToMaxCanvasSize(image.width, image.height);

      setImageSize({ width: image.width, height: image.height });

      const preProcessingImage = () => {
        cv.cvtColor(input, input, cv.COLOR_RGB2GRAY, 0);
        cv.Canny(input, input, 25, 75, 3, false);

        setPreProcessedData(input);
        setIsInitialLoad(false);
      };

      const detectLines = () => {
        const lines = new cv.Mat();
        const minimumLineLength = Math.floor(input.cols * (weight / 100));

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
          const line = {
            startX: lines.data32S[i * 4],
            startY: lines.data32S[i * 4 + 1],
            endX: lines.data32S[i * 4 + 2],
            endY: lines.data32S[i * 4 + 3],
          };

          if (line.startY === line.endY) {
            rowLines.push(line);
          } else {
            columnLines.push(line);
          }
        }

        rowLines.sort((a, b) => a.startY - b.startY);
        columnLines.sort((a, b) => a.startX - b.startX);

        setDetectedLines({ rowLines, columnLines });

        lines.delete();
      };

      const drawLines = (lines) => {
        const linedOutput = cv.Mat.zeros(
          preProcessedData.rows,
          preProcessedData.cols,
          cv.CV_8UC3
        );
        const output = new cv.Mat();
        const color = new cv.Scalar(255, 247, 53);

        lines.forEach((line) => {
          const { startX, startY, endX, endY } = line;
          const startPoint = new cv.Point(startX, startY);
          const endPoint = new cv.Point(endX, endY);

          cv.line(linedOutput, startPoint, endPoint, color, 5);
        });

        const matSize = new cv.Size(width, height);
        cv.resize(linedOutput, output, matSize, 0, 0, cv.INTER_AREA);
        cv.imshow(canvas, output);

        input.delete();
        linedOutput.delete();
        output.delete();
      };

      if (isInitialLoad) {
        preProcessingImage();
      } else {
        detectLines();
        drawLines([...rowLines, ...columnLines]);
      }
    };
  }, [
    isInitialLoad,
    preProcessedData,
    imageURL,
    setImageSize,
    setDetectedLines,
    weight,
  ]);

  return <canvas ref={canvasRef} />;
}
