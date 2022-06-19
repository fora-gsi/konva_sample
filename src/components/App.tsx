import React from "react";
import Canvas from "./Canvas";
import RegionsList from "./RegionsList";

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
  return (
    <React.Fragment>
      <h2>Image annotate prototype</h2>
      <p className="description">Draw objects contours on top of the image</p>
      <div className="App">
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
          <RegionsList />
        </div>
        <div className="right-panel">
          <Canvas />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
