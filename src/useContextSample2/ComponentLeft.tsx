import { useContext } from "react";
import { Sprite, UserStore } from "./App";

const ComponentLeft = () => {
  const { sprites } = useContext(UserStore);

  return (
    <div>
      <p>Component Left</p>
      {sprites.map((sprite: Sprite) => (
        <p>{sprite.displayName}</p>
      ))}
    </div>
  );
};

export default ComponentLeft;
