//export defaultで外部出力可能にした./modules/my.jsを読み込む
import my from "./modules/my.js";

// npm install --save-dev css-loader@3.4.2でパッケージをダウンロードして設定ファイルにloaderを指定した後./modules/my.cssをモジュールとして読み込む
// cssのスタイルを反映させるにはstyle-loaderも必要になる
import "./modules/my.css";

console.log("webpack");
my();
