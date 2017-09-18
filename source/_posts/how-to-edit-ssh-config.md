---
title: ~/.ssh/configを編集する
date: 2017-09-16 17:09:52
tags:
- ssh
- config
- tips
---

~/.ssh/configはsshクライアントの設定ファイルです。
ssh接続先の情報を定義しておくことで、sshコマンドのオプションを省略できる。

## sshコマンドのオプション
- -i: 秘密鍵を指定
- -p: ポート番号を指定
- -l: ログインユーザ名を指定

## .ssh/configの設定例
```
# hogeサーバー
Host hoge
    HostName hoge.com
    User hoge
    IdentityFile ~/.ssh/test/hoge.key
    Port 20022
```

上記のように設定をすることで、`ssh hoge`とコマンドを実行するだけでサーバにログインできるようになります。

## 参考文献
- [.ssh/configファイルでSSH接続を管理する](http://qiita.com/0084ken/items/2e4e9ae44ec5e01328f1)
- [~/.ssh/configについて](http://qiita.com/passol78/items/2ad123e39efeb1a5286b)
