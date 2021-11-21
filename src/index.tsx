import { StrictMode } from "react";
import ReactDOM from "react-dom";

//rootタグのついた場所にReactでつくったものを入れるのだ
ReactDOM.render(
  <StrictMode>Hello React TypeScript!!</StrictMode>,
  document.getElementById("root")
);
