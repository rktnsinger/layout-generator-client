const getCanvasSize = (image, maxWidth, maxHeight) => {
  const width =
    image.width > image.height
      ? maxWidth
      : (image.width * maxHeight) / image.height;

  const height =
    image.width > image.height
      ? (image.height * maxWidth) / image.width
      : maxHeight;

  return { width: Math.floor(width), height: Math.floor(height) };
};

export default getCanvasSize;
