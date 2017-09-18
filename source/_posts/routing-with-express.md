---
title: Expressでルーティングをする
date: 2017-09-14 21:00:22
tags:
- node.js
- express
- routing
- Web-API
---
[前回](http://k4h4shi.com/2017/09/14/build-a-server-with-express/)はExpressのインストールと、HelloWorldの出力を行いました。
今回はいよいよExpressでルーティングを行います。

## ルーティングの構文
Expressのルーティングの構文はとてもシンプルで、以下のようになります。

```
app.METHOD(PATH, HANDLER)
```

- app: expressのインスタンス
- METHOD: Httpのメソッド(例: get, post等)
- PATH: サーバのパス
- HANDLER: ルートがマッチされた時に実行される関数

### サンプル
以下はCRUDのAPIのルーティングのサンプルです。

今回のHANDLERではメッセージを返しているだけですが、本来はリソースへ処理を行います。
```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/', (req, res) => res.send('Got a post requrest.'));
app.put('/user', (req, res) => res.send('Got a put requrest at /user.'));
app.delete('/user', (req, res) => res.send('Got a delete requrest at /user.'));

app.listen(port, () => 
  console.log(`express app started at port ${port}`)
);
```

## 静的リソース
Expressで静的リソースを読み込めるようにしたい場合、`express.static`を用います。

### サンプル

`express.static`の引数に、静的リソースのパスを渡します。
```
app.use(express.static('public'))
```

これで`public/`ディレクトリ以下のファイルを読み込めるようになります。

複数個の静的リソースを読み込めるようにしたい場合は、以下のようになります

```
app.use(express.static('public'))
app.use(express.static('files'))
```

仮装パスにて静的リソースを提供する場合は、以下のようになります。
```
app.use('/static', express.static('public'))
```

この場合、`ホスト名/static`へアクセスすると、`public/`以下の静的リソースが利用できます。

## まとめ
Expressを使えば、直感的にWebサーバのルーティングを行うことができます。
詳細は[公式日本語ドキュメント](http://expressjs.com/ja/)をご参照ください。

## 参考文献
- [Basic routing](http://expressjs.com/en/starter/basic-routing.html)
- [Serving static files in Express](http://expressjs.com/en/starter/static-files.html)
