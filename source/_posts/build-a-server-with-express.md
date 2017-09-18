---
title: expressのsetupとhello world
date: 2017-09-14 19:41:24
tags: 
- setup
- node.js
- express
- helloworld
---

## Express
ExpressはNode.js上で動作するサーバサイドのWebフレームワークです。
簡単な記述でルーティングなどを行うことが出来るようです。

## Expressのインストール
ExpressはNode.jsのみに依存します。
[Node.js](https://nodejs.org/en/)がインストールされてない場合は、しておいてください。

まずはHello worldと出力するだけのサーバを作ります。
ディレクトリを作って、npm initをした後にexpressをインストールします。

```
$ mkdir express-practice
$ cd express-practice
$ npm init
$ npm install express --save
```

## Hello world
プロジェクトディレクトリで、index.js(またはnpm init時に指定したファイル)を作成します。

とりあえずは、公式に公開されているサンプルコードをちょっと変えて写経します。

```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => 
  console.log(`express app started at port ${port}`)
);
```

次のコマンドを実行します。
```
$ node app.js
```

ブラウザーで`http://localhost:3000/`をロードして、出力を確認します。

## まとめ
Expressのsetupを行いました。
次回以降、APIについても掘り下げていきます。

サンプルは[express-practice](https://github.com/k4h4shi/express-practice)にあげておきます。

## 参考文献
- [expressjs.com](http://expressjs.com/ja/)
