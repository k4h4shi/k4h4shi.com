---
title: Jestを使ってReactアプリをテストしてみる
date: 2017-11-18 13:53:01
tags:
---
個人で開発しているReactアプリをテストするために、Jestを導入したのでその忘備録です。

## Jestとは
Fecebookが開発しているオープンソースのTesting Frameworkです。

公式によると、Facebook社内ではReactを含むすべてのJavaScriptコードをJestでテストしている様です。

FacebookはReactのライセンスをMITに変更しましたが、その際にはJestも同様に変更されました。

そのため、現在はライセンスの不安なく導入できる様になっています。

## Setup
create-react-appを利用している場合、Jestは含まれている様なので、そのままテストを開始できます。

今回は、create-react-appを用いずにJestを導入する方法を紹介します。

まずは、Jestをトランスパイルをするために、Jest用のBabelプラグインを導入します。

すでにReactが導入されている場合は、以下の幾つかは導入済みだと思いますが、念のため。

```
npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer
```

その後、package.jsonが以下の様になっていれば良いです。

```
// package.json
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "babel-jest": "<current-version>",
    "babel-preset-es2015": "<current-version>",
    "babel-preset-react": "<current-version>",
    "jest": "<current-version>",
    "react-test-renderer": "<current-version>"
  },
  "scripts": {
    "test": "jest"
  }
```

そして.babelrcを追加します。

```
// .babelrc
{
  "presets": ["es2015", "react"]
}
```

## Snapshot Testing
### snapshot testとは
[snapshot test](https://facebook.github.io/jest/docs/en/snapshot-testing.html)とは、生成されたUIが期待しない形で変更されていないことを確認するためのテストです。

例えるならば、画面のスクリーンショットを取り、テストを行う様なものです。

アプリケーションに変更を加えるたびに、UIを過去のものと比較します。

もしもUIに変更があった場合はテストが失敗しますので、それが期待通りだった場合にのみ、テストを更新します。

Jestを使えば、こういったsnapshot testのワークフローを効率よく進めることができます。

### Jestによるsnapshot test


## 参考文献
- [Jest](https://facebook.github.io/jest/)