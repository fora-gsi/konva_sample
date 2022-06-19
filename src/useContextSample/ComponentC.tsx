import { useContext } from "react";
import { UserCount } from "./App";

const ComponentC = () => {
  const { count, setCount } = useContext(UserCount);
  return (
    <div>
      <p>Component C</p>
      <p>{count}</p>
      <p>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </p>
    </div>
  );
};

export default ComponentC;
