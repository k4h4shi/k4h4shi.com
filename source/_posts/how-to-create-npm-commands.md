---
title: npm scriptsを使ってタスクを実行する
date: 2017-09-14 20:17:09
tags:
- tips
- npm
- npm-scripts
---

## npm-scirptsとは
`npm init`を実行すると生成されるpackage.jsonに、"scripts"というプロパティがあります。
ここにワンライナーのシェルスクリプトと、そのエイリアスを設定できます。

以下のように記述して設定します。
```
{
  ...
  "scripts": {
    "server": "hexo server",
    "start": "hexo server -o"
  },
  ...
}
```

設定したnpm-scritpsはnpmコマンドで実行できるようになります。
key名によって以下の4つに分類され、それぞれ実行方式が異なります。

- 予約語のnpm-scripts
- フックされるnpm-scirpts
- 予約語ではないnpm-scripts
- 前後に実行されるnpm-scripts

### 予約語のnpm-scripts
予約語のnpm-scriptsは、`npm ${name}`の形式で実行できます。
- start
- restart
- stop
- test

予約されているのは名前だけのため、シェルスクリプトは自分で定義する必要があります。

### フックされるnpm-scripts
あるコマンドが実行されるタイミングで実行されます。
詳細は[npmjs.com](https://docs.npmjs.com/misc/scripts)の公式ドキュメントをみてください。

### 予約語ではないnpm-scripts
予約語ではないnpm-scriptsは、`npm run ${name}`の形式で実行できます。
正式には`npm run-sctipt ${name}`ですが、長いのでエイリアスの方を使うことが多いです。

### 前後に実行されるnpm-scripts
コマンド名をのプレフィックスを以下のどちらかで始めることで、任意のコマンドの前後に設定させることができます。

- pre 
- post

例えば、prestartは、startの前に実行されます。

## まとめ
上記のようにnpm-scriptsはコマンド名によって挙動が変わります。
使いこなすことで開発時の繰り返しのタスクをある程度自動化できますので、ぜひ使ってみてください。

## 参考文献
- [npmjs.com](https://docs.npmjs.com/misc/scripts)
- [npm-scriptsについて](http://qiita.com/axross/items/a2a0d148e40b66074858)
