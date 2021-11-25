type Props = {
  pushEvent: () => void;
};

export function AddItemButton(props: Props) {
  return (
    <button
      type="button"
      className="btn add-item-button"
      onClick={props.pushEvent}
    >
      <span>追加</span>
    </button>
  );
}
