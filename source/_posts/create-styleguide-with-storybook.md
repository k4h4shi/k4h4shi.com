---
title: storybookでstyleguideを作る
date: 2017-12-18 20:12:51
tags:
- React
- storybook
- UI
- front-end
---
storybookを導入する際の備忘録です。

## storybookとは
storybookはUIコンポーネントのための開発環境。
様々な状態におけるUIを可視化しつつ、インタラクティブに開発できる。

## storybookのsetup
公式の通りに以下のコマンドを実行する
```
$ npm i -g @storybook/cli
$ cd my-react-app
$ getstorybook
```

上記コマンドによって、以下が行われる。
- プロジェクトにstorybookの依存性をインストールする
- package.jsonファイルにstorybookとbuild-storybookのスクリプトを加える
- 基本設定が入っている.storybookフォルダーと、コンポーネントとストーリーのサンプルが入ったstoriesフォルダーを生成する

たまに`storybook`をグローバルにインストールするというような情報を見かけるけど、最新のReactでは動作しないので注意。

## storybookの起動
インストールをした状態で以下コマンドを打つと、storybookが立ち上がる。
```
$ npm run storybook
```
起動後はブラウザでアクセスできる。

## storybookの設定ファイル
storybookの設定ファイルは、`.storybook`以下に配置されている。
以下は、storyがどこに配置されているかだけを記した、`.storybook/config.js`。
```
import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
```
これにより、storyを記述したファイルを読み込むことができる。

## storyを書く
storybookでは、storyという形式である特定のUIの状態を記述していける。
以下は、ボタンに関する2つのstoryの例。
```
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Button', module)
  .add('with text', () => (
    <button onClick={action('clicked')}>Hello Button</button>
  ))
  .add('with some emoji', () => (
    <button onClick={action('clicked')}>😀 😎 👍 💯</button>
  ));
```
## まとめ
まだ導入したばかりのため、逐次追記していくつもり。

## 参考文献
- [storybook.js.org](https://storybook.js.org/)