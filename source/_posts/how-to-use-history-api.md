---
title: how_to_use_history_api
date: 2017-09-19 22:44:15
tags:
- javascript
- history
---

windowオブジェクトのhistoryオブジェクト経由でブラウザの履歴にアクセスできます。

```
window.history.back() // 履歴を1つ戻る
window.history.forward() // 履歴を1つ進める
window.history.go() // 現在のページを0して、履歴相対位置にあるページを読み込む
window.history.length // 履歴スタックの長さ
```
## 参考文献
- [ブラウザの履歴を操作する](https://developer.mozilla.org/ja/docs/Web/Guide/DOM/Manipulating_the_browser_history)
