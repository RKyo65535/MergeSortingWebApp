import { useState, useRef, useEffect } from "react";
import { InputZone } from "./components/InputZone";
import { ToMergeItem } from "./feature/toMergeItem";

export function App() {
  //ここで全体を管理します。

  //現在のリスト
  const [currentItemList, setTasks] = useState<ToMergeItem[]>();

  //ここから下がメイン部分
  return (
    <div className="todoapp stack-large">
      <h1>マージソートアプリ</h1>
      <InputZone />
      <InputZone />
      <InputZone />
    </div>
  );
}
