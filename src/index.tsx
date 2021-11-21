import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { InputZone } from "./components/InputZone";

//rootタグのついた場所にReactでつくったものを入れるのだ
ReactDOM.render(
  <StrictMode>
    <InputZone />
    <InputZone />
    <InputZone />
  </StrictMode>,
  document.getElementById("root")
);
