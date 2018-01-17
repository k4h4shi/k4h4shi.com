---
title: npmモジュール開発のためのボイラープレート作った
date: 2017-12-19 21:28:05
tags:
- npm
- ES6
- javascript
- ESLint
- nyc
- mocha
- chai
- sinon
- babel
- TravisCI
---
今までに3, 4個ほどnpmモジュール作ってきて、だいぶnodeでの開発にも慣れてきました。

なので、ツールの設定の復習をかねて、npmモジュールのためのボイラープレート作りました。

[npm-module-boilerplate](https://github.com/k4h4shi/npm-module-boilerplate)ってリポジトリで公開してます。

## 構築した開発環境
とりあえず以下の4つはできるようにしました。
- BabelでES6からES5へのトランスパイル。
- mocha + chai + sinonでのテスト。watchもあり。
- ESLintでのリント。スタイルガイドはAirbnbを継承。
- nycでのカバレッジ測定。
- Travis CIでの継続的インテグレーション。

今後も、必要に応じて変更していこうと思います。

## 利用できるコマンド
- `test`: run test with mocha.
- `test:watch`: run test with mocha and watch.
- `build`: run build with babel-cli.
- `cover`: run code coverage using nyc.
- `lint`: run lint with ESLint as airbnb JS style.
- `lint:watch`: run lint with ESLint as airbnb JS style and watch.
- `lint:fix`: run lint with ESLint and fix as airbnb JS style.

## まとめ
環境構築って実際結構楽しい。