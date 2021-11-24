import { useReducer, useState } from "react";
import { AddItemButton } from "./components/AddItemButton";
import { InputZone } from "./components/InputZone";
import { ToMergeItem } from "./feature/toMergeItem";
import { nanoid } from "nanoid";
import { ViewPhase } from "./feature/viewPhase";
import { GotoSortButton } from "./components/GotoSortButton";
import { MergeSortSelect } from "./components/MergeSortSelect";
import { mergeSort } from "./feature/mergeSort/mergeSort";
import { MergeSortParameter } from "./feature/mergeSort/mergeSortPrameter";
import { MergeSortAction } from "./feature/mergeSort/mergeSortAction";

export function App() {
  //ここで全体を管理します。

  //現在のフェーズ(状態)
  const [phase, setPhase] = useState<ViewPhase>("Set");

  //現在のリスト
  const [currentItemList, setCurrentItemList] = useState<ToMergeItem[]>([]);

  //マージソートの最初の状態？
  const initialState: MergeSortParameter = {
    mergedItemList: currentItemList,
    tempItemList: currentItemList,
    currentLeft: 0,
    currentRight: 0,
    currentLeftEndPoint: 0,
    currentRightEndPoint: 0,
    currentMergeCount: 0,
  };
  //これを通じてマージソートの状態を扱う
  const [state, dispatch] = useReducer(mergeSort, initialState, initMergeSort);

  //アイテム追加用の関数。
  function addItem() {
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

  //マージソート開始のお知らせ
  function startMergeSort() {
    changeState("Sort");
    initMergeSort();
  }

  //マージソート情報の初期化
  function initMergeSort() {
    const mergeAction: MergeSortAction = {
      type: "Create",
      initialize: {
        //とりあえず複数の段階でマージ完了したリスト
        mergedItemList: currentItemList,
        //マージ途中のリスト
        tempItemList: currentItemList,
        //マージする幅の左右の着目点
        currentLeft: 0,
        currentRight: 1,
        //マージする左右の終着点
        currentLeftEndPoint: 0,
        currentRightEndPoint: 1,
        //2^これ 個のブロックを処理するという変数
        currentMergeCount: 0,
      },
    };
    return {
      //とりあえず複数の段階でマージ完了したリスト
      mergedItemList: currentItemList,
      //マージ途中のリスト
      tempItemList: currentItemList,
      //マージする幅の左右の着目点
      currentLeft: 0,
      currentRight: 1,
      //マージする左右の終着点
      currentLeftEndPoint: 0,
      currentRightEndPoint: 1,
      //2^これ 個のブロックを処理するという変数
      currentMergeCount: 0,
    };
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
      <AddItemButton pushEvent={addItem} />
      <GotoSortButton pushEvent={startMergeSort} />

      {mergeSortZone}
    </div>
  );
}
