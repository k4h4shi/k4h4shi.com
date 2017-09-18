---
title: hexoコマンドのフローの考察
date: 2017-09-16 18:08:32
tags:
- hexo
---
hexoコマンドによるブログ投稿フローをまとめます。
ある程度パターンが見えてきたら、npm コマンドとしてまとめようと思います。

## ブログ投稿のフロー

### 新規作成
1. hexo n post [postname]
2. hexo edit [postname]
3. hexo server -o
4. hexo generate
5. hexo deploy

### 下書き作成
1. hexo n draft [draftname]
2. hexo edit [draftname]
3. hexo server -o
4. hexo publish
5. hexo generate
6. hexo deploy

### 編集
1. hexo edit [postname]
2. hexo server -o
3. hexo generate
4. hexo deploy

## 参考リンク
- [hexo-cli-extras](https://github.com/greg-js/hexo-cli-extras)
- [Hexo コマンド](http://hatobane.github.io/hexo/hexo-command/)

