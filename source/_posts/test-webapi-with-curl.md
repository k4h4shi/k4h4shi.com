---
title: curlでWebApiをテストする
date: 2017-09-14 21:21:17
tags:
- tips
- terminal
- unix
- curl
- Web-Api
---

curlは簡単にhttpリクエストが行えるツールです。

## 基本的な使い方
以下のように実行します。
```
curl [options] URL
```

例えば、localhost:8080にGETリクエストをしたい場合は、以下のようになります。
```
curl http://localhost:8080
```

## オプションをつける

- -X オプションでリクエストメソッドが切り替えれます。
- -H オプションでリクエストヘッダ設定できます。
- -d オプションでリクエストデータを設定できます。

例えばlocalhost:8080にPOSTリクエストをしたい場合は、以下のようになります。

```
curl -X POST -H "Content-Type: application/json" -d '{
  "id": 3,
  "name": "k4h4shi",
}' http://localhost:8080
```

## GUIツール使っちゃう
題と外れますが、手っ取り早くいろんなテストしたい場合は、[postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)のようなGUIツール使いましょう。

## 参考文献
- [cURLについてまとめておく](http://qiita.com/yuyalush/items/906999ab6a2ee8e77d33)
