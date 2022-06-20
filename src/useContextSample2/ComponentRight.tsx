import Konva from "konva";
import { MouseEvent, useContext } from "react";
import { Sprite, UserStore } from "./App";
import Canvas from "./Canvas";

const ComponentRight = () => {
  const {
    latestId: id,
    setLatestId: setId,
    sprites,
    setSprites,
  } = useContext(UserStore);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const newSprite: Sprite = {
      x: Math.random() * (500 - 160),
      y: Math.random() * (500 - 90),
      width: 160,
      height: 90,
      color: Konva.Util.getRandomColor(),
      displayName: `Sprite #${id}`,
    };
    setId(id + 1);
    setSprites(sprites.concat(newSprite));
  };

  return (
    <div>
      <p>Component Right</p>
      <Canvas />
      <button onClick={handleButtonClick}>Add Sprite</button>
    </div>
  );
};

export default ComponentRight;
