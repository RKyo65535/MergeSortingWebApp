import { useEffect, useReducer, useState } from "react";
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
import { ResultText } from "./components/ResultText";
import { message } from "./sandbox/message";

export function App() {
  //最初に遊びごごろを。謎メッセージを出す。
  //一回だけ出す
  useEffect(message, []);

  //ここで全体を管理します。

  //現在のフェーズ(状態)
  const [phase, setPhase] = useState<ViewPhase>("Set");

  //デフォルトリスト
  const defaultItems: ToMergeItem[] = [
    { id: nanoid(), name: "選択肢1" },
    { id: nanoid(), name: "選択肢2" },
    { id: nanoid(), name: "選択肢3" },
    { id: nanoid(), name: "選択肢4" },
    { id: nanoid(), name: "選択肢5" },
    { id: nanoid(), name: "選択肢6" },
    { id: nanoid(), name: "選択肢7" },
    { id: nanoid(), name: "選択肢8" },
  ];
  //現在のリスト
  const [currentItemList, setCurrentItemList] =
    useState<ToMergeItem[]>(defaultItems);

  //マージソートの最初の状態？
  const initialState: MergeSortParameter = {
    mergedItemList: [],
    tempItemList: [],
    currentLeft: 0,
    currentRight: 0,
    currentLeftEndPoint: 0,
    currentRightEndPoint: 0,
    currentMergeCount: 0,
  };

  //これを通じてマージソートの状態を扱う
  const [mergeState, dispatchMergeState] = useReducer(mergeSort, initialState);

  //アイテム追加用の関数。
  function addItem() {
    const newItem: ToMergeItem = {
      id: "id" + nanoid(),
      name: "",
    };
    setCurrentItemList([...currentItemList, newItem]);
  }
  //要素が追加されたら、下スクロールする
  useEffect(() => window.scrollBy(0, 100), [currentItemList]);

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
    if (currentItemList.length >= 2) {
      changeState("Sort");
      initMergeSort();
    }
  }

  //マージソート情報の初期化
  function initMergeSort() {
    const tempList: ToMergeItem[] = [...currentItemList];
    const mergeAction: MergeSortAction = {
      type: "Create",
      initialize: {
        //とりあえず複数の段階でマージ完了したリスト
        mergedItemList: tempList,
        //マージ途中のリスト
        tempItemList: [],
        //マージする幅の左右の着目点
        currentLeft: 0,
        currentRight: 1,
        //マージする左右の終着点
        currentLeftEndPoint: 0,
        currentRightEndPoint: 1,
        //2^これ 個のブロックを処理するという変数
        currentMergeCount: 0,
      },
      updateAction: chackMergeCondition,
    };
    dispatchMergeState(mergeAction);
  }

  //マージソートで左を選択
  function selectLeft() {
    const mergeAction: MergeSortAction = {
      type: "LeftNext",
      initialize: initialState,
      updateAction: chackMergeCondition,
    };
    dispatchMergeState(mergeAction);
  }

  //マージソートで右を選択。
  function selectRight() {
    const mergeAction: MergeSortAction = {
      type: "RightNext",
      initialize: initialState,
      updateAction: chackMergeCondition,
    };
    dispatchMergeState(mergeAction);
  }

  //マージの状態によって、現在の状態を変化させる
  function chackMergeCondition(
    list: ToMergeItem[],
    itemLength: number,
    currentMergeCount: number
  ) {
    //ソートの必要が無くなったらこれを実行
    if (itemLength <= Math.pow(2, currentMergeCount)) {
      //console.log("モード変更！");
      setPhase("Result");
    }
    //現在のリストに反映
    setCurrentItemList([...list]);
  }

  //ここから下は表示内容を変化させる。
  //現在のリストを、良い感じに実態(View?)に渡してやる
  //入力フォームを複製できるのだ
  let currentShowItemList: JSX.Element[] = [];
  let beforeMergeSortElement: JSX.Element[] = [];

  if (phase === "Set") {
    currentShowItemList = currentItemList.map((item) => (
      <InputZone
        id={item.id}
        key={item.id}
        manageItem={item}
        deleteMyself={deleteItem}
      />
    ));
    beforeMergeSortElement = [
      <AddItemButton pushEvent={addItem} key={nanoid()} />,
      <GotoSortButton pushEvent={startMergeSort} key={nanoid()} />,
    ];
  }

  let mergeSortZone: JSX.Element = <></>;

  if (phase === "Sort") {
    mergeSortZone = (
      <MergeSortSelect
        leftItem={currentItemList[mergeState.currentLeft]}
        rightItem={currentItemList[mergeState.currentRight]}
        leftAction={selectLeft}
        rightAction={selectRight}
      />
    );
  }

  let resultZone: JSX.Element = <></>;
  let sortResult: JSX.Element[] = [];
  if (phase === "Result") {
    resultZone = <>マージ完了</>;

    for (let i = 0; i < currentItemList.length; i++) {
      let oneResult: JSX.Element = (
        <ResultText
          ranking={i + 1}
          itemName={currentItemList[i].name}
          key={nanoid()}
        />
      );
      sortResult = [...sortResult, oneResult];
    }
  }

  //ここから下がメイン部分
  return (
    <div className="margeAll">
      <h1 className="title">マージソートアプリ</h1>

      {currentShowItemList}
      {beforeMergeSortElement}

      {mergeSortZone}
      {resultZone}
      {sortResult}
    </div>
  );
}
