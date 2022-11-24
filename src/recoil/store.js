import { atom } from "recoil";
import { holy, holySize } from "../mockLayout";

const imageURLState = atom({
  key: "imageURLState",
  default: "",
});

const layoutTypeState = atom({
  key: "layoutTypeState",
  default: "",
});

const imageSizeState = atom({
  key: "imageSizeState",
  default: holySize,
});

const detectedLinesState = atom({
  key: "detectedLines",
  default: holy,
});

const generatedCodeState = atom({
  key: "generatedCode",
  default: "",
});

export {
  imageURLState,
  imageSizeState,
  layoutTypeState,
  detectedLinesState,
  generatedCodeState,
};
