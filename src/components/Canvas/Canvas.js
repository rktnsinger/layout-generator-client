import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import cv from "@techstark/opencv-js";

import {
  imageURLState,
  detectedLinesState,
  imageSizeState,
} from "../../recoil/store";
import fitToMaxCanvasSize from "../../utils/fitToMaxCanvasSize";
import sortAndMergeLines from "../../utils/sortAndMergeLines";

export default function Canvas({ weight }) {
  const imageURL = useRecoilValue(imageURLState);
  const setDetectedLines = useSetRecoilState(detectedLinesState);
  const [imageSize, setImageSize] = useRecoilState(imageSizeState);

  const [canvasSize, setCanvasSize] = useState({});
  const [preProcessedData, setPreProcessedData] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!preProcessedData) {
      const image = new Image();

      image.src = imageURL;
      image.onload = () => {
        const input = cv.imread(image);
        const { cols, rows } = input;
        const { width, height } = fitToMaxCanvasSize(cols, rows);

        cv.cvtColor(input, input, cv.COLOR_RGB2GRAY, 0);
        cv.Canny(input, input, 25, 75, 3, false);

        setPreProcessedData(input);
        setCanvasSize({ width, height });
        setImageSize({ width: cols, height: rows });
      };
    } else {
      const detectedLines = new cv.Mat();
      const output = new cv.Mat();
      const linedOutput = cv.Mat.zeros(
        preProcessedData.rows,
        preProcessedData.cols,
        cv.CV_8UC3
      );
      const lineColor = new cv.Scalar(255, 247, 53);
      const adjustedSize = new cv.Size(canvasSize.width, canvasSize.height);
      const minimumLineLength = Math.floor(
        preProcessedData.cols * (weight / 100)
      );

      const rowPoints = [];
      const columnPoints = [];

      cv.HoughLinesP(
        preProcessedData,
        detectedLines,
        1,
        Math.PI / 180,
        2,
        minimumLineLength,
        20
      );

      for (let i = 0; i < detectedLines.rows; i++) {
        const line = {
          startX: detectedLines.data32S[i * 4],
          startY: detectedLines.data32S[i * 4 + 1],
          endX: detectedLines.data32S[i * 4 + 2],
          endY: detectedLines.data32S[i * 4 + 3],
        };

        if (line.startY === line.endY) {
          rowPoints.push(line);
        } else {
          columnPoints.push(line);
        }
      }

      const rowLines = sortAndMergeLines(rowPoints, imageSize.height);
      const columnLines = sortAndMergeLines(columnPoints, imageSize.width);

      [...rowLines, ...columnLines].forEach((line) => {
        const startPoint = new cv.Point(line.startX, line.startY);
        const endPoint = new cv.Point(line.endX, line.endY);

        cv.line(linedOutput, startPoint, endPoint, lineColor, 5);
      });

      cv.resize(linedOutput, output, adjustedSize, 0, 0, cv.INTER_AREA);
      cv.imshow(canvas, output);

      setDetectedLines({ rowLines, columnLines });

      detectedLines.delete();
      linedOutput.delete();
      output.delete();
    }
  }, [
    imageURL,
    imageSize,
    canvasSize,
    preProcessedData,
    setImageSize,
    setDetectedLines,
    weight,
  ]);

  return <canvas ref={canvasRef} />;
}
