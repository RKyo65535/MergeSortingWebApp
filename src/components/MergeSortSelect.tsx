import { ToMergeItem } from "../feature/toMergeItem";

type Props = {
  leftItem: ToMergeItem;
  rightItem: ToMergeItem;
  leftAction: () => void;
  rightAction: () => void;
};

//ここにマージソートの選択する部分がある。
export function MergeSortSelect(props: Props) {
  return (
    <>
      <button
        type="button"
        className="btn left-select-button"
        onClick={() => props.leftAction()}
      >
        <span>{props.leftItem.name} が良い</span>
      </button>
      <button
        type="button"
        className="btn right-select-button"
        onClick={() => props.rightAction()}
      >
        <span>{props.rightItem.name} が良い</span>
      </button>
    </>
  );
}
