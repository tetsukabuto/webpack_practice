// webpackの設定ファイル

//絶対パスを取得する関数
const path = require("path");

//pluginのmini-css-extract-pluginを読み込む関数
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//pluginのhtml-webpack-pluginを読み込む関数※HtmlWebpackPluginはdistにpluginで設定したindex.htmlを出力するplugin(出力されたhtmlにはconfigで設定したsrcフォルダのjsやcssも読み込んでくれる)
const HtmlWebpackPlugin = require("html-webpack-plugin");

//pluginのclean-webpack-pluginを読み込む関数※{ CleanWebpackPlugin }としているのはpluginの中にある様々なクラスからCleanWebpackPluginのクラスのみを読み込む設定にするため
// CleanWebpackPluginはsrcフォルダの内容をdistフォルダに出力する際、クリーンアップしてくれるplugin※ゴミファイルの混入を防ぐ
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //entryに エントリーポイント(webpack実行時、いちばん最初に読み込まれる)のindex.jsを指定
  entry: "./src/javascripts/main.js",
  //outputに webpackで処理されたファイルの出力される内容の設定を指定
  output: {
    // 出力先のフォルダを指定。絶対パスで出力先を記述しないとエラーになるconst pathで絶対パスを取得する(パラメータの第一引数の__dirnameは現在のプロジェクトを指す、第二引数には出力先のフォルダを指定)
    path: path.resolve(__dirname, "./dist"),
    // 出力されるファイル名を設定(デフォルトはmain.js)
    filename: "javascripts/main.js",
  },
  //インストールしたloaderの設定等を指定
  module: {
    rules: [
      {
        // testはファイル名を検知するためのもの(ここでは正規表現を使いcssを検知)
        test: /\.css/,
        // testで検知したファイルが見つかった時、行う処理
        use: [
          // loaderは下に書いた順から適用されるので順番に注意(css-loader > MiniCssExtractPlugin.loaderの順で読み込まれる)
          {
            // css-loaderで設定したcssを反映させるstyle-loaderを使用(headタグ内にインラインstyleで適用される)
            // loader: "style-loader",
            // pluginのMiniCssExtractPlugin.loaderはcssをmain.cssという外部ファイルとしてdistに出力するloader
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // css-loaderを使用
            loader: "css-loader",
          },
        ],
      },
      {
        // 画像を読み込むためのrule
        test: /\.(png|jpg)/,
        use: [
          {
            // url-loader※今回は画像をdata:image/png;base64形式で読み込むために使用
            //loader: "url-loader",
            loader: "file-loader",
            //url-loader,file-loaderの設定オプション
            options: {
              esModule: false,
              // distに出力する際の画像名を指定※name: 画像フォルダ/[nameはsrc/images/内の画像名を読み込み].[extはsrc/images/内の画像の拡張子を読み込む]
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        // pugを使うためのrule
        //.pugを検知
        test: /\.pug/,
        use: [
          //pug-html-loader > html-loaderの順で処理
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              // distフォルダにhtmlとして出力される際、読みやすくコードを整形する
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  // pluginを読み込みを行う
  plugins: [
    new MiniCssExtractPlugin({
      // distに出力する際のファイル名を指定
      filename: "./stylsheets/main.css",
    }),
    new HtmlWebpackPlugin({
      // srcからdistに出力する際のファイルを指定
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
