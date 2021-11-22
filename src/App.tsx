import { useState } from "react";
import { AddItemButton } from "./components/AddItemButton";
import { InputZone } from "./components/InputZone";
import { ToMergeItem } from "./feature/toMergeItem";
import { nanoid } from "nanoid";
import { ViewPhase } from "./feature/viewPhase";
import { GotoSortButton } from "./components/GotoSortButton";
import { MergeSortSelect } from "./components/MergeSortSelect";

export function App() {
  //ここで全体を管理します。

  //現在のフェーズ(状態)
  const [phase, setPhase] = useState<ViewPhase>("Set");

  //現在のリスト
  const [currentItemList, setCurrentItemList] = useState<ToMergeItem[]>([]);

  //アイテム追加用の関数。
  function AddItem() {
    const newItem: ToMergeItem = {
      id: "id" + nanoid(),
      name: "",
    };
    setCurrentItemList([...currentItemList, newItem]);
  }

  function deleteItem(key: string) {
    //自身以外をリストに残す形で、自信を滅する
    const remainingItems = currentItemList.filter((item) => key !== item.id);
    setCurrentItemList(remainingItems);
  }

  //現在の表示状態を変更する
  function changeState(phase: ViewPhase) {
    setPhase(phase);
  }

  //現在のリストを、良い感じに実態(View?)に渡してやる
  //入力フォームを複製できるのだ
  var currentShowItemList: JSX.Element[] = [];
  if (phase === "Set") {
    currentShowItemList = currentItemList.map((item) => (
      <InputZone
        id={item.id}
        key={item.id}
        manageItem={item}
        deleteMyself={deleteItem}
      />
    ));
  }

  var mergeSortZone: JSX.Element = <></>;
  if (phase === "Sort") {
    mergeSortZone = (
      <MergeSortSelect
        leftItem={currentItemList[0]}
        rightItem={currentItemList[1]}
        leftAction={() => {}}
        rightAction={() => {}}
      />
    );
  }

  //ここから下がメイン部分
  return (
    <div className="margeAll">
      <h1>マージソートアプリ</h1>

      {currentShowItemList}
      <AddItemButton pushEvent={AddItem} />
      <GotoSortButton pushEvent={() => changeState("Sort")} />

      {mergeSortZone}
    </div>
  );
}
