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
      break;
    case "RightNext": //右の選択がされたとき
      break;
    case "Create":
      return action.initialize;
    default:
      break;
  }
  return state;
}
