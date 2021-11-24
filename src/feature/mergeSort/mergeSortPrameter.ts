import { ToMergeItem } from "../toMergeItem";

export type MergeSortParameter = {
  //とりあえず複数の段階でマージ完了したリスト
  mergedItemList: ToMergeItem[];
  //マージ途中のリスト
  tempItemList: ToMergeItem[];
  //マージする幅の左右の着目点
  currentLeft: number;
  currentRight: number;
  //マージする左右の終着点
  currentLeftEndPoint: number;
  currentRightEndPoint: number;
  //2^これ 個のブロックを処理するという変数
  currentMergeCount: number;
};
