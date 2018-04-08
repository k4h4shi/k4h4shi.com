---
title: 僕はParcelでcreate-react-appから卒業できるかもしれない
date: 2017-12-10 21:35:24
tags:
- bundler
- Parcel
- React
- create-react-app
---

[webpack 時代の終わりと parcel 時代のはじまり](vhttps://qiita.com/bitrinjani/items/b08876e0a2618745f54a)を見て、これはすごいのではと思い、早速 Parcel を使ってみました。

## Parcel とは

[Parcel](https://parceljs.org/)はゼロコンフィギュレーションのバンドラーです。

つまり設定ファイルなしで、バンドルを作成することができます。

### 設定ファイルはつらい

設定ファイルを書くことは、本来の開発にあまり関係ないことです。これはフロントエンドの開発の大きな障壁になっていたと思います。

そのため、例えば React の開発では[create-react-app](https://github.com/facebookincubator/create-react-app)というゼロコンフィギュレーションのツールがあり、僕はこれのお世話になっていました。

### もう設定ファイルいらないのでは

Percel を使えば、これ一つでいろいろなライブラリのバンドルが作れるようになるということだと思います。

本来の開発に関係のないタスクや懸念が減ることはいいことでしかないです。

とりあえず、僕は create-react-app を卒業します。

## Parcel で React の環境

感動するくらい簡単なので、手順を書きます。

Parcel をインストールします。

```
$ npm i -g parcel-bundler
```

プロジェクトルートで React の依存性をインストールします。

```
$ npm init -y & \
  npm install --save react react-dom & \
  npm install --save-dev babel-preset-react babel-preset-env
```

`.babelrc`書きます。

```
{
  "presets": ["env", "react"]
}
```

`index.html`書きます。

```
<html>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

`index.js`書きます。

```
import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
  return <h1>Hello world!</h1>
}
ReactDOM.render(<App />, document.getElementById('root'));
```

Parcel を実行します。

```
$ parcel index.html
```

http://localhost:1234 でアクセスできます。

## React の boilerplate 作った

感動のあまり勢い余って、Parcel 使って[React の boilerplate](https://github.com/k4h4shi/react-boilerplate)作りました。

## まとめ

今の所、個人的にはこれが顧客が本当に欲しかったものかもしれないと思ってる。

これが問題が起きずに浸透すれば、モダンフロントエンド開発の敷居をものすごく下げると思うので、これから新規の開発者が増えてくることも予想できる。

細かな設定などは webpack などに劣るようだけど、結構エコシステムに大きな影響を与えそう。

今後どうなるか、[リポジトリ](https://github.com/parcel-bundler/parcel)はチェックしとく。
