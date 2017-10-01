---
title: JavaScriptのコンストラクタについて
date: 2017-09-30 10:29:02
tags:
- JavaScript
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

これを応用すれば、たとえば、配列にコンストラクタを格納し、順々にインスタンスを生成したりすることもできます。

```
const constArray = [
  class SomeClass {
      constructor(prop) {
          this.prop = prop;
          this.clazz = 'SomeClass';
      }
  },
  class OtherClass {
    constructor(prop) {
      this.prop = prop;
      this.clazz = 'OtherClass';
    }
  }
]

constArray.forEach(c => console.log(new c().clazz));
```


## JavaScriptのnew
また、newの挙動が気になったので少し調べてみた。

特に難しいところはなく、newによる呼び出しの場合は少しコードが補足されて実行されるようです。

```
var Constructor = function(prop) {
// this = {};
this.prop = prop;
// return this;
}
```

## まとめ
JavaScriptのコンストラクタは、変数や配列、マップに格納できます。
また、関数の引数や戻り値にすることもできます。
オブジェクトの生成を行う際には、コンストラクタをどのように実行するかを考えてみると良いと思います。
