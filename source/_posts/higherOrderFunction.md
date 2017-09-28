---
title: map, reduce, filterを実装してみる
date: 2017-09-28 17:07:56
tags:
- javascript
- 高階関数
---

JavaScriptでは高階関数が使えます。

高階関数とは、`関数の戻り値や、引数として使える関数`のことをさします。

これだけ聴いてもぴんとこないと思いますので、実際に高階関数を使ってみることでそのメリットを見てみます。

## 配列に対する操作
配列に対する操作を行う際は、for文を用います。

そのため、以下のようなコードは  イディオムとなっており、ソースコード中に頻繁に現れます。


```
let array = [1, 2, 3];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

しかし、以下のような処理の場合はどうでしょうか。


```
let array1 = [1, 2, 3];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

let array2 = [4, 5, 6];

for (let i = 0; i < array2.length; i++) {
  alert(array[i]);
}
```
このようなとき、for文の内容だけがことなっておりそれ以外はほとんど一緒です。

そのため、以下のように高階関数を用いることで、記述を省略できます。


```
let array1 = [1, 2, 3];


forEach(console.log, array1);


let array2 = [4, 5, 6];

forEach(alert array2);

function forEach(fn, a) {
  for (let i = 0; i < array2.length; i++) {
    fn(array[i]);
  }

}
```

これによって、差分のみを記述するプログラミングが可能となります。

map.js
```
let array = [1, 2, 3];
let newArray = map(array, (n) => n * 2);

console.log(newArray);

function map(array, fn) {
    let a = [];
    for (let i = 0; i < array.length; i++) {
        a[i] = fn(array[i]);
    }
    return a;
}
```

reduce.js
```
const nArray = [1, 2, 3];

let sum = reduce((x, y) => x + y, nArray, 0);

console.log(sum);

function reduce(fn, a, init) {
    let s = init;
    for (let i = 0; i < a.length; i++) {
        s = fn(s, a[i]); 
    }
    return s;
}
```

filter.js
```
const array = [10, 20, 30];

let newArray = filter(array, e => e > 15);

console.log(newArray)

function filter(a, fn) {
    let n = [];
    for (let i = 0; i < a.length; i++) {
        let e = a[i];
        if (fn(e)) n.push(e);
    }
    return n;
}
```
