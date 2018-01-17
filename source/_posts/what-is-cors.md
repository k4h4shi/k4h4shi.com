---
title: CORSってなにそれ食べれるの
date: 2017-12-07 20:34:30
tags:
- CORS
- Web
- http
---
CORSって何っていう質問にとりあえず答えるための雑なメモ

## CORSとは
Cross-Origin Resource Sharingの略。
クライアントがページ取得元サーバとは異なるサーバに対し、リクエストを送信する場合にはクロスオリジンHTTPリクエストを行う。

![cors.pngv](https://cdn.keycdn.com/support/wp-content/uploads/2015/09/cors.png)

## クロスオリジンHTTPリクエストについて
クライアントの送信するリクエストには、`Origin`ヘッダが含まれる。
これにより、サーバはそのリクエストが送信されたリソースが、どのドメインを取得元とするリソースかを知ることができる。

サーバの送信するレスポンスには、`Access-Control-Allow-Origin`ヘッダが含まれる。
サーバはこれによって、受け付けるリクエストを、取得元ドメインによって、制限することができる。

## プリフライトリクエストについて
他ドメインのリソースを変更する可能性があるようなリクエストの場合、プリフライトリクエストを行う。
特に以下のような場合に行われる。

## 参考文献
- [mdn: HTTP アクセス制御 (CORS)](https://developer.mozilla.org/ja/docs/Web/HTTP/HTTP_access_control)
