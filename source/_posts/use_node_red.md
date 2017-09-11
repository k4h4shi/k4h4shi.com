---
title: node-REDを弄ってみた 
date: 2017/07/17 23:49:22
---

この記事は[k4h4shi's blog](http://k4h4shi.hatenablog.com/entry/2017/07/17/234922)からの移転記事です。

## はじめに

仕事でnode-REDに触れる可能性があるので事前に調査を行い、実際に弄ってみました。

## node-REDとは
node-REDは視覚的にnodeとedgeを描くことでハードウェアやデバイス、オンラインサービスを接続するためのツールです。

![img](https://camo.githubusercontent.com/01ed64b01d73046a485ea82b645a3be529c64809/687474703a2f2f6e6f64657265642e6f72672f696d616765732f6e6f64652d7265642d73637265656e73686f742e706e67)

## node-REDの特徴

### ブラウザ上に構築されている
node-REDはブラウザで動作するFlowエディタを提供しており、視覚的にFlowを記述できます。

FlowはNode(プラグイン/モジュール)とEdge(Node間の接続)からなり、ワンクリックで実行環境にデプロイ可能です。

リッチテキストエディタでJavascriptプログラミングが行えるNodeを利用してプログラムを作成することもできます。

作成したテンプレートやFlowはエディタに組み込まれたライブラリに保存し、再利用することもできます。

### node.js上で構築されている
node.js上に構築されており、イベント駆動/ノンブロッキングモデルを活用できます。

そのためにRaspberry Piなどの低コストハードウェア、クラウド上で実行するにも理想的な環境が提供されています。

また、Node.jsのエコシステムに存在するモジュールを利用して、Node-REDを拡張できることも意味します。

### Json形式のインポート/エクスポートによるFlowの共有
Node-REDで作成したFlowはJson形式でインポート/エクスポートすることで他の人と共有できます。

[オンラインFlowライブラリ](https://flows.nodered.org/)にて、作成したFlowを公開、または利用することも可能です。

## 実際に弄ってみる

#### Node-REDのインストールと起動
Linux/OS Xで既にNode.jsをインストールしている場合はTerminalにて以下を実行します。
```
$ sudo npm install -g node-red
$ node-red
```
僕の場合は条件に合致しましたが、それ以外の場合は[公式のGetting Started](https://nodered.jp/docs/getting-started/)を参照ください。

#### Node-REDへアクセス
デフォルトの場合はブラウザから以下のポートでアクセスできます。
```
http://localhost:1880/
```
アクセスするとブラウザでFlowエディタが立ち上がります。

### Hello worldを表示してみる
新しい技術に触れた時はとりあえずHello worldだと思います。

ということでhttpで/helloworldエンドポイントへアクセスしたら、helloworldと表示するFlowを作ってみました。

最終的なFlowはこんな感じになります。


#### Flowの構成
Flowは、以下のNodeから構成されています。

- HTTP Request Node
- Template Node
- HTTP Response Node

これらをつなげることで、「こんなリクエストがあった時、こんなメッセージを、こんな風に返す。」という一連の流れを記述できます。

今回の場合は、

- /helloworldにGETされる
- msgは'Hello World!'
- msgをBodyに含むレスポンスを返す。

というようなFlowを作ります。

#### Flow作成の手順

##### HTTP Request Nodeを追加する
左側のペインから、任意のノードをドラックして中央のFlowペインへドロップすることでNodeが追加できます。
今回は、まずはエンドポイントを追加したいので、httpノードをFlowに追加します。

##### HTTP Requrest Nodeのパラメータを編集する
Flowペインへ追加したノードをダブルクリックすることで、Nodeにパラメータを設定するためのDrawerが表示されます。
今回は、以下の設定を行います。

- Method: GET
- URL: /helloworld

##### HTTP Response Nodeを追加する
Requestに対するResponseが必要なので、Nodeを追加します。
今回は特にResponseに設定は行わず、デフォルトのままにします。

##### Request Node と Response Nodeをつなげる
Request Nodeの右端とResponse Nodeの左端をつなげます。
これにより、これらのNodeを関連づけ、左から右へ流れるFlowにすることができます。

##### 一旦デプロイしてみる
まだBodyを設定していませんが、正常に動くかデプロイしてみます。
デプロイの際は、画面右上のdepoloyボタンを押下します。
上からトーストが出たら成功です。

##### エンドポイントにアクセス
/helloworldエンドポイントにアクセスしてみます。
今回の場合ですとurlは以下になります。
```
http://localhost:1880/helloworld
```
空のレスポンスが帰ってきたら、ひとまずここまでは成功です。

##### Http Response Bodyを設定する
では、レスポンスにBodyを設定するにはどうしたらよいのでしょうか。
HTTP ResponseNodeは左端に接続されているNodeのmsg.payloadの値をBodyとして返します。
ということで、Template Nodeを現在の2つのノードの間に追加して、msg.payloadに値を設定します。

- msg.payload: Hello World!

#### 差分デプロイを行う。
今回の変更では、すべてをデプロイし直す必要はないため、差分デプロイを行います。
そうすることで必要最低限だけ、デプロイし直してくれます。

##### 再度エンドポイントへアクセスする
/helloworldエンドポイントへアクセスしてみると、無事にHello Wolrd!と表示されていることがわかります。

### まとめ
このようにNode-REDでは、基本的に以下の流れで素早く開発ができます。

- Nodeを追加
- Nodeのパラメータの設定
- 複数Nodeを関連付けてFlowを作成
- デプロイを行う


#### 素早いプロトタイピング
このような素早いプロトタイピングは、Node-REDを導入するメリットの一つだと思います。

主にIoT分野での活用を想定しているツールだそうですが、個人的にはプロトタイピングやプログラミング学習などにも利用できるのではないかと思っています。

#### 関数型プログラミングとの共通点
関数型プログラミングの特性が現れているのも面白い部分の一つです。

ノードをつなげていくと、ちょうどフローチャートの様にも見えますが、ifやwhileと行った制御構文は登場しません。

これは、ノードを使って記述しているのは処理そのものではなく、あくまでメッセージの受け取りと、加工、そして結果の受け渡しだからです。

#### 今後について
今後は、ひとまず一通りどんなノードがあるのかを調べつつ引き続き学習していきます。
[各種ノードについてのまとめ](http://qiita.com/k4h4shi/items/3a9d1d9286555ccdb77a)をしていきますので、よかったらご覧ください。
## 参考リンク
- [Node-RED User Group Japan](https://nodered.jp/)
- [github: node-red/node-red](https://github.com/node-red/node-red)
