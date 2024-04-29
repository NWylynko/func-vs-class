type BaseImage = {
  format: "png" | "jpeg" | "webp";
  colorspace: "color" | "grayscale";
  size: "A5" | "A4" | "A3" | "A2";
};

const imageDoubleMap = {
  A5: "A4",
  A4: "A3",
  A3: "A2",
} as const;

type ImageDoubleMap = typeof imageDoubleMap;

const imageHalfMap = {
  A2: "A3",
  A3: "A4",
  A4: "A5",
} as const;

type ImageHalfMap = typeof imageHalfMap;

class ImageManipulator<Image extends BaseImage> {
  constructor(public image: Image) { }

  // Double Image Size

  public doubleSize<CurrentSize extends keyof ImageDoubleMap>(
    this: ImageManipulator<Image & { size: CurrentSize }>,
  ): ImageManipulator<Omit<Image, "size"> & { size: ImageDoubleMap[CurrentSize] }> {
    // do stuff to resize image

    const newSize = imageDoubleMap[this.image.size as CurrentSize];
    const newImage = {
      ...this.image,
      size: newSize,
    } as Omit<Image, "size"> & { size: ImageDoubleMap[CurrentSize] };
    return new ImageManipulator(newImage);
  }

  // Half Image Size

  public halfSize<CurrentSize extends keyof ImageHalfMap>(
    this: ImageManipulator<Image & { size: CurrentSize }>,
  ): ImageManipulator<Omit<Image, "size"> & { size: ImageHalfMap[CurrentSize] }> {
    // do stuff to resize image

    const newSize = imageHalfMap[this.image.size as CurrentSize];
    const newImage = {
      ...this.image,
      size: newSize,
    } as Omit<Image, "size"> & { size: ImageHalfMap[CurrentSize] };
    return new ImageManipulator(newImage);
  }

  // Convert to Grayscale

  public toGrayscale(this: ImageManipulator<Image & { colorspace: "color" }>) {
    // do stuff to convert image to grayscale

    const newImage = {
      ...this.image,
      colorspace: "grayscale" as const,
    } as Omit<Image, "colorspace"> & { colorspace: "grayscale" };
    return new ImageManipulator(newImage);
  }

  // Convert to PNG

  public toPng(this: ImageManipulator<Image & { format: Exclude<BaseImage["format"], "png"> }>) {
    // do stuff to convert image to png

    const newImage = {
      ...this.image,
      format: "png" as const,
    } as Omit<Image, "format"> & { format: "png" };
    return new ImageManipulator(newImage);
  }

  // Convert to JPEG

  public toJpeg(this: ImageManipulator<Image & { format: Exclude<BaseImage["format"], "jpeg"> }>) {
    // do stuff to convert image to jpeg

    const newImage = {
      ...this.image,
      format: "jpeg" as const,
    } as Omit<Image, "format"> & { format: "jpeg" };
    return new ImageManipulator(newImage);
  }
}

// Example

const exampleImage = new ImageManipulator({
  format: "jpeg",
  colorspace: "color",
  size: "A4",
} as const);

const outputImage = exampleImage.doubleSize().toGrayscale().toPng().image;