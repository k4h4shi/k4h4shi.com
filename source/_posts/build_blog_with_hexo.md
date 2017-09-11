---
title: hexoを使ってblog構築してみた。
---

## hexoとは
hexoはNode.js上で動作するBlogフレームワークです。
Markdownでポストしたファイルから静的なページを生成してくれます。

## hexoのインストール
hexoを動作させるためには以下が必要です。

- Node.js
- Git

もし既にインストール済みであれば、以下のコマンドでインストール可能です。

```
$ npm install -g hexo-cli
```

## hexoの初期化
hexoを初期化させるために以下のコマンドを用います。
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

## hexoの設定
hexoの設定ファイルは、\_config.ymlです。
[Configuration](https://hexo.io/docs/configuration.html)を参考にしつつ設定します。

最初は単純にSiteとURLの項目を設定しておけばいいと思います。

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

## hexoの起動
プロジェクトディレクトリで以下のコマンドを実行すると、hexoが起動します。
デフォルトでは、`http://localhost:4000`で起動すると思います。

```
$ hexo server
```

## まとめ
ローカル環境にブログを構築することができました。
ブログの投稿方法や、本番環境へのデプロイなどは、[hexo.io](https://hexo.io/docs/index.html)を参考にしてください。

余談ですが、hexoの日本語での発音を知っている人がいたら教えてください。
ヘクソだと思ってますがこれはなんとなく汚くてイヤですね。

## 参考文献
- [hexo.io](https://hexo.io/docs/index.html)
