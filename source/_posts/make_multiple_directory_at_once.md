---
title: 複数ディレクトリを一度にmkdirする
date: 2017-09-17 18:29:56
tags:
- unix
- commandline
- mkdir
- tips
---

以下のようにコマンドラインに`-p`オプションをつけるます。
それによって指定したパスに存在しないディレクトリが含まれてもエラーを出さずに一気に作れます。
```
mkdir -p path/to/newDir
```
