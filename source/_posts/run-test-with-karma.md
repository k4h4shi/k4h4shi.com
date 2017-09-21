---
title: karmaで複数ブラウザでのテストを実行する
date: 2017-09-19 23:30:31
tags:
- karma
- javascript
- test
---

karmaはJavaScriptのテストをサポートするツールです。
複数のデバイスや、ブラウザでのテストを行うことができます。
mochaなどのテストランナーと連携して使います。


## karmaインストールの前準備
まずはテスト用のプロジェクトを作成して、mochaのテストを作成します。


```
$ mkdir test
$ npm init
$ npm install --save-dev mocha
$ vim test/test.js
```

vim/test.jsは以下のようにします。
```
const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });   
  });
});
```

念のため、mochaが起動し、成功することを確認をします。
```
$ mocha
```

## karmaをインストール

karmaとkarma-cliをインストールします。
```
$ npm install karma --save-dev
$ npm install karma-cli -g
```

先ほど作成したプロジェクトのルートで、`karma init`を実行します。

順に質問に答えると、必要なモジュールがインストールされ、`karma.conf.js`が生成されます。

## karmaを起動する
以下のコマンドラインを実行します。

```
karma start
```

すると、ブラウザが起動してテストが実行されます。

## まとめ
モダンJavaScriptは、いろいろなツールを組み合わせて使うことが多くあります。
karmaもそのように使われる1つです。
最低でも、どのようなものかだけは把握しておくと良いと思います。

