import { atom } from "recoil";

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
  default: {},
});

const detectedLinesState = atom({
  key: "detectedLines",
  default: {},
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
