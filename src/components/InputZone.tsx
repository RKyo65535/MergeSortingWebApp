import { ChangeEvent, useState } from "react";
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

  const [exCount] = useState<number>(Math.floor(Math.random() * 10));

  function returnEx(): string {
    let str: string = "!";
    for (let i = 0; i < exCount; i++) {
      str += "!";
    }

    return str;
  }

  return (
    <li>
      <input
        id={props.id}
        type="text"
        className="input name-input"
        autoComplete="on"
        placeholder={"概念を入力" + returnEx()}
        onChange={hundleEdit}
      ></input>

      <button
        type="button"
        className="btn delete-button"
        onClick={() => props.deleteMyself(props.id)}
      >
        <span>削除</span>
      </button>
    </li>
  );
}
