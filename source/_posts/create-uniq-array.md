---
title: JSでの一意な配列の作り方
date: 2017-12-19 19:11:51
tags:
- JS
- array
- ES6
---
JSで一意な要素のみを持つ配列を作る方法。

```javascript
const array = [1, 3, 2, 5, 1, 2, 3];

const uniq = [... new Set(array)];

console.log(uniq); // [1, 3, 2, 5]
```