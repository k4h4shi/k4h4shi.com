---
title: 条件分岐の置き換え
date: 2017/03/18 19:25:59
---

## 論理演算子 ⇄  if else文
論理演算子とは、真偽値の論理演算を行うための演算子です。
これらは、if else文の制御構造で用いられますが、if elseの制御文と、論理演算子の条件文を上手く記述することで、理解のしやすいプログラムが記述できます。

## if文のネストからの&&演算子の置き換え
例えば、以下のようにif文がネストしている場合
```
if (conditionA) {
  if (conditionB) {
    // do some operation
  }
} else {
  // do other operation 
}
```
以下のように論理演算子を利用することでも同様の処理を記述できます。
```
if (conditionA && conditionB) {
  // do some operation
} else {
  // do other operation
}
```
この場合、この制御で行われうる処理の結果とは、2つしかありません。
その場合、後者のif else 文による制御はそれを明確に伝えますが、前者の場合は3種類の結果を招くように見えます。
例えばこんな感じです。

```
if (conditionA) {
  // some initialization
  if (conditionB) {
    // do some operation
    return 
  }
} else {
  // do other operation 
  return
}

```

このようなネストの場合は&&演算子は使えません。
ではどうしたら良いのでしょうか
## else文の!演算子による置き換え

先ほどの例はどんな場合かを考えると、
- もしAの条件が正ならば、初期化処理後にBかどうかの判定を行う
- もしBであれば、メインの処理を行い、結果を返す
- もしAでなければ、例外的な処理を行い、結果を返す

上の場合を整理すれば、
- もしAでなければ、例外的な処理を行い、結果を返す
- 初期化処理を行う
- もしBであれば、メインの処理を行い、結果を返す
ということになります


それ以外の場合を表現するのは、else文ですが、!の論理演算子で、~でない状態を表現することで、同様の処理を記述できます。
```
if (!conditionA) {
  // do other operation
  return 
}
// some initialization
if (conditionB) {
  // do some operation
  return 
}
```

このような記述はガード節と呼ばれますが、メインの処理に必要な条件を満たさない場合、早期にリターンを行う。
というものです。
こうすることで、複雑なネストに比べ、条件文の結合度が下がり、各条件分岐による意味が理解しやすくなりました。


## まとめ
同じ処理を行うコードを、どのように書けば理解しやすいかを考えれば、単純な条件分岐などでも場合によって色々な書き方がありえます。
オブジェクト指向におけるクラスまで考えると、より高度なリファクタリングが可能です。

現在はリファクタリング自体はEclipseなどのIDEのショートカットで簡単に行うことができますし、コードを書きながらも読みやすさを意識すると良いと思います。
