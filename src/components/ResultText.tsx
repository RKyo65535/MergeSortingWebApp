type Props = {
  ranking: number;
  itemName: string;
};

export function ResultText(props: Props) {
  return (
    <p>
      {props.ranking}番目に好きなのは{props.itemName}です。
    </p>
  );
}
