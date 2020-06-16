// 定義したReactコンポーネントを読み込む
import "./reactApp.jsx";

// npm install --save-dev css-loader@3.4.2でパッケージをダウンロードして設定ファイルにloaderを指定した後./modules/my.cssをモジュールとして読み込む
// cssのスタイルを反映させるにはstyle-loaderも必要になる
import "../stylesheets/main.scss";

console.log("webpack");
