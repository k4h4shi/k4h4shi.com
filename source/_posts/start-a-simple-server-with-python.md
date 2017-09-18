---
title: pythonを使って一時的なWebサーバを立てる
date: 2017-09-12 22:55:37
tags: tips
---

たまに一時的にWebサーバを立てたい時があると思います。

ローカルにpythonがインストールされている場合、簡単にサーバを立てることができます。

配信したいページ(index.htmlなど)があるディレクトリにて、以下のコマンドを実行します。

```
$ python -m SimpleHTTPServer
```

するとデフォルトのポートは8000でWebサーバが起動します。

第2引数でポート番号を指定することもできます。

```
$ python -m SimpleHTTPServer 8001
```

この場合、以下のURLでアクセスが可能です。

```
http://localhost:8001
```
