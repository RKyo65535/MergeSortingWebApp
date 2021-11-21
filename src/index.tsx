import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

//rootタグのついた場所にReactでつくったものを入れるのだ
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
