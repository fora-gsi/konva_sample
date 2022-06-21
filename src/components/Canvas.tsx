import React, { MouseEvent, useContext } from "react";
import Konva from "konva";
import { Stage } from "react-konva";
import { Sprite, UserStore } from "./App";
import { Regions } from "./Regions";

const Canvas = () => {
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
        <Regions />
      </Stage>
      <button onClick={handleButtonClick}>Add Sprite</button>
    </React.Fragment>
  );
};

export default Canvas;
