---
title: Reactのコンポーネントについて
date: 2017-12-18 22:20:30
tags:
- react
- component
- lifecycle
- frontend
---
Reactのコンポーネントを雑にしか理解していなかったためにまとめる。

## コンポーネント
コンポーネントは、関数またはクラスで作ることができる。

### 関数コンポーネント
関数コンポーネントは見た目だけを担当し、与えられたプロパティによってUIを返す関数とする。
そのため、状態を持たない純粋な関数として作る。

### クラスコンポーネント
クラスコンポーネントは、見た目だけではなく状態を持つ。
ES6のclass構文を使って、React.Componentを継承する。
その際は、renderメソッドを純粋な関数として実装する。
その他にもいくつかの属性やメソッドを持っており、必要に応じて利用できる。

#### 主要なメソッド
- render
- setState

#### 主要な属性
- prop
- state

#### ライフサイクルメソッド
その他にも、ある時点で実行されるライフサイクルメソッドをOverrideして、特定のコードを実行することができる。

##### 命名規則
何かが起こる直前に実行されるメソッドはWill, 直後に実行されるメソッドはDidがプレフィックスとなる。
例: componentWillMount, componentDidMount

##### ライフサイクルの種類
- Mount
  - constructor
  - componentWillMount
  - render
  - componentDidMount
- Update
  - componentWillRecieveProps
  - shouldComponentUpdate
  - componentWillUpdate
  - render
  - componentDidUpdate
- Unmount
  - componentWillUnmount
- Error Handling
  - componentDidCatch

## 参考文献
- [公式ページ](https://reactjs.org/docs/react-component.html)
- [ライフサイクル図](https://qiita.com/kawachi/items/092bfc281f88e3a6e456)