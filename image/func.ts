type BaseImage = {
  format: "png" | "jpeg" | "webp";
  colorspace: "color" | "grayscale";
  size: "A5" | "A4" | "A3" | "A2";
};

// Double Image Size

const imageDoubleMap = {
  A5: "A4",
  A4: "A3",
  A3: "A2",
} as const;
type imageDoubleMap = typeof imageDoubleMap;

function doubleSize<
  Image extends { size: keyof imageDoubleMap },
  CurrentSize extends Image["size"],
  NewSize extends Pick<imageDoubleMap, CurrentSize>[CurrentSize],
  NewImage extends Omit<Image, "size"> & { size: NewSize },
>(image: Image) {
  // do stuff to resize image

  const newSize = imageDoubleMap[image.size] as NewSize;
  return {
    ...image,
    size: newSize,
  } as unknown as NewImage;
}

// Half Image Size

const imageHalfMap = {
  A2: "A3",
  A3: "A4",
  A4: "A5",
} as const;
type imageHalfMap = typeof imageHalfMap;

function halfSize<
  Image extends { size: keyof imageHalfMap },
  NewSize extends Pick<imageHalfMap, Image["size"]>[Image["size"]],
  NewImage extends Omit<Image, "size"> & { size: NewSize },
>(image: Image) {
  // do stuff to resize image

  const newSize = imageHalfMap[image.size] as NewSize;
  return {
    ...image,
    size: newSize,
  } as unknown as NewImage;
}

// Grayscale the Image

function grayscaleImage<
  Image extends { colorspace: Exclude<BaseImage["colorspace"], "grayscale"> },
  NewImage extends Omit<Image, "colorspace"> & { colorspace: "grayscale" },
>(image: Image) {
  // do stuff to grayscale image

  return {
    ...image,
    colorspace: "grayscale",
  } as NewImage;
}

// Convert to png

function convertToPng<
  Image extends { format: Exclude<BaseImage["format"], "png"> },
  NewImage extends Omit<Image, "format"> & { format: "png" },
>(image: Image) {
  // do stuff to convert image to png

  return {
    ...image,
    format: "png",
  } as NewImage;
}

// Convert to jpeg

function convertToJpeg<
  Image extends { format: Exclude<BaseImage["format"], "jpeg"> },
  NewImage extends Omit<Image, "format"> & { format: "jpeg" },
>(image: Image) {
  // do stuff to convert image to jpeg

  return {
    ...image,
    format: "jpeg",
  } as NewImage;
}

// Example

const exampleImage = {
  format: "jpeg",
  colorspace: "color",
  size: "A4",
} as const satisfies BaseImage;

const outputImage = convertToPng(grayscaleImage(doubleSize(exampleImage)));