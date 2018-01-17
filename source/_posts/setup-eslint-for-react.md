---
title: setup_eslint_for_react
date: 2017-12-13 20:50:20
tags:
- React
- ESLint
- es6
- JS
---

ES6 + Reactの環境でESLintを行う。
ESLintのconfigは[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)を使う。

## 依存関係のインストール
```
$ npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint
```
## .eslintrc
```
{
  "extends": "airbnb"
}
```

あとはよしなに設定していけば良い。

## 参考リンク
- [ESLintをAtomに導入し、Reactの構文にも対応したAirbnbのJSスタイルガイドを使う](https://mae.chab.in/archives/2874)