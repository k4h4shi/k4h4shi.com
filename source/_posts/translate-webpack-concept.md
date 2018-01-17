---
title: webpackの概要を雑に訳してみた。
date: 2017-11-16 23:36:40
tags:
---
# webpackの概要を雑に訳してみた。
最近個人的にReactでフロントの開発を初めています。
今回は、様々なフロントエンドの開発プロジェクトに導入されているwebpackの概要を取り上げます。
とは言いつつ、公式のドキュメントを雑に意訳しまくっただけの、個人の忘備録です。

## webpackとは
webpackはモダンJavaScriptアプリケーションのための、静的モジュールバンドラです。
webpackはフロントエンドアプリケーションで必要となる諸々のファイルを、バンドルというjsファイルにまとめます。

## webpackのコンセプト
アプリケーションで実行される時、webpackは内部的にアプリケーションに必要な全てのモジュールを含んだ一つの再帰的な依存性グラフを組み立てます。
その後、全てのモジュールを1つかそれ以上のバンドルにパッケージします。

webpackは、多くの設定が出来ますが、使い始めるため4つの主要なコンセプトを理解する必要があります。

### 主要な4つのコンセプト
- Entry : 開始地点
- Output : 出力
- Loaders : ローダー
- Plugins : プラグイン

### Entry
エントリーポイントははwebpackが内部的に依存性のグラフを組み立てる際の開始地点を指し示します。
エントリーポイントが渡され流と、webpackはそれが直接的、または間接的に依存するその他のモジュールやライブラリを見つけ出します。
そして全ての依存性は、加工された後にbundlesと呼ばれるファイルに出力されます。この処理については次のセクションで説明します。

エントリポイントは、設定のentryプロパティを通じて1つまたは複数設定できます。

以下は極めて単純な例です。
```
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

### Output
outputプロパティは、作成したbundlsをどこに出力するか、ファイル名は何にするかをwebpackに伝えます。

```
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```
上の例では、output.filenameとoutput.pathの2つのプロパティを使って、出力ファイルの名前と、それをどこに出力するかを設定しています。

### Loaders
ローダはwebpackがJavaScriptファイル以外のファイルを処理するために必要です。
webpack単体ではJavaScriptしか理解しませんが、ローダを使うことで、その他のファイルをバンドルすることができるようになります。
ローダはあらゆる種類のファイルをアプリケーションの依存性のグラフに格納できる形に変換します。

ローダは設定の際に2つの項目を要求します。
1つはtestプロパティで、どういう種類のファイルを変換するかを指定します。
2つめはuseプロパティで、どのローダを使用するかを指定します。

```
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```
上記の設定では、rulesプロパティに2つのプロパティを持つ1つのモジュールを設定しています。
これは、以下のような意味です。
```
webpackさんよ、.txtてな感じのパスに行き当たったら、そいつをバンドルに組み込む前にraw-loaderを使って変換してくれよな。
```

### Plugins
ローダは特定の種類のモジュールを変換しますが、プラグインはもっと幅広いタスクを行います。
プラグインは、バンドルの最適化や縮小から環境変数の定義まで、あらゆるタスクをこなします。
プラグインのインターフェースは強力なので、それらに利用することができます。
プラグインを利用するためには、まずrequireをしてplugins配列に追加する必要があります。
ほとんどのプラグインはオプションによってカスタマイズ可能です。
一つのプラグインを違う目的で複数回利用するときは、newオペレータを使ってことなるオプションで初期化したインスタンスを生成しましょう。

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

## 参考資料
- [webpack - Concepts](https://webpack.js.org/concepts/)