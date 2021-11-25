type Props = {
  ranking: number;
  itemName: string;
};

export function ResultText(props: Props) {
  return (
    <p className="txt result-text">
      {props.ranking}番目に好きなのは{props.itemName}です。
    </p>
  );
}
