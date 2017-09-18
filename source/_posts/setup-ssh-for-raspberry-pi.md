---
title: raspberry piにssh接続できるように設定した
date: 2017-09-13 21:11:18
tags: 
- raspberry-pi
- ssh
---

Raspberry PiにSSHが出来るようの設定しました。

SSHはSecure Shellの略で、遠隔で安全にリモートコンピュータと通信するためのプロトコルです。

これによってRasberry Piを遠隔で操作することができるようになります。

## 設定方法
Terminalで以下のコマンドで実行しRaspberry Piの設定ツールを起動します。

```
$sudo raspi-config
```
### SSHの有効化

1. 5のInterfacing Optionsを選択します
2. P2のSSHを選択します
3. Would you like the SSH server to be enabled?と尋ねられるので、はいを選択します。
4. The SSH server is enabledと表示されたら成功です。

設定ツールを終了します。

## ip addressを確認する

Raspberry Piのipアドレスを知るために、Terminalで以下のコマンドを実行します。

```
$ hostname -I
```

表示されたipアドレスはsshに必要なので控えておきます。

## SSHでログインする
同一ネットワークに存在する端末から、ipアドレスを使ってRaspberry Piにアクセスします。

Raspberry Piの初期ユーザ名とpassは以下になります。

- user: pi
- pass: raspberry

以下のコマンドでsshを行います。

```
$ ssh [ユーザ名]@[ipアドレス]
```
passを聞かれるため入力します。

接続ができたら設定は完了です。

## 参考文献
-[ssh(SECURE SHELL)](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md)
