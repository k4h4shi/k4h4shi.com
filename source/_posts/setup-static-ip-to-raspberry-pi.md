---
title: ラズベリーパイに静的IPアドレスを設定する
date: 2017-09-16 13:39:59
tags:
- reppberry pi
- ip-address
- network
---


## はじめに
IPアドレスが動的に割り当てられていると、接続時に毎回確認しなければなりません。
これでは面倒なので、あらかじめ静的なIPアドレスを割り当てておます。

### ラズベリーパイの3つのネットワークインターフェース
ラズパイには、主に3つのネットワークインターフェースが存在します。
Respberry piには、それぞれのネットワーク環境ごとに異なるIPアドレスが割り当てられます。

- lo: ループバック
- eth0: イーサネットソケットを利用するネットワーク接続
- wlan0: Wifiアダプタまたは、Wifiハードウェアを利用するネットワークインターフェース。

今回は、wlan0に対して静的なIPアドレスを割り当てる設定をします。

## 静的IPアドレスの設定方法
以下の3手順で設定します。

- 使用するIPアドレスを決める
- /etc/dhcpcd.confを編集する
- raspberry piを再起動する

### 使用するIPアドレスを決める
当然ですが、ローカルネットワークで一意なものでなくてはなりません。
今回は、例えば`192.168.1.118`を利用することにします。

### /etc/dhcpdcd.confを編集する
バックアップを取って、編集していきます。
```
$ cp /etc/dhcpdcd.conf /etc/dhcpdcd.conf.org
$ vi /etc/dhcpdcd.conf 
```

今回は、静的IPアドレスを設定したいので、末尾に以下のような行を追加します。

```
interface wlan0
static ip_address=192.168.1.118/24
static routers=192.168.1.118
static domain_name_servers=192.168.1.118
```
IPアドレス末尾の/24は、ネットマスク255.255.255.0に相当します。
異なるネットマスクを設定している場合には、別途設定してください。

### raspberry piを再起動する
Terminalにて`$ reboot`を行ってください。
