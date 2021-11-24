import { MergeSortAction } from "./mergeSortAction";
import { MergeSortParameter } from "./mergeSortPrameter";

//リデュース用？
//ここにマージソートのアルゴリズムを書き込もう
export function mergeSort(
  state: MergeSortParameter,
  action: MergeSortAction
): MergeSortParameter {
  switch (action.type) {
    case "LeftNext": //左の選択がされたとき
      selectLeft();
      break;
    case "RightNext": //右の選択がされたとき
      selectRight();
      break;
    case "Create":
      return action.initialize;
    default:
      break;
  }
  return state;

  function selectLeft() {
    //えらばれしものを配列に入れる。
    state.tempItemList = [
      ...state.tempItemList,
      state.mergedItemList[state.currentLeft],
    ];
    //次の候補に移動
    state.currentLeft += 1;

    //限界になってしまったら、残った右の奴を順に配列に入れていく。
    //その後、すべてのパラメータを更新する。
    if (
      state.currentLeft > state.currentLeftEndPoint ||
      state.currentLeft >= state.mergedItemList.length
    ) {
      padAllRight();
      updateSortPoint();
    }
  }

  function selectRight() {
    //えらばれしものを配列に入れる。
    state.tempItemList = [
      ...state.tempItemList,
      state.mergedItemList[state.currentRight],
    ];
    //次の候補に移動
    state.currentRight += 1;

    //限界になってしまったら、残った左の奴を順に配列に入れていく。
    //その後、すべてのパラメータを更新する。
    if (
      state.currentRight > state.currentRightEndPoint ||
      state.currentRight >= state.mergedItemList.length
    ) {
      padAllLeft();
      updateSortPoint();
    }
  }

  //左のものをすべて一時配列に詰める
  function padAllLeft() {
    while (
      state.currentLeft > state.currentLeftEndPoint &&
      state.currentLeft < state.mergedItemList.length
    ) {
      state.tempItemList = [
        ...state.tempItemList,
        state.mergedItemList[state.currentLeft],
      ];
      state.currentLeft += 1;
    }
  }
  //右のものをすべて一時配列に詰める
  function padAllRight() {
    while (
      state.currentRight > state.currentRightEndPoint &&
      state.currentRight < state.mergedItemList.length
    ) {
      state.tempItemList = [
        ...state.tempItemList,
        state.mergedItemList[state.currentRight],
      ];
      state.currentRight += 1;
    }
  }

  //次のソートポイントを確認する。
  function updateSortPoint() {
    //次の左右の終着点
    let nextLeftEndPoint =
      state.currentLeftEndPoint + Math.pow(2, state.currentMergeCount + 1);
    let nextRightEndPoint =
      state.currentRightEndPoint + Math.pow(2, state.currentMergeCount + 1);

    //次の左右の始点
    let nextLeftPoint =
      nextLeftEndPoint - Math.pow(2, state.currentMergeCount) + 1;
    let nextRightPoint =
      nextRightEndPoint - Math.pow(2, state.currentMergeCount) + 1;

    //以下、例外条件を潰していく。
    if (nextRightPoint >= state.mergedItemList.length) {
      //右の始点がそもそも配列外の時は、もう自動的に左の物を配列に入れてあげる。(左がない場合もある。)
      padAllLeft();
      //ここで1段階目のマージが完了
      //マージ回数を増やし、その回数目での初期位置にする。
      state.currentMergeCount += 1;
      nextLeftEndPoint = Math.pow(2, state.currentMergeCount) - 1;
      nextRightEndPoint = Math.pow(2, state.currentMergeCount + 1) - 1;
      nextLeftPoint =
        nextLeftEndPoint - (Math.pow(2, state.currentMergeCount) - 1); //つまり0です。
      nextRightPoint =
        nextRightEndPoint - (Math.pow(2, state.currentMergeCount) - 1); //つまり2^currentMergeCountです。
      //さらに、マージしたリストを更新する
      state.mergedItemList = [...state.tempItemList];
      //一時リストは空にする。
      state.tempItemList = [];
    }

    //次の初期位置をステートに適用
    state.currentLeft = nextLeftPoint;
    state.currentRight = nextRightPoint;
    state.currentLeftEndPoint = nextLeftEndPoint;
    state.currentRightEndPoint = nextRightEndPoint;
  }
}
