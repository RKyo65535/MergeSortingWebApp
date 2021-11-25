export function message() {
  // 最初にコメントを入れよう！！
  console.group("開発者メッセージ");
  const style1 = `font-size: 24px;
  font-family: serif;
  font-weight: bold;
   color: #6e0202;
   background: #db722c;`;
  const style2 = `font-size: 14px;
   font-family: serif;
   font-weight: bold;
    color: #F3A696;
   background: #520d2e;`;
  const style3 = `font-size: 16px;
   font-family: serif;
    color: #d4fff5;
   background: #0d3d52;`;
  console.warn("はずかしいやん");
  console.log(
    `
%c    ゆっくりマージソートしていってね！
%c  それは儚きあなたの思いを無残にも具現化してしまうアルゴリズム……
%c                     そして貴方はGitHubへと誘われる…… 

https://github.com/RKyo65535/MergeSortingWebApp
`,
    style1,
    style2,
    style3
  );
  console.groupEnd();
}
