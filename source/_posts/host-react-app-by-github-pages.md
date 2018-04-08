---
title: Reactで作ったアプリをgithub pagesでホストする
date: 2017-11-19 13:02:38
tags:
---

最近個人的に React でフロントエンドの開発をしています。

そこで、まずはとりあえず使い始めるための方法をまとめようと思っています。

## 目的

このエントリの目的は、React で作ったアプリを github pages でホストすることです。

React 自体の使い方などは、[公式のチュートリアル](https://reactjs.org/tutorial/tutorial.html)
が一番わかりやすいです。

## 使用するライブラリ/ツール

今回使うツールは以下の 3 つです。

これさえあれば、ユーザの操作にインタラクティブに反応するビューを作ることができます。

* React
* material-ui
* create-react-app
  * yarn
* gh-pages

### React

言わずもがな、インタラクティブなビューを作るための Facebook 製のライブラリです。

### create-react-app

React の開発の中である意味一番の難所でもある、環境構築をサポートするツールです。

babel や webpack, eslint までモダンフロントエンドの開発に必要なツール群をラップしてくれています。

create-react-app は、パッケージ管理ツールに yarn を利用しています。

### material-ui

Google の UI のガイドラインであるマテリアルデザインに沿ったコンポーネントを、React コンポーネントとして提供するライブラリです。

質のいいコンポーネントを、自分のプロジェクトに流用することができます。

### gh-pages

プロダクションビルドを、github pages に簡単にデプロイするツールです。

## 環境を構築する

前提として、node, npm はすでにローカルに導入済みだと想定します。

### create-react-app で React のプロジェクトを作る

まずは、create-reacta-app をグローバルにインストールします。

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

うまくいっていれば、以下のコマンドで、サーバが立ち上がると思います。

```
$ npm start
```

### material-ui を導入する

作成されたプロジェクトには materail-ui は含まれていないので、自分で導入する必要があります。

create-react-app で作成したアプリに、自分で依存関係を追加したい場合は yarn を使います。

```
$ yarn add material-ui
```

その後、問題なく動作するか確認するために、material-ui のボタンを置いてみます。

例えば、src/App.js を以下のように書き換えてください。

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

変更後は、テストを行ってアプリが壊れていないか確認しましょう。

```
$ npm test
```

テストが成功したら、再度以下のコマンドで、サーバが立ち上げます。

```
$ npm start
```

Full Width と表示されたボタンが表示されていれば成功です。

### 1 コマンドで github pages にデプロイできるようにする

これから、以下のコマンドを実行すれば github pages にデプロイできるように環境を作っていきます。

```
$ npm run deploy
```

コマンド 1 つでデプロイできるようにしておくことは、こまめにデプロイしていく開発スタイルでは必要不可欠です。そのため、環境を構築したばかりのこの段階でデプロイの環境も構築しておきます。

### プロダクションビルドを生成する

現在、src/に存在するファイルは実行可能な形式ではありませんので、デプロイをする前に、ビルドをする必要があります。

と言っても、create-react-app のおかげで以下のコマンドを実行するだけで良いです。

```
$ npm run build
```

すると、build/が作成されると思います。

### package.json に homepage を追加する

create-react-app はデフォルトでサーバールートでホスティングされる想定でビルドを行います。今回は、github-pages でデプロイを行うために、package.json の設定を変更します。

以下の形式で package.json に追記してください。

```
"homepage": "http;//{yourName}.github.io/{yourAppName}/"
```

### gh-pages を導入する

github pages へのデプロイを CLI から行うために、gh-pages というプログインを導入します。
yarn を使って、以下のコマンドで導入します。

```
$ yarn add --dev gh-pages
```

### deploy のスクリプトを追記する

`npm run deploy` を実行した際、以下の 2 つのタスクを順に実行しさせます。

* プロダクションビルドを生成
* プロダクションビルドを github pages へデプロイする

具体的には以下を package.json の `sprict`に追加します。

```
"deploy" : "npm run build&&gh-pages -d build"
```

`npm run deploy` でデプロイが可能になりました。先ほど、hopepege に指定した URL へアクセスして、確認してください。

### まとめ

割と簡単に github pages で、React で実装した web アプリを公開することができたと思います。

全く実装はしていませんが、お膳立てはしたので、後はみなさんのクリエイティビティでなんとかしましょう。

自分の環境では動作しないなど、不具合があった場合はコメント欄で連絡をもらえると助かります。
