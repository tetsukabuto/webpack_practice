// 定義したReactコンポーネントを読み込む
import "./reactApp.jsx";
//export defaultで外部出力可能にした./modules/my.jsを読み込む
import my from "./my.js";

// npm install --save-dev css-loader@3.4.2でパッケージをダウンロードして設定ファイルにloaderを指定した後./modules/my.cssをモジュールとして読み込む
// cssのスタイルを反映させるにはstyle-loaderも必要になる
import "../stylesheets/main.scss";

// 定義したVueコンポーネントを読み込む
import Vue from "vue";
import VueApp from "./VueApp.vue";

// 定義したtypescriptを読み込む
import add from "./add.ts";

// Vueコンポーネントを出力
new Vue({
  el: "#vue-root",
  render: (h) => h(VueApp),
});

// 読み込んだtypescriptのadd関数の結果をconsole.logで表示
console.log(add(3, 9));

console.log("webpack");
my();
