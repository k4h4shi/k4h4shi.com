---
title: flexboxってなにそれ食べれるの
date: 2017-12-09 21:20:46
tags:
- なにそれ食べれるの
- web-design
- css
- flexbox
- front-end
---

flexbox って何って聞かれた時に答えられる程度にしておくための備忘録です。

# flexbox とは

flexbox は色々スクリーンサイズや表示デバイスに寄らずにレイアウトを行うためのもの。

なんだそれ、レスポンシブデザインじゃんと思うけど、それは考え方であり思想だから How には答えてくれない。

じゃあどうやるのって事で定義された CSS の仕様てな感じかなと勝手に思ってる。

ということで、表示デバイスがスマホだろうが PC だろうが、CSS で相対的にレイアウトしたいっていう要求を満たしてくれる。

楽に綺麗にかけるので、最近のフロントではデファクトになってるっぽい。

## flexbox のコンセプト

* 相対的にレイアウトする
* 幅や高さという空間を引き伸ばしたり縮めたりして埋める
* 垂直方向や水平方向へ偏向しない

## flexbox の用語

![pic](https://developer.mozilla.org/files/3739/flex_terms.png)

* Flex コンテナ: Flex アイテムの親要素
* Flex アイテム: Flex コンテナの子要素
* Axis(軸)
  * main axis(主軸): Flex アイテムに平行な軸
  * cross axis(交差軸): main axis に対して垂直な軸
* Direction(方向): Flex アイテムのフローの方向。 Axis 上の始点と終点で定義される。
  * main start/main end: main axis 上の始点と終点
  * cross start/cross end: cross axis 上の始点と終点
* Line(ライン): 交差軸の方向
* Dimension(寸法): 高さや幅に対する独断的でない同等物。
  * main size: main axis に占める大きさ
  * cross size: cross axis に占める大きさ

## まとめ

React Native とかやってたら出てきたので、調べるなどした。

プロパティや、ガイド、現在のブラウザの対応状況などは[公式のドキュメント](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Flexible_Box_Layout)参照してください。

## 参考リンク

* [Solved by Flexbox](https://philipwalton.github.io/solved-by-flexbox/)
* [CSS Flexbox チートシート](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet)
* [React Native: height and width](https://facebook.github.io/react-native/docs/height-and-width.html)
