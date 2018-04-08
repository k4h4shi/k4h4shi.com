---
title: hexoを使ってblog構築してみた。
date: 2017-09-18 20:19:00
---

## hexo とは

hexo は Node.js 上で動作する Blog フレームワークです。
Markdown でポストしたファイルから静的なページを生成してくれます。

## hexo のインストール

hexo を動作させるためには以下が必要です。

* Node.js
* Git

もし既にインストール済みであれば、以下のコマンドでインストール可能です。

```
$ npm install -g hexo-cli
```

## hexo の初期化

hexo を初期化させるために以下のコマンドを用います。
\<folder\>はプロジェクトのルートとなるディレクトリです。

```
$ hexo init <folder>
$ cd <folder>
$ npm install
```

以下のようなディレクトリ構造になったら成功です。

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

## hexo の設定

hexo の設定ファイルは、\_config.yml です。
[Configuration](https://hexo.io/docs/configuration.html)を参考にしつつ設定します。

最初は単純に Site と URL の項目を設定しておけばいいと思います。

以下は僕の設定項目です。

```
# Site
title: k4h4shi.com
subtitle: kotaro.t@k4h4shi's homepage.
description: Hello world, I'm a web developer who mostly use Java for dev.
author: kotaro takahashi
language: ja
timezone: Japan

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://k4h4shi.com
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
```

## hexo の起動

プロジェクトディレクトリで以下のコマンドを実行すると、hexo が起動します。デフォルトでは、`http://localhost:4000`で起動すると思います。

```
$ hexo server
```

## まとめ

ローカル環境にブログを構築することができました。ブログの投稿方法や、本番環境へのデプロイなどは、[hexo.io](https://hexo.io/docs/index.html)を参考にしてください。

余談ですが、hexo の日本語での発音を知っている人がいたら教えてください。ヘクソだと思ってますがこれはなんとなく汚くてイヤですね。

## 参考文献

* [hexo.io](https://hexo.io/docs/index.html)
