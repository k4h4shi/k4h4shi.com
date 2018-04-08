---
title: storybookでstyleguideを作る
date: 2017-12-18 20:12:51
tags:
- React
- storybook
- UI
- front-end
---

storybook を導入する際の備忘録です。

## storybook とは

storybook は UI コンポーネントのための開発環境。様々な状態における UI を可視化しつつ、インタラクティブに開発できる。

## storybook の setup

公式の通りに以下のコマンドを実行する

```
$ npm i -g @storybook/cli
$ cd my-react-app
$ getstorybook
```

上記コマンドによって、以下が行われる。

* プロジェクトに storybook の依存性をインストールする
* package.json ファイルに storybook と build-storybook のスクリプトを加える
* 基本設定が入っている.storybook フォルダーと、コンポーネントとストーリーのサンプルが入った stories フォルダーを生成する

たまに`storybook`をグローバルにインストールするというような情報を見かけるけど、最新の React では動作しないので注意。

## storybook の起動

インストールをした状態で以下コマンドを打つと、storybook が立ち上がる。

```
$ npm run storybook
```

起動後はブラウザでアクセスできる。

## storybook の設定ファイル

storybook の設定ファイルは、`.storybook`以下に配置されている。以下は、story がどこに配置されているかだけを記した、`.storybook/config.js`。

```
import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
```

これにより、story を記述したファイルを読み込むことができる。

## story を書く

storybook では、story という形式である特定の UI の状態を記述していける。以下は、ボタンに関する 2 つの story の例。

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

* [storybook.js.org](https://storybook.js.org/)
