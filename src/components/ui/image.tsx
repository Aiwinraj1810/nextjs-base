import Image, { ImageProps } from "next/image";

const ImageComponent = (props: ImageProps) => {
  return <Image {...props} />;
};

export default ImageComponent;
