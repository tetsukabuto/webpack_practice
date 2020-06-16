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
  // ビルドする際の出力モード(開発はdevelopment,本番環境はproduction)
  mode: "development",
  // 出力されるコードを読みやすくするsource-mapを出力(Reactなど複雑なJavaScriptを書く際は必須)
  devtool: "source-map",
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
        // typescriptを使うためのrule
        //正規表現でtsを検知
        test: /\.(ts|tsx)/,
        exclude: /node-modules/,
        use: [{ loader: "ts-loader" }],
      },
      {
        // jsを使うためのrule(主にbabelを使ってのトランスコンパイルで使用)
        // 正規表現でjsを検知
        test: /\.js/,
        // excludeでnode_modulesのフォルダは検知から除外する
        exclude: /node_modules/,
        use: [
          {
            // babel-loaderを使用
            loader: "babel-loader",
            options: {
              // presetsはbabelにある様々なpluginをひとまとめにしたもの。今回はpreset-envを使用
              // { targets: "> 0.25%, not dead" }はシェアが0.25%以上あり、なおかつ公式がサポートを終了していないブラウザをトランスコンパイルする
              presets: [
                ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                // reactをトランスコンパイルする際、必要なplugin
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        // testはファイル名を検知するためのもの(ここでは正規表現を使いcssもしくはsassもしくはscssを検知)
        test: /\.(css|sass|scss)/,
        // testで検知したファイルが見つかった時、行う処理
        use: [
          // loaderは下に書いた順から適用されるので順番に注意(sass-loader > css-loader > MiniCssExtractPlugin.loaderの順で読み込まれる)
          {
            // css-loaderで設定したcssを反映させるstyle-loaderを使用(headタグ内にインラインstyleで適用される)
            // loader: "style-loader",
            // pluginのMiniCssExtractPlugin.loaderはcssをmain.cssという外部ファイルとしてdistに出力するloader
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // css-loaderを使用
            loader: "css-loader",
            options: {
              // trueでsourcmapを出力(ファイルサイズが重くなるので本番環境ではfalseにする)
              sourceMap: false,
            },
          },
          {
            // sass-loaderを使用
            loader: "sass-loader",
          },
        ],
      },
      {
        // 画像を読み込むためのrule
        test: /\.(png|jpg|jpeg)/,
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
              // 画像をルート相対で参照する
              publicPath: "/",
            },
          },
          {
            //image-webpack-loaderを使用(画像サイズを圧縮する)
            loader: "image-webpack-loader",
            options: {
              // 画質の圧縮率のoption
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
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
    new HtmlWebpackPlugin({
      template: "./src/templates/members/taro.pug",
      filename: "members/taro.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
