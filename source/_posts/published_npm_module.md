---
title: npmモジュール公開してみた
date: 2017-10-01 15:33:55
tags:
- npm
- JavaScript
- Node.js
---

公開したモジュールは[intensityjs](https://www.npmjs.com/package/intensityjs)というものです。

3方向の加速度データを元に、計測震度を算出するためのモジュールです。

仕事でドメインの知識を得たので、個人的にJavaScriptにて実装をしました。

その際のnpmモジュールの公開が意外と簡単だったため、その方法をまとめます。

## npmユーザの作成
npmのauthor情報が必要なので、以下のコマンドで作成します。
```
$ npm set init.author.name "Kotaro Takahashi"
$ npm set init.author.email "kotaro.t@k4h4shi.com"
$ npm set init.author.url "http://k4h4shi.com"
```

上記コマンドを実行すると、`~/.npmrc`が作成されます。

## npmユーザの追加

次に以下のコマンドを実行します。
```
$ npm adduser
```
## npmモジュールの作成
以下のコマンドで、プロジェクトルートを作成し、npmを初期化します。
```
$ mkdir intensityjs
$ cd intensityjs
$ npm init
```
すると、npmモジュールの情報を管理するpackage.jsonというファイルができます。

準備はできましたので、実装をします。

## npmモジュールの公開
package.jsonさえちゃんと作れていれば、以下のコマンドでnpmモジュールが公開できます。

```
$ npm publish
```

## まとめ
npmモジュールを公開するのは簡単なので、ぜひみなさんやってみると良いと思います。
[Travis-CI](https://travis-ci.org/)を使ったCIも行いましたので、今後はそれについても記事を書きたいなと思っています。

## 参考リンク
- [3分でできるnpmモジュール](https://qiita.com/fnobi/items/f6b1574fb9f4518ed520)
- [3時間でできるnpmモジュール](https://qiita.com/cognitom/items/75736e27cc7de151a7d5)
