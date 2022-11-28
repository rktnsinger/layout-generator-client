import { atom } from "recoil";

const imageURLState = atom({
  key: "imageURLState",
  default: "",
});

const imageSizeState = atom({
  key: "imageSizeState",
  default: {},
});

const detectedLinesState = atom({
  key: "detectedLinesState",
  default: {},
});

const generatedCodeState = atom({
  key: "generatedCodeState",
  default: "",
});

export {
  imageURLState,
  imageSizeState,
  detectedLinesState,
  generatedCodeState,
};
