import React from "react";
import { Image, Layer } from "react-konva";
import useImage from "use-image";

const BaseImage = () => {
  const [image] = useImage("https://konvajs.org/assets/lion.png");
  const layerRef = React.useRef(null);

  return (
    <Layer ref={layerRef}>
      <Image image={image} />
    </Layer>
  );
};

export default BaseImage;
