// Reactコンポーネントをtypescriptを使って記述
import * as React from "react";
// styled-componentsを読み込む
import styled from "styled-components";

// styled.divの``内に通常の記述方法のstyleを書くことができる
// const AlertContainerで定義したstyleはこのコンポーネントのみ有効で他に影響を与えることはない※ランダムなclass名が与えられる
const AlertContainer = styled.div`
  background-color: green;
  color: #fff;
  padding: 1em;
`;

//Reactコンポーネントがmessageという文字列型のパラメータを受け取り
const Alert: React.FC<{ message: string }> = ({ message }) => {
  //AlertContainerタグはstyled-componentsを使って設定したconst AlertContainerのstyleが反映される
  return <AlertContainer>{message}</AlertContainer>;
};

// このReactコンポーネントを他でも使えるよう出力
export default Alert;
