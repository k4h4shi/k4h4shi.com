---
title: npmのオプションまとめ
date: 2017-09-18 15:25:46
tags:
- npm
---

npmのオプションまとめ
-gオプションをつけていないため、プロジェクトルートのnode_modules以下にインストールされます。
--save-devオプションを付加しているため、npmがpackage.jsonに依存関係を追記してくれます。

この時点でのpackage.jsonは以下のようになっています。
```
{
  "name": "tools",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^3.9.1"
  }
}
```

