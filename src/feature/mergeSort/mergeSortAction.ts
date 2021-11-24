import { MergeSortParameter } from "./mergeSortPrameter";
import { MergeSortReduceParameter } from "./mergeSrotReduceParameter";

export type MergeSortAction = {
  type: MergeSortReduceParameter;
  initialize: MergeSortParameter;
};
