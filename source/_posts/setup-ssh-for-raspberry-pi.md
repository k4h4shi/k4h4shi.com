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

## 公開鍵認証でSSHログインする
公開鍵と秘密鍵のペアを生成します。
```
$ cd ~/.ssh
$ ssh-keygen
```
幾つか質問をされるので答えると公開鍵と秘密鍵のペアが生成されます。

生成したら、scpで公開鍵をラズベリーパイへ転送します。
```
$ scp [key.pub] pi@xxx.xxx.xxx.xxx:/home/pi/.ssh/`
```

Raspberry piへsshログインを行って、公開鍵情報をauthorized_keysファイルへ書き出し、権限を変更します。
```
$ raspberrypi ~ $ cat id_rsa.pub >> .ssh/authorized_keys
$ raspberrypi ~ $ chmod 700 .ssh
$ raspberrypi ~ $ chmod 600 .ssh/authorized_keys
```

sshd_configを編集します
```
$ sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.org
$ sudo vi /etc/ssh/sshd_config 
```

設定箇所は以下の3つです。
- ルートログインの禁止
- 公開鍵ファイル認証を有効化
- パスワード認証の無効化

```
PermitRootLogin without-password
↓
PermitRootLogin no

#AuthorizedKeysFile  %h/.ssh/authorized_keys
↓
AuthorizedKeysFile  %h/.ssh/authorized_keys

PasswordAuthentication yes
↓
PasswordAuthentication no
```

sshを再起動して設定を有効化します。
```
sudo /etc/init.d/ssh restart
```

パスワードによるsshが失敗し、公開鍵によるsshが成功すれば完了です。
```
$ ssh pi@xxx.xxx.xxx.xxx 
$ ssh -i ~/.ssh/key -p 22 pi@xxx.xxx.xxx.xxx
```

## 参考文献
-[ssh(SECURE SHELL)](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md)
-[SCPコマンドでローカルのファイルをサーバにアップ＆サーバ上のファイルをDL](https://qiita.com/ritukiii/items/c724f09fe66fedf2618b)
-[Raspberry Piに外部ネットワークからアクセスできる様にして携帯でペットを遠隔監視する方法](https://qiita.com/kinpira/items/c9e6dc910e8d96e8c19b)
