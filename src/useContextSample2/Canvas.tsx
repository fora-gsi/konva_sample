import React, { useContext } from "react";
import { Layer, Rect, Stage } from "react-konva";
import { UserStore as UserStore } from "./App";

const Canvas = () => {
  const { sprites } = useContext(UserStore);
  return (
    <React.Fragment>
      <Stage width={500} height={500}>
        <Layer opacity={0.5} style={{ border: "1px solid black" }}>
          {sprites.map(({ x, y, width, height, color }) => (
            <Rect
              x={x}
              y={y}
              width={width}
              height={height}
              fill={color}
              stroke="black"
            />
          ))}
        </Layer>
      </Stage>
    </React.Fragment>
  );
};

export default Canvas;
