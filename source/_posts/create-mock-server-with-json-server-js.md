---
title: json-server使ってmockサーバ作ってみる
date: 2017-09-19 22:01:48
tags:
- json-server
- mock
- node
- web-api
- rest
---

json-serverはコーディングレスでモックサーバを構築できるツールです。
REST-Web-apiのサーバをものすごく簡単に立てることができます。

インストールは以下のコマンドラインを実行します。

```
npm install -g json-server
```

インストールができたら、`db.json`というファイルを作成します。
これがapiで取得できるデータとなります。
例えば以下のような形です。
```
{
  "persons": [
    {
      "id": 1,
      "first_name": "kotaro",
      "last_name": "takahashi",
    },
    {
      "id": 2,
      "first_name": "Steve",
      "last_name": "Palmer",
    },
    {
      "id": 3,
      "first_name": "Ann",
      "last_name": "Smith",
    }
  ]
}
```

`db.json`が作成できたら、以下のコマンドラインで起動します。
```
json-server db.json
```

ブラウザでアクセスするとモックサーバとして動作しているのがわかると思います。

```
http://localhost:3000
```

一覧の取得や、単体の取得、更新もできます。
```
$ curl http://localhost:3000/persons
$ curl http://localhost:3000/persons/1
$ curl -X PUT http://localhost:3000/persons/1 -d '{
    "id": 2,
    "first_name": "John",
    "last_name": "Lennon",
  }'
```

## まとめ
フロントエンドの開発で、モックサーバが必要な時には是非使ってみてください。
