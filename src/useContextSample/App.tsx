import React, { useState } from "react";
import ComponentA from "./ComponentA";

export const UserCount = React.createContext(
  {} as {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
  }
);

function App() {
  const [count, setCount] = useState(100);
  return (
    <div style={{ textAlign: "center" }}>
      <UserCount.Provider value={{ count, setCount }}>
        <h1>Learn useContext</h1>
        <ComponentA />
      </UserCount.Provider>
    </div>
  );
}

export default App;
