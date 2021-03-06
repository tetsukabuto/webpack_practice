// インストールしたReactで使うライブラリを読み込む
import ReactDom from "react-dom";
import * as React from "react";

// typescript形式で作成したAlertというReactコンポーネントを読み込む
import Alert from "./Alert.tsx";

// Reactのコンポーネントを定義
const App = (props) => {
  return (
    <div style={{ color: "#000" }}>
      Hello, React App!
      <Alert message="Success!" />
    </div>
  );
};

//コンポーネントを表示させる要素を取得
const reactRoot = document.getElementById("react-root");
// コンポーネントを表示させる要素があった場合、<App />でコンポーネント内容が出力される
if (reactRoot) {
  ReactDom.render(<App />, reactRoot);
} else {
  //コンポーネントが見つからない場合はconsole.logでメッセージを出力
  console.log("No root element found");
}
