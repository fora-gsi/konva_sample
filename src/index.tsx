import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
// import App from "./dnd_kit_sample/App";
// import App from "./useContextSample/App";
// import App from "./useContextSample2/App";
// import App from "./usecontext_test/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
