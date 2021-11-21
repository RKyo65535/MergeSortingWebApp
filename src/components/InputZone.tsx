type Props = {
  id: string;
};

export function InputZone() {
  return (
    <>
      <input
        type="text"
        className="name-input-button"
        autoComplete="on"
        placeholder="概念を入力"
      ></input>
      <button type="button" className="name-delete-button">
        <span>削除</span>
      </button>
    </>
  );
}
