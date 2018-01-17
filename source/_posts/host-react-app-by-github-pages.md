---
title: Reactで作ったアプリをgithub pagesでホストする
date: 2017-11-19 13:02:38
tags:
---
最近個人的にReactでフロントエンドの開発をしています。

そこで、まずはとりあえず使い始めるための方法をまとめようと思っています。

## 目的
このエントリの目的は、Reactで作ったアプリをgithub pagesでホストすることです。

React自体の使い方などは、[公式のチュートリアル](https://reactjs.org/tutorial/tutorial.html)
が一番わかりやすいです。

## 使用するライブラリ/ツール
今回使うツールは以下の3つです。

これさえあれば、ユーザの操作にインタラクティブに反応するビューを作ることができます。

- React
- material-ui
- create-react-app
  - yarn
- gh-pages

### React
言わずもがな、インタラクティブなビューを作るためのFacebook製のライブラリです。

### create-react-app
Reactの開発の中である意味一番の難所でもある、環境構築をサポートするツールです。

babelやwebpack, eslintまでモダンフロントエンドの開発に必要なツール群をラップしてくれています。

create-react-appは、パッケージ管理ツールにyarnを利用しています。

### material-ui
GoogleのUIのガイドラインであるマテリアルデザインに沿ったコンポーネントを、Reactコンポーネントとして提供するライブラリです。

質のいいコンポーネントを、自分のプロジェクトに流用することができます。

### gh-pages
プロダクションビルドを、github pagesに簡単にデプロイするツールです。

## 環境を構築する
前提として、node, npmはすでにローカルに導入済みだと想定します。

### create-react-appでReactのプロジェクトを作る
まずは、create-reacta-appをグローバルにインストールします。
```
$ npm i -g create-react-app
```

その後、以下の一連のコマンドを実行します。

```
$ mkdir my-project
$ cd my-project
$ create-react-app .
```

すると、プロジェクトのひな型が作成されます。

うまくいっていれば、以下のコマンドで、サーバが立ち上がると思います。
```
$ npm start
```

### material-uiを導入する
作成されたプロジェクトにはmaterail-uiは含まれていないので、自分で導入する必要があります。

create-react-appで作成したアプリに、自分で依存関係を追加したい場合はyarnを使います。

```
$ yarn add material-ui
```

その後、問題なく動作するか確認するために、material-uiのボタンを置いてみます。

例えば、src/App.jsを以下のように書き換えてください。

```
// src/App.js
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FlatButton from 'material-ui/FlatButton';

import logo from './logo.svg';
import './App.css';

const App = () => (
  <MuiThemeProvider>
    <FlatButton label="Full width" fullWidth={true} />
  </MuiThemeProvider>
)

export default App;
```

変更後は、テストを行ってアプリが壊れていないか確認しましょう。

```
$ npm test
```

テストが成功したら、再度以下のコマンドで、サーバが立ち上げます。
```
$ npm start
```

Full Widthと表示されたボタンが表示されていれば成功です。

### 1コマンドでgithub pagesにデプロイできるようにする
これから、以下のコマンドを実行すればgithub pagesにデプロイできるように環境を作っていきます。

```
$ npm run deploy
```

コマンド1つでデプロイできるようにしておくことは、こまめにデプロイしていく開発スタイルでは必要不可欠です。
そのため、環境を構築したばかりのこの段階でデプロイの環境も構築しておきます。

### プロダクションビルドを生成する
現在、src/に存在するファイルは実行可能な形式ではありませんので、デプロイをする前に、ビルドをする必要があります。

と言っても、create-react-appのおかげで以下のコマンドを実行するだけで良いです。

```
$ npm run build
```

すると、build/が作成されると思います。

### package.jsonにhomepageを追加する
create-react-appはデフォルトでサーバールートでホスティングされる想定でビルドを行います。
今回は、github-pagesでデプロイを行うために、package.jsonの設定を変更します。

以下の形式でpackage.jsonに追記してください。
```
"homepage": "http;//{yourName}.github.io/{yourAppName}/"
```

### gh-pagesを導入する
github pagesへのデプロイをCLIから行うために、gh-pagesというプログインを導入します。
yarnを使って、以下のコマンドで導入します。

```
$ yarn add --dev gh-pages
```
### deployのスクリプトを追記する

`npm run deploy` を実行した際、以下の2つのタスクを順に実行しさせます。

- プロダクションビルドを生成
- プロダクションビルドをgithub pagesへデプロイする

具体的には以下をpackage.jsonの `sprict`に追加します。

```
"deploy" : "npm run build&&gh-pages -d build"
```


`npm run deploy` でデプロイが可能になりました。
先ほど、hopepegeに指定したURLへアクセスして、確認してください。


### まとめ
割と簡単にgithub pagesで、Reactで実装したwebアプリを公開することができたと思います。

全く実装はしていませんが、お膳立てはしたので、後はみなさんのクリエイティビティでなんとかしましょう。

自分の環境では動作しないなど、不具合があった場合はコメント欄で連絡をもらえると助かります。