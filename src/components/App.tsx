import React, { useState } from "react";
import ComponentLeft from "./ComponentLeft";
import Canvas from "./Canvas";
import RegionsList from "./RegionsList";
import "./App.css";

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

type Regions = {
  color: string;
  id: string;
  points: number[];
};

export const UserCount = React.createContext(
  {} as {
    regions: Regions[];
    setRegions: React.Dispatch<React.SetStateAction<Regions>>;
  }
);

function App() {
  const [latestId, setLatestId] = useState<number>(1);
  const [sprites, setSprites] = useState<Sprite[]>([]);

  return (
    <React.Fragment>
      <UserStore.Provider
        value={{ latestId, setLatestId, sprites, setSprites }}
      >
        <h2>Image annotate prototype</h2>
        <p className="description">Draw objects contours on top of the image</p>
        <div className="App panel-container">
          <div className="left-panel">
            <label>
              Brightness
              <input
                id="slider"
                type="range"
                min="-1"
                max="1"
                step="0.05"
                defaultValue="0"
              />
            </label>
            <ComponentLeft />
            {/* <RegionsList /> */}
          </div>
          <div className="right-panel">
            <Canvas />
          </div>
        </div>
      </UserStore.Provider>
    </React.Fragment>
  );
}

export default App;
