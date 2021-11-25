type Props = {
  pushEvent: () => void;
};

export function GotoSortButton(props: Props) {
  return (
    <button type="button" className="btn sort-button" onClick={props.pushEvent}>
      <span>ソートする！</span>
    </button>
  );
}
