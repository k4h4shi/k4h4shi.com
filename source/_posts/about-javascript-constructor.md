---
title: javascriptのコンストラクタについて
date: 2017-09-28 10:29:02
tags:
- javascript
- oop
- memo
---

JavaScriptのコンストラクタについて、面白い挙動を見つけたのでメモ.


## コンストラクタを変数に格納
JavaScriptのコンストラクタは、任意の変数に格納できる。

もちろんその変数に対して、newを使ってインスタンスを生成することもできる。

この挙動はES5のfunctionによるクラス定義の場合も、ES6のclassによる定義の場合も、どちらも変わらない。

```
const c1 = class SomeClass {
    constructor(prop) {
        this.prop = prop;
    }
}

const c2 = function SomeFuncionClass(prop) {
    this.prop = prop;
};

const i1 = new c1('hello');
console.log(i1.prop);

const i2 = new c2('hello');
console.log(i2.prop);
```
これを応用すればたとえば、配列にコンストラクタを格納し、順々にインスタンスを生成したりすることもできると思う。


## JavaScriptのnew
また、newの挙動が気になったので少し調べてみた。

特に難しいところはなく、newによる呼び出しの場合は少しコードが補足されて実行されるみたい。

```
var Constructor = function(prop) {
// this = {};
this.prop = prop;
// return this;
}
```

