---
title: ローカルにJenkinsインストールしてみた。
date: 2017/05/06 09:31:40
---

Java本格入門を購入し、Javaに再入門しているところです。
「周辺ツールで品質を上げる」という章があり、そこにJenkinsが紹介されていたので、使ってみようと思い立ちました。

一人で自宅でJenkins使う意味あんのかという話もありますが、CheckStyle, FindBungs, jUnitの結果レポートが見れるよー。
ということで、ほなら見てみよっかな。くらいのモチベーションです。

いやあGWは好きなことできるんで最高ですね。

## Jenkinsのインストール方法
自宅の環境はMacのため、HomeBrewで落としてこれます。(ほんとこれなしでは生きていけない気がする。

ということで以下のコマンドをTerminalで叩くだけです。
```
$ brew update
$ brew install Jenkins
```

インストールが終わったらJenkins起動してみます。

```
$ Jenkins
```
だばーっとログがでますが、せっかちな僕はブラウザから即アクセスします。
以下をURLバーに打ち込めば良いです。
```
http://localhost:8080
```

初めはブラウザでセキュリティ設定画面が開きますので、以下のコマンド叩いて表示される文字列をぺたりで良いです。

```
$cat ~/.jenkins/Home/secrets/initialAdminPassword
```

あとはブラウザでぽちぽちやって好きなようにすれば良いんじゃないでしょうか。


## 参考資料
[MacへJenkinsをインストール](http://qiita.com/t_n/items/22e6c5fd9f2ced3d5fc4)

