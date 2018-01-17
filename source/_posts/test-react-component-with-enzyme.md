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

Reactコンポーネントのテストのために、Enzymeというツールを導入したのでその方法をまとめる。

## Enzymeとは
[Enzyme](http://airbnb.io/enzyme/)はReactコンポーネントのテストを容易にするツール。

Reactコンポーネントを評価して描画するためには、仮想domの環境が必要になる。

Enzymeはテストの際にそこを担ってくれ、さらにテストのためのユーティリティも提供してくれる。

## Enzymeの導入例
`create-react-app`で構築した環境に導入するのであれば、以下を実行。
```
$ yarn add enzyme \
  enzyme-adapter-react-16 \
  react-test-renderer
```

- enzyme: Enzyme本体
- enzyme-adapter-react-16: React16のためのアダプタ
- react-test-renderer: Enzymeの依存モジュール

## Enzymeの使用例
`create-react-app`で構築した環境に導入する場合、テスティングフレームワークには[Jest](https://facebook.github.io/jest/)を使うのが楽。

### Enzymeのセットアップ
Enzymeでテストを始めるために、以下を行う。

- `src/setupTests.js`を追加して、Adapterを初期化するように設定する。
- `src/App.test.js`をEnzymeを利用するように修正する
- `npm test`を実行して、動作確認をする。

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

動作すれば、Jest+Enzymeでテストを行う環境が整ったことになる。

### 単純なコンポーネントの描画テスト
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

上記をテストするファイルは以下のようにする。
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

### より詳しいテスト
[公式のAPIドキュメント](http://airbnb.io/enzyme/docs/api/)や[Enzymeチートシート](https://devhints.io/enzyme)が参考になる。

## Reactのテストの考え方

### テストの対象
以下の観点からテストを行う。

- レンダリングされること
- プロパティに対するアウトプット
- 状態をテストする
- イベントをテストする
- エッジケースをテストする

ReduxでいうContainerコンポーネントと、Presentatinalコンポーネントでもテストの方法は当然異なるはずなので、うまく使い分ける。

### shallow renderingを積極的に使う
shallow renderingは、第一階層の深さのコンポーネントだけをレンダリングする。

これを用いることでテスト対象のコンポーネントの依存コンポーネントを気にすることなくテストが出来る。

#### shallow renderingの例
例えば、`name`と`age`を持つ、`enployee`というようなコンポーネントがあるとする。
```
let Employee = ({employee}) => (
  <span>
    <Name employee={employee}/>
    <Age employee={employee}/>
  </span>
)
```
上記コンポーネントをshallow renderingした場合、`name`と`age`は評価されず、以下のようになる。
```
<span>
  <Name employee={employee}/>
  <Age employee={employee}/>
</span>
```

これにより、依存するコンポーネントの変更を、利用するコンポーネントに影響させずにテストが出来る。

## 補足
Enzymeは、Reactだけでなく、React Nativeのテストにも利用できる。

組み合わせるテスティングフレームワークはJestに限らずMochaなども利用できる。

## 参考資料
- [ReactでTDD（テスト駆動開発）を始めよう](http://postd.cc/getting-started-with-tdd-in-react/)
- [enzymeならjsdomなしでReactのテストがほぼ全てできる](https://qiita.com/uryyyyyyy/items/cde942e51faf45f94e67)
