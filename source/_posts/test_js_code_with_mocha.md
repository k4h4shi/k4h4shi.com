---
title: mochaでJavaScriptのテストをする
date: 2017-09-19 22:34:24
tags:
- mocha
- JavaScript
- test
- unit-test
---

mochaは単体テストツールです。
Javaで言うならば、jUnitのようなものです。

### テストを成功させる
mochaをインストールして動かしてみます。

```
$ npm install mocha
$ mkdir test
$ vim test/test.js
```

test/test.jsを以下のように編集します。
```
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```
これは、mochaを使って実行できるテストケースです。

ArrayクラスのindexOfメソッドは、値が存在しない場合は-1を返すべき。という仕様をテストします。
そのために、[1, 2, 3]の配列のindexOf()に4を渡しています。
配列に4という値は存在しないので、期待値は-1となり、それを実測値と比較しています。

この状態で、`mocha`を起動すると、以下のように出力されます。

```
  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (9ms)
```

テストが成功していることがわかります。

### テストを失敗させる
ソースを以下のように変更して、テストを失敗させたらどうなるでしょうか。

```
const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(1));
    });   
  });
});
```
[1, 2, 3]のindexOfに1を渡した場合、返り値は0になります。
そのため-1を期待しているこのテストは失敗するはずです。

mochaを起動します。
```
$ mocha
```


以下のようにテストが失敗したことと、その詳細な原因が出力されます。
```
  Array
    #indexOf()
      1) should return -1 when the value is not present


  0 passing (10ms)
  1 failing

  1) Array #indexOf() should return -1 when the value is not present:

      AssertionError [ERR_ASSERTION]: -1 == 0
      + expected - actual

      --1
      +0

      at Context.<anonymous> (test/test.js:5:14)
```

## まとめ
テストツールを一度でも使ったことがあるならば、mochaの使い方自体はそれほど難しくないことがわかると思います。
mochaは非同期のテストなどもサポートしているため、今後は、より詳細な使い方を紹介します。

またkarmaやpower-assertとの連携についても記事を書きます。

## 参考リンク
- [mochajs.org](https://mochajs.org/)
