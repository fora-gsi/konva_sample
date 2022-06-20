import React, { useState } from "react";
import ComponentLeft from "./ComponentLeft";
import ComponentRight from "./ComponentRight";
import "./App.css";

export type Sprite = {
  x: number;
  y: number;
  width: number;
  height: number;
  displayName?: string;
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
  const [id, setId] = useState<number>(1);
  const [sprites, setSprites] = useState<Sprite[]>([]);
  // const [store, setStore] = useState<UserStore>();
  return (
    <div className="panel-container" style={{ textAlign: "center" }}>
      <UserStore.Provider
        value={{ latestId: id, setLatestId: setId, sprites, setSprites }}
      >
        <div className="left-panel">
          <ComponentLeft />
        </div>
        <div className="right-panel">
          <ComponentRight />
        </div>
      </UserStore.Provider>
    </div>
  );
}

export default App;
