import { ChangeEvent } from "react";
import { ToMergeItem } from "../feature/toMergeItem";

type Props = {
  id: string;
  key: string;
  manageItem: ToMergeItem;
  deleteMyself: (key: string) => void;
};

export function InputZone(props: Props) {
  //フォームに入力されたときの関数。
  function hundleEdit(event: ChangeEvent<HTMLInputElement>) {
    //console.log(event.target.value);
    props.manageItem.name = event.target.value;
  }

  return (
    <li>
      <input
        id={props.id}
        type="text"
        className="name-input-button"
        autoComplete="on"
        placeholder="概念を入力"
        onChange={hundleEdit}
      ></input>
      <button
        type="button"
        className="name-delete-button"
        onClick={() => props.deleteMyself(props.id)}
      >
        <span>削除</span>
      </button>
    </li>
  );
}
