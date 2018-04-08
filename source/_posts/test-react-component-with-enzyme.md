---
title: EnzymeでReactコンポーネントをテストする
date: 2017-12-10 16:55:11
tags:
- unit-test
- React
- Jest
- Enzyme
- create-react-app
---

React コンポーネントのテストのために、Enzyme というツールを導入したのでその方法をまとめる。

## Enzyme とは

[Enzyme](http://airbnb.io/enzyme/)は React コンポーネントのテストを容易にするツール。

React コンポーネントを評価して描画するためには、仮想 dom の環境が必要になる。

Enzyme はテストの際にそこを担ってくれ、さらにテストのためのユーティリティも提供してくれる。

## Enzyme の導入例

`create-react-app`で構築した環境に導入するのであれば、以下を実行。

```
$ yarn add enzyme \
  enzyme-adapter-react-16 \
  react-test-renderer
```

* enzyme: Enzyme 本体
* enzyme-adapter-react-16: React16 のためのアダプタ
* react-test-renderer: Enzyme の依存モジュール

## Enzyme の使用例

`create-react-app`で構築した環境に導入する場合、テスティングフレームワークには[Jest](https://facebook.github.io/jest/)を使うのが楽。

### Enzyme のセットアップ

Enzyme でテストを始めるために、以下を行う。

* `src/setupTests.js`を追加して、Adapter を初期化するように設定する。
* `src/App.test.js`を Enzyme を利用するように修正する
* `npm test`を実行して、動作確認をする。

#### src/setupTests.js

```
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
```

#### src/App.test.js

```
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});
```

#### テストを実行

```
$ npm test
```

動作すれば、Jest+Enzyme でテストを行う環境が整ったことになる。

### 単純なコンポーネントの描画テスト

テスト対象コンポーネントは以下のようにする。

#### src/HelloWorld.js

```
import React, { Component } from 'react';

export class HelloWorld extends Component {
  render() {
    return <span>Hello world!</span>
  }
}
```

上記をテストするファイルは以下のようにする。

#### src/HelloWorld.test.js

```
import { shallow } from 'enzyme'
import HelloWorld from './HelloWorld'
it('works', () => {
  const wrap = shallow(
    <HelloWorld />
  )

  expect(wrap.text()).toEqual('Hello wolrd!')
})
```

### より詳しいテスト

[公式の API ドキュメント](http://airbnb.io/enzyme/docs/api/)や[Enzyme チートシート](https://devhints.io/enzyme)が参考になる。

## React のテストの考え方

### テストの対象

以下の観点からテストを行う。

* レンダリングされること
* プロパティに対するアウトプット
* 状態をテストする
* イベントをテストする
* エッジケースをテストする

Redux でいう Container コンポーネントと、Presentatinal コンポーネントでもテストの方法は当然異なるはずなので、うまく使い分ける。

### shallow rendering を積極的に使う

shallow rendering は、第一階層の深さのコンポーネントだけをレンダリングする。

これを用いることでテスト対象のコンポーネントの依存コンポーネントを気にすることなくテストが出来る。

#### shallow rendering の例

例えば、`name`と`age`を持つ、`enployee`というようなコンポーネントがあるとする。

```
let Employee = ({employee}) => (
  <span>
    <Name employee={employee}/>
    <Age employee={employee}/>
  </span>
)
```

上記コンポーネントを shallow rendering した場合、`name`と`age`は評価されず、以下のようになる。

```
<span>
  <Name employee={employee}/>
  <Age employee={employee}/>
</span>
```

これにより、依存するコンポーネントの変更を、利用するコンポーネントに影響させずにテストが出来る。

## 補足

Enzyme は、React だけでなく、React Native のテストにも利用できる。

組み合わせるテスティングフレームワークは Jest に限らず Mocha なども利用できる。

## 参考資料

* [React で TDD（テスト駆動開発）を始めよう](http://postd.cc/getting-started-with-tdd-in-react/)
* [enzyme なら jsdom なしで React のテストがほぼ全てできる](https://qiita.com/uryyyyyyy/items/cde942e51faf45f94e67)
