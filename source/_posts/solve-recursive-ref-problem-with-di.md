---
title: Nodeモジュールの循環参照問題を、依存性の注入で解決する
date: 2017-12-20 22:08:40
tags:
- node
- ES6
- require
- commonJS
- dependency-injection
- software-design
---

Node.js で開発していると、循環参照によって依存関係の解決が出来ず、モジュールが undefind になることがあります。

今回は、依存性の注入を利用してこの問題を解決します。

### 循環参照が起きる条件

1.  あるモジュール同士が互いに互いを`require`している。
2.  module.exports に代入をしている

### 循環参照に陥った依存関係の例

以下のように、2 つのモジュールが互いに互いを`require`してしまっていると、どちらかが undefined になります。

```javascript
// class-a.js
const ClassB = require("./class-b");
class ClassA {
  fnA() {
    console.log("This is fnA");
  }

  callFnB() {
    new ClassB().fnB();
  }
}
module.exports = ClassA;

// class-b.js
const ClassA = require("./class-a");
class ClassB {
  fnB() {
    console.log("this is fnB");
  }

  callFnA() {
    new ClassB().fnB();
  }
}
module.exports = ClassB;
```

### 間接的な循環参照

相互に直接`require`するわけではなくとも、間接的に相互依存した時点でこの問題は発生します。

それは例えば、モジュールが`a -> b -> c -> d -> a`と依存しているような状態です。

## 循環参照に陥る原因と解決策

相互依存するモジュールが出来てしまうことは、設計の失敗を意味します。

それは問題なのでどうするのかというと、依存性の注入を行うことで解決できます。

### 依存性の注入とは

依存性の注入は、依存性を外部から渡すようにする設計方法です。

今回の場合、あるモジュールの依存モジュールを外部から渡すことになります。

これにより、依存しているモジュールは依存モジュールを`import`したり`require`しなくても利用できます。

### 問題点の整理

この状況で起きている問題を整理すると、以下の状況だと考えられます。

モジュール A とモジュール B は相互に機能を利用したいが、相互参照をしてはいけない。

それならば、どちらかのモジュールがもう片方のモジュールを参照しないようにすればよいのです。

## 依存性の注入で循環参照を解決する

モジュール A がモジュール B に対し、依存性として自身を注入します。

モジュール A はモジュール B を参照して依存していますが、モジュール B はもはやモジュール A を参照していません。

もっと言えば、モジュール B は、特定のモジュール A に依存していません。

### 循環参照を陥った依存性の注入で解決する例

```javascript
// class-a.js
const ClassB = require("./class-b");
class ClassA {
  fnA() {
    console.log("This is fnA");
  }

  callFnB() {
    return createB().fnB();
  }

  createB() {
    return new ClassB(this);
  }
}
module.exports = ClassA;

// class-b.js
class ClassB {
  constructor(classA) {
    this._classA = classA;
  }

  fnB() {
    console.log("this is fnB");
  }

  callFnA() {
    this._classA.fnA();
  }

  //...
}
module.exports = ClassB;
```

これにより、モジュール A とモジュール B は相互に機能を呼び出すことができ、かつ循環参照を防ぐことができます。

## まとめ

依存性の注入は DI コンテナなどが有名ですが、広義にはもっと単純な状況も指します。

単体テストの容易性を高めたり、ポリモーフィズムを利用して柔軟なコードを書くための設計の技法です。

覚えておくと必ず役に立つと思います。
