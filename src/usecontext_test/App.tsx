import React, { useState } from "react";
import Canvas from "./Canvas";
import Canvas2 from "./Canvas2";

export type Sprite = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  displayName: string;
  color?: string;
};

type UserStoreType = {
  latestId: number;
  setLatestId: React.Dispatch<React.SetStateAction<number>>;
  sprites: Sprite[];
  setSprites: React.Dispatch<React.SetStateAction<Sprite[]>>;
};
export const UserStore = React.createContext({} as UserStoreType);

function App() {
  const [latestId, setLatestId] = useState<number>(1);
  const [sprites, setSprites] = useState<Sprite[]>([
    {
      id: "0",
      x: 0,
      y: 0,
      width: 160,
      height: 90,
      displayName: "aaa",
      color: "red",
    },
  ]);

  return (
    <React.Fragment>
      <UserStore.Provider
        value={{ latestId, setLatestId, sprites, setSprites }}
      >
        {/* <Canvas /> */}
        <Canvas2 />
      </UserStore.Provider>
    </React.Fragment>
  );
}

export default App;
