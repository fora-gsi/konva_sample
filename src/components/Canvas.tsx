import React, { MouseEvent, useContext } from "react";
import Konva from "konva";
import { Group, Layer, Rect, Stage, Text } from "react-konva";
import { Sprite, UserStore } from "./App";

const ComponentRight = () => {
  const { latestId, setLatestId, sprites, setSprites } = useContext(UserStore);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const newSprite: Sprite = {
      id: (latestId + 1).toString(),
      x: Math.random() * (500 - 160),
      y: Math.random() * (500 - 90),
      width: 160,
      height: 90,
      color: Konva.Util.getRandomColor(),
      displayName: `Sprite #${latestId}`,
    };
    setLatestId(latestId + 1);
    setSprites(sprites.concat(newSprite));
  };

  return (
    <React.Fragment>
      <Stage width={500} height={500}>
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
      </Stage>
      <button onClick={handleButtonClick}>Add Sprite</button>
    </React.Fragment>
  );
};

export default ComponentRight;
