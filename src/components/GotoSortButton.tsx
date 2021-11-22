type Props = {
  pushEvent: () => void;
};

export function GotoSortButton(props: Props) {
  return (
    <button
      type="button"
      className="add-item-button"
      onClick={() => props.pushEvent()}
    >
      <span>ソートする！</span>
    </button>
  );
}
