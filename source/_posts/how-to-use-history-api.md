---
title: history APIの使い方
date: 2017-09-19 22:44:15
tags:
- javascript
- history
---

windowオブジェクトのhistoryオブジェクト経由でブラウザの履歴にアクセスできます。

ブラウザの履歴は履歴スタックで管理されています。
以下のコードでその長さを取得することができます。

```
history.length // 履歴スタックの長さ
```

また履歴スタックの任意の位置に遷移することができます。

```
history.back() // 履歴を1つ戻る
history.forward() // 履歴を1つ進める
history.go() // 現在のページを0して、履歴相対位置にあるページを読み込む
```

## 履歴の編集や追加

HTML 5以降は履歴スタックに任意の履歴エントリを追加したり、編集することができるようになっています。


### 履歴スタックへの追加
履歴スタックの追加は以下のように行います。
```
history.pushState("hoge", "", "/hoge");
```

上記によって`location.href`の値が変更されています。


また、履歴スタックが1つ増えましたのでブラウザの戻るボタンを押下することで`location.href`の値がもとにもどります。

pushStateには任意のオブジェクトを渡すことができますので、アプリケーションにおけるある状態を保存パスとともに保存しておくことができます。


### state属性の編集
`history`をコンソールに入力すると、履歴に関する情報がみれます。

初めてページを開いたときは、`history.state`の値が`null`になっています。

`history.state`の値は任意に設定することができます。

以下のコードで、現在のstateの値を変更することができます。

```
history.replaceState("index");
```

### 戻る・進むイベントを監視する
ブラウザで履歴スタックから値が取り出されたさいのイベントを監視します。

```
winndow.onpopstate = function(event) {
  console.log('event', event);
  console.log('event.state', event.state);
}
```
ブラウザで遷移を行うたびに、ログが出力されるのがわかると思います。

### その他のプロパティ
- history.state: 状態を保持するプロパティ
- history.pathname: パス名を保持するプロパティ
- history.search: クエリパラメータを保持するプロパティ

## 参考文献
- [ブラウザの履歴を操作する](https://developer.mozilla.org/ja/docs/Web/Guide/DOM/Manipulating_the_browser_history)
