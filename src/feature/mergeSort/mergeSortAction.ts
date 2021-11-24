import { ToMergeItem } from "../toMergeItem";
import { MergeSortParameter } from "./mergeSortPrameter";
import { MergeSortReduceParameter } from "./mergeSrotReduceParameter";

export type MergeSortAction = {
  type: MergeSortReduceParameter;
  initialize: MergeSortParameter;
  updateAction: (
    list: ToMergeItem[],
    itemLength: number,
    mergeCount: number
  ) => void;
};
