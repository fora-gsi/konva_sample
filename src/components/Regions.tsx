import { useContext } from "react";
import { Group, Layer, Rect, Text } from "react-konva";
import { UserStore } from "./App";

export function Regions() {
  const { sprites } = useContext(UserStore);

  return (
    <Layer opacity={0.9} style={{ border: "1px solid black" }}>
      {sprites.map(({ id, x, y, width, height, color, displayName }) => (
        <Group draggable={true} key={id.toString()}>
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={color}
            stroke="black"
          />
          <Text
            x={x}
            y={y}
            width={width}
            height={height}
            fill="black"
            text={displayName}
            fontSize={18}
            fontFamily="Arial"
            align="center"
            verticalAlign="middle"
          />
        </Group>
      ))}
    </Layer>
  );
}
