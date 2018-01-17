---
title: Material-UIで右下に浮いてるボタンを作る
date: 2017-11-28 00:24:20
tags: 
- front-end
- react
- material-ui
- inline-css
---

Material Designのサイトでよく見る、右下に浮いてるボタンの作り方。
Reactと[Material-UI](http://www.material-ui.com/#/)を使えば簡単だけど、公式のドキュメントにやり方が書いていないためにメモ。

inline CSSというものを使って、ファイル内でスタイルを定義してあげると、JavaScriptの構文でスタイルが適用できる。
```
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const FloatingBtn = () => {
  const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };
  return (
    <FloatingActionButton style={style}>
      <ContentAdd />
    </FloatingActionButton>
  )
};

export default FloatingBtn;
```

## 参考リンク
- [Make material-ui reactjs FloatingActionButton float](https://stackoverflow.com/questions/35828991/make-material-ui-reactjs-floatingactionbutton-float)
