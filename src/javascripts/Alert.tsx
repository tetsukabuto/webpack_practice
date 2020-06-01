// Reactコンポーネントをtypescriptを使って記述
import * as React from "react";

//Reactコンポーネントがmessageという文字列型のパラメータを受け取り
const Alert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div style={{ backgroundColor: "green", color: "#fff", padding: "1em" }}>
      {message}
    </div>
  );
};

// このReactコンポーネントを他でも使えるよう出力
export default Alert;
