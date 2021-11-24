import { ToMergeItem } from "../toMergeItem";
import { MergeSortAction } from "./mergeSortAction";
import { MergeSortParameter } from "./mergeSortPrameter";

//リデュース用？
//ここにマージソートのアルゴリズムを書き込もう
export function mergeSort(
  state: MergeSortParameter,
  action: MergeSortAction
): MergeSortParameter {
  //最終的に代入する奴ら
  let m_mergedItemList: ToMergeItem[] = [...state.mergedItemList];
  let m_tempItemList: ToMergeItem[] = [...state.tempItemList];
  let m_currentLeft: number = state.currentLeft;
  let m_currentRight: number = state.currentRight;
  let m_currentLeftEndPoint: number = state.currentLeftEndPoint;
  let m_currentRightEndPoint: number = state.currentRightEndPoint;
  let m_currentMergeCount: number = state.currentMergeCount;

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

  let returnParam: MergeSortParameter = {
    mergedItemList: m_mergedItemList,
    tempItemList: m_tempItemList,
    currentLeft: m_currentLeft,
    currentRight: m_currentRight,
    currentLeftEndPoint: m_currentLeftEndPoint,
    currentRightEndPoint: m_currentRightEndPoint,
    currentMergeCount: m_currentMergeCount,
  };

  console.log(returnParam);
  //更新を掛ける
  action.updateAction(
    m_mergedItemList,
    m_mergedItemList.length,
    m_currentMergeCount
  );

  return returnParam;

  function selectLeft() {
    console.log("左を選択");
    //えらばれしものを配列に入れる。
    m_tempItemList = [...m_tempItemList, m_mergedItemList[m_currentLeft]];
    console.log(m_tempItemList);

    //次の候補に移動
    m_currentLeft += 1;

    //限界になってしまったら、残った右の奴を順に配列に入れていく。
    //その後、すべてのパラメータを更新する。
    if (
      m_currentLeft > m_currentLeftEndPoint ||
      m_currentLeft >= m_mergedItemList.length
    ) {
      padAllRight();
      updateSortPoint();
    }
  }

  function selectRight() {
    console.log("右を選択");
    //えらばれしものを配列に入れる。
    m_tempItemList = [...m_tempItemList, m_mergedItemList[m_currentRight]];
    //次の候補に移動
    m_currentRight += 1;

    //限界になってしまったら、残った左の奴を順に配列に入れていく。
    //その後、すべてのパラメータを更新する。
    if (
      m_currentRight > m_currentRightEndPoint ||
      m_currentRight >= m_mergedItemList.length
    ) {
      padAllLeft();
      updateSortPoint();
    }
  }

  //左のものをすべて一時配列に詰める
  function padAllLeft() {
    console.log("右全滅");
    while (
      m_currentLeft <= m_currentLeftEndPoint &&
      m_currentLeft < m_mergedItemList.length
    ) {
      console.log(
        "左つめ 今の左は" +
          m_currentLeft +
          "で、" +
          m_currentLeftEndPoint +
          "まで掃除"
      );
      m_tempItemList = [...m_tempItemList, m_mergedItemList[m_currentLeft]];
      m_currentLeft += 1;
    }
  }
  //右のものをすべて一時配列に詰める
  function padAllRight() {
    console.log("左全滅");
    while (
      m_currentRight <= m_currentRightEndPoint &&
      m_currentRight < m_mergedItemList.length
    ) {
      console.log(
        "右つめ 今の右は" +
          m_currentRight +
          "で、" +
          m_currentRightEndPoint +
          "まで掃除"
      );

      m_tempItemList = [...m_tempItemList, m_mergedItemList[m_currentRight]];
      m_currentRight += 1;
    }
  }

  //次のソートポイントを確認する。
  function updateSortPoint() {
    console.log("次の地点の確認");
    //次の左右の終着点
    m_currentLeftEndPoint =
      m_currentLeftEndPoint + Math.pow(2, m_currentMergeCount + 1);
    m_currentRightEndPoint =
      m_currentRightEndPoint + Math.pow(2, m_currentMergeCount + 1);

    //次の左右の始点
    m_currentLeft =
      m_currentLeftEndPoint - Math.pow(2, m_currentMergeCount) + 1;
    m_currentRight =
      m_currentRightEndPoint - Math.pow(2, m_currentMergeCount) + 1;

    //以下、例外条件を潰していく。
    if (m_currentRight >= m_mergedItemList.length) {
      console.log("時点の右始点は配列外" + m_currentRight);
      //右の始点がそもそも配列外の時は、もう自動的に左の物を配列に入れてあげる。(左がない場合もある。)
      padAllLeft();
      //ここで1段階目のマージが完了
      //マージ回数を増やし、その回数目での初期位置にする。
      m_currentMergeCount = m_currentMergeCount + 1;
      m_currentLeftEndPoint = Math.pow(2, m_currentMergeCount) - 1;
      m_currentRightEndPoint = Math.pow(2, m_currentMergeCount + 1) - 1;
      m_currentLeft =
        m_currentLeftEndPoint - (Math.pow(2, m_currentMergeCount) - 1); //つまり0です。
      m_currentRight =
        m_currentRightEndPoint - (Math.pow(2, m_currentMergeCount) - 1); //つまり2^currentMergeCountです。
      //さらに、マージしたリストを更新する
      m_mergedItemList = [...m_tempItemList];
      //一時リストは空にする。
      m_tempItemList = [];
    }
  }
}
