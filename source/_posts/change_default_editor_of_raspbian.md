---
title: Raspbeinのデフォルトエディタを変更する
date: 2017-09-17 16:21:26
tags:
- linux
- raspberry pi
- tips
---
現在Raspberry piのOSはRaspbianを使っています。
UNIXのコマンドには、実行時にシステムのデフォルトエディタを起動するものがあります。
例えば`fc`コマンドなんかの類です。

これが残念ながらデフォルトのままでは、エディタが`nano`で起動します。(残念ながら個人的にnanoはいらない子です。

これを`vi`にしたいと思い変更方法を調べました。

そのためには、以下のコマンドラインを実行します。

```
sudo update-alternatives --config editor
```

あとは、プロンプトの表示に従います。
どうやら、Debian系のディストリビューションだとこの方法で設定できるようです。

ソースは[これ](https://unix.stackexchange.com/questions/42726/how-do-i-change-the-default-text-editor-in-the-debian-squeeze-distro)です。
