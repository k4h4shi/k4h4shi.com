---
title: Object#assignで副作用を起こさずにオブジェクトを更新する
date: 2017-12-29 18:47:41
tags:
- ES6
- JS
---

Object#assign メソッドを使うことで、オブジェクト直接のプロパティのコピーやマージを行うことができます。
Object#assign メソッドは、副作用を起こさずにオブジェクトのプロパティを変更したい場合などによく使われます。

純粋な関数の実装には必要不可欠のため、覚えておくと良いです。

## 構文

```
Object.assign(target, ...sources)
```

* target: ターゲットオブジェクト
* sources: ソースオブジェクト

ターゲットオブジェクトには、ソースオブジェクトの、列挙可能で、独自のプロパティのみがコピーされるようです。

## 使い道

### オブジェクトのコピーを行う

以下のサンプルのように、空のオブジェクトをターゲットにすることで、オブジェクトのコピーができます。

```
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

これは例えば、ソースオブジェクトをイミュータブルにしたい場合などに用います。

以下のように、オブジェクトを変更する場合、コピーをした後に、コピーを変更するようにします。

```
const obj = { a: 1 };
const copy = Object.assign({}, obj);
copy.b = 2;
console.log(obj); // { a: 1 }
console.log(copy); // { a: 1 }
```

### オブジェクトをマージする

以下のサンプルのように、複数のオブジェクトを渡すことで、オブジェクトをマージすることができます。

この時、第一引数のターゲットオブジェクトのみが変更されます。

```
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }
```

オブジェクトをイミュータブルにしておくために、第一引数に空のオブジェクトを渡すことをお勧めします。

```
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1 }
```

なお、同名のプロパティがあった場合は後に渡したものが優先されます。

```
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { b: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 3 }
```

### 特定のプロパティを、現在のプロパティに基づいて更新する

オブジェクトのプロパティの内、特定のプロパティのみを更新します。この場合も、元のオブジェクトは変更しません。

```
const obj = {
  a: 1,
  b: 2
};

const copy = Object.assign({}, obj, { b: obj.b + 1 });

console.log(copy); // { a: 1, b: 3 }
console.log(obj); // { a: 1, b: 2 }
```

## 参考資料

* [Object.assign](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
