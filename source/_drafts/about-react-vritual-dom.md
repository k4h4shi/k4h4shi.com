---
title: Reactの仮想DOMについて
tags:
---

### 仮想 DOM

React のユーザは、仮想 DOM を更新するために、モデルの変更を行うだけです。

DOM のどの部分が変更されて、どう更新されるべきかは React が判断してくれるためです。

React は、Model のデータが変更された時、以下の手順で実際の DOM を更新します。

1.  モデルの変更を仮想 DOM に反映する
2.  仮想 DOM と実際の DOM の Diff をとる
3.  Diff を実際の DOM に patch する

### 最低限ユーザが気にすべきこと

* list に key を設定する

![virtual-dom](https://i.stack.imgur.com/M8f40.png)
